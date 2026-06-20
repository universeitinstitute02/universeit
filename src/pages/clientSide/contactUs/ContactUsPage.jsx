import React, { useRef, useState } from "react";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaPhoneAlt,
  FaYoutube,
  FaEnvelope,
} from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import emailjs from "@emailjs/browser";

const ContactUsPage = () => {
  const formRef = useRef();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const sendEmail = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    emailjs
      .sendForm("service_ql0xjkf", "template_ope8b6j", formRef.current, {
        publicKey: "PbUISmrSE9uXrKvsb",
      })
      .then(
        () => {
          setIsSubmitting(false);
          setFormData({ name: "", email: "", message: "" }); // Form reset after success
          Swal.fire({
            icon: "success",
            title: "Email Sent Successfully!",
            text: "Thank you, we will get back to you soon.",
            showConfirmButton: true,
            confirmButtonColor: "#f97316",
          });
        },
        (error) => {
          setIsSubmitting(false);
          Swal.fire({
            icon: "error", // Fix: previously it was 'success' on error block
            title: "Submission Failed",
            text: "Something went wrong. Please try again later.",
            showConfirmButton: true,
            confirmButtonColor: "#ef4444",
          });
          console.error("FAILED...", error.text);
        },
      );
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Main Wrapper */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Section - Contact Info */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <span className="text-orange-500 font-bold uppercase tracking-wider text-sm">
                Contact Us
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl mt-2 font-extrabold text-slate-900 tracking-tight">
                Get In Touch
              </h2>
              <p className="mt-4 text-slate-600 leading-relaxed text-base">
                We’d love to hear from you! Whether you have a question, need
                assistance, or just want to say hello, our team is ready to
                support you.
              </p>
            </div>

            {/* Info Cards */}
            <div className="space-y-6">
              {/* Address */}
              <div className="flex gap-4 items-center p-4 bg-white rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all duration-300">
                <div className="bg-orange-500/10 text-orange-600 text-2xl p-4 rounded-xl shrink-0">
                  <IoLocationSharp />
                </div>
                <div>
                  <h4 className="text-slate-900 font-bold text-lg">Address</h4>
                  <p className="text-slate-500 text-sm sm:text-base">
                    House #8 (8th floor), Block F, Banasree Main Rd, Rampura, Dhaka 1219
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex gap-4 items-center p-4 bg-white rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all duration-300">
                <div className="bg-orange-500/10 text-orange-600 text-2xl p-4 rounded-xl shrink-0">
                  <FaPhoneAlt className="text-xl" />
                </div>
                <div>
                  <h4 className="text-slate-900 font-bold text-lg">
                    Phone Number
                  </h4>
                  <p className="text-slate-500 text-sm sm:text-base">
                    01886-061401
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex gap-4 items-center p-4 bg-white rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all duration-300">
                <div className="bg-orange-500/10 text-orange-600 text-2xl p-4 rounded-xl shrink-0">
                  <FaEnvelope className="text-xl" />
                </div>
                <div>
                  <h4 className="text-slate-900 font-bold text-lg">E-mail</h4>
                  <p className="text-slate-500 text-sm sm:text-base">
                    universeitinstitute@gmail.com
                  </p>
                </div>
              </div>
            </div>

            <hr className="border-slate-200" />

            {/* Social Links */}
            <div className="space-y-3">
              <h3 className="text-slate-800 font-bold text-lg">Follow Us</h3>
              <div className="flex gap-3">
                <Link
                  to="https://www.facebook.com/UniverseITInstitute"
                  target="_blank"
                  className="bg-white hover:bg-orange-500 text-slate-700 hover:text-white transition-all duration-300 p-3.5 rounded-xl shadow-sm border border-slate-100 text-lg"
                >
                  <FaFacebookF />
                </Link>
                <Link
                  to="https://www.linkedin.com/company/universe-it-institute/"
                  target="_blank"
                  className="bg-white hover:bg-orange-500 text-slate-700 hover:text-white transition-all duration-300 p-3.5 rounded-xl shadow-sm border border-slate-100 text-lg"
                >
                  <FaLinkedinIn />
                </Link>
                <Link
                  to="https://www.youtube.com/@universeitinstitute9947"
                  target="_blank"
                  className="bg-white hover:bg-orange-500 text-slate-700 hover:text-white transition-all duration-300 p-3.5 rounded-xl shadow-sm border border-slate-100 text-lg"
                >
                  <FaYoutube />
                </Link>
              </div>
            </div>
          </div>

          {/* Right Section - Contact Form */}
          <div className="lg:col-span-7 flex justify-center lg:justify-end w-full">
            <div className="bg-white p-6 sm:p-10 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 w-full max-w-xl">
              <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">
                Send a Message
              </h3>
              <p className="text-slate-500 text-sm mb-6">
                Fill out the form below and we will contact you shortly.
              </p>

              <form ref={formRef} onSubmit={sendEmail} className="space-y-5">
                <div>
                  <label className="block text-slate-700 text-sm font-semibold mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all duration-200"
                    required
                  />
                </div>
                <div>
                  <label className="block text-slate-700 text-sm font-semibold mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all duration-200"
                    required
                  />
                </div>
                <div>
                  <label className="block text-slate-700 text-sm font-semibold mb-2">
                    Your Message
                  </label>
                  <textarea
                    name="message"
                    placeholder="How can we help you?"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all duration-200 resize-none"
                    rows="4"
                    required
                  ></textarea>
                </div>

                <p className="text-xs text-slate-400 leading-normal">
                  By submitting, you agree to the processing of your personal
                  data according to our Privacy Statement.
                </p>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 bg-orange-500 hover:bg-orange-600 disabled:bg-orange-400 text-white font-bold rounded-xl transition-all duration-300 shadow-lg shadow-orange-500/20 active:scale-[0.99]"
                >
                  {isSubmitting ? "Sending Message..." : "Submit Message"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div className="w-full h-[400px] md:h-[500px] shadow-inner relative gray-200 border-t border-slate-200 overflow-hidden">
        <iframe
          className="w-full h-full border-0 grayscale hover:grayscale-0 transition-all duration-700"
          src="https://maps.google.com/maps?q=Aftabnagar,%20Merul%20Badda,%20Dhaka&t=&z=15&ie=UTF8&iwloc=&output=embed"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
};

export default ContactUsPage;
