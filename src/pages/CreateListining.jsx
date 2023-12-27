import React from "react";

export default function CreateListining() {
  return (
    <main className="max-w-4xl p-3 mx-auto">
      <h1 className="text-3xl text-center my-7 font-bold">Create a Listing</h1>
      <form className="flex gap-4 sm:flex-row flex-col">
        <div className="flex flex-col gap-4 flex-1">
          <input
            type="text"
            id="name"
            placeholder="Name"
            maxlength="62"
            minlength="10"
            required=""
            className="border p-3 rounded-lg"
            value=""
          />
          <textarea
            type="text"
            id="description"
            placeholder="Description"
            required=""
            className="border p-3 rounded-lg"
          ></textarea>
          <input
            type="text"
            id="address"
            placeholder="Address"
            required=""
            className="border p-3 rounded-lg"
            value=""
          />
          <div className="flex gap-6 flex-wrap">
            <div className="flex gap-2">
              <input type="checkbox" id="sale" className="w-5" />
              <span>Sell</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="rent" className="w-5" checked="" />
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="parking" className="w-5" />
              <span>Parking spot</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="furnished" className="w-5" />
              <span>Furnished</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="offer" className="w-5" />
              <span>Offer</span>
            </div>
          </div>
          <div className="flex gap-6 flex-wrap">
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="bedrooms"
                min="1"
                max="10"
                required=""
                className="p-3 border border-gray-300 rounded-lg"
                value="1"
              />
              <p>Beds</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="bathrooms"
                min="1"
                max="10"
                required=""
                className="p-3 border border-gray-300 rounded-lg"
                value="1"
              />
              <p>Baths</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="regularPrice"
                min="50"
                max="10000000"
                required=""
                className="p-3 border border-gray-300 rounded-lg"
                value="0"
              />
              <div className="flex flex-col items-center">
                <p>Regular price </p>
                <span className="text-xs">($ / Month)</span>
              </div>
            </div>s
          </div>
        </div>
        <div className="flex flex-col flex-1 gap-4">
          <p className="font-semibold">
            Images:{" "}
            <span className="text-gray-600 font-normal">
              The first image will be the cover (max 6)
            </span>
          </p>
          <form className="flex gap-4">
            <input
              type="file"
              id="images"
              accept="image/*"
              multiple=""
              className="p-3 border border-gray-300 rounded w-full"
            />
            <button
              type="submit"
              className="p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80"
            >
              Upload
            </button>
          </form>
          <p className="text-red-700"></p>
          <button
            type="submit"
            className="p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
          >
            Create Listing
          </button>
        </div>
      </form>
    </main>
  );
}
