import { NavLink } from "react-router-dom";
// import { FaMusic } from "react-icons/fa6";

import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { uploadSong } from "../store/thunk/authThunk";
import { toast } from "react-toastify";
import LoadingButton from "../ui/LoadingButton";

const CreatePlaylist = () => {
  const dispatch = useDispatch();
  const {
    register,
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();
  const { status } = useSelector((state) => state.auth);
  const [hashTagList, sethashTagList] = useState([]);

  //hashtag
  const addHashTag = (e) => {
    e.preventDefault();
    const newHashTag = e.target.value.trim();
    if (newHashTag && !hashTagList.includes(newHashTag)) {
      const updatedList = [...hashTagList, newHashTag];
      sethashTagList(updatedList);
      setValue("hashtag", updatedList); // Update form value
      e.target.value = ""; // Clear input field
    }
  };

  const removeHashTag = (item) => {
    const updatedList = hashTagList.filter((lyric) => lyric !== item);
    sethashTagList(updatedList);
    setValue("hashtag", updatedList);
  };

  const submitHandler = async (data) => {
    console.log("data", data);

    // Create a FormData object and append each field
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("hashtag", JSON.stringify(data.hashtag)); // Convert array to JSON string
    formData.append("description", data.description);

    if (data.song) {
      formData.append("song", data.song[0]); // Assuming `data.song` is an array of files
    }

    try {
      //   await dispatch(uploadSong(formData)).unwrap();
      toast.success("Playlist Created Successfully.");
      reset();
      sethashTagList([]);
    } catch (error) {
      console.log("Error in creating Playlist", error);
      toast.error("Error in creating Playlist: " + error.message);
    }
  };
  return (
    <>
      {/* <LayoutGrad> */}
      {/* <ModelLayout> */}
      <div className="container">
        <div className="container image-container text-center">
          <div className="image-box w-[60px] h-[60px] mx-auto">
            <img
              src="/music-512-removebg-preview.png"
              className="w-[100%] h-[100%]"
              alt="logo"
            />
          </div>
          <div className="text-2xl font-extrabold title-box">
            <h1 className="flex justify-center items-center">
              {/* <span className="m-3">
                  <FaMusic />
                </span> */}
              <span className="m-3">Create Playlist</span>{" "}
              {/* <span className="m-3">
                  <FaMusic />
                </span> */}
            </h1>
          </div>

          <hr className="w-[80%] mx-auto my-[37px]" />

          <div className="container text-sm">
            <form
              onSubmit={handleSubmit(submitHandler)}
              encType="multipart/form-data"
            >
              <div className="flex w-full flex-wrap mx-auto justify-evenly">
                <div className="flex flex-col items-start m-2 w-[60%]">
                  <label htmlFor="palylist_name">Playlist Name*</label>
                  <input
                    type="text"
                    id="palylist_name"
                    {...register("name", { required: true })}
                    placeholder="Enter Song Name"
                    className="w-full p-2 rounded-md text-black"
                  />
                  {errors.name && (
                    <span className="text-err text-sm">
                      Playlist Name is required.
                    </span>
                  )}
                </div>
                {/* hashtag */}
                <div className="flex flex-col items-start m-2 w-[60%]">
                  <label htmlFor="hashtag">Hashtags(if any)</label>
                  <input
                    type="text"
                    id="hashtag"
                    placeholder="For search: #party #sad"
                    onBlur={(e) => addHashTag(e)}
                    className="w-full p-2 rounded-md text-black"
                    onKeyDown={(e) => e.key === "Enter" && addHashTag(e)} // Add on Enter
                  />

                  <div className="mt-2 flex justify-start items-center flex-wrap">
                    {hashTagList.map((item, index) => (
                      <span
                        key={index}
                        className="bg-galvin-green text-black p-1 mr-2 mb-2 rounded flex items-center"
                      >
                        <span>{item}</span>
                        <button
                          onClick={() => removeHashTag(item)}
                          className="ml-1 text-red-500"
                        >
                          x
                        </button>
                      </span>
                    ))}
                  </div>
                  {/* Hidden Controller to track lyricsby in form data */}
                  <Controller
                    name="hashtag"
                    control={control}
                    render={() => null}
                  />
                </div>
                {/* Album Description */}
                <div className="flex flex-col items-start m-2 w-[60%]">
                  <label htmlFor="description">Playlist Description*</label>
                  <textarea
                    id="description"
                    {...register("description", { required: true })}
                    placeholder="description"
                    className="w-full p-2 rounded-md  text-black min-h-[120px]"
                  />
                  {errors.description && (
                    <span className="text-err text-sm">
                      Playlist Description is required.
                    </span>
                  )}
                </div>

                <button
                  className="bg-galvin-green w-[60%] p-2 m-2 text-black font-extrabold border-0 border-white border-solid rounded-full"
                  type="submit"
                >
                  {status === "loading" ? <LoadingButton /> : "Create Playlist"}
                </button>
                {/* <div className="text-[#575656] m-7"> */}
                <NavLink
                  to={"/settings"}
                  className="bg-galvin-grey w-[60%] p-2 m-2 text-white font-extrabold border-0 border-white border-solid rounded-full"
                >
                  Cancel
                </NavLink>
                {/* </div> */}
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* </ModelLayout> */}
      {/* </LayoutGrad> */}
    </>
  );
};

export default CreatePlaylist;
