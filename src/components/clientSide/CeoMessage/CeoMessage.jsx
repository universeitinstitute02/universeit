import React from 'react';

const CeoMessage = () => {
  return (
    <div className="max-w-6xl mx-auto my-12 px-4 md:px-8">
      <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 p-6 md:p-10">
        
        {/* Left Side: Image Container */}
        <div className="w-full md:w-2/5 flex justify-center">
          <div className="relative w-64 h-64 md:w-full md:h-[400px] rounded-xl overflow-hidden shadow-md group">
            <img 
              src="https://via.placeholder.com/400x500" // Replace with your actual image URL
              alt="Md. [Your Name], CEO" 
              className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
            />
            {/* Optional decorative overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          </div>
        </div>

        {/* Right Side: Content Container */}
        <div className="w-full md:w-3/5 space-y-6">
          {/* Section Title */}
          <div className="space-y-2">
            <span className="text-sm font-semibold uppercase tracking-wider text-blue-600">
              Message From CEO
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 leading-tight">
              Empowering Individuals with Practical Skills
            </h2>
            <div className="w-16 h-1 bg-blue-600 rounded"></div>
          </div>

          {/* Main Message Body */}
          <div className="text-gray-600 space-y-4 text-base md:text-lg leading-relaxed font-normal">
            <p>
              It is a great honor to lead <span className="font-semibold text-gray-800">Universe IT Institute</span>, 
              where we are committed to empowering individuals with practical skills and quality education. 
              Our mission is to prepare the next generation for the digital world through innovative training, 
              industry-relevant courses, and continuous learning opportunities.
            </p>
            <p>
              We believe that education and technology together can transform lives and contribute to a 
              skilled, empowered, and digitally advanced Bangladesh.
            </p>
            <p className="font-medium text-gray-700">
              Thank you for your trust and support.
            </p>
          </div>

          {/* CEO Signature / Designation */}
          <div className="pt-4 border-t border-gray-100">
            <h4 className="text-lg font-bold text-gray-900">ENGR. MD. GOLAM KIBRIYA</h4>
            <p className="text-sm font-medium text-blue-600">Chief Executive Officer (CEO)</p>
            <p className="text-xs text-gray-400 mt-0.5">Universe IT Institute</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CeoMessage;