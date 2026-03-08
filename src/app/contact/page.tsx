"use client";

import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [buttonPressed, setButtonPressed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleClick = async () => {
    if (validateForm()) {
      setButtonPressed(true);
      setIsLoading(true);
      
      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        
        if (response.ok) {
          setSubmitted(true);
        } else {
          alert('Failed to send message. Please try again.');
        }
      } catch (error) {
        alert('Failed to send message. Please try again.');
      } finally {
        setTimeout(() => setButtonPressed(false), 150);
        setIsLoading(false);
      }
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  return (
    <div className="min-h-screen bg-[#020806] text-[#2ecc71] flex flex-col">
      <main className="flex-1 px-4 md:px-8 py-12 pt-24 max-w-4xl mx-auto w-full">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-[#2ecc71] mb-4">
            Contact Us
          </h1>
          <p className="text-lg text-[#2ecc71]/70">
            Have questions or feedback? We'd love to hear from you.
          </p>
        </div>

        {submitted ? (
          <div className="bg-[#0a1f15] rounded-xl p-6 md:p-8 border border-[#2ecc71]/20 text-center">
            <h2 className="text-2xl font-bold text-[#2ecc71] mb-4">
              Thank You!
            </h2>
            <p className="text-[#2ecc71]/80 mb-6">
              We've received your message and will get back to you soon.
            </p>
          </div>
        ) : (
          <div className="rounded-xl p-6 md:p-8 border-2 border-[#2ecc71]">
            <div className="space-y-6">
              {/* Name */}
              <div>
                <label className="block text-lg font-bold text-[#2ecc71] mb-2">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  className="w-full px-4 py-2 bg-transparent border border-[#2ecc71] text-[#2ecc71] text-lg font-medium placeholder:text-[#2ecc71]/50 focus:ring-[#2ecc71] focus:border-[#2ecc71] rounded-lg outline-none"
                />
                {errors.name && (
                  <p className="text-red-400 text-sm mt-1">{errors.name}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-lg font-bold text-[#2ecc71] mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  className="w-full px-4 py-2 bg-transparent border border-[#2ecc71] text-[#2ecc71] text-lg font-medium placeholder:text-[#2ecc71]/50 focus:ring-[#2ecc71] focus:border-[#2ecc71] rounded-lg outline-none"
                />
                {errors.email && (
                  <p className="text-red-400 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              {/* Message */}
              <div>
                <label className="block text-lg font-bold text-[#2ecc71] mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  placeholder="Tell us what's on your mind..."
                  className="w-full px-4 py-2 bg-transparent border border-[#2ecc71] text-[#2ecc71] text-lg font-medium placeholder:text-[#2ecc71]/50 focus:ring-[#2ecc71] focus:border-[#2ecc71] rounded-lg outline-none resize-none"
                />
                {errors.message && (
                  <p className="text-red-400 text-sm mt-1">{errors.message}</p>
                )}
              </div>

              {/* Submit */}
              <button
                type="button"
                onClick={handleClick}
                disabled={isLoading}
                className={`w-full px-8 py-4 bg-[#f1c40f] text-[#020806] text-lg font-bold rounded-lg hover:bg-[#f39c12] transition-all duration-300 shadow-lg ${buttonPressed ? 'scale-95 bg-[#e67e22]' : 'active:scale-95 active:bg-[#e67e22]'} ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {isLoading ? 'Sending...' : 'Send Message'}
              </button>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
