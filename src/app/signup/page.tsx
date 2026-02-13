"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldError,
} from "@/components/ui/field";
import { Checkbox } from "@/components/ui/checkbox";

export default function SignupPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    companyName: "",
    email: "",
    repeatEmail: "",
    password: "",
    repeatPassword: "",
    primaryPhone: "",
    secondaryPhone: "",
    country: "",
    industry: "",
    receiveUpdates: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (!formData.companyName.trim()) {
      newErrors.companyName = "Company name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (formData.email !== formData.repeatEmail) {
      newErrors.repeatEmail = "Emails do not match";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (formData.password !== formData.repeatPassword) {
      newErrors.repeatPassword = "Passwords do not match";
    }

    if (!formData.country.trim()) {
      newErrors.country = "Country is required";
    }

    if (!formData.industry.trim()) {
      newErrors.industry = "Industry is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("First Name:", formData.firstName);
      console.log("Last Name:", formData.lastName);
      console.log("Company Name:", formData.companyName);
      console.log("Email:", formData.email);
      console.log("Repeat Email:", formData.repeatEmail);
      console.log("Password:", formData.password);
      console.log("Repeat Password:", formData.repeatPassword);
      console.log("Primary Phone:", formData.primaryPhone);
      console.log("Secondary Phone:", formData.secondaryPhone);
      console.log("Country:", formData.country);
      console.log("Industry:", formData.industry);
      console.log("Receive Updates:", formData.receiveUpdates);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
          M<span className="text-purple-500">A</span>CHNET ACCOUNT
        </h1>

        <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-8 md:p-12">
          <h2 className="text-2xl font-bold uppercase tracking-wide mb-8">
            Sign Up
          </h2>

          <form onSubmit={handleSubmit}>
            <FieldGroup className="gap-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Field>
                  <FieldLabel className="text-white text-sm uppercase tracking-wide">
                    First Name
                  </FieldLabel>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full bg-black border border-gray-700 rounded px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                    placeholder="Enter first name"
                  />
                  {errors.firstName && (
                    <FieldError>{errors.firstName}</FieldError>
                  )}
                </Field>

                <Field>
                  <FieldLabel className="text-white text-sm uppercase tracking-wide">
                    Company Name
                  </FieldLabel>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    className="w-full bg-black border border-gray-700 rounded px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                    placeholder="Enter company name"
                  />
                  {errors.companyName && (
                    <FieldError>{errors.companyName}</FieldError>
                  )}
                </Field>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Field>
                  <FieldLabel className="text-white text-sm uppercase tracking-wide">
                    Last Name
                  </FieldLabel>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full bg-black border border-gray-700 rounded px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                    placeholder="Enter last name"
                  />
                  {errors.lastName && (
                    <FieldError>{errors.lastName}</FieldError>
                  )}
                </Field>

                <div className="hidden md:block" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                    placeholder="Enter email"
                  />
                  {errors.email && <FieldError>{errors.email}</FieldError>}
                </Field>

                <Field>
                  <FieldLabel className="text-white text-sm uppercase tracking-wide">
                    Repeat Email
                  </FieldLabel>
                  <input
                    type="email"
                    name="repeatEmail"
                    value={formData.repeatEmail}
                    onChange={handleChange}
                    className="w-full bg-black border border-gray-700 rounded px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                    placeholder="Repeat email"
                  />
                  {errors.repeatEmail && (
                    <FieldError>{errors.repeatEmail}</FieldError>
                  )}
                </Field>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Field>
                  <FieldLabel className="text-white text-sm uppercase tracking-wide">
                    Password
                  </FieldLabel>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full bg-black border border-gray-700 rounded px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                    placeholder="Enter password"
                  />
                  {errors.password && (
                    <FieldError>{errors.password}</FieldError>
                  )}
                </Field>

                <Field>
                  <FieldLabel className="text-white text-sm uppercase tracking-wide">
                    Repeat Password
                  </FieldLabel>
                  <input
                    type="password"
                    name="repeatPassword"
                    value={formData.repeatPassword}
                    onChange={handleChange}
                    className="w-full bg-black border border-gray-700 rounded px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                    placeholder="Repeat password"
                  />
                  {errors.repeatPassword && (
                    <FieldError>{errors.repeatPassword}</FieldError>
                  )}
                </Field>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Field>
                  <FieldLabel className="text-white text-sm uppercase tracking-wide">
                    Primary No.
                  </FieldLabel>
                  <input
                    type="tel"
                    name="primaryPhone"
                    value={formData.primaryPhone}
                    onChange={handleChange}
                    className="w-full bg-black border border-gray-700 rounded px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                    placeholder="Enter phone number"
                  />
                </Field>

                <Field>
                  <FieldLabel className="text-white text-sm uppercase tracking-wide">
                    Secondary No.
                  </FieldLabel>
                  <input
                    type="tel"
                    name="secondaryPhone"
                    value={formData.secondaryPhone}
                    onChange={handleChange}
                    className="w-full bg-black border border-gray-700 rounded px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                    placeholder="Enter phone number"
                  />
                </Field>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Field>
                  <FieldLabel className="text-white text-sm uppercase tracking-wide">
                    Country
                  </FieldLabel>
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className="w-full bg-black border border-gray-700 rounded px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                    placeholder="Enter country"
                  />
                  {errors.country && (
                    <FieldError>{errors.country}</FieldError>
                  )}
                </Field>

                <Field>
                  <FieldLabel className="text-white text-sm uppercase tracking-wide">
                    Industry
                  </FieldLabel>
                  <input
                    type="text"
                    name="industry"
                    value={formData.industry}
                    onChange={handleChange}
                    className="w-full bg-black border border-gray-700 rounded px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                    placeholder="Enter industry"
                  />
                  {errors.industry && (
                    <FieldError>{errors.industry}</FieldError>
                  )}
                </Field>
              </div>

              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 pt-4">
                <Field orientation="horizontal" className="items-center gap-3">
                  <Checkbox
                    id="receiveUpdates"
                    checked={formData.receiveUpdates}
                    onCheckedChange={(checked) =>
                      setFormData((prev) => ({
                        ...prev,
                        receiveUpdates: checked as boolean,
                      }))
                    }
                    className="border-gray-600 data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
                  />
                  <label
                    htmlFor="receiveUpdates"
                    className="text-gray-400 text-sm uppercase tracking-wide cursor-pointer"
                  >
                    Receive updates via email
                  </label>
                </Field>

                <button
                  type="submit"
                  className="px-12 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white text-sm font-bold rounded-lg uppercase tracking-wide hover:from-purple-500 hover:to-purple-600 transition-all shadow-lg shadow-purple-500/25"
                >
                  Submit
                </button>
              </div>
            </FieldGroup>
          </form>

          <div className="mt-8 text-center">
            <Link
              href="/login"
              className="text-gray-400 hover:text-white text-sm uppercase tracking-wide transition-colors"
            >
              Login
            </Link>
            <p className="text-gray-500 text-xs mt-2">Already have an account?</p>
          </div>
        </div>
      </div>
    </div>
  );
}
