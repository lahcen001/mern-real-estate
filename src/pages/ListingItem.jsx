import React from "react";
import { Link } from "react-router-dom";
import { MdLocationOn } from "react-icons/md";

export default function ListingItem({ listing }) {
  return (
    <div className="max-w-xs bg-white shadow-md rounded-lg overflow-hidden">
      <Link to={`/listings/${listing._id}`}>
        <img
          src={listing.imagesUrl[0]}
          alt="listing cover"
          className="h-[320px] w-full object-cover object-center 
          hover:scale-105 transition-scale duration-300"
        />

        <div className="p-3">
          <p className="truncate text-lg font-semibold text-slate-700">
            {listing.name}
          </p>
          <div className="flex items-center gap-1">
            <MdLocationOn className="h-4 w-4 text-green-700" />
            <p className="text-sm text-slate-500 truncate">{listing.address}</p>
          </div>

          <div className="flex items-center gap-1">
            <p className="text-sm text-slate-500 truncate">
              {listing.description}
            </p>
          </div>

          <div className="flex items-center gap-1 text-slate-700 text-lg text-bold">
            <p className=" truncate">
              {listing.offer
                ? listing.DiscountPrice.toLocaleString("en-US")
                : listing.regularPrice.toLocaleString("en-US")}
              {" $"}
            </p>
          </div>

          <div className="font-bold text-xs gap-4">
            <p className=" truncate">
              {listing.bathrooms > 1
                ? `${listing.bathrooms} Bathrooms`
                : "1 Bedroom"}
            </p>
          </div>
          <div className="font-bold text-xs">
            <p className=" truncate">
              {listing.bedrooms > 1
                ? `${listing.bedrooms} Bedrooms`
                : "1 Bedroom"}
            </p>
          </div>
        </div>
      </Link>
    </div>

  );
}
