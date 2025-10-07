
export default function HelpSection() {
  return (
    <section
      className="relative min-h-[80vh] flex items-center bg-fixed bg-center bg-cover"
      style={{
        backgroundImage: "url('public/hero3.jpeg')", // replace with your image
      }}
    >
      <div className="max-w-7xl mx-auto px-6 w-full flex justify-end">
        {/* Right Card */}
        {/* <div className="bg-white rounded-xl shadow-2xl p-10 max-w-lg backdrop-blur-sm bg-opacity-90">
          <h2
            className="text-3xl md:text-4xl font-bold text-[#800020] mb-6"
            style={{ fontFamily: "Crimson Text, serif" }}
          >
            They Need Your Help
          </h2>

          <p className="text-gray-700 mb-4">
            Sedac odio aliquet, fringilla odio eget, tincidunt nunc. Duis
            aliquet pulvinar ante tempor etiam lacus eros
          </p>
          <p className="text-gray-700 mb-8">
            Sedac odio aliquet, fringilla odio eget, tincidunt nunc. Duis
            aliquet pulvinar ante tempor etiam lacus eros
          </p>

          <button className="bg-[#800020] text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-[#8B0000] transition-all">
            Donate in a Case
          </button>
        </div> */}
      </div>
    </section>
  );
}