"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

interface MenuItem {
  label: string;
  href: string;
  sectionId?: string;
}

interface MenuSection {
  label: string;
  href: string;
  items?: MenuItem[];
}

const menuStructure: MenuSection[] = [
  {
    label: "General Tax Information",
    href: "/info",
    items: undefined,
  },
  {
    label: "United Kingdom",
    href: "/info/uk",
    items: [
      { label: "Tax Basics", href: "/info/uk#basics", sectionId: "basics" },
      { label: "2026 Tax Brackets", href: "/info/uk#tax-brackets", sectionId: "tax-brackets" },
      { label: "Personal Allowance", href: "/info/uk#personal-allowance", sectionId: "personal-allowance" },
      { label: "National Insurance", href: "/info/uk#national-insurance", sectionId: "national-insurance" },
      { label: "Tax Codes", href: "/info/uk#tax-codes", sectionId: "tax-codes" },
      { label: "Reading Your Payslip", href: "/info/uk#payslip", sectionId: "payslip" },
      { label: "Scotland", href: "/info/uk#scotland", sectionId: "scotland" },
    ],
  },
  {
    label: "Germany",
    href: "/info/germany",
    items: [
      { label: "Tax Basics", href: "/info/germany#basics", sectionId: "basics" },
      { label: "2026 Tax Brackets", href: "/info/germany#tax-brackets", sectionId: "tax-brackets" },
      { label: "Basic Allowance", href: "/info/germany#personal-allowance", sectionId: "personal-allowance" },
      { label: "Tax Classes", href: "/info/germany#tax-classes", sectionId: "tax-classes" },
      { label: "Social Security", href: "/info/germany#social-security", sectionId: "social-security" },
      { label: "Church Tax", href: "/info/germany#church-tax", sectionId: "church-tax" },
      { label: "Solidarity Surcharge", href: "/info/germany#solidarity-surcharge", sectionId: "solidarity-surcharge" },
      { label: "Your Payslip", href: "/info/germany#payslip", sectionId: "payslip" },
    ],
  },
  {
    label: "Denmark",
    href: "/info/denmark",
    items: undefined,
  },
];

interface InfoSidebarProps {
  scrollSpyActiveId?: string;
}

export default function InfoSidebar({ scrollSpyActiveId }: InfoSidebarProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>("General Tax Information");

  // Auto-expand section based on current page
  useEffect(() => {
    if (pathname === "/info") {
      setActiveSection("General Tax Information");
    } else if (pathname.startsWith("/info/uk")) {
      setActiveSection("United Kingdom");
    } else if (pathname.startsWith("/info/germany")) {
      setActiveSection("Germany");
    } else if (pathname.startsWith("/info/denmark")) {
      setActiveSection("Denmark");
    }
  }, [pathname]);

  const handleSectionClick = (label: string) => {
    if (activeSection === label) {
      return;
    }
    setActiveSection(label);
  };

  const isActive = (href: string) => {
    if (href === "/info") {
      return pathname === "/info";
    }
    return pathname.startsWith(href);
  };

  const isItemActive = (item: MenuItem) => {
    if (scrollSpyActiveId && item.sectionId) {
      return scrollSpyActiveId === item.sectionId;
    }
    return false;
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setMobileOpen(true)}
        className="md:hidden fixed top-24 left-4 z-50 p-2 bg-[#020806] border border-[#2ecc71] rounded-md text-[#2ecc71] hover:bg-[#2ecc71]/10"
        aria-label="Open menu"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-[80%] md:w-[250px] bg-[#020806] border-r border-[#2ecc71]/30 z-50 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="flex flex-col h-full pt-20 md:pt-24">
          {/* Close button (mobile only) */}
          <button
            onClick={() => setMobileOpen(false)}
            className="md:hidden absolute top-4 right-4 p-2 text-[#2ecc71] hover:bg-[#2ecc71]/10 rounded-md"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="px-4 pb-4 border-b border-[#2ecc71]/20">
            <h2 className="text-lg font-bold text-[#2ecc71]">Tax Information</h2>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto px-4 pb-4">
            <ul className="space-y-1">
              {menuStructure.map((section) => (
                <li key={section.label}>
                  {/* Section Header */}
                  <div
                    onClick={() => handleSectionClick(section.label)}
                    className={`cursor-pointer py-2 text-sm font-medium ${
                      activeSection === section.label
                        ? "text-[#2ecc71] border-l-[3px] border-[#2ecc71] bg-[#2ecc71]/10 -ml-4 pl-4"
                        : "text-[#2ecc71]/80 hover:text-[#2ecc71] hover:bg-[#2ecc71]/5"
                    }`}
                  >
                    <Link
                      href={section.href}
                      className="block"
                      onClick={(e) => {
                        e.stopPropagation();
                        setMobileOpen(false);
                      }}
                    >
                      {section.label}
                    </Link>
                  </div>

                  {/* Sub-items */}
                  <div
                    className={`overflow-hidden ${
                      activeSection === section.label && section.items && section.items.length > 0
                        ? "block"
                        : "hidden"
                    }`}
                  >
                    {section.items && section.items.length > 0 && (
                      <ul className="ml-3 mt-1 space-y-1 border-l-2 border-[#2ecc71]/20">
                        {section.items.map((item) => (
                          <li key={item.href}>
                            <Link
                              href={item.href}
                              onClick={() => setMobileOpen(false)}
                              className={`block py-1.5 pl-3 text-sm ${
                                isItemActive(item)
                                  ? "text-[#2ecc71] border-l-[3px] border-[#2ecc71] bg-[#2ecc71]/10 -ml-[2px] pl-[calc(0.75rem-3px)]"
                                  : "text-[#2ecc71]/70 hover:text-[#2ecc71] hover:border-l-[3px] hover:border-[#2ecc71]/50 hover:bg-[#2ecc71]/5 -ml-[2px] hover:pl-[calc(0.75rem-3px)]"
                              }`}
                            >
                              {item.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}
    </>
  );
}
