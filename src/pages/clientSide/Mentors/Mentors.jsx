import React from "react";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../Shared/Loading/Loading";
import { Helmet } from "react-helmet-async";
import log21 from "../../../assets/logo/mainLogo.png";
import { Mail, Phone } from "lucide-react";

const Mentors = () => {
  window.scrollTo(0, 0);
  const axiosPublic = useAxiosPublic();
  
  const { data: faculties = [], isLoading } = useQuery({
    queryKey: ["faculties"],
    queryFn: async () => {
      const res = await axiosPublic.get("/faculty");
      return res.data;
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  // CEO এবং অন্যান্য মেম্বারদের আলাদা করা
  const CEO = faculties.find((faculty) => faculty.contact === "01821779282");
  
  const otherMembers = faculties.filter(
    (faculty) => faculty.contact !== "01821779282"
  );

  return (
    <div className="px-4 sm:px-10 lg:px-20 my-16 min-h-screen bg-slate-50/50">
      <Helmet>
        <title>Universe IT | Faculty</title>
      </Helmet>

      {/* সেকশন টাইটেল */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-extrabold text-slate-800 tracking-tight inline-block relative after:content-[''] after:absolute after:w-1/2 after:h-1 after:bg-primary after:bottom-[-10px] after:left-1/4 after:rounded-full">
          Our Honorable Mentors
        </h1>
      </div>

      {/* ================= CEO CARD SECTION ================= */}
      <div className="my-16 flex justify-center">
        {CEO && (
          <div className="relative group w-full max-w-md bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-slate-100 overflow-hidden p-6 text-center">
            <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-r from-primary/80 to-primary/40 opacity-90 rounded-t-2xl"></div>
            
            <div className="absolute top-4 right-4 z-10 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm">
              <img className="h-5 object-contain" src={log21} alt="Logo" />
            </div>

            <div className="relative z-10 mt-10 inline-block">
              <div className="p-1 rounded-full bg-gradient-to-tr from-primary to-amber-400 shadow-lg">
                <div className="p-1 bg-white rounded-full">
                  <img
                    className="w-28 h-28 rounded-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                    src={CEO.image}
                    alt={CEO.name}
                  />
                </div>
              </div>
              {/* CEO બેજ */}
              <span className="absolute bottom-0 right-0 bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md uppercase tracking-wider">
                Founder
              </span>
            </div>
            <div className="mt-5 space-y-2">
              <h2 className="text-2xl font-bold text-slate-800 tracking-tight capitalize">
                {CEO.name}
              </h2>
              <p className="text-sm font-semibold text-primary uppercase tracking-wider">
                {CEO.designation}
              </p>
              
              <div className="pt-3 border-t border-slate-100 flex flex-col items-center gap-1.5 text-slate-600 text-sm">
                <span className="flex items-center gap-2 bg-slate-50 px-3 rounded-full w-fit">
                  <Phone size={16} /> {CEO.contact}
                </span>
                <span className="flex items-center gap-2 bg-slate-50 px-3 rounded-full w-fit break-all">
                  <Mail size={16} /> {CEO.email}
                </span>
              </div>
            </div>
            <div className="mt-6 bg-gradient-to-r from-primary to-primary/80 text-white p-3 rounded-xl shadow-inner transform group-hover:translate-y-[-2px] transition-transform duration-300">
              <p className="text-xs uppercase tracking-widest opacity-90">Total Experience</p>
              <p className="text-lg font-bold">{CEO.job_experience} Years +</p>
            </div>
          </div>
        )}
      </div>

      {/* ================= OTHER FACULTIES GRID ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8 justify-center">
        {otherMembers.map((faculty, idx) => (
          <div key={idx} className="relative group bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-slate-100 overflow-hidden p-6 text-center flex flex-col justify-between h-full">
            <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-r from-primary/60 to-primary/30 opacity-80 rounded-t-2xl"></div>
            
            <div className="absolute top-4 right-4 z-10 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm">
              <img className="h-5 object-contain" src={log21} alt="Logo" />
            </div>

            <div>
                <div className="relative z-10 mt-10 inline-block">
                <div className="p-1 rounded-full bg-gradient-to-tr from-primary to-slate-200 shadow-lg">
                    <div className="p-1 bg-white rounded-full">
                    <img
                        className="w-28 h-28 rounded-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                        src={faculty.image}
                        alt={faculty.name}
                    />
                    </div>
                </div>
                </div>

                <div className="mt-5 space-y-2">
                <h2 className="text-xl font-bold text-slate-800 tracking-tight capitalize">
                    {faculty.name}
                </h2>
                <p className="text-sm font-semibold text-primary/90 uppercase tracking-wider">
                    {faculty.designation}
                </p>
                
                <div className="pt-3 border-t border-slate-100 flex flex-col items-center gap-1.5 text-slate-600 text-sm">
                    <span className="flex items-center gap-2 bg-slate-50 px-3  rounded-full w-fit">
                    <Phone size={16} /> {faculty.contact}
                    </span>
                    <span className="flex items-center gap-2 bg-slate-50 px-3  rounded-full w-fit break-all">
                    <Mail size={16} /> {faculty.email}
                    </span>
                </div>
                </div>
            </div>

            <div className="mt-6 bg-gradient-to-r from-primary/90 to-primary/70 text-white p-3 rounded-xl shadow-inner transform group-hover:translate-y-[-2px] transition-transform duration-300">
              <p className="text-xs uppercase tracking-widest opacity-90">Total Experience</p>
              <p className="text-lg font-bold">{faculty.job_experience} Years +</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Mentors;