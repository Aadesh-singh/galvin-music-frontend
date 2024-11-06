import { NavLink } from "react-router-dom";
import LoadingButton from "../ui/LoadingButton";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import useCookie from "../hooks/useCookie";
import { fetchUserData, updateUserData } from "../store/thunk/userThunk";
import { CiEdit } from "react-icons/ci";

const Profile = () => {
  // let name = `${props.fName[0]}${props.lName[0]}`;
  const [profileIcon, setProfileIcon] = useState("?");
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    control,
    formState: { errors },
  } = useForm();
  const { status } = useSelector((state) => state.auth);

  const [isEdit, setIsEdit] = useState(false);
  const [userDetails, setUserDetails] = useState({});
  const [userId, setUserId, removeUserId] = useCookie("userId");
  console.log("userId: ", userId);
  useEffect(() => {
    async function fetchUserDetails() {
      try {
        console.log("userId: ", userId);
        const response = await dispatch(fetchUserData({ id: userId }));
        console.log("fetched userdata", response.payload.user);
        setUserDetails(response.payload.user);
        console.log(
          "profle icon: ",
          `${response.payload.user.firstName[0].toUpperCase()}${response.payload.user.lastName[0].toUpperCase()}`
        );
        setProfileIcon(
          `${response.payload.user.firstName[0].toUpperCase()}${response.payload.user.lastName[0].toUpperCase()}`
        );
        if (userDetails) {
          setValue("firstName", userDetails.firstName || "");
          setValue("lastName", userDetails.lastName || "");
          setValue("phoneNumber", userDetails.phoneNumber || "");
          setValue("email", userDetails.email || "");
        }
      } catch (error) {}
    }
    fetchUserDetails();
  }, [userId, dispatch, setValue]);

  const [coverPreview, setCoverPreview] = useState(null);

  const handleCoverPhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCoverPreview(URL.createObjectURL(file)); // Generate preview URL
    }
  };

  const submitHandler = async (data) => {
    console.log("data", data);
    try {
      const formData = new FormData();
      formData.append("firstName", data.firstName);
      formData.append("lastName", data.lastName);
      formData.append("phoneNumber", data.phoneNumber);
      formData.append("email", data.email);
      if (data.profilePhoto) {
        formData.append("profilePhoto", data.profilePhoto[0]); // Assuming `data.profilePhoto` is an array of files
      }

      let res = await dispatch(updateUserData(formData)).unwrap();
      console.log("res: ", res);
      if (res.status === 200) {
        let response = await dispatch(fetchUserData(data)).unwrap();
        console.log("user response: ", response);
        setUserDetails(response.user);
        console.log(
          "profle icon: ",
          `${response.user.firstName[0].toUpperCase()}${response.user.lastName[0].toUpperCase()}`
        );
        setProfileIcon(
          `${response.user.firstName[0].toUpperCase()}${response.user.lastName[0].toUpperCase()}`
        );
      }
      toast.success("Profile Updated Successfully.");
      setIsEdit(false);
    } catch (error) {
      console.log("Error in updating Profile", error);
      toast.error("Error in updating Profile: " + error.message);
    }
  };

  const enableEdit = () => {
    if (userDetails) {
      setValue("firstName", userDetails.firstName || "");
      setValue("lastName", userDetails.lastName || "");
      setValue("phoneNumber", userDetails.phoneNumber || "");
      setValue("email", userDetails.email || "");
    }
    setIsEdit((edit) => !edit);
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
              <span className="m-3">Profile</span>{" "}
            </h1>
            <div className="flex justify-center items-center relative">
              {!isEdit && (
                <div className="cursor-pointer flex mx-auto items-center justify-center px-[3.7rem] py-[2rem] w-16 rounded-full bg-galvin-grey text-white font-bold">
                  {profileIcon}
                </div>
              )}
              {isEdit && (
                <div
                  className={`flex flex-col justify-center items-start m-2 ${
                    coverPreview ? " " : "w-[40%]"
                  }`}
                >
                  <Controller
                    name="profilePhoto"
                    control={control}
                    rules={{ required: "Please select a cover photo" }}
                    render={({ field, fieldState: { error } }) => (
                      <>
                        <label
                          htmlFor="file-upload-cover"
                          className={`h-[100px] ${
                            coverPreview ? "w-[100px]" : "w-full"
                          }`}
                        >
                          {coverPreview ? (
                            <img
                              src={coverPreview}
                              alt="Cover Preview"
                              className="w-full h-full object-cover rounded-full"
                            />
                          ) : (
                            <div className="cursor-pointer w-[100px] h-[100px] flex mx-auto items-center justify-center px-[3.7rem] py-[2rem] rounded-full bg-galvin-grey text-white font-bold">
                              {profileIcon}
                            </div>
                          )}
                        </label>
                        <input
                          id="file-upload-cover"
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            handleCoverPhotoChange(e); // Handle cover photo change
                            field.onChange(e.target.files); // Update field value directly
                          }}
                        />
                        {error && (
                          <span className="text-red-500 mt-1">
                            {error.message}
                          </span>
                        )}
                      </>
                    )}
                  />
                </div>
              )}

              {!isEdit && (
                <div
                  onClick={enableEdit}
                  title="Enable Edit"
                  className="text-right text-xl flex justify-end px-5 absolute top-0 right-[2.75rem] cursor-pointer hover:text-galvin-green"
                >
                  <CiEdit />
                </div>
              )}
            </div>
          </div>

          <hr className="w-[80%] mx-auto my-[37px]" />
          {isEdit && (
            <div className="container text-sm">
              <form onSubmit={handleSubmit(submitHandler)}>
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
                  <div
                    onClick={() => setIsEdit(false)}
                    className="bg-galvin-grey cursor-pointer w-[60%] p-2 m-2 text-white font-extrabold border-0 border-white border-solid rounded-full"
                  >
                    Cancel
                  </div>
                  {/* </div> */}
                </div>
              </form>
            </div>
          )}
          {!isEdit && (
            <div className="container text-sm">
              <div className="flex w-full flex-wrap mx-auto justify-evenly">
                <div className="flex flex-col items-start m-2 w-[40%]">
                  <label htmlFor="firstName">First Name</label>
                  <div id="firstName" className="text-xl">
                    {userDetails.firstName}
                  </div>
                </div>
                <div className="flex flex-col items-start m-2 w-[40%]">
                  <label htmlFor="lastName">Last Name</label>
                  <div id="lastName" className="text-xl">
                    {userDetails.lastName}
                  </div>
                </div>
                <div className="flex flex-col items-start m-2 w-[40%]">
                  <label htmlFor="phno">Phone number</label>
                  <div id="phno" className="text-xl">
                    {userDetails.phoneNumber}
                  </div>
                </div>
                <div className="flex flex-col items-start m-2 w-[40%]">
                  <label htmlFor="email">Email</label>
                  <div id="email" className="text-xl">
                    {userDetails.email}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* </ModelLayout> */}
      {/* </LayoutGrad> */}
    </>
  );
};

export default Profile;
