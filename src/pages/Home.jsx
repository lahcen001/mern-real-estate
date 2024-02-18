import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import ListingItem from "./ListingItem.jsx";
function Home() {
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  SwiperCore.use([Navigation]);

  useEffect(() => {
    fetchOfferListings();
  }, []);

  const fetchOfferListings = async () => {
    console.log("object object object");
    try {
      const res = await fetch(
        "http://localhost:3000/api/listining/get?offer=true&limit=3 ",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();
      setOfferListings(data);
      fetchSaleListings();
    } catch (error) {
      console.log(error);
    }
  };

  const fetchSaleListings = async () => {
    console.log("object object object");
    try {
      const res = await fetch(
        "http://localhost:3000/api/listining/get?sale=true&limit=3 ",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();
      setSaleListings(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {/* top */}
      {/* Discover your ideal destination effortlessly */}
      <div className="flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto">
        <h1 className="text-slate-700 font-bold text-3xl lg:text-6xl">
          Discover your <span className="text-slate-500"> ideal</span>
          <br />
          destination effortlessly
        </h1>
        <div className="text-gray-400 text-xs sm:text-sm">
          lahcen Estate is the best place to find your next perfect place to
          live.
          <br />
          We have a wide range of properties for you to choose from.
        </div>
        <Link
          to={"/search"}
          className="text-xs sm:text-sm text-blue-800 font-bold hover:underline"
        >
          Let's get started...
        </Link>
      </div>
      <Swiper navigation>
        {offerListings &&
          offerListings.length > 0 &&
          offerListings.map((listing, index) => (
            <SwiperSlide
              style={{
                background: `url(${listing.imagesUrl[0]}) no-repeat center `,
                backgroundSize: "cover",
              }}
              key={index}
              className="h-[500px]"
            ></SwiperSlide>
          ))}
      </Swiper>
      <div className="max-w-6xl mx-auto p-3 flex-col gap-8 my-10 ">
        {offerListings && offerListings.length > 0 && (
          <div className="">
            <div className="">
              <h2 className="text-2xl font-semibold text-slate-500">
                Recent offers
              </h2>

              <Link
                className="text-sm text-blue-800 hover:unde"
                to={"/search?offer=true"}
              >
                Show more offers
              </Link>
            </div>

            <div className=" flex flex-wrap gap-4">
              {offerListings.map((listing, index) => (
                <ListingItem key={index} listing={listing} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
export default Home;
