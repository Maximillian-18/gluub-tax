"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldError,
} from "@/components/ui/field";

interface FormData {
  email: string;
}

interface Errors {
  email?: string;
}

export default function ForgotPasswordPage() {
  const [formData, setFormData] = useState<FormData>({
    email: "",
  });

  const [errors, setErrors] = useState<Errors>({});

  const validateForm = (): boolean => {
    const newErrors: Errors = {};

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Email:", formData.email);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name as keyof Errors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  return (
    <div className="min-h-screen bg-black text-white pt-32 pb-12">
      <div className="max-w-4xl mx-auto px-8">
        <h1 className="text-5xl md:text-6xl font-black tracking-tight mb-12">
          MACHNET ACCOUNT{" "}
          <span className="text-purple-500">A</span>
        </h1>

        <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-8 md:p-12">
          <h2 className="text-2xl font-bold uppercase tracking-wide mb-8">
            Forgot Password
          </h2>

          <form onSubmit={handleSubmit}>
            <FieldGroup gap-6>
              <Field>
                <FieldLabel className="text-white text-sm uppercase tracking-wide">
                  Email Address
                </FieldLabel>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="w-full bg-black border border-gray-700 rounded px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                />
                {errors.email && (
                  <FieldError errors={[{ message: errors.email }]} />
                )}
              </Field>
            </FieldGroup>

            <button
              type="submit"
              className="mt-8 px-12 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white text-sm font-bold rounded-lg uppercase tracking-wide hover:from-purple-500 hover:to-purple-600 transition-all shadow-lg shadow-purple-500/25"
            >
              Send Reset Link
            </button>
          </form>

          <div className="mt-8 text-center">
            <Link
              href="/login"
              className="text-gray-400 hover:text-white text-sm"
            >
              Back to login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
