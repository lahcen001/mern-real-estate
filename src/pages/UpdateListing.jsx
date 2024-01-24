import React, { useEffect, useState } from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { useNavigate, useParams } from "react-router-dom";
import { app } from "../firebase";
export default function UpdateListing() {
  const [file, setFile] = useState([]);
  const [uploadImageError, setUploadImageError] = useState(false);
  const [progress, setProgress] = useState(0);
  const [uploadImage, setUploadImage] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
   const params = useParams();
  const [formdata, setFormData] = useState({
    imagesUrl: [],
    name: "",
    description: "",
    address: "",
    bedrooms: 1,
    bathrooms: 1,
    furnished: false,
    regularPrice: "",
    DiscountPrice: "",
    offer: false,
    parking: false,
    type: "sell",
  });
  const [loading, setLoading] = useState(false);

  const handleImageUpload = (e) => {
    setUploadImage(true);
    setUploadImageError("");
    e.preventDefault();
    if (file.length > 0 && file.length < 7) {
      const promies = [];
      for (let i = 0; i < file.length; i++) {
        promies.push(storeImage(file[i]));
      }

      Promise.all(promies)
        .then((urls) => {
          setFormData({
            ...formdata,
            imagesUrl: urls,
          });
          setUploadImage(false);
          setUploadImageError(false);
        })
        .catch((error) => {
          setUploadImage(false);
          setUploadImageError("image upload failed (2mb max per image)");
        });
    } else {
      setUploadImage(false);
      setUploadImageError("image upload failed (2mb max per image)");
    }
  };

  const storeImage = async (image) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + image.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, image);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );

          setProgress(progress);

          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },

        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const deleteImage = (index) => {
    setFormData({
      ...formdata,
      imagesUrl: formdata.imagesUrl.filter((_, i) => i !== index),
    });
  };

  const handleChange = (e) => {
    if (e.target.id === "sale" || e.target.id === "rent") {
      setFormData({
        ...formdata,
        type: e.target.id,
      });
    }
    if (
      e.target.id === "furnished" ||
      e.target.id === "parking" ||
      e.target.id === "offer"
    ) {
      setFormData({
        ...formdata,
        [e.target.id]: e.target.checked,
      });
    }

    if (
      e.target.type === "number" ||
      e.target.type === "text" ||
      e.target.type === "textarea"
    ) {
      setFormData({
        ...formdata,
        [e.target.id]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
   
    e.preventDefault();

    try {
      // if(formdata.imagesUrl.length < 1 ) return setError("You must upload at least image");
      setLoading(true);
      setError(false);
      const res = await fetch("http://localhost:3000/api/listining/update/"+params.id, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
        body: JSON.stringify(formdata),
      });

      const data = await res.json();

      setLoading(false);
      if (data.success === false) return setError(data.message);
      navigate("/listings/" + data._id);
    } catch {
      setLoading(false);
      setError(true);
    }
  };


useEffect (() => {
   
  
  GetListing();

}, []);



const GetListing = async () => {

  
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
  if (data.length < 1) return;
  setFormData(data);
};

  return (
    <main className="max-w-4xl p-3 mx-auto">
      <h1 className="text-3xl text-center my-7 font-bold">Update Listing</h1>
      <form className="flex gap-4 sm:flex-row flex-col">
        <div className="flex flex-col gap-4 flex-1">
          <input
            type="text"
            id="name"
            placeholder="Name"
            required=""
            className="border p-3 rounded-lg"
            value={formdata.name}
            onChange={handleChange}
          />
          <textarea
            type="text"
            id="description"
            placeholder="Description"
            required=""
            className="border p-3 rounded-lg"
            value={formdata.description}
            onChange={handleChange}
          />
          <input
            type="text"
            id="address"
            placeholder="Address"
            required=""
            className="border p-3 rounded-lg"
            value={formdata.address}
            onChange={handleChange}
          />
          <div className="flex gap-6 flex-wrap">
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="sale"
                className="w-5"
                checked={formdata.type === "sale"}
                onChange={handleChange}
              />
              <span>Sell</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="rent"
                className="w-5"
                checked={formdata.type === "rent"}
                onChange={handleChange}
              />
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="parking"
                checked={formdata.parking}
                onChange={handleChange}
                className="w-5"
              />
              <span>Parking spot</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="furnished"
                checked={formdata.furnished}
                onChange={handleChange}
                className="w-5"
              />
              <span>Furnished</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="offer"
                checked={formdata.offer}
                onChange={handleChange}
                className="w-5"
              />
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
                onChange={handleChange}
                value={formdata.bedrooms}
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
                onChange={handleChange}
                value={formdata.bathrooms}
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
                onChange={handleChange}
                value={formdata.regularPrice}
              />
              <div className="flex flex-col items-center">
                <p>Regular price </p>
                <span className="text-xs">($ / Month)</span>
              </div>
            </div>
            {formdata.offer && (
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  id="DiscountPrice"
                  min="50"
                  max="10000000"
                  required=""
                  className="p-3 border border-gray-300 rounded-lg"
                  onChange={handleChange}
                  value={formdata.discountedPrice}
                />
                <div className="flex flex-col items-center">
                  <p>Discount price </p>
                  <span className="text-xs">($ / Month)</span>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col flex-1 gap-4">
          <p className="font-semibold">
            Images:{" "}
            <span className="text-gray-600 font-normal">
              The first image will be the cover (max 6)
            </span>
          </p>
          <div className="flex gap-4">
            <input
              type="file"
              id="images"
              accept="image/*"
              onChange={(e) => setFile(e.target.files)}
              multiple
              className="p-3 border border-gray-300 rounded w-full"
            />
            <button
              onClick={(e) => handleImageUpload(e)}
              className="p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80"
            >
              {uploadImage ? "Uploading... " : "Upload"}
            </button>
          </div>
          <p className="text-red-700"></p>
          <button
            type="submit"
            className="p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
            onClick={handleSubmit}
          >
            {loading ? "Uploading..." : "Create Listing"}
          </button>
          <p className="text-red-700"> {uploadImageError}</p>
          {formdata.imagesUrl.length > 0 &&
            formdata.imagesUrl.map((url, i) => (
              <div key={i} className="flex justify-between p-3  items-center  ">
                <img
                  key={i}
                  src={url}
                  alt=""
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <button
                  onClick={() => deleteImage(i)}
                  className="text-red-700 uppercase hover:opacity-60 rounded-lg"
                >
                  delete
                </button>
              </div>
            ))}
        </div>
      </form>
    </main>
  );
}
