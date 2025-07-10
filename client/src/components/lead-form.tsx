import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertLeadSchema, type InsertLead } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

export default function LeadForm() {
  const { toast } = useToast();
  
  const form = useForm<InsertLead>({
    resolver: zodResolver(insertLeadSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      zipCode: "",
    },
  });

  const submitLeadMutation = useMutation({
    mutationFn: async (data: InsertLead) => {
      const response = await apiRequest("POST", "/api/leads", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Information Submitted Successfully!",
        description: "We'll contact you soon with your information packet.",
      });
      form.reset();
    },
    onError: (error: any) => {
      toast({
        title: "Submission Failed",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertLead) => {
    submitLeadMutation.mutate(data);
  };

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-8">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-primary-blue mb-2">Get Started Today</h3>
        <p className="text-gray-600">Complete the form below to receive your information packet</p>
      </div>
      
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="firstName" className="text-sm font-medium text-gray-700">
              First Name *
            </Label>
            <Input
              id="firstName"
              {...form.register("firstName")}
              className="mt-1 focus:ring-accent-green focus:border-accent-green"
              placeholder="Enter your first name"
            />
            {form.formState.errors.firstName && (
              <p className="text-red-600 text-xs mt-1">
                {form.formState.errors.firstName.message}
              </p>
            )}
          </div>
          <div>
            <Label htmlFor="lastName" className="text-sm font-medium text-gray-700">
              Last Name *
            </Label>
            <Input
              id="lastName"
              {...form.register("lastName")}
              className="mt-1 focus:ring-accent-green focus:border-accent-green"
              placeholder="Enter your last name"
            />
            {form.formState.errors.lastName && (
              <p className="text-red-600 text-xs mt-1">
                {form.formState.errors.lastName.message}
              </p>
            )}
          </div>
        </div>
        
        <div>
          <Label htmlFor="email" className="text-sm font-medium text-gray-700">
            Email Address *
          </Label>
          <Input
            id="email"
            type="email"
            {...form.register("email")}
            className="mt-1 focus:ring-accent-green focus:border-accent-green"
            placeholder="Enter your email address"
          />
          {form.formState.errors.email && (
            <p className="text-red-600 text-xs mt-1">
              {form.formState.errors.email.message}
            </p>
          )}
        </div>
        
        <div>
          <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
            Phone Number *
          </Label>
          <Input
            id="phone"
            type="tel"
            {...form.register("phone")}
            className="mt-1 focus:ring-accent-green focus:border-accent-green"
            placeholder="Enter your phone number"
          />
          {form.formState.errors.phone && (
            <p className="text-red-600 text-xs mt-1">
              {form.formState.errors.phone.message}
            </p>
          )}
        </div>
        
        <div>
          <Label htmlFor="zipCode" className="text-sm font-medium text-gray-700">
            Current US Zip Code *
          </Label>
          <Input
            id="zipCode"
            {...form.register("zipCode")}
            className="mt-1 focus:ring-accent-green focus:border-accent-green"
            placeholder="Enter your zip code"
          />
          {form.formState.errors.zipCode && (
            <p className="text-red-600 text-xs mt-1">
              {form.formState.errors.zipCode.message}
            </p>
          )}
        </div>
        
        <Button 
          type="submit" 
          className="w-full bg-accent-green text-white font-bold py-3 px-6 rounded-lg hover:bg-green-400 transition-colors"
          disabled={submitLeadMutation.isPending}
        >
          {submitLeadMutation.isPending ? "Submitting..." : "Get My Information Packet"}
        </Button>
        
        <p className="text-xs text-gray-500 text-center">
          By submitting this form, you consent to receive communications from Herzing University.
        </p>
      </form>
    </div>
  );
}
