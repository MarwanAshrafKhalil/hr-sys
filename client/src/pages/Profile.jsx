import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";

export default function Profile() {
  const fileRef = useRef(null);
  const [image, setImage] = useState(undefined);
  const [imagePercentage, setImagePercentage] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [formData, setFormData] = useState({});

  console.log(formData);

  const { currentUser } = useSelector((state) => state.employee);
  useEffect(() => {
    if (image) {
      handleFileUpload(image);
    }
  }, [image]);

  async function handleFileUpload(image) {
    console.log(image);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImagePercentage(Math.round(progress));
        // console.log("Upload is " + progress + "% done");
      },
      (error) => {
        setImageError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...FormData, profilePicture: downloadURL })
        );
      }
    );
  }

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7 ">Profile</h1>
      <form className="flex flex-col gap-4">
        <input
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <img
          className=" w-15 h-15 mt-2 self-center cursor-pointer rounded-full object-cover"
          src={currentUser.profilePicture}
          alt="profile"
          onClick={() => fileRef.current.click()}
        />
        <p className=" text-sm self-center">
          {imageError ? (
            <span className="text-red-700">Error Uploading</span>
          ) : imagePercentage > 0 && imagePercentage < 100 ? (
            <span>{`Uploading... ${imagePercentage}%`}</span>
          ) : imagePercentage === 100 ? (
            <span className=" text-green-700">
              {"Image uploaded Successfully"}
            </span>
          ) : (
            ""
          )}
        </p>
        <input
          type="text"
          defaultValue={currentUser.username}
          id="username"
          placeholder="Username"
          className="bg-slate-100 rounded-lg p-3"
        />
        <input
          type="text"
          defaultValue={currentUser.email}
          id="email"
          placeholder="email"
          className="bg-slate-100 rounded-lg p-3"
        />
        <input
          type="password"
          id="password"
          placeholder="password"
          className="bg-slate-100 rounded-lg p-3"
        />
        <button className=" bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
          Update
        </button>
      </form>
      <div className=" flex justify-between mt-5">
        <span className=" text-red-700 cursor-pointer">Delete Account</span>
        <span className=" text-red-700 cursor-pointer">Sign out</span>
      </div>
    </div>
  );
}
