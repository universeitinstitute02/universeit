"use client";
import React, { useEffect, useMemo, useState } from 'react';
import CountUp from 'react-countup';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import Loading from '../../../Shared/Loading/Loading';

// Icons & Images
import rewardIcon from '../../../assets/ServicesImg/reward.png';
import classIcon from '../../../assets/ServicesImg/class.png';
import affordablepriceIcon from '../../../assets/ServicesImg/affordableprice.png';
import educationIcon from '../../../assets/ServicesImg/education.png';

const STAT_CARDS = [
  {
    key: 'enrolled',
    icon: rewardIcon,
    label: 'Enrolled Students',
    suffix: '+',
    bgColor: 'bg-[#E0F7FA]/70',
  },
  {
    key: 'instructors',
    icon: classIcon,
    label: 'Instructors',
    suffix: '+',
    bgColor: 'bg-[#FFEBEE]/70',
  },
  {
    key: 'expert',
    icon: educationIcon,
    label: 'Industry Experts',
    suffix: '+',
    bgColor: 'bg-[#E1BEE7]/70',
  },
  {
    key: 'successRatio',
    icon: affordablepriceIcon,
    label: 'Success Ratio',
    suffix: '%',
    bgColor: 'bg-[#FFF59D]/60',
  },
];

/**
 * A single animated statistic (e.g. "1200+ Enrolled Students").
 */
const StatCard = ({ icon, label, value, suffix, bgColor }) => (
  <div
    className={`${bgColor} flex flex-col justify-center rounded-2xl border border-black/5 p-6 shadow-sm transition-all duration-300 hover:shadow-md`}
  >
    <img src={icon} alt="" aria-hidden="true" className="mb-3 h-8 w-8 object-contain" />
    <span className="mb-1 text-3xl font-black text-slate-800 lg:text-4xl">
      <CountUp end={value || 0} duration={4} separator="," />
      {suffix}
    </span>
    <p className="text-base font-semibold text-text_color/90 sm:text-lg">{label}</p>
  </div>
);

/**
 * A single selectable benefit in the left-hand list.
 * Rendered as a real <button> (instead of a clickable <div>) so the control
 * is reachable and operable from the keyboard, and is announced correctly
 * by screen readers.
 */
const BenefitItem = ({ label, isActive, onSelect }) => (
  <li>
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={isActive}
      className={`w-full select-none rounded-xl border px-6 py-4 text-left text-base font-semibold tracking-wide transition-all duration-300 active:scale-[0.98] sm:text-lg
        ${
          isActive
            ? 'border-text_color bg-text_color text-white shadow-md shadow-text_color/10'
            : 'border-gray-200/80 bg-white text-text_color hover:border-text_color/40 hover:bg-gray-50/50'
        }`}
    >
      {label}
    </button>
  </li>
);

const Services = () => {
  const [activeBenefit, setActiveBenefit] = useState('');
  const axiosPublic = useAxiosPublic();

  const {
    data: homepageContent = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['homepageContent'],
    queryFn: async () => {
      const res = await axiosPublic.get('/homepageContent');
      return res?.data;
    },
  });

  const pageData = homepageContent[0] || {};
  const benefits = useMemo(() => pageData.benefits ?? [], [pageData.benefits]);

  // Default to the first benefit whenever fresh content loads.
  useEffect(() => {
    if (benefits.length > 0) {
      setActiveBenefit(benefits[0]);
    }
  }, [benefits]);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return (
      <section className="bg-[#fefaee] py-16 text-center text-text_color/70 md:py-24">
        We couldn&apos;t load this section right now. Please refresh the page or try again shortly.
      </section>
    );
  }

  return (
    <section className="bg-[#fefaee] py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* Header */}
        <div className="mb-12 max-w-2xl lg:mb-16">
          <h2 id="benefits-heading" className="text-3xl font-extrabold leading-tight tracking-tight text-text_color sm:text-5xl">
            Benefits You Will Get From Us
          </h2>
          <p className="mt-4 text-base font-medium text-text_color/80 sm:text-lg">
            Join us to access a world of knowledge and skills to boost your career.
          </p>
        </div>

        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-12">
          {/* Benefit list */}
          <ul aria-labelledby="benefits-heading" className="w-full space-y-3.5 lg:col-span-5">
            {benefits.length > 0 ? (
              benefits.map((benefit) => (
                <BenefitItem
                  key={benefit}
                  label={benefit}
                  isActive={activeBenefit === benefit}
                  onSelect={() => setActiveBenefit(benefit)}
                />
              ))
            ) : (
              <li className="rounded-xl border border-dashed border-gray-300 p-4 text-text_color/60">
                Benefits will appear here once they're added.
              </li>
            )}
          </ul>

          {/* Stats grid */}
          <div className="flex h-full w-full items-center lg:col-span-7">
            <div className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2">
              {STAT_CARDS.map((stat) => (
                <StatCard
                  key={stat.key}
                  icon={stat.icon}
                  label={stat.label}
                  suffix={stat.suffix}
                  bgColor={stat.bgColor}
                  value={pageData[stat.key]}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;