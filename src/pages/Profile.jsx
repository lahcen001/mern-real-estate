import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import {getDownloadURL, getStorage,ref, uploadBytesResumable} from 'firebase/storage'
import {app} from '../firebase'

import {updateUserStart, updateUserSuccess, updateUserFailure ,deleteUserStart, deleteUserSuccess, deleteUserFailure  } from '../redux/user/userSlice';
import {useDispatch} from 'react-redux';
import {Link, Navigate} from 'react-router-dom'

function Profile() {
  const fileInput = React.useRef(null)
  const {currentUser} = useSelector(state => state.user)
  const [file, setFile] = useState(null)
  const [progress, setProgress] = useState(0)
  const [fileUploadError, setFileUploadError] = useState('')
  const [formData, setFormData] = useState({
    
  })
  const [userListings, setUserListings] = useState([])
  
const dispatch = useDispatch()

 useEffect(() => {
  if(file) {
   handleFileUpload(file)
  }
  }
  , [file])

const handleFileUpload = (file) => {
  const storage  = getStorage(app)
  const fileName = new Date().getTime() + file.name
  
  const storageRef = ref(storage, fileName)
 const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on('state_changed', (snapshot) => {
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    setProgress(Math.round(progress));
  },
  (error)=>{
    setFileUploadError(error)
  },
  ()=>{
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      setFormData({...formData, avatar: downloadURL})
    })
  } )
    
}

const handleChange =   (e) =>{
  setFormData({...formData, [e.target.id]: e.target.value})


 
}
const handleSubmit =async (e) =>{
  e.preventDefault()



  try {
    dispatch(updateUserStart())

const res  =  await fetch('http://localhost:3000/api/user/update/'+currentUser._id, {
  method: 'put',
  headers: {
    'Content-Type': 'application/json',
    'credentials': 'include',
    'mode': 'cors'
       
  },
  body: JSON.stringify(formData)
})

const data = await res.json()
if(data.succes ==false){
  dispatch(updateUserFailure(data.message))
}


  }catch(error){
    dispatch(updateUserFailure(error))
  }
}



const DeleteAccount = async (e) =>{
   


  try {
    dispatch(deleteUserStart())
    const res  =  await fetch('http://localhost:3000/api/user/delete/'+currentUser._id, {
      mothod: 'delete',
      headers: {
        'Content-Type': 'application/json'
      },
      
      }

   )

   const data  = await res.json()
   if (data.success === false){
   return  dispatch(deleteUserFailure(data.message))
   }

   dispatch(deleteUserSuccess(data))

}catch(error){
  dispatch(deleteUserFailure(error))
}
}


const SignOut = async (e) => {
  
  try {



    dispatch(deleteUserStart())
    const res  =  await fetch('http://localhost:3000/api/auth/signout', {
      mothod: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    }
   )

localStorage.clear();
window.location.reload(false);

}catch(error){
  
  dispatch(deleteUserFailure(error))
}

}
const handleshowListings = async (e) =>{
  
try {
  const res  =  await fetch('http://localhost:3000/api/user/listings/'+currentUser._id, {
    mothod: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
  }
)
const data = await res.json()
setUserListings(data)



}catch(error){
  console.log(error)
}


}

const handleDelete = async (id) =>{
  

  try{
    const res = await fetch(
      "http://localhost:3000/api/listining/delete/" + id,
      {
        mothod: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await res.json()
    setUserListings(userListings.filter((item) => item._id !== id));
    if(data.success === false){
      return console.log(data.message)
    }
  }
  catch(error){
    console.log(error)
  }
}

const EditListing = (id) => {
  console.log(id)
  navigate(`/update-listing/${id}`)
}



  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2" action="">
        <input
          type="file"
          ref={fileInput}
          hidden
          onChange={(e) => setFile(e.target.files[0])}
        />
        <img
          accept="image/*"
          cursor="pointer"
          onClick={() => fileInput.current.click()}
          src={formData.avatar || currentUser.avatar}
          alt="profile"
          className="rounded-full w-24 h-24 obeject-cover cusrsor-pointer self-center mt-2"
        />

        <p className="text-sm text-center">
          {fileUploadError ? (
            <span className="text-red-700">{fileUploadError}</span>
          ) : progress > 0 && progress < 100 ? (
            <span className="text-slate-700"> Uploading {progress}%</span>
          ) : progress === 100 ? (
            <span className="text-green-700">File uploaded successfully</span>
          ) : null}
        </p>

        <input
          id="username"
          defaultValue={currentUser.username}
          onChange={(e) => handleChange(e)}
          type="text"
          placeholder="Username"
          className="border rounded-lg p-2 my-2"
        />
        <input
          id="email"
          defaultValue={currentUser.email}
          onChange={(e) => handleChange(e)}
          type="email"
          placeholder="Email"
          className="border rounded-lg p-2 my-2"
        />
        <input
          id="password"
          defaultValue={currentUser.password}
          onChange={(e) => handleChange(e)}
          type="password"
          placeholder="Password"
          className="border rounded-lg p-2 my-2"
        />

        <button
          type="submit"
          className="bg-blue-700 text-white rounded-lg p-2 my-2 uppercase hover:opcacity-95  disabled:opacity-80"
        >
          Update
        </button>

        <Link
          className="bg-green-700 text-center  text-white uppercase rounded-lg p-2 "
          to={`/create/${currentUser._id}`}
        >
          {" "}
          Create listining
        </Link>
      </form>
      <div className="flex justify-between mt-5">
        <button onClick={DeleteAccount} className="text-red-700 cursor-pointer">
          Delete Account
        </button>
        <button onClick={SignOut} className="text-red-700 cursor-pointer">
          Sign out
        </button>
      </div>

      {/* <p className='text-red-700 mt-5'>{error ? error : ''}</p> */}

      <div className="mt-5 flex justify-center">
        <button onClick={handleshowListings} className="text-green-700 ">
          Show Listings
        </button>
      </div>
      {userListings.length > 0 && (
        <div className="flex justify-center text-lg gap-6 mt-6 h-10 ">
          <h1 className="text-2xl">Listings list</h1>
        </div>
      )}
      <div className="gap-5">
        <div>
          {userListings.length > 0 &&
            userListings.map((listing) => (
              <div
                key={listing._id}
                className="mt-5 flex justify-between items-center m-auto my-4 border rounded-lg "
              >

                <Link to={`/listing/${listing._id}`}>
                  <img
                    src={
                      listing.imagesUrl.length > 0 ? listing.imagesUrl[0] : ""
                    }
                    className="rounded-lg h-16 w-16  object-contain"
                    alt=""
                  />
                </Link>

                <Link
                  className="text-slate-700 hover:underline "
                  to={`/listings/${listing._id}`}
                >
                  {" "}
                  {listing.name}
                </Link>

                <div className="flex  flex-col align-center">
                  <Link
                    to={"/update-listing/" + listing._id}
                    className="text-red-700 uppercase"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(listing._id)}
                    className="text-green-700 uppercase"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Profile
