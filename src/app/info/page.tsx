import Footer from "@/components/Footer";

export default function Info() {
  return (
    <div className="min-h-screen bg-[#05100a] text-[#2ecc71] flex flex-col">
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-12 pt-24">
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-[#2ecc71] mb-4">
            Coming Soon
          </h1>
          <p className="text-lg text-[#2ecc71]/70">
            We're working on something exciting. Check back soon!
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
