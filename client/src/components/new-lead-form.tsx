import { useState, forwardRef } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input as UiInput } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import PhoneInput, { getCountryCallingCode, Country } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { cn } from "@/lib/utils";

const step1Schema = z.object({
  country: z.string().min(1, "Country is required"),
  campus: z.string().min(1, "Campus is required"),
  programArea: z.string().min(1, "Program Area is required"),
  programOfInterest: z.string().min(1, "Program of Interest is required"),
});

const step2Schema = z.object({
  firstName: z.string().min(1, "First Name is required"),
  lastName: z.string().min(1, "Last Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone number is required"),
  howDidYouHear: z.string().min(1, "This field is required"),
});

const leadSchema = step1Schema.merge(step2Schema);
type LeadFormValues = z.infer<typeof leadSchema>;

const StepIndicator = ({ currentStep }: { currentStep: number }) => (
  <div className="flex items-center justify-center w-full mb-8">
    <div className="flex flex-col items-center">
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center text-white ${
          currentStep >= 1 ? "bg-blue-600" : "bg-gray-300"
        }`}
      >
        1
      </div>
      <p className="text-sm mt-1">Step</p>
    </div>
    <div className={`flex-auto h-1 ${currentStep > 1 ? "bg-blue-600" : "bg-gray-300"}`} />
    <div className="flex flex-col items-center">
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center text-white ${
          currentStep >= 2 ? "bg-blue-600" : "bg-gray-300"
        }`}
      >
        2
      </div>
      <p className="text-sm mt-1">Step</p>
    </div>
  </div>
);

const CustomPhoneInput = forwardRef<HTMLInputElement, any>((props, ref) => {
  return (
    <UiInput
      {...props}
      ref={ref}
      className={cn(
        "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
      )}
    />
  );
});
CustomPhoneInput.displayName = "CustomPhoneInput";

export default function NewLeadForm() {
  const [step, setStep] = useState(1);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    trigger,
  } = useForm<LeadFormValues>({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      country: "USA",
      phone: "+1",
    },
  });

  const submitLeadMutation = useMutation({
    mutationFn: async (data: LeadFormValues) => {
      const response = await apiRequest("POST", "/api/leads", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Information Submitted Successfully!",
        description: "We'll contact you soon with your information packet.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Submission Failed",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: LeadFormValues) => {
    submitLeadMutation.mutate(data);
  };

  const nextStep = async () => {
    const isValid = await trigger([
      "country",
      "campus",
      "programArea",
      "programOfInterest",
    ]);
    if (isValid) {
      setStep(2);
    }
  };

  const prevStep = () => {
    setStep(1);
  };

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-8 text-gray-900">
      <StepIndicator currentStep={step} />
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {step === 1 && (
          <>
            <div className="space-y-4">
              <div>
                <Label htmlFor="country">Country</Label>
                <Controller
                  name="country"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Country" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="USA">United States</SelectItem>
                        <SelectItem value="Canada">Canada</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.country && (
                  <p className="text-red-600 text-xs mt-1">
                    {errors.country.message}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="campus">Campus</Label>
                <Controller
                  name="campus"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Campus" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Online">Online</SelectItem>
                        <SelectItem value="On-Campus">On-Campus</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.campus && (
                  <p className="text-red-600 text-xs mt-1">
                    {errors.campus.message}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="programArea">Program Area</Label>
                <Controller
                  name="programArea"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Program Area" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Business">Business</SelectItem>
                        <SelectItem value="Technology">Technology</SelectItem>
                        <SelectItem value="Healthcare">Healthcare</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.programArea && (
                  <p className="text-red-600 text-xs mt-1">
                    {errors.programArea.message}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="programOfInterest">Program of Interest</Label>
                <Controller
                  name="programOfInterest"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Program of Interest" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="BSBA">BS in Business Analytics</SelectItem>
                        <SelectItem value="MSBA">MS in Business Analytics</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.programOfInterest && (
                  <p className="text-red-600 text-xs mt-1">
                    {errors.programOfInterest.message}
                  </p>
                )}
              </div>
            </div>
            <Button
              type="button"
              onClick={nextStep}
              className="w-full bg-[#65DBA5] text-[#012F64] font-bold py-3 px-6 rounded-lg hover:bg-[#5bc396] transition-colors"
            >
              Next
            </Button>
          </>
        )}

        {step === 2 && (
          <>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name *</Label>
                <UiInput
                  id="firstName"
                  {...register("firstName")}
                  placeholder="First Name"
                />
                {errors.firstName && (
                  <p className="text-red-600 text-xs mt-1">
                    {errors.firstName.message}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="lastName">Last Name *</Label>
                <UiInput
                  id="lastName"
                  {...register("lastName")}
                  placeholder="Last Name"
                />
                {errors.lastName && (
                  <p className="text-red-600 text-xs mt-1">
                    {errors.lastName.message}
                  </p>
                )}
              </div>
            </div>
            <div>
              <Label htmlFor="email">Email Address *</Label>
              <UiInput
                id="email"
                type="email"
                {...register("email")}
                placeholder="Email"
              />
              {errors.email && (
                <p className="text-red-600 text-xs mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="phone">Telephone Number *</Label>
              <Controller
                name="phone"
                control={control}
                render={({ field }) => (
                  <PhoneInput
                    id="phone"
                    placeholder="Enter phone number"
                    value={field.value}
                    onChange={field.onChange}
                    onCountryChange={(country) => {
                      if (country) {
                        field.onChange(`+${getCountryCallingCode(country)}`);
                      }
                    }}
                    defaultCountry="US"
                    international
                    withCountryCallingCode
                    inputComponent={CustomPhoneInput}
                  />
                )}
              />
              {errors.phone && (
                <p className="text-red-600 text-xs mt-1">
                  {errors.phone.message}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="howDidYouHear">How Did You Hear About Us?</Label>
              <Controller
                name="howDidYouHear"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select an option" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Google">Google</SelectItem>
                      <SelectItem value="Social Media">Social Media</SelectItem>
                      <SelectItem value="Friend">Friend</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.howDidYouHear && (
                <p className="text-red-600 text-xs mt-1">
                  {errors.howDidYouHear.message}
                </p>
              )}
            </div>
            <div className="flex justify-between">
              <Button
                type="button"
                onClick={prevStep}
                className="bg-gray-300 text-gray-700 font-bold py-3 px-6 rounded-lg hover:bg-gray-400 transition-colors"
              >
                Back
              </Button>
              <Button
                type="submit"
                className="bg-[#65DBA5] text-[#012F64] font-bold py-3 px-6 rounded-lg hover:bg-[#5bc396] transition-colors"
                disabled={submitLeadMutation.isPending}
              >
                {submitLeadMutation.isPending ? "Submitting..." : "Submit"}
              </Button>
            </div>
          </>
        )}
      </form>
    </div>
  );
}

