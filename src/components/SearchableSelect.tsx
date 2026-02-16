"use client";

import * as React from "react";
import { ChevronDown, Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface SelectOption {
  value: string;
  label: string;
}

interface SearchableSelectProps {
  value: string;
  onValueChange: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  className?: string;
  formatSelected?: (option: SelectOption) => string;
}

export function SearchableSelect({
  value,
  onValueChange,
  options,
  placeholder = "Search...",
  className,
  formatSelected,
}: SearchableSelectProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const ref = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  const filteredOptions = React.useMemo(() => {
    if (!search) return options;
    return options.filter((opt) =>
      opt.label.toLowerCase().startsWith(search.toLowerCase())
    );
  }, [options, search]);

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearch("");
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleOpen = () => {
    setIsOpen(true);
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  const handleSelect = (optionValue: string) => {
    onValueChange(optionValue);
    setIsOpen(false);
    setSearch("");
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onValueChange("");
    setSearch("");
  };

  return (
    <div ref={ref} className={cn("relative", className)}>
      <button
        type="button"
        onClick={handleOpen}
        className={cn(
          "flex items-center justify-between gap-2 w-full px-3 py-2 h-9 border border-[#2ecc71] bg-transparent rounded-md text-[#2ecc71] text-base font-medium",
          "hover:bg-[#2ecc71]/10 focus:outline-none focus:ring-2 focus:ring-[#2ecc71]/50",
          "transition-colors"
        )}
      >
        <span className={selectedOption ? "" : "opacity-50"}>
          {selectedOption ? (formatSelected ? formatSelected(selectedOption) : selectedOption.label) : placeholder}
        </span>
        <div className="flex items-center gap-1">
          {value && (
            <X
              className="w-3 h-3 hover:text-[#2ecc71]/70"
              onClick={handleClear}
            />
          )}
          <ChevronDown
            className={cn(
              "w-4 h-4 transition-transform duration-200",
              isOpen && "rotate-180"
            )}
          />
        </div>
      </button>

      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-[#020806] border border-[#2ecc71] rounded-md shadow-lg">
          <div className="p-2 border-b border-[#2ecc71]/20">
            <input
              ref={inputRef}
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Type to search..."
              className="w-full px-2 py-1 bg-transparent border border-[#2ecc71]/50 rounded text-[#2ecc71] text-sm placeholder:text-[#2ecc71]/50 focus:outline-none focus:border-[#2ecc71]"
            />
          </div>
          <div className="max-h-60 overflow-y-auto py-1">
            {filteredOptions.length === 0 ? (
              <div className="px-3 py-2 text-[#2ecc71]/50 text-sm">
                No results found
              </div>
            ) : (
              filteredOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handleSelect(option.value)}
                  className={cn(
                    "flex items-center justify-between w-full px-3 py-1.5 text-left text-[#2ecc71]",
                    "hover:bg-[#2ecc71]/20 focus:outline-none",
                    value === option.value && "bg-[#2ecc71]/20 font-bold"
                  )}
                >
                  <span>{option.label}</span>
                  {value === option.value && <Check className="w-3 h-3" />}
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
