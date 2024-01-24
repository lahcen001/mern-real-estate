import React from "react";

export default function Search() {
  return (
    <div className="flex flex-col md:flex-row">
      <div className=" p-7 border-b-2 md:border-r-2 md:min-h-screen">
        <form className="flex flex-col gap-4">
          <div className="flex items-center gap-2 ">
            <label className="whitespace-nowrap"> Search Term : </label>
            <input
              type="text"
              className="border rounded-lg p-3 w-full"
              id="searchTerm"
              placeholder="Search..."
            />
          </div>

          <div className="flex gap-2 flex-wrap items-center mt-6">
            <label>Type : </label>
            <div className=" flex gap-2">
              <input type="checkbox" id="all" className="w-5" />
              <span>Rent</span>
            </div>
            <div className=" flex gap-2">
              <input type="checkbox" id="sale" className="w-5" />
              <span>Sale</span>
            </div>
            <div className=" flex gap-2">
              <input type="checkbox" id="offer" className="w-5" />
              <span>Offer</span>
            </div>
          </div>
          {/* g */}
          <div className="flex gap-2 flex-wrap items-center mt-6 ">
            <label>Amenities : </label>
            <div className=" flex gap-2">
              <input type="checkbox" id="parking" className="w-5" />
              <span>Parking</span>
            </div>

            <div className=" flex gap-2">
              <input type="checkbox" id="sale" className="w-5" />
              <span>Furnished</span>
            </div>
          </div>

          <div className="mt-4 flex items-center gap-4">
            <label>Sort : </label>
            <select name="" id="sort_order" className="border rounded-lg p-3">
              <option value="">Price High to low</option>
              <option value=""> Price Low to high</option>
              <option value=""> Newest</option>
              <option value=""> Oldest</option>
            </select>
          </div>
          <button className="bg-blue-500 p-3  text-white mt-6 uppercase border rounded-lg">
            Search
          </button>
        </form>
      </div>
      <div className="">
        <h1>Listing results : </h1>
      </div>
    </div>
  );
}
