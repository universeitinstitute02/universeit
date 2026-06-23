import React, { useState } from 'react';
import ReactPlayer from 'react-player';
import ShowingVideoModal from '../../../Shared/ShowingVideoModal';

const MainVideo = ({ videoUrl }) => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(!open);


    return (
        <div className="relative z-10 h-full min-h-[220px] w-full rounded-2xl border-2 border-black bg-black p-2 sm:min-h-[320px] lg:min-h-0">
            <div onClick={handleOpen} className='absolute w-full h-full bg-transparent z-10 cursor-pointer'>

            </div>
            <ReactPlayer
                // controls="true"
                url={videoUrl}
                width="100%"
                height="100%"
            // onPlay={handleOpen}
            />
            <ShowingVideoModal handleOpen={handleOpen} open={open} video={videoUrl} />

        </div>
    );
};

export default MainVideo;
