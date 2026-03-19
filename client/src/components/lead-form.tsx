import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertLeadSchema, type InsertLead } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

export default function LeadForm() {
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const checkStatus = () => {
      const isSubmitted = localStorage.getItem("herzing_lead_submitted") === "true";
      setSubmitted(isSubmitted);
    };

    checkStatus();
    
    // Listen for storage events (can be sent from AI Assistant or other components)
    window.addEventListener("storage", checkStatus);
    return () => window.removeEventListener("storage", checkStatus);
  }, []);

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
      creditsEarned: undefined,
      visaStatus: "F-1",
    },
  });

  const submitLeadMutation = useMutation({
    mutationFn: async (data: InsertLead) => {
      const response = await apiRequest("POST", "/api/leads", data);
      return response.json();
    },
    onSuccess: (data, variables) => {
      setSubmitted(true);
      // Persist to localStorage so the AI Assistant knows we already filled it
      localStorage.setItem("herzing_lead_submitted", "true");
      localStorage.setItem("herzing_lead_firstName", variables.firstName);
      localStorage.setItem("herzing_lead_university", variables.currentUniversity || "");
      localStorage.setItem("herzing_lead_program", variables.programOfInterest || "");
    },
    onError: (error: any) => {
      toast({
        title: "Submission Failed",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    },
  });

  const nextStep = async () => {
    const fields = ["campus", "programArea", "programOfInterest", "firstName", "lastName", "email", "phone"];
    const isValid = await form.trigger(fields as any);
    if (isValid) setStep(2);
  };

  const handleReset = () => {
    localStorage.removeItem("herzing_lead_submitted");
    localStorage.removeItem("herzing_lead_firstName");
    localStorage.removeItem("herzing_lead_university");
    localStorage.removeItem("herzing_lead_program");
    localStorage.removeItem("herzing_ai_questions"); // Also reset questions for fresh start
    localStorage.removeItem("herzing_ai_messages"); // Clear chat history too
    setSubmitted(false);
    setStep(1);
    form.reset();
    // Notify other components (like AI Assistant) to refresh their state
    window.dispatchEvent(new Event("storage"));
  };

  if (submitted) {
    return (
      <div className="bg-white rounded-2xl shadow-2xl p-8 text-center space-y-4">
        <div className="w-16 h-16 bg-[#66DCA5]/20 rounded-full flex items-center justify-center mx-auto">
          <span className="text-3xl">🎓</span>
        </div>
        <h3 className="text-2xl font-black text-[#002F65]">You're on your way!</h3>
        <p className="text-gray-500 font-medium">Your information has been received. An F-1 Transfer Specialist will reach out within 24 hours.</p>
        <p className="text-sm font-bold text-[#002F65]">Classes start: <span className="underline">September 3rd</span></p>
        
        <div className="pt-4 border-t border-gray-100">
          <p className="text-[10px] text-gray-400 mb-2">Did you submit incorrect information? No worries.</p>
          <button 
            onClick={handleReset}
            className="text-[11px] font-bold text-[#002F65] hover:underline flex items-center justify-center mx-auto space-x-1"
          >
            <span>Click here to submit again</span>
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-6">
      <div className="mb-4">
        <h3 className="text-xl font-black text-[#002F65] leading-none mb-1">Learn More Today!</h3>
        <p className="text-gray-500 font-medium text-xs leading-none">Classes start: <span className="text-[#002F65] font-bold underline decoration-[#66DCA5] decoration-2 underline-offset-2">September 3rd</span></p>
      </div>

      {/* Step indicator */}
      <div className="flex items-center space-x-2 mb-3">
        <div className={cn("w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold transition-all", step === 1 ? "bg-[#002F65] text-white" : "bg-[#66DCA5] text-white")}>1</div>
        <div className={cn("flex-1 h-1 rounded-full transition-all", step === 2 ? "bg-[#66DCA5]" : "bg-gray-100")}></div>
        <div className={cn("w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold transition-all", step === 2 ? "bg-[#002F65] text-white" : "bg-gray-100 text-gray-400")}>2</div>
      </div>

      <form onSubmit={form.handleSubmit((data) => submitLeadMutation.mutate(data))} className="space-y-3">
        {step === 1 ? (
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label className="text-xs font-bold text-[#002F65] uppercase tracking-wide">Campus *</Label>
                <select {...form.register("campus")} className="h-10 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-800 appearance-none">
                  <option value="">Select Campus</option>
                  <option value="Atlanta">Atlanta, GA</option>
                  <option value="Online">Online</option>
                </select>
                {form.formState.errors.campus && <p className="text-red-500 text-[10px]">{form.formState.errors.campus.message}</p>}
              </div>
              <div className="space-y-1">
                <Label className="text-xs font-bold text-[#002F65] uppercase tracking-wide">Program Area *</Label>
                <select {...form.register("programArea")} className="h-10 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-800 appearance-none">
                  <option value="">Select Area</option>
                  <option value="Business">Business</option>
                  <option value="Technology">Technology</option>
                </select>
                {form.formState.errors.programArea && <p className="text-red-500 text-[10px]">{form.formState.errors.programArea.message}</p>}
              </div>
            </div>

            <div className="space-y-1">
              <Label className="text-xs font-bold text-[#002F65] uppercase tracking-wide">Program of Interest *</Label>
              <select {...form.register("programOfInterest")} className="h-10 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-800 appearance-none">
                <option value="">Select Program</option>
                <option value="BS-BM">BS in Business Management</option>
                <option value="MBA">MBA</option>
                <option value="MBA-BA">MBA in Business Analytics (STEM)</option>
                <option value="BS-CS">BS in Cybersecurity</option>
                <option value="BS-IT">BS in Information Technology</option>
              </select>
              {form.formState.errors.programOfInterest && <p className="text-red-500 text-[10px]">{form.formState.errors.programOfInterest.message}</p>}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label className="text-xs font-bold text-[#002F65] uppercase tracking-wide">First Name *</Label>
                <Input {...form.register("firstName")} className="h-10 rounded-lg border-gray-300 text-[#002F65]" placeholder="First Name" />
                {form.formState.errors.firstName && <p className="text-red-500 text-[10px]">{form.formState.errors.firstName.message}</p>}
              </div>
              <div className="space-y-1">
                <Label className="text-xs font-bold text-[#002F65] uppercase tracking-wide">Last Name *</Label>
                <Input {...form.register("lastName")} className="h-10 rounded-lg border-gray-300 text-[#002F65]" placeholder="Last Name" />
                {form.formState.errors.lastName && <p className="text-red-500 text-[10px]">{form.formState.errors.lastName.message}</p>}
              </div>
            </div>

            <div className="space-y-1">
              <Label className="text-xs font-bold text-[#002F65] uppercase tracking-wide">Email *</Label>
              <Input type="email" {...form.register("email")} className="h-10 rounded-lg border-gray-300 text-[#002F65]" placeholder="email@address.com" />
              {form.formState.errors.email && <p className="text-red-500 text-[10px]">{form.formState.errors.email.message}</p>}
            </div>

            <div className="space-y-1">
              <Label className="text-xs font-bold text-[#002F65] uppercase tracking-wide">Phone *</Label>
              <Controller
                name="phone"
                control={form.control}
                render={({ field }) => (
                  <PhoneInput {...field} defaultCountry="US" className="flex h-10 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm text-[#002F65]" />
                )}
              />
              {form.formState.errors.phone && <p className="text-red-500 text-[10px]">{form.formState.errors.phone.message}</p>}
            </div>

            <Button type="button" onClick={nextStep} className="w-full bg-[#002F65] text-white hover:bg-[#001732] h-11 rounded-lg font-bold flex items-center justify-center space-x-2">
              <span>Continue</span>
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label className="text-xs font-bold text-[#002F65] uppercase tracking-wide">Visa Status *</Label>
                <select {...form.register("visaStatus")} className="h-10 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-800 appearance-none">
                  <option value="F-1">F-1 Student</option>
                  <option value="J-1">J-1 Exchange</option>
                  <option value="H-1B">H-1B Worker</option>
                </select>
              </div>
              <div className="space-y-1">
                <Label className="text-xs font-bold text-[#002F65] uppercase tracking-wide">US Zip Code *</Label>
                <Input {...form.register("zipCode")} className="h-10 rounded-lg border-gray-300 text-[#002F65]" placeholder="30328" />
                {form.formState.errors.zipCode && <p className="text-red-500 text-[10px]">{form.formState.errors.zipCode.message}</p>}
              </div>
            </div>

            <div className="space-y-1">
              <Label className="text-xs font-bold text-[#002F65] uppercase tracking-wide">Current University *</Label>
              <Input {...form.register("currentUniversity")} className="h-10 rounded-lg border-gray-300 text-[#002F65]" placeholder="Where do you study now?" />
              {form.formState.errors.currentUniversity && <p className="text-red-500 text-[10px]">{form.formState.errors.currentUniversity.message}</p>}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label className="text-xs font-bold text-[#002F65] uppercase tracking-wide">Current Program *</Label>
                <Input {...form.register("currentProgram")} className="h-10 rounded-lg border-gray-300 text-[#002F65]" placeholder="e.g. BSCS" />
                {form.formState.errors.currentProgram && <p className="text-red-500 text-[10px]">{form.formState.errors.currentProgram.message}</p>}
              </div>
              <div className="space-y-1">
                <Label className="text-xs font-bold text-[#002F65] uppercase tracking-wide">Credits Earned *</Label>
                <Input type="number" {...form.register("creditsEarned")} className="h-10 rounded-lg border-gray-300 text-[#002F65]" placeholder="e.g. 30" />
                {form.formState.errors.creditsEarned && <p className="text-red-500 text-[10px]">{form.formState.errors.creditsEarned.message}</p>}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button 
                type="button" 
                onClick={() => setStep(1)} 
                className="h-11 px-6 rounded-lg border-2 border-gray-300 bg-white text-gray-700 font-bold hover:bg-gray-50 hover:border-gray-400 order-2 sm:order-1"
              >
                ← Back
              </Button>
              <Button 
                type="submit" 
                className="flex-1 bg-[#66DCA5] text-[#002F65] hover:bg-[#5bc396] h-11 rounded-lg font-black whitespace-normal px-4 leading-tight order-1 sm:order-2" 
                disabled={submitLeadMutation.isPending}
              >
                {submitLeadMutation.isPending ? "Submitting..." : "Step Up to Herzing →"}
              </Button>
            </div>

            <p className="text-[10px] text-gray-400 text-center leading-relaxed">
              By submitting, I consent to Herzing University contacting me by phone and email. Consent is not a condition of enrollment.
            </p>
          </div>
        )}
      </form>
    </div>
  );
}
