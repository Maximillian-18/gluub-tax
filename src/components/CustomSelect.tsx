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
}

export function CustomSelect({
  value,
  onValueChange,
  options,
  placeholder = "Select...",
  className,
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
          "flex items-center justify-between gap-2 w-full px-4 py-2 border border-[#2ecc71] bg-transparent rounded-md text-[#2ecc71] text-base font-medium",
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
            "absolute z-50 w-full mt-1 py-1 bg-[#05100a] border border-[#2ecc71] rounded-md shadow-lg",
            "max-h-60 overflow-y-auto"
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
                "flex items-center justify-between w-full px-3 py-2 text-left text-[#2ecc71]",
                "hover:bg-[#2ecc71]/20 focus:outline-none",
                value === option.value && "bg-[#2ecc71]/20 font-bold"
              )}
            >
              <span>{option.label}</span>
              {value === option.value && <Check className="w-4 h-4" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
