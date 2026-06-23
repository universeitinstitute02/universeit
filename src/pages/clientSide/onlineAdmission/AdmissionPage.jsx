import { useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useQuery } from "@tanstack/react-query";
import { Link, useSearchParams } from "react-router-dom";
import Swal from "sweetalert2";
import {
  FaArrowLeft,
  FaCheckCircle,
  FaCreditCard,
  FaMoneyCheckAlt,
  FaRegAddressCard,
  FaRocket,
  FaUserGraduate,
  FaWallet,
} from "react-icons/fa";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import logo from "../../../assets/logo/mainLogo.png";
import Loading from "../../../Shared/Loading/Loading";

const paymentMethods = [
  {
    id: "bkash",
    name: "Bkash",
    number: "01886061401",
    label: "Merchant No",
    color: "border-pink-200 bg-pink-50 text-pink-700",
    icon: FaWallet,
  },
  {
    id: "nagad",
    name: "Nagad",
    number: "01839702200",
    label: "Merchant No",
    color: "border-orange-200 bg-orange-50 text-orange-700",
    icon: FaMoneyCheckAlt,
  },
  {
    id: "dbbl",
    name: "DBBL",
    number: "3031100005674",
    label: "A/C",
    color: "border-sky-200 bg-sky-50 text-sky-700",
    icon: FaCreditCard,
  },
];

const initialFormData = {
  name: "",
  phone: "",
  gender: "",
  address: "",
  course: "",
  payment_method: "bkash",
  payment_number: "",
  transaction_id: "",
};

const AdmissionPage = () => {
  const axiosPublic = useAxiosPublic();
  const [searchParams] = useSearchParams();
  const selectedCourseId = searchParams.get("courseId") || "";
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    ...initialFormData,
    course: selectedCourseId,
  });
  const [submittedAdmission, setSubmittedAdmission] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data: courses = [], isLoading } = useQuery({
    queryKey: ["courses"],
    queryFn: async () => {
      const res = await axiosPublic.get("/course");
      return res.data;
    },
  });

  const selectedCourse = useMemo(
    () => courses.find((course) => course._id === formData.course),
    [courses, formData.course],
  );

  const selectedPaymentMethod = paymentMethods.find(
    (method) => method.id === formData.payment_method,
  );

  const activeFee =
    selectedCourse?.discountFee && selectedCourse?.discountFee !== "0"
      ? selectedCourse.discountFee
      : selectedCourse?.courseFee;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((currentData) => ({ ...currentData, [name]: value }));
  };

  const handleDetailsNext = (event) => {
    event.preventDefault();
    setStep(2);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!selectedCourse) {
      Swal.fire({
        icon: "error",
        title: "Course required",
        text: "Please select a course before submitting admission.",
      });
      setStep(1);
      return;
    }

    const admissionData = {
      name: formData.name.trim(),
      phone: formData.phone.trim(),
      payment_number: formData.payment_number.trim(),
      course: selectedCourse.title,
      courseId: selectedCourse._id,
      gender: formData.gender,
      transaction_id: formData.transaction_id.trim(),
      address: formData.address.trim(),
      payment_method: selectedPaymentMethod?.name || formData.payment_method,
    };

    try {
      setIsSubmitting(true);
      const res = await axiosPublic.post("/admission", admissionData);
      console.log("admissionData", admissionData);

      if (res.data.insertedId) {
        setSubmittedAdmission({
          ...admissionData,
          admissionId: res.data.insertedId,
        });
        setStep(3);
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }

      throw new Error("Admission request was not created.");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Submission failed",
        text:
          error?.response?.data?.message ||
          "Please check your payment details and try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleStartAnother = () => {
    setFormData({ ...initialFormData, course: selectedCourseId });
    setSubmittedAdmission(null);
    setStep(1);
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Helmet>
        <title>Universe IT | Online Admission</title>
      </Helmet>

      <section className="bg-slate-50 py-8 sm:py-12">
        <div className="mx-auto w-11/12 max-w-6xl">
          <div className="mb-6 flex flex-col gap-4 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-wide text-primary">
                Online Admission
              </p>
              <h1 className="text-2xl font-black text-gray-900 sm:text-3xl">
                Enroll in your course
              </h1>
            </div>

            <div className="flex items-center gap-2 rounded-xl bg-gray-50 p-1 text-xs font-bold text-gray-500">
              <span
                className={`rounded-lg px-3 py-2 ${
                  step === 1 ? "bg-primary text-white" : ""
                }`}
              >
                Details
              </span>
              <span
                className={`rounded-lg px-3 py-2 ${
                  step === 2 ? "bg-primary text-white" : ""
                }`}
              >
                Payment
              </span>
              <span
                className={`rounded-lg px-3 py-2 ${
                  step === 3 ? "bg-primary text-white" : ""
                }`}
              >
                Done
              </span>
            </div>
          </div>

          {step === 3 && submittedAdmission ? (
            <div className="rounded-2xl border border-emerald-100 bg-white p-6 text-center shadow-sm sm:p-10">
              <div className="mx-auto grid h-16 w-16 place-items-center text-green-600 rounded-full bg-emerald-50 text-4xl text-emerald-600">
                <FaCheckCircle />
              </div>
              <p className="text-sm font-bold uppercase tracking-wide text-green-600 text-emerald-600">
                Congratulations
              </p>
              <h2 className="mt-2 text-2xl font-black text-gray-900 sm:text-4xl">
                <span className="text-green-600">
                  {submittedAdmission.name}, 
                </span>
                Your enrollment request is received.
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-sm font-medium leading-6 text-gray-600 sm:text-base">
                You have enrolled for{" "}
                <span className="font-extrabold text-primary">
                  {submittedAdmission.course}
                </span>
                . Our admission team will verify your payment and contact you
                soon.
              </p>

              <div className="mx-auto mt-8 grid max-w-3xl gap-3 text-left sm:grid-cols-3">
                <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
                  <p className="text-xs font-bold uppercase text-gray-400">
                    Payment Method
                  </p>
                  <p className="mt-1 font-bold text-gray-900">
                    {submittedAdmission.payment_method}
                  </p>
                </div>
                <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
                  <p className="text-xs font-bold uppercase text-gray-400">
                    Payment Number
                  </p>
                  <p className="mt-1 font-bold text-gray-900">
                    {submittedAdmission.payment_number}
                  </p>
                </div>
                <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
                  <p className="text-xs font-bold uppercase text-gray-400">
                    Transaction ID
                  </p>
                  <p className="mt-1 font-bold text-gray-900">
                    {submittedAdmission.transaction_id}
                  </p>
                </div>
              </div>

              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={handleStartAnother}
                  className="rounded-xl border border-gray-200 px-5 py-3 text-sm font-extrabold text-gray-700 transition hover:bg-gray-50"
                >
                  Submit another admission
                </button>
                <Link
                  to="/courses"
                  className="rounded-xl bg-primary px-5 py-3 text-sm font-extrabold text-white transition hover:bg-primary/90"
                >
                  Browse courses
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
              <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
                {step === 1 ? (
                  <form onSubmit={handleDetailsNext} className="space-y-5">
                    <div>
                      <p className="flex items-center gap-2 text-lg font-black text-gray-900">
                        <FaUserGraduate className="text-primary" />
                        Student and course details
                      </p>
                      <p className="mt-1 text-sm font-medium text-gray-500">
                        Fill in the student information first. Payment details
                        will come in the next step.
                      </p>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <label className="space-y-2 text-sm font-bold text-gray-700">
                        Name
                        <input
                          required
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Enter full name"
                          className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 font-medium outline-none transition focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/10"
                        />
                      </label>

                      <label className="space-y-2 text-sm font-bold text-gray-700">
                        Phone Number
                        <input
                          required
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="Enter phone number"
                          className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 font-medium outline-none transition focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/10"
                        />
                      </label>

                      <label className="space-y-2 text-sm font-bold text-gray-700">
                        Select Course
                        <select
                          required
                          name="course"
                          value={formData.course}
                          onChange={handleChange}
                          className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 font-medium outline-none transition focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/10"
                        >
                          <option value="">Select Course</option>
                          {courses.map((course) => (
                            <option key={course._id} value={course._id}>
                              {course.title}
                            </option>
                          ))}
                        </select>
                      </label>

                      <label className="space-y-2 text-sm font-bold text-gray-700">
                        Select Gender
                        <select
                          required
                          name="gender"
                          value={formData.gender}
                          onChange={handleChange}
                          className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 font-medium outline-none transition focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/10"
                        >
                          <option value="">Select Gender</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                        </select>
                      </label>

                      <label className="space-y-2 text-sm font-bold text-gray-700 sm:col-span-2">
                        Present Address
                        <textarea
                          required
                          name="address"
                          value={formData.address}
                          onChange={handleChange}
                          rows="4"
                          placeholder="Enter present address"
                          className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 font-medium outline-none transition focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/10"
                        />
                      </label>
                    </div>

                    <div className="flex justify-end">
                      <button
                        type="submit"
                        className="flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-extrabold text-white shadow-md shadow-primary/20 transition hover:bg-primary/90 active:scale-[0.98]"
                      >
                        Next
                        <FaRocket />
                      </button>
                    </div>
                  </form>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <p className="flex items-center gap-2 text-lg font-black text-gray-900">
                        <FaRegAddressCard className="text-primary" />
                        Payment method and details
                      </p>
                      <p className="mt-1 text-sm font-medium text-gray-500">
                        Select your payment method, then submit your payment
                        number and transaction ID.
                      </p>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-3">
                      {paymentMethods.map((method) => {
                        const Icon = method.icon;
                        const isActive = formData.payment_method === method.id;

                        return (
                          <label
                            key={method.id}
                            className={`cursor-pointer rounded-xl border p-4 transition ${
                              isActive
                                ? method.color
                                : "border-gray-200 bg-gray-50 text-gray-700 hover:border-primary/40"
                            }`}
                          >
                            <input
                              type="radio"
                              name="payment_method"
                              value={method.id}
                              checked={isActive}
                              onChange={handleChange}
                              className="sr-only"
                            />
                            <span className="flex items-center gap-2 font-black">
                              <Icon />
                              {method.name}
                            </span>
                            <span className="mt-2 block text-xs font-bold">
                              {method.label}: {method.number}
                            </span>
                          </label>
                        );
                      })}
                    </div>

                    <div className="rounded-xl border border-primary/10 bg-primary/5 p-4 text-sm font-semibold text-gray-700">
                      Send the course payment to{" "}
                      <span className="font-black text-primary">
                        {selectedPaymentMethod?.label}:{" "}
                        {selectedPaymentMethod?.number}
                      </span>
                      , then enter the sender number and transaction ID below.
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <label className="space-y-2 text-sm font-bold text-gray-700">
                        Payment Number
                        <input
                          required
                          type="tel"
                          name="payment_number"
                          value={formData.payment_number}
                          onChange={handleChange}
                          placeholder="Sender payment number"
                          className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 font-medium outline-none transition focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/10"
                        />
                      </label>

                      <label className="space-y-2 text-sm font-bold text-gray-700">
                        Transaction ID
                        <input
                          required
                          type="text"
                          name="transaction_id"
                          value={formData.transaction_id}
                          onChange={handleChange}
                          placeholder="Enter transaction ID"
                          className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 font-medium outline-none transition focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/10"
                        />
                      </label>
                    </div>

                    <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 px-5 py-3 text-sm font-extrabold text-gray-700 transition hover:bg-gray-50"
                      >
                        <FaArrowLeft />
                        Back
                      </button>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-extrabold text-white shadow-md shadow-primary/20 transition hover:bg-primary/90 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {isSubmitting ? "Submitting..." : "Submit Admission"}
                        <FaCheckCircle />
                      </button>
                    </div>
                  </form>
                )}
              </div>

              <aside className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm lg:sticky lg:top-24 lg:self-start">
                <p className="text-sm font-bold uppercase tracking-wide text-gray-400">
                  Selected Course
                </p>
                <h2 className="mt-2 text-xl font-black leading-snug text-gray-900">
                  {selectedCourse?.title || "Choose a course"}
                </h2>

                {selectedCourse ? (
                  <div className="mt-4 space-y-3">
                    {selectedCourse.bannerImages?.[0] && (
                      <img
                        src={selectedCourse.bannerImages[0]}
                        alt={selectedCourse.title}
                        className="aspect-video w-full rounded-xl object-cover"
                      />
                    )}
                    <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
                      <p className="text-xs font-bold uppercase text-gray-400">
                        Course Fee
                      </p>
                      <p className="mt-1 text-2xl font-black text-primary">
                        TK {activeFee || "Contact us"}
                      </p>
                      {selectedCourse.discountFee &&
                        selectedCourse.discountFee !== "0" && (
                          <p className="text-sm font-semibold text-gray-400 line-through">
                            TK {selectedCourse.courseFee}
                          </p>
                        )}
                    </div>
                  </div>
                ) : (
                  <div className="mt-4 rounded-xl border border-dashed border-gray-200 bg-gray-50 p-5 text-sm font-medium text-gray-500">
                    Select a course from the form to see the admission summary.
                  </div>
                )}

                <div className="mt-5 border-t border-gray-100 pt-5">
                  <p className="text-sm font-black text-gray-900">
                    Payment Accounts
                  </p>
                  <div className="mt-3 space-y-2">
                    {paymentMethods.map((method) => (
                      <div
                        key={method.id}
                        className="flex items-center justify-between rounded-lg bg-gray-50 px-3 py-2 text-sm"
                      >
                        <span className="font-bold text-gray-700">
                          {method.name}
                        </span>
                        <span className="font-semibold text-gray-500">
                          {method.number}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </aside>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default AdmissionPage;
