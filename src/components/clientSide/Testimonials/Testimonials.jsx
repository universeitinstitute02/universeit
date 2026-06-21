import Rating from "react-rating";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { FaRegStar, FaStar } from "react-icons/fa";
import ComponentsTitle from "../../../Shared/ComponentsTitle/ComponentsTitle";
const Testimonials = () => {
  const axiosPublic = useAxiosPublic();
  const {
    data: testimonials = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["testimonials"],
    queryFn: async () => {
      const res = await axiosPublic.get("/testimonial");
      return res.data;
    },
  });

  const rows = [
    { start: 0, end: 3, className: "animate-scroll" },
    { start: 3, end: 6, className: "animate-scroll-reverse" },
  ];

  const renderCard = (testimonial, index) => (
    <div
      key={index}
      className="bg-white border border-slate-200 hover:border-slate-300 rounded-xl p-4 shrink-0 w-[350px]"
    >
      <div className="text-base sm:text-xl text-primary">
        <Rating
          className="space-x-1"
          emptySymbol={<FaRegStar />}
          fullSymbol={<FaStar />}
          initialRating={testimonial?.rating || ""}
          readonly
        />
      </div>
      <p className="text-neutral-700 text-sm mb-6">{testimonial?.opinion}</p>
      <div className="flex items-center gap-3">
        <img
          src={testimonial?.image}
          alt={testimonial?.name}
          className="w-11 h-11 rounded-full object-cover"
        />
        <div>
          <p className="font-bold text-neutral-800 text-sm">
            {testimonial.name}
          </p>
          <p className="text-neutral-600 text-sm">{testimonial?.designation}</p>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <section className="bg-[#FAFAFA] py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <ComponentsTitle
            title={"Students Review"}
            description={"See What our students say about us."}
          />

          <div className="space-y-6">
            {rows.map((row, rowIndex) => (
              <div key={rowIndex} className="relative overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-28 bg-linear-to-r from-[#FAFAFA] to-transparent z-10 pointer-events-none"></div>
                <div className="absolute right-0 top-0 bottom-0 w-28 bg-linear-to-l from-[#FAFAFA] to-transparent z-10 pointer-events-none"></div>

                <div className={`flex gap-6 ${row.className}`}>
                  {[
                    ...testimonials.slice(row.start, row.end),
                    ...testimonials.slice(row.start, row.end),
                  ].map((testimonial, index) => renderCard(testimonial, index))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Testimonials;
