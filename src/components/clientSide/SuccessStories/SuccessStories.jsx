/* eslint-disable react/prop-types */
import { useState } from "react";
import ComponentsTitle from "../../../Shared/ComponentsTitle/ComponentsTitle";
import ButtonStrong from "../../../Shared/Button/ButtonStrong";
import { Link } from "react-router-dom";
import VideoPlayingModal from "../../../Shared/VideoPlayingModal";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import Loading from "../../../Shared/Loading/Loading";
import SuccessCard from "./SuccessCard";

const SuccessStories = ({ isHomePage = false }) => {
  const [seeMore, setSeeMore] = useState(false);
  const [modalVideoSrc, setModalVideoSrc] = useState(null);
  const axiosPublic = useAxiosPublic();
  const {
    data: successStories = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["successStory"],
    queryFn: async () => {
      const res = await axiosPublic.get("/successStory");
      return res.data;
    },
  });
  if (isLoading) {
    return <Loading />;
  }

  const handleCloseModal = () => {
    setModalVideoSrc(null);
  };

  return (
    <div className="bg-[#fefaee] lg:py-10 ">
      <div className="max-w-7xl mx-auto">
        <ComponentsTitle
          title={"Success Stories"}
          description={
            "Shine a spotlight on the stories of our determined students who have achieved remarkable feats through their unwavering dedication."
          }
        />

        <div className="px-5">
          <SuccessCard filteredSuccessStories={successStories} />
        </div>
        <div className="flex justify-center items-center pt-10">
          {!isHomePage ? (
            <div className="w-max" onClick={() => setSeeMore(!seeMore)}>
              <ButtonStrong text={seeMore ? "View Less" : "View All"} />
            </div>
          ) : (
            <Link to={"/successStory"}>
              <div className="w-max">
                <ButtonStrong text={"View All"} />
              </div>
            </Link>
          )}
        </div>
      </div>

      {modalVideoSrc && (
        <VideoPlayingModal
          videoSrc={modalVideoSrc}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default SuccessStories;
