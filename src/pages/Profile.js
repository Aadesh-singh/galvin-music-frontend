import { NavLink } from "react-router-dom";
import LoadingButton from "../ui/LoadingButton";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

const Profile = () => {
  // let name = `${props.fName[0]}${props.lName[0]}`;
  let name = `AS`;
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
          <div className="text-5xl font-extrabold title-box">
            <h1 className="flex justify-center items-center">
              {/* <span className="m-3">
                    <FaMusic />
                  </span> */}
              <span className="m-3">Profile</span>{" "}
              {/* <span className="m-3">
                    <FaMusic />
                  </span> */}
            </h1>
            <div className="cursor-pointer flex mx-auto items-center justify-center px-[3.7rem] py-[2rem] w-16 rounded-full bg-galvin-grey text-white font-bold">
              {name.toUpperCase()}
            </div>
          </div>

          <hr className="w-[80%] mx-auto my-[37px]" />

          <div className="container text-sm">
            <form
              onSubmit={handleSubmit(submitHandler)}
              encType="multipart/form-data"
            >
              <div className="flex w-full flex-wrap mx-auto justify-evenly">
                <div className="flex flex-col items-start m-2 w-[40%]">
                  <label htmlFor="firstName">First Name*</label>
                  <input
                    type="text"
                    id="firstName"
                    {...register("firstName", { required: true })}
                    placeholder="Enter First Name"
                    className="w-full p-2 rounded-md text-black"
                  />
                  {errors.firstName && (
                    <span className="text-err text-sm">
                      First Name is required.
                    </span>
                  )}
                </div>
                <div className="flex flex-col items-start m-2 w-[40%]">
                  <label htmlFor="lastName">Last Name*</label>
                  <input
                    type="text"
                    id="lastName"
                    {...register("lastName", { required: true })}
                    placeholder="Enter Last Name"
                    className="w-full p-2 rounded-md text-black"
                  />
                  {errors.lastName && (
                    <span className="text-err text-sm">
                      Last Name is required.
                    </span>
                  )}
                </div>
                <div className="flex flex-col items-start m-2 w-[40%]">
                  <label htmlFor="phno">Phone number*</label>
                  <input
                    type="number"
                    id="phno"
                    name="phoneNumber"
                    {...register("phoneNumber", {
                      required: true,
                      maxLength: 12,
                    })}
                    placeholder="Enter Phone number"
                    className="w-full p-2 rounded-md  text-black cursor-not-allowed"
                    disabled
                  />
                  {errors.phoneNumber && (
                    <div>
                      {errors.phoneNumber.type === "required" && (
                        <span className="text-err text-sm">
                          Phone Number is required.
                        </span>
                      )}
                      {errors.phoneNumber.type === "maxLength" && (
                        <span className="text-err text-sm">
                          Phone number should be max 12 digits
                        </span>
                      )}
                    </div>
                  )}
                </div>
                <div className="flex flex-col items-start m-2 w-[40%]">
                  <label htmlFor="email">Email*</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    {...register("email", {
                      required: true,
                      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    })}
                    placeholder="Enter Email"
                    className="w-full p-2 rounded-md  text-black cursor-not-allowed"
                    disabled
                  />
                  {errors.email && (
                    <span className="text-err text-sm">
                      Enter a Valid email
                    </span>
                  )}
                </div>

                <button
                  className="bg-galvin-green w-[60%] p-2 m-2 text-black font-extrabold border-0 border-white border-solid rounded-full"
                  type="submit"
                >
                  {status === "loading" ? <LoadingButton /> : "Update"}
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

export default Profile;
