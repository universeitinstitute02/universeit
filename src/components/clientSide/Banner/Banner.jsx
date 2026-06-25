/* eslint-disable react/prop-types */
import {
  Code,
  Layers,
  MessageCircleCode,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import bannerFallback from "../../../assets/banner/banner.png";
import ButtonLight from "../../../Shared/Button/ButtonLight";
import ButtonStrong from "../../../Shared/Button/ButtonStrong";

const splitTitle = (title) => {
  const words = title.trim().split(/\s+/);

  if (words.length <= 2) {
    return ["", title];
  }

  return [words.slice(0, -2).join(" "), words.slice(-2).join(" ")];
};

const Banner = ({ data = {} }) => {
  const titleText = data?.title || "Build Your Career With Universe IT";
  const subtitleText =
    data?.subtitle ||
    "Learn in-demand technology skills from expert mentors and start working on real projects with confidence.";
  const imageUrl =
    "https://res.cloudinary.com/dnvmj9pvk/image/upload/v1782284296/uiti-hero_ur5nmu.webp" ||
    data?.imageUrl ||
    bannerFallback;
  const [firstTitle, highlightedTitle] = splitTitle(titleText);

  const techBadges = [
    {
      icon: <Code size={16} />,
      label: "MERN Stack",
      className: "left-3 top-6",
    },
    { icon: <Layers size={16} />, label: "UI/UX", className: "right-3 top-16" },
    {
      icon: <MessageCircleCode size={16} />,
      label: "Python",
      className: "left-6 bottom-20",
    },
    {
      icon: <ShieldCheck size={16} />,
      label: "Career",
      className: "right-8 bottom-8",
    },
  ];

  return (
    <section className="w-full overflow-hidden bg-[#fefaee]">
      <div className="mx-auto grid min-h-[calc(100vh-96px)] max-w-7xl grid-cols-1 items-center gap-10 px-5 py-10 sm:px-8 lg:grid-cols-2 lg:px-16 xl:min-h-[73vh] xl:px-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="order-2 space-y-6 lg:order-1"
        >
          <p className="inline-flex max-w-full items-center gap-2 rounded-full border border-primary/20 bg-white px-4 py-2 text-sm font-semibold text-secondary shadow-sm">
            <Sparkles size={16} className="shrink-0 text-primary" />{" "}
            <span className="whitespace-nowrap">
              {" "}
              Free Seminar on 25th August!{" "}
            </span>
          </p>

          <div className="space-y-4">
            <h1 className="text-3xl font-bold leading-tight text-secondary sm:text-5xl lg:text-6xl">
              {firstTitle ? `${firstTitle} ` : ""}
              <span className="text-primary">{highlightedTitle}</span>
            </h1>
            <p className="max-w-xl text-base font-medium leading-7 text-gray-600 sm:text-lg">
              {subtitleText}
            </p>
          </div>

          <div className="flex flex-col gap-4 xs:flex-row xs:items-center">
            <div
              className="h-max rounded-md"
              style={{ boxShadow: "0 0 40px 10px rgba(244, 148, 1, 0.18)" }}
            >
              <Link to="/courses">
                <ButtonStrong text="Get Started" />
              </Link>
            </div>
            <Link to="/freeSeminar">
              <ButtonLight text="Join Free Seminar" />
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
          className="order-1 lg:order-2"
        >
          <div className="relative mx-auto aspect-[4/3] w-full max-w-[620px]">
            <div className="absolute inset-6 rounded-full border border-primary/20" />
            <div className="absolute inset-14 rounded-full border border-secondary/10" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative aspect-square w-[78%] overflow-hidden rounded-[32px] border border-white bg-white shadow-2xl sm:rounded-[40px]">
                <img
                  src={imageUrl}
                  alt={titleText}
                  className="h-full w-full object-cover"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-secondary/20 via-transparent to-transparent" />
              </div>
            </div>

            {techBadges.map((badge, index) => (
              <motion.div
                key={badge.label}
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: index * 0.3,
                }}
                className={`absolute z-10 flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 shadow-xl ${badge.className}`}
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10 text-primary">
                  {badge.icon}
                </span>
                <span className="text-xs font-bold uppercase text-secondary">
                  {badge.label}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Banner;
