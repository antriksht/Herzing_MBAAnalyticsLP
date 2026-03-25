import { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertLeadSchema, type InsertLead } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { X, Send, User, Bot, GraduationCap, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { trackEvent } from "@/lib/analytics";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function AITransferAssistant({ 
  isOpen, 
  onClose,
  layout = "fullscreen"
}: { 
  isOpen: boolean; 
  onClose: () => void;
  layout?: "fullscreen" | "widget" | "fullpage";
}) {
  const [hasFilledForm, setHasFilledForm] = useState(() => {
    return typeof window !== 'undefined' && localStorage.getItem("herzing_lead_submitted") === "true";
  });
  const [formStep, setFormStep] = useState(1);
  const [messages, setMessages] = useState<Message[]>(() => {
    if (typeof window === 'undefined') return [];
    
    // 1. Check for saved conversation history
    const savedMsg = localStorage.getItem("herzing_ai_messages");
    if (savedMsg) {
      try {
        const parsed = JSON.parse(savedMsg);
        if (parsed.length > 0) return parsed;
      } catch (e) {
        console.error("Failed to parse saved messages", e);
      }
    }

    // 2. If no history, check if this is a returning student (Welcome Back sequence)
    const hasSubmitted = localStorage.getItem("herzing_lead_submitted") === "true";
    if (hasSubmitted) {
      const name = localStorage.getItem("herzing_lead_firstName") || "there";
      const university = localStorage.getItem("herzing_lead_university") || "your current university";
      const program = localStorage.getItem("herzing_lead_program") || "our programs";
      return [
        { role: "assistant", content: `Hello! I see you've already shared your transfer interest with us. Welcome back, ${name}!` },
        { role: "user", content: `I'm ${name} from ${university}, interested in ${program}.` },
        { role: "assistant", content: `Glad to have you here! I'm ready to help you plan your transfer to Herzing. What would you like to know about ${program}, our admission process, or the May 4th start date?` }
      ];
    }

    // 3. Fresh start for a new student
    return [
      { role: "assistant", content: "Hello! I'm your Herzing F-1 Transfer Assistant. I can help you understand the process, credits, and timing for your transfer. To get started with a personalized session, please fill out your basic transfer profile below." }
    ];
  });
  
  // Persist messages whenever they change
  useEffect(() => {
    localStorage.setItem("herzing_ai_messages", JSON.stringify(messages));
  }, [messages]);
  const [input, setInput] = useState("");
  const [questionCount, setQuestionCount] = useState(() => {
    const saved = typeof window !== 'undefined' ? localStorage.getItem("herzing_ai_questions") : null;
    return saved ? parseInt(saved, 10) : 0;
  });
  const { toast } = useToast();
  const scrollRef = useRef<HTMLDivElement>(null);

  const form = useForm<InsertLead>({
    resolver: zodResolver(insertLeadSchema),
    defaultValues: {
      campus: "",
      programArea: "",
      programOfInterest: "",
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      zipCode: "",
      currentUniversity: "",
      currentProgram: "",
      creditsEarned: 0,
      visaStatus: "F-1",
    },
  });

  const nextStep = async () => {
    const fields = ["campus", "programArea", "programOfInterest", "firstName", "lastName", "email", "phone"];
    const isValid = await form.trigger(fields as any);
    if (isValid) {
      trackEvent("CTA AI Click", { label: "Continue to Step 2" });
      setFormStep(2);
    } else {
      trackEvent("Failed Form Submit", { 
        formLocation: "AI Assistant Step 1", 
        errors: Object.keys(form.formState.errors) 
      });
    }
  };

  const submitLeadMutation = useMutation({
    mutationFn: async (data: InsertLead) => {
      const response = await apiRequest("POST", "/api/leads", data);
      return response.json();
    },
    onSuccess: (data, variables) => {
      setHasFilledForm(true);
      const firstName = variables.firstName;
      const university = variables.currentUniversity || "your current university";
      
      // Persist to localStorage
      localStorage.setItem("herzing_lead_submitted", "true");
      localStorage.setItem("herzing_lead_firstName", firstName);
      localStorage.setItem("herzing_lead_university", variables.currentUniversity || "");
      localStorage.setItem("herzing_lead_program", variables.programOfInterest || "");
      
      // Notify other components (like LeadForm) to update their state immediately
      window.dispatchEvent(new Event("storage"));
      
      setMessages(prev => [
        ...prev, 
        { role: "user", content: `My name is ${firstName} and I'm currently at ${university}.` },
        { role: "assistant", content: `Welcome, ${firstName}! I've recorded your interest in transferring from ${university}. I'm now ready to help you plan your "Move Up" to Herzing. What would you like to know about our ${variables.programOfInterest} program, credit transfers, or the May 4th start date?` }
      ]);

      trackEvent("AI Form Submit", {
        program: variables.programOfInterest,
        university: variables.currentUniversity,
        visaStatus: variables.visaStatus
      });
    },
    onError: (error: any) => {
      trackEvent("Failed Form Submit", {
        formLocation: "AI Assistant",
        error: error.message
      });
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  const chatMutation = useMutation({
    mutationFn: async (userMessage: string) => {
      const response = await apiRequest("POST", "/api/chat", { message: userMessage, currentHistory: messages });
      return response.json();
    },
    onSuccess: (data) => {
      setMessages(prev => [...prev, { role: "assistant", content: data.reply }]);
      trackEvent("AI Response", { questionNumber: questionCount + 1 });
      setQuestionCount(prev => {
        const next = prev + 1;
        localStorage.setItem("herzing_ai_questions", next.toString());
        return next;
      });
    },
  });

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || chatMutation.isPending || questionCount >= 10) return;

    setMessages(prev => [...prev, { role: "user", content: input }]);
    trackEvent("AI Question Asked", { questionNumber: questionCount + 1, length: input.length });
    chatMutation.mutate(input);
    setInput("");
  };

  useEffect(() => {
    const checkSubmission = () => {
      const hasSubmitted = localStorage.getItem("herzing_lead_submitted") === "true";
      
      if (!hasSubmitted) {
        setHasFilledForm(false);
        // Important: When form is cleared, also clear persistent message history
        localStorage.removeItem("herzing_ai_messages");
        return;
      }

      if (hasSubmitted && !hasFilledForm) {
        setHasFilledForm(true);
      }
    };

    checkSubmission();
    
    // Listen for storage events (sent from LeadForm handleReset)
    window.addEventListener("storage", checkSubmission);
    return () => window.removeEventListener("storage", checkSubmission);
  }, [isOpen, hasFilledForm]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  if (!isOpen) return null;

  return (
    <div className={cn(
      layout === "fullscreen" && "fixed inset-0 z-[100] bg-[#002F65]/90 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 md:p-8",
      layout === "widget" && "fixed bottom-[100px] right-4 md:right-8 z-[100] w-full max-w-md sm:max-w-xl flex flex-col items-end",
      layout === "fullpage" && "w-full max-w-7xl relative mx-auto",
      isOpen ? "opacity-100" : "opacity-0 pointer-events-none transition-opacity duration-300"
    )}>
      {/* Main Container */}
      <div className={cn(
        "bg-white shadow-2xl flex flex-col overflow-hidden relative transition-all duration-500",
        layout === "fullscreen" && "w-full max-w-6xl max-h-[92vh] rounded-[2rem] border border-white/20",
        layout === "fullpage" && "w-full min-h-[880px] lg:h-[880px] rounded-[2.5rem] shadow-none border-none",
        layout === "widget" && cn(
          "w-full rounded-[1.5rem] md:rounded-[2rem] border-2 border-[#002F65]/10",
          !hasFilledForm ? "h-[520px]" : "h-[75vh] max-h-[750px]"
        )
      )}>
        
        {/* Premium Header */}
        <div className={cn(
          "flex items-center justify-between border-b bg-gray-50/50 backdrop-blur-sm shrink-0",
          layout === "fullscreen" ? "px-8 py-6" : "px-6 py-4"
        )}>
          <div className="flex items-center space-x-4">
            <div className={cn(
              "bg-gradient-to-br from-[#002F65] to-[#00479b] rounded-2xl flex items-center justify-center shadow-lg transform -rotate-3",
              layout === "fullscreen" ? "w-12 h-12" : "w-10 h-10"
            )}>
              <GraduationCap className="text-white w-6 h-6 md:w-7 md:h-7" />
            </div>
            <div>
              <h3 className={cn("font-black text-[#002F65] tracking-tight", layout === "fullscreen" ? "text-xl" : "text-lg")}>F-1 Transfer Guide</h3>
              <div className="flex items-center mt-0.5">
                <span className="w-2 h-2 bg-[#66DCA5] rounded-full mr-2 animate-pulse shadow-[0_0_8px_rgba(102,220,165,0.6)]"></span>
                <p className="text-[10px] text-[#66DCA5] font-bold uppercase tracking-widest">
                  Official Admission System
                </p>
              </div>
            </div>
          </div>
          {layout !== "fullpage" && (
            <button 
              onClick={onClose} 
              className="p-2 hover:bg-red-50 text-gray-400 hover:text-red-500 rounded-2xl transition-all hover:rotate-90 duration-300"
            >
              <X className="w-6 h-6" />
            </button>
          )}
        </div>

        {/* Dynamic Content Area */}
        <div className="flex-1 overflow-hidden relative flex flex-col">
          <div className={cn(
            "flex-1 overflow-y-auto",
            (layout === "fullscreen" || layout === "fullpage") ? "p-4 md:p-8" : "p-6 flex flex-col items-center justify-center text-center"
          )} ref={scrollRef}>
            {!hasFilledForm ? (
              layout === "widget" ? (
                <div className="space-y-6 animate-in fade-in zoom-in duration-500 max-w-sm px-4">
                  <div className="w-16 h-16 bg-[#66DCA5]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <User className="text-[#002F65] w-8 h-8" />
                  </div>
                  <h2 className="text-2xl font-black text-[#002F65] leading-tight">
                    Ready to Chat with an <span className="text-[#65DBA5]">F-1 Expert?</span>
                  </h2>
                  <p className="text-[#6F767D] font-medium leading-relaxed">
                    To provide you with personalized transfer advice, please complete the brief interest form on the page first.
                  </p>
                  <Button 
                    onClick={() => {
                      onClose();
                      const element = document.getElementById("form");
                      if (element) {
                        element.scrollIntoView({ behavior: "smooth" });
                      }
                      trackEvent("Widget Form Redirection", { label: "Scroll to Page Form" });
                    }}
                    className="bg-[#002F65] text-white hover:bg-[#001732] h-12 px-8 rounded-2xl text-lg font-black shadow-lg transform transition-all active:scale-95 group"
                  >
                    <span>Go to Form</span>
                    <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest pt-2">
                    Takes less than 60 seconds
                  </p>
                </div>
              ) : (
              <div className="max-w-7xl mx-auto h-full flex flex-col justify-center">
                <div className={cn(
                  "grid items-start",
                  (layout === "fullscreen" || layout === "fullpage") ? "grid-cols-1 lg:grid-cols-2 gap-16" : "grid-cols-1 gap-6"
                )}>
                  {/* Left Side: Global Narrative */}
                  <div className="space-y-6 md:space-y-10 py-4">
                    <div className="space-y-6">
                      <div className="inline-flex items-center px-4 py-2 bg-[#66DCA5]/10 text-[#002F65] rounded-full text-xs font-black uppercase tracking-widest border border-[#66DCA5]/20">
                        <span className="w-2 h-2 bg-[#66DCA5] rounded-full mr-2 animate-pulse"></span>
                        Instant Admission Planning
                      </div>
                      <h2 className="text-3xl md:text-5xl font-black text-[#002F65] leading-[1.1]">
                        Plan Your <br />
                        <span className="text-[#66DCA5] italic">F-1 Transfer Instantly.</span>
                      </h2>
                      <div className="space-y-4 max-w-md">
                        <p className="text-[#6F767D] text-base md:text-lg font-medium leading-relaxed">
                          This AI system is designed to accelerate your move to Herzing. We analyze your credits, track your timeline, and build your May 4th start plan in one sitting.
                        </p>
                        <ul className="space-y-3">
                          {[
                            "Analyze prior credits & degree options",
                            "Draft your I-20 transfer timeline",
                            "Plan your May 4th enrollment steps"
                          ].map((item, idx) => (
                            <li key={idx} className="flex items-center text-[#002F65] font-bold text-sm">
                              <div className="w-5 h-5 bg-[#66DCA5] rounded-full flex items-center justify-center mr-3 shadow-sm scale-75">
                                <ChevronRight className="w-3 h-3 text-white" />
                              </div>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    
                    <div className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm relative group overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-[#002F65]/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700"></div>
                      <p className="text-[#002F65] text-lg font-bold leading-relaxed relative z-10">
                        Tell me about your current program, and I’ll generate a custom Herzing Transfer Path specifically for you.
                      </p>
                    </div>

                    <div className="flex items-center space-x-4 pt-4">
                      <div className="flex -space-x-3">
                        {[1, 2, 3].map(i => (
                          <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-gray-200 overflow-hidden shadow-sm">
                            <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i + 10}`} alt="Student" />
                          </div>
                        ))}
                      </div>
                      <p className="text-sm font-bold text-[#002F65]/60 uppercase tracking-tighter">Joined by 400+ F-1 Students</p>
                    </div>
                  </div>

                  {/* Right Side: Two-Part Swiping Form */}
                  <div className="bg-white p-6 md:p-8 rounded-[2rem] border-2 border-[#002F65]/10 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#66DCA5]/5 rounded-full -mr-16 -mt-16"></div>
                    
                    <div className="flex items-center justify-between mb-8 relative z-10">
                      <div className="flex items-center space-x-2">
                        <div className={cn("w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all", formStep === 1 ? "bg-[#002F65] text-white" : "bg-[#66DCA5] text-white")}>1</div>
                        <div className={cn("w-12 h-1 rounded-full transition-all", formStep === 2 ? "bg-[#66DCA5]" : "bg-gray-100")}></div>
                        <div className={cn("w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all", formStep === 2 ? "bg-[#002F65] text-white" : "bg-gray-100 text-gray-400")}>2</div>
                      </div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                        {formStep === 1 ? "Step 1: Interest" : "Step 2: Transfer Details"}
                      </p>
                    </div>

                    <form 
                      onFocus={(e) => {
                        const target = e.target as any;
                        const label = target.name || target.placeholder || "form element";
                        trackEvent("Form Field Focus", { field: label, form: "AI Assistant" });
                      }}
                      onSubmit={form.handleSubmit((data) => submitLeadMutation.mutate(data))} 
                      className="relative z-10 space-y-4"
                    >
                      {formStep === 1 ? (
                        <div className="space-y-4 animate-in slide-in-from-right duration-500">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label className="text-[#002F65] font-bold text-xs uppercase tracking-wider ml-1">Campus *</Label>
                              <select {...form.register("campus")} className="h-10 w-full rounded-2xl border border-gray-200 bg-gray-50/50 px-4 text-sm text-gray-800 focus:ring-[#002F65] appearance-none">
                                <option value="">Select Campus</option>
                                <option value="Atlanta">Atlanta, GA</option>
                                <option value="Online">Online</option>
                              </select>
                              {form.formState.errors.campus && <p className="text-red-500 text-[10px] mt-1">{form.formState.errors.campus.message}</p>}
                            </div>
                            <div className="space-y-2">
                              <Label className="text-[#002F65] font-bold text-xs uppercase tracking-wider ml-1">Program Area *</Label>
                              <select {...form.register("programArea")} className="h-10 w-full rounded-2xl border border-gray-200 bg-gray-50/50 px-4 text-sm text-gray-800 focus:ring-[#002F65] appearance-none">
                                <option value="">Select Area</option>
                                <option value="Business">Business</option>
                                <option value="Technology">Technology</option>
                                <option value="All">All Areas</option>
                              </select>
                              {form.formState.errors.programArea && <p className="text-red-500 text-[10px] mt-1">{form.formState.errors.programArea.message}</p>}
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label className="text-[#002F65] font-bold text-xs uppercase tracking-wider ml-1">Program of Interest *</Label>
                            <select {...form.register("programOfInterest")} className="h-10 w-full rounded-2xl border border-gray-200 bg-gray-50/50 px-4 text-sm text-gray-800 focus:ring-[#002F65] appearance-none">
                              <option value="">Select Program</option>
                              <option value="BS-BM">BS in Business Management</option>
                              <option value="MBA">MBA</option>
                              <option value="MBA-BA">MBA in Business Analytics (STEM)</option>
                              <option value="BS-CS">BS in Cybersecurity</option>
                              <option value="BS-IT">BS in Information Technology</option>
                            </select>
                            {form.formState.errors.programOfInterest && <p className="text-red-500 text-[10px] mt-1">{form.formState.errors.programOfInterest.message}</p>}
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label className="text-[#002F65] font-bold text-xs uppercase tracking-wider ml-1">First Name *</Label>
                              <Input {...form.register("firstName")} className="h-10 rounded-2xl bg-gray-50/50 border-gray-200 text-[#002F65]" placeholder="First Name" />
                              {form.formState.errors.firstName && <p className="text-red-500 text-[10px] mt-1">{form.formState.errors.firstName.message}</p>}
                            </div>
                            <div className="space-y-2">
                              <Label className="text-[#002F65] font-bold text-xs uppercase tracking-wider ml-1">Last Name *</Label>
                              <Input {...form.register("lastName")} className="h-10 rounded-2xl bg-gray-50/50 border-gray-200 text-[#002F65]" placeholder="Last Name" />
                              {form.formState.errors.lastName && <p className="text-red-500 text-[10px] mt-1">{form.formState.errors.lastName.message}</p>}
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label className="text-[#002F65] font-bold text-xs uppercase tracking-wider ml-1">Email *</Label>
                            <Input {...form.register("email")} className="h-10 rounded-2xl bg-gray-50/50 border-gray-200 text-[#002F65]" placeholder="email@address.com" />
                            {form.formState.errors.email && <p className="text-red-500 text-[10px] mt-1">{form.formState.errors.email.message}</p>}
                          </div>

                          <div className="space-y-2">
                            <Label className="text-[#002F65] font-bold text-xs uppercase tracking-wider ml-1">Phone *</Label>
                            <Controller
                              name="phone"
                              control={form.control}
                              render={({ field }) => (
                                <PhoneInput
                                  {...field}
                                  defaultCountry="US"
                                  className="flex h-10 w-full rounded-2xl border border-gray-200 bg-gray-50/50 px-4 text-sm text-[#002F65]"
                                />
                              )}
                            />
                            {form.formState.errors.phone && <p className="text-red-500 text-[10px] mt-1">{form.formState.errors.phone.message}</p>}
                          </div>

                          <Button 
                            type="button"
                            onClick={nextStep}
                            className="w-full bg-[#002F65] text-white hover:bg-[#001732] h-12 rounded-2xl text-lg font-black shadow-lg flex items-center justify-center space-x-2 transition-transform active:scale-95 mt-2"
                          >
                            <span>Share Your Dreams</span>
                            <ChevronRight className="w-5 h-5" />
                          </Button>
                        </div>
                      ) : (
                        <div className="space-y-4 animate-in slide-in-from-right duration-500">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label className="text-[#002F65] font-bold text-xs uppercase tracking-wider ml-1">Visa Status *</Label>
                              <select {...form.register("visaStatus")} className="h-10 w-full rounded-2xl border border-gray-200 bg-gray-50/50 px-4 text-sm text-gray-800 appearance-none">
                                <option value="F-1">F-1 Student</option>
                                <option value="J-1">J-1 Exchange</option>
                                <option value="H-1B">H-1B Worker</option>
                              </select>
                            </div>
                            <div className="space-y-2">
                              <Label className="text-[#002F65] font-bold text-xs uppercase tracking-wider ml-1">Zip Code *</Label>
                              <Input {...form.register("zipCode")} className="h-10 rounded-2xl bg-gray-50/50 border-gray-200 text-[#002F65]" placeholder="30328" />
                              {form.formState.errors.zipCode && <p className="text-red-500 text-[10px] mt-1">{form.formState.errors.zipCode.message}</p>}
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label className="text-[#002F65] font-bold text-xs uppercase tracking-wider ml-1">Current University *</Label>
                            <Input {...form.register("currentUniversity")} className="h-10 rounded-2xl bg-gray-50/50 border-gray-200 text-[#002F65]" placeholder="Where do you study now?" />
                            {form.formState.errors.currentUniversity && <p className="text-red-500 text-[10px] mt-1">{form.formState.errors.currentUniversity.message}</p>}
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label className="text-[#002F65] font-bold text-xs uppercase tracking-wider ml-1">Current Program *</Label>
                              <Input {...form.register("currentProgram")} className="h-10 rounded-2xl bg-gray-50/50 border-gray-200 text-[#002F65]" placeholder="e.g. BSCS" />
                            </div>
                            <div className="space-y-2">
                              <Label className="text-[#002F65] font-bold text-xs uppercase tracking-wider ml-1">Credits Earned *</Label>
                              <Input type="number" {...form.register("creditsEarned")} className="h-10 rounded-2xl bg-gray-50/50 border-gray-200 text-[#002F65]" placeholder="Estimated" />
                              {form.formState.errors.creditsEarned && <p className="text-red-500 text-[10px] mt-1">{form.formState.errors.creditsEarned.message}</p>}
                            </div>
                          </div>

                          <div className="flex flex-col sm:flex-row gap-4 pt-2">
                             <Button 
                               type="button" 
                               onClick={() => setFormStep(1)}
                               className="h-12 px-6 rounded-2xl border-2 border-gray-300 bg-white text-gray-700 font-bold hover:bg-gray-50 hover:border-gray-400 order-2 sm:order-1"
                             >
                               ← Back
                             </Button>
                             <Button 
                               type="submit" 
                               className="flex-1 bg-[#002F65] text-white hover:bg-[#001732] h-12 rounded-2xl text-lg font-black shadow-lg whitespace-normal leading-tight px-4 order-1 sm:order-2"
                               disabled={submitLeadMutation.isPending}
                             >
                               {submitLeadMutation.isPending ? "Configuring AI..." : "Step Up to Herzing →"}
                             </Button>
                           </div>
                        </div>
                      )}
                    </form>
                  </div>
                </div>
              </div>
            )
          ) : (
              <div className="max-w-3xl mx-auto space-y-6">
                {messages.map((msg, idx) => (
                  <div key={idx} className={cn("flex flex-col", msg.role === "user" ? "items-end" : "items-start")}>
                    <div className={cn(
                      "max-w-[85%] rounded-[1.5rem] px-6 py-4 shadow-sm relative group",
                      msg.role === "user" 
                        ? "bg-[#002F65] text-white rounded-tr-none" 
                        : "bg-gray-100 text-[#111111] rounded-tl-none border border-gray-200"
                    )}>
                      <div className="flex items-center mb-1 space-x-2">
                        <span className={cn("text-[8px] font-black uppercase tracking-[0.2em] opacity-40", msg.role === "user" ? "text-white" : "text-[#002F65]")}>
                          {msg.role === "assistant" ? "HERZING ADVISOR" : "TRANSFER STUDENT"}
                        </span>
                      </div>
                      <div className={cn(
                        "text-[15px] leading-relaxed font-medium prose prose-sm max-w-none prose-p:my-1 prose-ul:my-2 prose-li:my-0.5",
                        msg.role === "user" ? "prose-invert text-white" : "prose-slate text-[#111111]"
                      )}>
                        {msg.role === "assistant" ? (
                          <ReactMarkdown>{msg.content}</ReactMarkdown>
                        ) : (
                          msg.content
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                {chatMutation.isPending && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100/50 rounded-2xl px-6 py-4 border border-gray-200 animate-pulse">
                      <div className="flex space-x-1">
                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                      </div>
                    </div>
                  </div>
                )}
                {questionCount >= 10 && (
                  <div className="bg-gradient-to-r from-[#002F65] to-[#00479b] text-white p-6 rounded-[2rem] text-center shadow-xl space-y-3">
                    <h4 className="text-xl font-black tracking-tight">Session Limit Reached</h4>
                    <p className="text-white/80 text-sm font-medium">You've explored the main transfer paths! To take the next official step, your assigned F-1 Specialist will contact you within 24 hours.</p>
                    <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl inline-block border border-white/20">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-[#66DCA5] mb-1">Direct Contact</p>
                      <p className="text-base font-bold">admissions@herzing.edu</p>
                      <p className="text-base font-bold">1-800-596-0724</p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Footer Input */}
          {hasFilledForm && questionCount < 10 && (
            <div className="p-4 md:p-6 border-t bg-gray-50/30">
              <div className="max-w-3xl mx-auto">
                <form onSubmit={handleSendMessage} className="relative">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask about credits, scholarships..."
                    className="h-12 pl-6 pr-14 rounded-[1.2rem] border-2 border-gray-200 focus:border-[#002F65] focus:ring-0 text-sm shadow-inner bg-white w-full"
                    disabled={chatMutation.isPending}
                  />
                  <button 
                    type="submit" 
                    className="absolute right-1.5 top-1/2 -translate-y-1/2 w-9 h-9 bg-[#002F65] text-white rounded-lg hover:bg-[#001732] transition-all flex items-center justify-center shadow-lg group disabled:opacity-50"
                    disabled={chatMutation.isPending || !input.trim()}
                  >
                    <Send className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </button>
                </form>
                <div className="mt-2 flex justify-between items-center px-2">
                  <div className="flex items-center space-x-2">
                    <div className="flex -space-x-1">
                      {[...Array(10)].map((_, i) => (
                        <div key={i} className={cn("w-4 h-1 rounded-full", i < (10 - questionCount) ? "bg-[#66DCA5]" : "bg-gray-200")}></div>
                      ))}
                    </div>
                    <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">{10 - questionCount} tokens left</p>
                  </div>
                  <p className="text-[9px] text-gray-400 font-bold uppercase">Herzing Intelligence v3.1</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
