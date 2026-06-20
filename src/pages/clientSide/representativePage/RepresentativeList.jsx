import React, { useState } from "react";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../Shared/Loading/Loading";
import { Helmet } from "react-helmet-async";
import log21 from "../../../assets/logo/mainLogo.png";
import FacultyCard from "../Mentors/FacultyCard";
import RepresentativeCard from "./RepresentativeCard";

const RepresentativeList = () => {
  window.scrollTo(0, 0);
  const [firstCardId, setFirstCardId] = useState(0);
  const [cardPerSlice, setCardPerSlice] = useState(6);
  const axiosPublic = useAxiosPublic();
  const { data: representative = [], isLoading } = useQuery({
    queryKey: ["representative"],
    queryFn: async () => {
      const res = await axiosPublic.get("/representative");
      return res.data;
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  const handleNext = () => {
    const newFirstCardId = firstCardId + cardPerSlice;
    if (newFirstCardId < totalCard) {
      setFirstCardId(newFirstCardId);
    }
  };

  return (
    <div className="sm:px-20 my-10 min-h-screen">
      <Helmet>
        <title>Universe IT | Representative</title>
      </Helmet>
      <p className="text-4xl m-10">
        <span className="font-bold border-b-2">Representative</span>
      </p>

      <div className=" my-10 flex justify-center"></div>

      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 lg:gap-5  justify-center px-2">
        {representative.map((representative, idx) => (
          <RepresentativeCard key={idx} representative={representative} />
        ))}
      </div>
    </div>
  );
};

export default RepresentativeList;
