import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import {getDownloadURL, getStorage,ref, uploadBytesResumable} from 'firebase/storage'
import {app} from '../firebase'
function Profile() {
  const fileInput = React.useRef(null)
  const {currentUser} = useSelector(state => state.user)
  const [file, setFile] = useState(null)
  const [progress, setProgress] = useState(0)
  const [fileUploadError, setFileUploadError] = useState('')
  const [formData, setFormData] = useState({
    
  })
  


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


  return (
    <div  className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form  className='flex flex-col gap-2' action="">

         <input type='file' ref={fileInput} hidden  onChange={(e) => setFile(e.target.files[0])} />
        <img  accept='image/*' cursor='pointer'  onClick={() => fileInput.current.click()} src={formData.avatar ||currentUser.avatar} alt="profile"
         className="rounded-full w-24 h-24 obeject-cover cusrsor-pointer self-center mt-2"/>


   <p className='text-sm text-center'>
  

  {fileUploadError ? (<span className='text-red-700'>{fileUploadError}</span>)  : progress >0 && progress < 100  ? (<span className='text-slate-700'> Uploading {progress}%</span>) : progress === 100 ? (<span className='text-green-700'>File uploaded successfully</span>) : null }







   </p>




        
       <input type="text" placeholder='Username' className='border rounded-lg p-2 my-2' />
       <input type="email" placeholder='Email' className='border rounded-lg p-2 my-2' />
       <input type="password" placeholder='Password' className='border rounded-lg p-2 my-2' />


       <button className='bg-blue-700 text-white rounded-lg p-2 my-2 uppercase hover:opcacity-95  disabled:opacity-80'>Update</button>
      </form>
      <div className='flex justify-between mt-5'>
        <span className='text-red-700 cursor-pointer'>Delete Account</span>
        <span className='text-red-700 cursor-pointer'>Sign out</span>
      </div>
    </div>
  )
}

export default Profile
