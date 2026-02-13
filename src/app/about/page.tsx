export default function About() {
  return (
    <div className="min-h-screen bg-black text-white">
      <main className="max-w-4xl mx-auto px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-6">
            About MACHNET
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Learn more about our manufacturing expertise and the technologies that drive our success.
          </p>
        </div>

        <div className="bg-gray-900 rounded-lg shadow-lg p-8 mb-8 border border-gray-800">
          <h2 className="text-2xl font-semibold text-white mb-4">
            Our Manufacturing Mission
          </h2>
          <p className="text-gray-300 mb-4">
            We believe in providing manufacturers with the best possible solutions for building 
            quality products at scale. Our expertise combines decades of experience with the latest 
            manufacturing technologies to help you deliver with confidence.
          </p>
          <p className="text-gray-300">
            Every process is carefully chosen to provide maximum quality while maintaining efficiency 
            and flexibility. Whether you&apos;re developing prototypes or mass production, 
            MACHNET has you covered.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-gray-900 rounded-lg shadow-lg p-6 border border-gray-800">
            <h3 className="text-xl font-semibold text-white mb-3">
              Manufacturing Technologies
            </h3>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                Advanced CNC Machining
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                3D Printing & Additive Manufacturing
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                Precision Metal Forming
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                Quality Control Systems
              </li>
            </ul>
          </div>

          <div className="bg-gray-900 rounded-lg shadow-lg p-6 border border-gray-800">
            <h3 className="text-xl font-semibold text-white mb-3">
              Key Capabilities
            </h3>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                Global Supply Chain
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                Rapid Prototyping
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                Mass Production
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                Custom Solutions
              </li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}