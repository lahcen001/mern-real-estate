import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ListingItem from "./ListingItem.jsx";
export default function Search() {
  const navigate = useNavigate();
  const [ShowMore, setShowMore] = useState(false);
  const [listings, setListings] = useState([]);
  // const [searchTerm, setSearchTerm] = useState("");
  const [sidebardata, setSidebardata] = useState({
    searchTerm: "",
    type: "all",
    parking: false,
    furnished: false,
    offer: false,
    sort: "createdAt",
    order: "desc",
  });
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    if (
      e.target.id === "all" ||
      e.target.id === "rent" ||
      e.target.id === "sale"
    ) {
      setSidebardata({ ...sidebardata, type: e.target.id });
    }

    if (e.target.id === "searchTerm") {
      setSidebardata({ ...sidebardata, searchTerm: e.target.value });
    }

    if (
      e.target.id === "parking" ||
      e.target.id === "furnished" ||
      e.target.id === "offer"
    ) {
      setSidebardata({
        ...sidebardata,
        parking: e.target.checked == "true" ? true : false,
      });
    }

    if (e.target.id === "sort_order") {
      const sort = e.target.value.split("_")[0] || "createdAt";
      const order = e.target.value.split("_")[1] || "desc";

      setSidebardata({ ...sidebardata, sort, order });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set("searchTerm", sidebardata.searchTerm);
    urlParams.set("type", sidebardata.type);
    urlParams.set("parking", sidebardata.parking);
    urlParams.set("furnished", sidebardata.furnished);
    urlParams.set("offer", sidebardata.offer);
    urlParams.set("sort", sidebardata.sort);
    urlParams.set("order", sidebardata.order);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTerm = urlParams.get("searchTerm");
    const type = urlParams.get("type");
    const parking = urlParams.get("parking");
    const furnished = urlParams.get("furnished");
    const offer = urlParams.get("offer");
    const sort = urlParams.get("sort");
    const order = urlParams.get("order");

    if (searchTerm || type || parking || furnished || offer || sort || order) {
      setSidebardata({
        searchTerm: searchTerm || "",
        type: type || "all",
        parking: parking || false,
        furnished: furnished || false,
        offer: offer || false,
        sort: sort || "createdAt",
        order: order || "desc",
      });
    }

    const fetchListings = async () => {
      setLoading(true);
      const searchQuery = urlParams.toString();
      const res = await fetch(
        `http://localhost:3000/api/listining/get?${searchQuery}`
      );

      const data = await res.json();

      if (data.length > 2) {
        setShowMore(true);
      }

      setListings(data);

      setLoading(false);
    };
    fetchListings();
  }, [location.search]);




  const handleShowMore =  async () => {
     const numberOfListings = listings.length;
     const startIndex = numberOfListings;
     const urlParams = new URLSearchParams(location.search);
     urlParams.set("startIndex", startIndex);
     const searchQuery = urlParams.toString();
     const data = await res.json();
     if(data.length <9){
      setShowMore(false);
     }


    
    
  }

  return (
    <div className="flex flex-col md:flex-row">
      <div className=" p-7 border-b-2 md:border-r-2 md:min-h-screen">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex items-center gap-2 ">
            <label className="whitespace-nowrap"> Search Term : </label>
            <input
              type="text"
              className="border rounded-lg p-3 w-full"
              id="searchTerm"
              placeholder="Search..."
              value={sidebardata.searchTerm}
              onChange={handleChange}
            />
          </div>

          <div className="flex gap-2 flex-wrap items-center mt-6">
            <label>Type : </label>
            <div className=" flex gap-2">
              <input
                type="checkbox"
                id="all"
                className="w-5"
                onChange={handleChange}
                checked={sidebardata.type === "all"}
              />
              <span>Rent</span>
            </div>
            <div className=" flex gap-2">
              <input
                type="checkbox"
                id="sale"
                className="w-5"
                onChange={handleChange}
                checked={sidebardata.type === "sale"}
              />
              <span>Sale</span>
            </div>
            <div className=" flex gap-2">
              <input
                type="checkbox"
                id="offer"
                className="w-5"
                onChange={handleChange}
                checked={sidebardata.type === "offer"}
              />
              <span>Offer</span>
            </div>
          </div>
          {/* g */}
          <div className="flex gap-2 flex-wrap items-center mt-6 ">
            <label>Amenities : </label>
            <div className=" flex gap-2">
              <input
                type="checkbox"
                id="parking"
                className="w-5"
                onChange={handleChange}
                checked={sidebardata.parking}
              />
              <span>Parking</span>
            </div>

            <div className=" flex gap-2">
              <input
                type="checkbox"
                id="sale"
                className="w-5"
                onChange={handleChange}
                checked={sidebardata.furnished}
              />
              <span>Furnished</span>
            </div>
          </div>

          <div className="mt-4 flex items-center gap-4">
            <label>Sort : </label>
            <select
              name=""
              id="sort_order"
              className="border rounded-lg p-3"
              onChange={handleChange}
              checked={sidebardata.sort}
            >
              <option value="regularPrice_desc">Price High to low</option>
              <option value="regularPrice_asc"> Price Low to high</option>
              <option value="createdAt_desc"> Newest</option>
              <option value="createdAt_asc"> Oldest</option>
            </select>
          </div>
          <button
            type="submit"
            className="bg-blue-500 p-3  text-white mt-6 uppercase border rounded-lg"
          >
            Search
          </button>
        </form>
      </div>
      <div className="flex-wrap">
        <div className="p-7   ">
          {loading && listings && listings.length === 0 && (
            <h1 className="text-3xl font-semibold border-b p-3 text-slate-700  mt-5">
              No listings for this search
            </h1>
          )}

          <div className=" flex-3  gap-4  ">
            {listings &&
              listings.length > 0 &&
              listings.map((listing) => (
                <ListingItem
                  key={listing._id}
                  id={listing._id}
                  listing={listing}
                />
              ))}

            {ShowMore && (
              <button
                onClick={handleShowMore}
                className="text-green-700 hover:underline p-7 text-center w-full"
              >
                Show more
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
