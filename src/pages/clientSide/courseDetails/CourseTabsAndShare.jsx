import React from 'react';
import CourseDetailsTab from './CourseDetailsTab';

const CourseTabsAndShare = () => {
    return (
        <div className="p-5 bg-white rounded-2xl z-10 relative">
            <div className="flex justify-between flex-col sm:flex-row">
                <p className="lg:text-4xl font-bold py-5">Course Overview</p>
            </div>
            <CourseDetailsTab></CourseDetailsTab>

            

        </div>
    );
};

export default CourseTabsAndShare;