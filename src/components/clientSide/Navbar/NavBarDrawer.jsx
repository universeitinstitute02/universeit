import React, { useEffect, useState } from "react";
import {
    Drawer,
    Button,
    Typography,
    IconButton,
    List,
    ListItem,
    ListItemPrefix,
    ListItemSuffix,
    Chip,
} from "@material-tailwind/react";
import Hamburger from "hamburger-react";
import logo from '../../../assets/logo/mainLogo.png'
import { Link, NavLink } from "react-router-dom";
import { FaAngleDown } from "react-icons/fa6";
import { FiSearch } from "react-icons/fi";
import { IoIosPeople } from "react-icons/io";
import { FaHome, FaBlog, FaUsers, FaTrophy } from 'react-icons/fa';
import { IoSchool } from "react-icons/io5";
import { MdOutlineReviews, MdOutlineVideoLibrary } from "react-icons/md";
import { RiGalleryLine } from "react-icons/ri";
const NavBarDrawer = ({ open, setOpen }) => {
    const closeDrawer = () => setOpen(false);
    const navLi = [
        { name: 'Home', link: '/', icon: <FaHome /> },
        { name: 'About Us', link: '/aboutUs', icon: <IoIosPeople /> },
        { name: 'Blogs', link: '/blogs', icon: <FaBlog /> },
        { name: 'Faculties', link: '/faculties', icon: <FaUsers /> },
        { name: 'Success Story', link: '/successStory', icon: <FaTrophy /> },
        { name: 'Photo Gallery', link: '/photoGallery', icon: <RiGalleryLine /> },
        { name: 'Video Gallery', link: '/videoGallery', icon: <MdOutlineVideoLibrary /> },
        { name: 'Courses', link: '/courses', icon: <IoSchool /> },
        { name: "Student's Feedback", link: '/feedback', icon: <MdOutlineReviews /> },
    ];
    // const navli = <>

    //     <NavLink to={'/aboutUs'} className={`${navStyle}`}>
    //         <ListItem>
    //             <ListItemPrefix>
    //                 <svg
    //                     xmlns="http://www.w3.org/2000/svg"
    //                     viewBox="0 0 24 24"
    //                     fill="currentColor"
    //                     className="h-5 w-5"
    //                 >
    //                     <path
    //                         fillRule="evenodd"
    //                         d="M2.25 2.25a.75.75 0 000 1.5H3v10.5a3 3 0 003 3h1.21l-1.172 3.513a.75.75 0 001.424.474l.329-.987h8.418l.33.987a.75.75 0 001.422-.474l-1.17-3.513H18a3 3 0 003-3V3.75h.75a.75.75 0 000-1.5H2.25zm6.04 16.5l.5-1.5h6.42l.5 1.5H8.29zm7.46-12a.75.75 0 00-1.5 0v6a.75.75 0 001.5 0v-6zm-3 2.25a.75.75 0 00-1.5 0v3.75a.75.75 0 001.5 0V9zm-3 2.25a.75.75 0 00-1.5 0v1.5a.75.75 0 001.5 0v-1.5z"
    //                         clipRule="evenodd"
    //                     />
    //                 </svg>
    //             </ListItemPrefix>
    //             About us
    //         </ListItem>
    //         <a></a>

    //     </NavLink>
    //     <NavLink to={'/blogs'} className={`${navStyle}`}>
    //         <a>Blogs</a>
    //         {stylingComponents}
    //     </NavLink>
    //     <NavLink to={'/faculties'} className={`${navStyle}`}>
    //         <a>Faculties</a>
    //         {stylingComponents}
    //     </NavLink>
    //     <NavLink to={'/successStory'} className={`${navStyle}`}><a>Success Story</a>
    //         {stylingComponents}
    //     </NavLink>
    //     <div className="block xs:hidden pb-4">
    //         <Link to="/courses">
    //             <button className="text-sm sm:text-base bg-primary text-white hover:bg-text_color px-2 py-2 sm:px-4 sm:py-3 flex sm:gap-2 items-center justify-center rounded-lg hover:rounded-xl transition-all duration-300 active:scale-90 font-medium">Browse Courses <FaAngleDown /></button>
    //         </Link>
    //     </div>
    //     <div className='relative block xl:hidden'>
    //         <input className=' pl-10 px-5 py-3 border-[2.5px] border-gray-200 w-full xl:w-[400px] rounded-lg' type="text" placeholder='What do you want to learn?' />
    //         <FiSearch className='absolute top-4 left-3 text-gray-500 text-lg' />
    //     </div>
    // </>
    return (
        <>

            <Drawer open={open} onClose={closeDrawer} className="bg-white">
                <div className="bg-primary/20 h-full">
                    <div className="mb-2 flex items-center justify-between p-4">
                        <Typography variant="h5" className="text-text_color">
                            Universe IT Institute
                        </Typography>
                        <IconButton variant="text" className="text-text_color" onClick={closeDrawer}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={2}
                                stroke="currentColor"
                                className="h-5 w-5"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </IconButton>
                    </div>
                    <List>
                        {
                            navLi.map((item, idx) => <NavLink key={idx} to={item.link}>
                                <ListItem className="hover:bg-text_color/20 focus:bg-text_color focus:text-white rounded-none">
                                    <ListItemPrefix>
                                        {item.icon}
                                    </ListItemPrefix>
                                    {item.name}
                                </ListItem>
                            </NavLink>)
                        }
                    </List>

                </div>
            </Drawer>
        </>
    );
};

export default NavBarDrawer;