"use client";

import { useState } from "react";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldError,
} from "@/components/ui/field";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Name:", formData.name);
      console.log("Email:", formData.email);
      console.log("Message:", formData.message);
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
    <div className="min-h-screen bg-black text-white pt-32 pb-12">
      <div className="max-w-4xl mx-auto px-8">
        <h1 className="text-5xl md:text-6xl font-black tracking-tight mb-12">
          CONTACT
        </h1>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-8 md:p-12">
            <form onSubmit={handleSubmit}>
              <FieldGroup className="gap-6">
                <Field>
                  <FieldLabel className="text-white text-sm uppercase tracking-wide">
                    Name
                  </FieldLabel>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-black border border-gray-700 rounded px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                    placeholder="Your name"
                  />
                  {errors.name && <FieldError>{errors.name}</FieldError>}
                </Field>

                <Field>
                  <FieldLabel className="text-white text-sm uppercase tracking-wide">
                    Email
                  </FieldLabel>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-black border border-gray-700 rounded px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                    placeholder="your@email.com"
                  />
                  {errors.email && <FieldError>{errors.email}</FieldError>}
                </Field>

                <Field>
                  <FieldLabel className="text-white text-sm uppercase tracking-wide">
                    Message
                  </FieldLabel>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full bg-black border border-gray-700 rounded px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors resize-none"
                    placeholder="Tell us about your manufacturing needs..."
                  />
                  {errors.message && <FieldError>{errors.message}</FieldError>}
                </Field>

                <button
                  type="submit"
                  className="px-12 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white text-sm font-bold rounded-lg uppercase tracking-wide hover:from-purple-500 hover:to-purple-600 transition-all shadow-lg shadow-purple-500/25"
                >
                  SEND MESSAGE
                </button>
              </FieldGroup>
            </form>
          </div>

          <div className="space-y-8">
            <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-white mb-4">
                Contact Information
              </h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-purple-900 rounded-full flex items-center justify-center mr-4">
                    <span className="text-purple-400">📧</span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Email</p>
                    <p className="text-white">manufacturing@machnet.com</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-purple-900 rounded-full flex items-center justify-center mr-4">
                    <span className="text-purple-400">📍</span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Global Headquarters</p>
                    <p className="text-white">London, United Kingdom</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-purple-900 rounded-full flex items-center justify-center mr-4">
                    <span className="text-purple-400">🕐</span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Business Hours</p>
                    <p className="text-white">Mon-Fri 24/7 Global Operations</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-white mb-4">
                Connect With Us
              </h3>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors"
                >
                  <span className="text-gray-400">📱</span>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors"
                >
                  <span className="text-gray-400">💼</span>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors"
                >
                  <span className="text-gray-400">🐦</span>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors"
                >
                  <span className="text-gray-400">📷</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
