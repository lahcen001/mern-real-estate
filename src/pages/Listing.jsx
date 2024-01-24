import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import "./style.css";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import {
  FaMapMarkedAlt,
  FaShare,
  FaBed,
  FaBath,
  FaParking,
  FaChair

} from "react-icons/fa";


// Import Swiper styles
import "swiper/swiper-bundle.css";
import { useSelector } from "react-redux";

export default function Listing() {
   const { currentUser } = useSelector((state) => state.user);
  const params = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);
 
  useEffect(() => {
    FetchListing();
  }, []);

  const FetchListing = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        "http://localhost:3000/api/listining/get/" + params.id,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await res.json();

      if (data.success === false) {
        setError(true);
        setLoading(false);
        return;
      }
      setListing(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  };

  return (
    <main className="  ">
      <Swiper
        navigation
        style={{ margin: "0", height: "90%" }}
        pagination={{ clickable: true }}
      >
        {listing?.imagesUrl.map((image, index) => (
          <SwiperSlide key={index}>
            <div
              className="h-[700px] bg-cover bg-center"
              style={{ backgroundImage: `url(${image})` }}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="fixed top-[13%] right-[3px] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer">
        <FaShare
          className="text-slate-500"
          onClick={() => {
            navigator.clipboard.writeText(window.location.href);
            setCopied(true);
            setTimeout(() => setCopied(false), 1000);
          }}
        />
      </div>

      {copied && (
        <p className="fixed top-[25%] right-[3px] z-10 bg-slate-400 text-slate-50 rounded-lg p-1">
          Link copied
        </p>
      )}

      <div className="flex flex-col max-w-4xl mx-auto p-3 my-7 gap-6">
        <p className="text-2xl font-semibold">
          {listing?.name} - $
          {listing?.offer
            ? listing?.discountedPrice?.toLocaleString("en-US")
            : listing?.regularPrice?.toLocaleString("en-US")}
          {listing?.type === "rent" && " $/ Month"}
        </p>

        <p className="flex items-center mt-6 gap-2">
          <FaMapMarkedAlt className="text-green-700" />
          {listing?.address}
        </p>

        <div className="flex flex-col max-w-4xl p-3 my-7 gap-6">
          <p className="bg-red-900 w-full max-w-[200px] text-slate-50 p-2 text-center rounded-md">
            {listing?.type === "rent" ? "For Rent" : "For Sale"}
          </p>
          {listing?.offer && (
            <p className="bg-green-700 w-full max-w-[200px] text-slate-50 p-2 text-center rounded-md">
              ${parseFloat(+listing?.regularPrice - +listing?.discountedPrice)}
            </p>
          )}
        </div>

        <p className="whitespace-pre-line">{listing?.description}</p>
        <ul className="text-green-900 font-semi text-sm flex items-center gap-4 sm:gap-4">
          <li className="flex items-center gap-1 whitespace-nowrap">
            <FaBed className="text-lg " />
            {listing?.bedrooms > 1
              ? `${listing?.bedrooms} Bedrooms`
              : "1 Bedroom"}
          </li>
          <li className="flex items-center gap-1 whitespace-nowrap ">
            <FaBath className="text-lg  " />
            {listing?.bethrooms > 1
              ? `${listing?.bathrooms} Bathrooms`
              : "1 Bathroom"}
          </li>
          <li className="flex items-center gap-1 whitespace-nowrap ">
            <FaParking className="text-lg " />
            {listing?.parking ? "Parking spot" : "No parking"}
          </li>
          <li className="flex items-center gap-1 whitespace-nowrap ">
            <FaChair className="text-lg " />
            {listing?.furnished ? "Furnished" : "Not furnished"}
          </li>
        </ul>

        {/* {currentUser && listing.userRef !== currentUser._id && (
          <button className="bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 p-2">
            contact agent
          </button>
        )} */}
      </div>
    </main>
  );
}
