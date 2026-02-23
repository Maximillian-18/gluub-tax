"use client";

import * as React from "react";
import { ChevronDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface SelectOption {
  value: string;
  label: string;
}

interface CustomSelectProps {
  value: string;
  onValueChange: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  className?: string;
  position?: "bottom" | "top";
}

export function CustomSelect({
  value,
  onValueChange,
  options,
  placeholder = "Select...",
  className,
  position = "bottom",
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className={cn("relative", className)}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center justify-between gap-2 w-full px-3 py-2 h-9 border border-[#2ecc71] bg-transparent rounded-md text-[#2ecc71] text-base font-medium",
          "hover:bg-[#2ecc71]/10 focus:outline-none focus:ring-2 focus:ring-[#2ecc71]/50",
          "transition-colors"
        )}
      >
        <span className={selectedOption ? "" : "opacity-50"}>
          {selectedOption?.label || placeholder}
        </span>
        <ChevronDown
          className={cn(
            "w-4 h-4 transition-transform duration-200",
            isOpen && "rotate-180"
          )}
        />
      </button>

      {isOpen && (
        <div
          className={cn(
            "absolute z-50 w-full py-1 bg-[#020806] border border-[#2ecc71] rounded-md shadow-lg",
            "max-h-60 overflow-y-auto",
            position === "bottom" ? "mt-1 top-full" : "mb-1 bottom-full"
          )}
        >
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => {
                onValueChange(option.value);
                setIsOpen(false);
              }}
              className={cn(
                "flex items-center justify-between w-full px-3 py-1.5 text-left text-[#2ecc71]",
                "hover:bg-[#2ecc71]/20 focus:outline-none",
                value === option.value && "bg-[#2ecc71]/20 font-bold"
              )}
            >
              <span>{option.label}</span>
              {value === option.value && <Check className="w-3 h-3" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
