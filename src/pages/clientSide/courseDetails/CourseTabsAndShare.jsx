import CourseDetailsTab from "./CourseDetailsTab";

const CourseTabsAndShare = () => {
  return (
    <section className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
      <div className="mb-6 mt-8">
        <span className="mb-3 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-primary">
          Course Overview
        </span>
        <h2 className="text-2xl font-black tracking-tight text-secondary md:text-4xl">
          Build skills with a structured learning path
        </h2>
      </div>
      <CourseDetailsTab />
    </section>
  );
};

export default CourseTabsAndShare;
