import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SignupSchema, SignupFormData, User } from '../types';
import { Button } from './Button';
import { Loader2, AlertCircle } from 'lucide-react';

interface SignupViewProps {
  onSignupSuccess: (user: User) => void;
}

// Extract InputField outside to prevent re-mounting on every render (fixes focus loss)
const InputField = ({ 
  label, 
  name, 
  value,
  onChange,
  error,
  type = "text", 
  placeholder = "", 
  width = "full" 
}: {
  label: string;
  name: string;
  value: any;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  type?: string;
  placeholder?: string;
  width?: "full" | "half" | "third";
}) => {
  const widthClass = width === "half" ? "sm:col-span-3" : width === "third" ? "sm:col-span-2" : "col-span-full";
  
  return (
    <div className={widthClass}>
      <label htmlFor={name} className="block text-sm font-medium leading-6 text-slate-900">
        {label}
      </label>
      <div className="mt-2 relative">
        <input
          id={name}
          name={name}
          type={type}
          value={value || ''}
          onChange={onChange}
          placeholder={placeholder}
          className={`block w-full rounded-md border-0 py-1.5 bg-white text-slate-900 shadow-sm ring-1 ring-inset ${error ? 'ring-red-300 focus:ring-red-500' : 'ring-slate-300 focus:ring-primary-600'} placeholder:text-slate-500 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6`}
        />
        {error && (
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <AlertCircle className="h-5 w-5 text-red-500" aria-hidden="true" />
          </div>
        )}
      </div>
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export const SignupView: React.FC<SignupViewProps> = ({ onSignupSuccess }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<Partial<SignupFormData>>({
    email: '',
    firstName: '',
    lastName: '',
    // Address fields removed
    // Payment fields removed
    promoCode: '',
    // Radio Technology removed
    dataUsage: undefined,
    annoyingOffers: false,
  });
  
  const [errors, setErrors] = useState<Partial<Record<keyof SignupFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateField = (name: keyof SignupFormData, value: any) => {
    try {
      // Handle optional fields that might be empty strings in formData
      if (name === 'promoCode' && value === '') {
         setErrors(prev => ({ ...prev, [name]: undefined }));
         return;
      }
      
      (SignupSchema.shape as any)[name].parse(value);
      setErrors(prev => ({ ...prev, [name]: undefined }));
    } catch (error: any) {
      if (error.issues && error.issues.length > 0) {
        setErrors(prev => ({ ...prev, [name]: error.issues[0].message }));
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    const newValue = type === 'checkbox' ? checked : value;

    setFormData(prev => ({ ...prev, [name]: newValue }));
    
    // Don't validate checkboxes immediately on change usually, but fine here
    if (type !== 'checkbox') {
      validateField(name as keyof SignupFormData, newValue);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Zod parse of entire form
    const result = SignupSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors: any = {};
      result.error.issues.forEach(issue => {
        if (issue.path[0]) {
          fieldErrors[issue.path[0]] = issue.message;
        }
      });
      setErrors(fieldErrors);
      setIsSubmitting(false);
      
      // Scroll to top error
      const firstErrorKey = Object.keys(fieldErrors)[0];
      const element = document.getElementById(firstErrorKey);
      // Fallback for radio groups which might use a different ID convention
      const altElement = document.getElementById(`${firstErrorKey}-group`);
      
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } else if (altElement) {
        altElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      
      return;
    }

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const newUser: User = {
      ...result.data,
      id: crypto.randomUUID(),
      joinedAt: new Date()
    };

    onSignupSuccess(newUser);
    // Navigation to success page is now handled in App.tsx or here?
    // Let's handle it here to keep App.tsx clean, but App handles auth state
    navigate('/success');
  };

  return (
    <div className="flex min-h-[calc(100vh-64px)] flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gray-50">
      <div className="sm:mx-auto sm:w-full sm:max-w-2xl">
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-slate-900">
          Customer Signup
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-2xl">
        <div className="bg-white py-8 px-4 shadow-xl shadow-slate-200/50 sm:rounded-xl sm:px-10 border border-slate-100">
          <form className="space-y-8" onSubmit={handleSubmit}>
            
            {/* User Information */}
            <div>
              <h3 className="text-lg font-semibold leading-7 text-slate-900 border-b pb-2 mb-4">Personal Information</h3>
              <div className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-6">
                <InputField 
                  label="First Name" 
                  name="firstName" 
                  width="half" 
                  value={formData.firstName} 
                  onChange={handleChange} 
                  error={errors.firstName} 
                />
                <InputField 
                  label="Last Name" 
                  name="lastName" 
                  width="half" 
                  value={formData.lastName} 
                  onChange={handleChange} 
                  error={errors.lastName} 
                />
                <InputField 
                  label="Email Address" 
                  name="email" 
                  type="email" 
                  value={formData.email} 
                  onChange={handleChange} 
                  error={errors.email} 
                />
              </div>
            </div>

            {/* Service Configuration */}
            <div>
              <h3 className="text-lg font-semibold leading-7 text-slate-900 border-b pb-2 mb-4">Service Configuration</h3>
              <div className="space-y-6">

                {/* Data Usage */}
                <div id="dataUsage-group">
                  <label className="text-sm font-medium leading-6 text-slate-900">Estimated Data Usage</label>
                  <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {['0-50 MB', '50-250 MB', '250 MB-1 GB', '1 GB+'].map((usage) => (
                      <div key={usage} className={`relative flex items-start p-3 border rounded-lg cursor-pointer transition-all ${formData.dataUsage === usage ? 'border-primary-600 bg-primary-50' : 'border-slate-300 hover:border-primary-300'}`}>
                        <div className="flex h-6 items-center">
                          <input
                            id={`usage-${usage}`}
                            name="dataUsage"
                            type="radio"
                            value={usage}
                            checked={formData.dataUsage === usage}
                            onChange={handleChange}
                            className="h-4 w-4 border-slate-300 text-primary-600 focus:ring-primary-600"
                          />
                        </div>
                        <div className="ml-3 text-sm leading-6">
                          <label htmlFor={`usage-${usage}`} className="font-medium text-slate-900 cursor-pointer">
                            {usage}
                          </label>
                        </div>
                      </div>
                    ))}
                  </div>
                  {errors.dataUsage && <p className="mt-2 text-sm text-red-600">{errors.dataUsage}</p>}
                </div>

                <InputField 
                  label="Promo Code (Optional)" 
                  name="promoCode" 
                  width="full"
                  value={formData.promoCode} 
                  onChange={handleChange} 
                  error={errors.promoCode} 
                />

                {/* Annoying Offers */}
                <div className="relative flex gap-x-3">
                  <div className="flex h-6 items-center">
                    <input
                      id="annoyingOffers"
                      name="annoyingOffers"
                      type="checkbox"
                      checked={formData.annoyingOffers || false}
                      onChange={handleChange}
                      className="h-4 w-4 rounded border-slate-300 text-primary-600 focus:ring-primary-600"
                    />
                  </div>
                  <div className="text-sm leading-6">
                    <label htmlFor="annoyingOffers" className="font-medium text-slate-900">
                      Send me occasional (annoying) offers
                    </label>
                    <p className="text-slate-500">We promise to spam you too much.</p>
                  </div>
                </div>

              </div>
            </div>

            {/* Submit Section */}
            <div className="pt-4 border-t border-slate-200">
              <div className="flex gap-4">
                 <Button 
                    type="button" 
                    variant="secondary"
                    onClick={() => navigate('/')}
                    className="w-1/3"
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit" 
                    fullWidth 
                    variant="primary" 
                    size="lg"
                    disabled={isSubmitting}
                    className="flex-1 flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="animate-spin w-5 h-5" />
                        Processing...
                      </>
                    ) : (
                      'Create Account'
                    )}
                  </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};