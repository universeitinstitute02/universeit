import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import Testimonials from "../../../components/clientSide/Testimonials/Testimonials";
import HomeFreeSeminar from "../../../components/clientSide/HomeFreeSeminar/HomeFreeSeminar";
import { useLocation } from "react-router-dom";
import AboutBanner from "./AboutBanner";
import Services from "../../../components/clientSide/Services/Services";
import SuccessStories from "../../../components/clientSide/SuccessStories/SuccessStories";
import TeamMember from "./TeamMember";
import { useEffect } from "react";
const AboutUs = () => {
  window.scrollTo(0, 0);
  const scrollAnimationVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };
  const location = useLocation();

  useEffect(() => {
    if (location.state?.scrollToBenefit) {
      const element = document.getElementById("benefit");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);
  return (
    <div>
      <Helmet>
        <title>Universe IT | About Us</title>
      </Helmet>

      <motion.div
        initial="hidden"
        whileInView="visible"
        variants={scrollAnimationVariants}
        viewport={{ once: false, amount: 0.2 }}
      >
        <AboutBanner></AboutBanner>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        variants={scrollAnimationVariants}
        viewport={{ once: false, amount: 0.2 }}
      >
        <TeamMember></TeamMember>
      </motion.div>

      <motion.div
        id="benefit"
        initial="hidden"
        whileInView="visible"
        variants={scrollAnimationVariants}
        viewport={{ once: false, amount: 0.2 }}
      >
        <Services />
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        variants={scrollAnimationVariants}
        viewport={{ once: false, amount: 0.2 }}
      >
        <HomeFreeSeminar />
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        variants={scrollAnimationVariants}
        viewport={{ once: false, amount: 0.2 }}
      >
        <SuccessStories></SuccessStories>
      </motion.div>

      <motion.div
        id="hello"
        initial="hidden"
        whileInView="visible"
        variants={scrollAnimationVariants}
        viewport={{ once: false, amount: 0.2 }}
      >
        <Testimonials />
      </motion.div>
    </div>
  );
};

export default AboutUs;
