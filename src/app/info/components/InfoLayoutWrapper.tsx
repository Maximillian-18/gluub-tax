"use client";

import InfoSidebar from "./InfoSidebar";

interface InfoLayoutWrapperProps {
  children: React.ReactNode;
  scrollSpyActiveId?: string;
}

export default function InfoLayoutWrapper({ children, scrollSpyActiveId }: InfoLayoutWrapperProps) {
  return (
    <div className="min-h-screen bg-[#020806]">
      <InfoSidebar scrollSpyActiveId={scrollSpyActiveId} />
      
      {/* Main Content */}
      <main className="md:ml-[250px] min-h-screen">
        <div className="pt-24 md:pt-28 pb-12 px-4 md:px-8 lg:px-12">
          <div className="max-w-4xl mx-auto">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
