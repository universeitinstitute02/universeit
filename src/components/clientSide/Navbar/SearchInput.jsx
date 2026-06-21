import { useQuery } from "@tanstack/react-query";
import { FiSearch } from "react-icons/fi";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState, useMemo } from "react";
import { FaSearch } from "react-icons/fa";

const SearchInput = () => {
    const axiosPublic = useAxiosPublic();
    const dropdownRef = useRef(null);
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredSearch, setFilteredSearch] = useState([]);
    const [showResult, setShowResult] = useState(false);

    const { data: courses = [], isLoading } = useQuery({
        queryKey: ['courses'],
        queryFn: async () => {
            const res = await axiosPublic.get('/course');
            return res.data;
        }
    });

    // useMemo use kora hoise jeno proti render-e array recreation na hoy
    const searchingData = useMemo(() => {
        const courseSearching = courses.map(item => ({
            name: item.title,
            navigate: () => navigate(`/courseDetails/${item._id}`)
        }));

        return [
            ...courseSearching,
            { name: 'All Courses', navigate: () => navigate(`/courses`) },
            { name: 'Milestones', navigate: () => navigate('/', { state: { scrollToMilestones: true } }) },
            { name: 'Free Seminar Schedule', navigate: () => navigate('/', { state: { scrollToSeminar: true } }) },
            { name: 'Success Stories', navigate: () => navigate('/', { state: { scrollToSuccessStory: true } }) },
            { name: 'Student Feedback or Review', navigate: () => navigate('/', { state: { scrollToFeedback: true } }) },
            { name: 'Contact Us', navigate: () => navigate('/contact-us') },
            { name: 'Certificate Verification', navigate: () => navigate('/certified') },
            { name: 'Team Members', navigate: () => navigate('/team-members') },
            { name: 'Benefits You will get from us', navigate: () => navigate('/aboutUs', { state: { scrollToBenefit: true } }) },
        ];
    }, [courses, navigate]);

    // Handle outside click to close dropdown
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowResult(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Filter dynamic input
    useEffect(() => {
        if (!searchTerm.trim()) {
            setFilteredSearch([]);
            return;
        }
        const filtered = searchingData.filter((item) =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredSearch(filtered);
    }, [searchTerm, searchingData]);

    const handleChangeRoutes = (data) => {
        data.navigate();
        setSearchTerm(data.name);
        setShowResult(false);
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
        setShowResult(true);
    };

    return (
        <div ref={dropdownRef} className='relative hidden subxl:block'>
            <input
                onClick={() => setShowResult(true)}
                value={searchTerm}
                onChange={handleSearchChange}
                className='pl-10 px-5 py-3 border-[2.5px] border-gray-200 w-full xl:w-[250px] rounded-lg' 
                type="text" 
                placeholder='What do you want to learn?' 
            />
            <FiSearch className='absolute top-4 left-3 text-gray-500 text-lg' />
            
            {/* Keval showResult true thakle ebong searchTerm faka na hole dropdown dekhabe */}
            {showResult && searchTerm.trim() && (
                <div className="w-full max-h-[350px] overflow-y-auto space-y-3 absolute top-14 bg-white border border-gray-200 shadow-lg rounded-md z-50">
                    {isLoading ? (
                        <p className="text-sm text-gray-500 text-center py-4">Loading...</p>
                    ) : filteredSearch.length > 0 ? (
                        filteredSearch.map((item, idx) => (
                            <div
                                onClick={() => handleChangeRoutes(item)}
                                className={`flex flex-col gap-2 p-2 hover:bg-gray-100 rounded-sm cursor-pointer ${
                                    searchTerm.toLowerCase() === item.name.toLowerCase() ? 'bg-gray-100' : ''
                                }`}
                                key={idx}
                            >
                                <div className="flex items-center gap-2 border-b border-gray-100 pb-1">
                                    <FaSearch className="min-w-[16px] text-primary" />
                                    <div>
                                        <p className="text-xs text-black font-bold">{item?.name}</p>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-sm text-gray-500 text-center py-4">No results found</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default SearchInput;