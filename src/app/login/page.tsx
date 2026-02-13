"use client"

import React, { useState } from "react"
import Link from "next/link"
import { Field, FieldGroup, FieldLabel, FieldError } from "@/components/ui/field"
import { Checkbox } from "@/components/ui/checkbox"

interface FormData {
  email: string
  password: string
  rememberMe: boolean
}

interface Errors {
  email?: string
  password?: string
}

export default function LoginPage() {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    rememberMe: false,
  })

  const [errors, setErrors] = useState<Errors>({})

  const validateForm = (): boolean => {
    const newErrors: Errors = {}

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email) {
      newErrors.email = "Email is required"
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email format"
    }

    if (!formData.password) {
      newErrors.password = "Password is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (validateForm()) {
      console.log("Email:", formData.email)
      console.log("Password:", formData.password)
      console.log("Remember Me:", formData.rememberMe)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  return (
    <div className="min-h-screen bg-black text-white pt-32 pb-12">
      <div className="max-w-4xl mx-auto px-8">
        <h1 className="text-5xl md:text-6xl font-black tracking-tight mb-12">
          M<span className="text-purple-500">A</span>CHNET ACCOUNT
        </h1>

        <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-8 md:p-12">
          <h2 className="text-2xl font-bold uppercase tracking-wide mb-8">
            Login
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Field>
                <FieldLabel>Email</FieldLabel>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="w-full bg-black border border-gray-700 rounded px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                />
                {errors.email && <FieldError>{errors.email}</FieldError>}
              </Field>

              <Field>
                <FieldLabel>Password</FieldLabel>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className="w-full bg-black border border-gray-700 rounded px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                />
                {errors.password && <FieldError>{errors.password}</FieldError>}
              </Field>
            </div>

            <div className="flex items-center justify-between gap-6 pt-4">
              <label className="flex items-center gap-3 cursor-pointer">
                <Checkbox
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onCheckedChange={(checked) =>
                    setFormData((prev) => ({
                      ...prev,
                      rememberMe: checked as boolean,
                    }))
                  }
                  className="border-gray-600 data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
                />
                <span className="text-white text-sm uppercase tracking-wide">
                  Remember Password
                </span>
              </label>

              <button
                type="submit"
                className="px-8 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white text-sm font-bold rounded-lg uppercase tracking-wide hover:from-purple-500 hover:to-purple-600 transition-all shadow-lg shadow-purple-500/25"
              >
                Login
              </button>
            </div>
          </form>

          <div className="mt-6 text-center flex flex-col gap-2">
            <Link
              href="/forgot-password"
              className="text-gray-400 hover:text-white text-sm"
            >
              Forgot Password?
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
