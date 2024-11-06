import { NavLink } from "react-router-dom";
// import { FaMusic } from "react-icons/fa6";

import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
// import { uploadSong } from "../store/thunk/authThunk";
import { toast } from "react-toastify";
import LoadingButton from "../ui/LoadingButton";
import { albumTitleExist, createAlbum } from "../store/thunk/albumThunk";

const CreateAlbum = () => {
  const dispatch = useDispatch();
  const {
    register,
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isDirty },
  } = useForm();
  const { status } = useSelector((state) => state.album);
  const [hashTagList, sethashTagList] = useState([]);

  const [inputValue, setInputValue] = useState(""); // Local state for the immediate input value
  const [debouncedValue, setDebouncedValue] = useState(""); // State for the debounced value
  const [isTitleAvailable, setIsTitleAvailable] = useState(null); // State for the debounced value
  useEffect(() => {
    // Set up debounce
    const handler = setTimeout(() => {
      setDebouncedValue(inputValue); // Update debounced value after delay
    }, 500); // Adjust delay as needed

    // Clear timeout if input changes within delay period
    return () => clearTimeout(handler);
  }, [inputValue]);

  useEffect(() => {
    // Update form value in react-hook-form when debounced value changes
    setValue("name", debouncedValue);
    console.log("debounce of value: ", debouncedValue);

    async function abc(val) {
      try {
        if (val.trim() === "") return;
        let resp = await dispatch(albumTitleExist(val)).unwrap();
        console.log("respL ", resp);
        setIsTitleAvailable(resp.available);
      } catch (error) {
        console.log("Error: ", error);
      }
    }
    abc(debouncedValue);
  }, [debouncedValue, setValue, dispatch, setIsTitleAvailable]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value); // Update input value on every keystroke
  };

  const [coverPhotoName, setCoverPhotoName] = useState("");

  const handleCoverPhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCoverPhotoName(file.name);
    }
  };

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
    formData.append("hashtags", JSON.stringify(data.hashtag)); // Convert array to JSON string
    formData.append("description", data.description);

    if (data.coverPhoto) {
      formData.append("coverPhoto", data.coverPhoto[0]); // Assuming `data.coverphoto` is an array of files
    }

    try {
      await dispatch(createAlbum(formData)).unwrap();
      toast.success("Album Created Successfully.");
      reset();
      setInputValue("");
      setDebouncedValue("");
      setIsTitleAvailable(null);
      sethashTagList([]);
      setCoverPhotoName("");
    } catch (error) {
      console.log("Error in creating Album", error);
      toast.error("Error in creating Album: " + error.message);
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
              <span className="m-3">Create Album</span>{" "}
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
                  <label htmlFor="album_name">Album Name*</label>
                  <input
                    type="text"
                    id="album_name"
                    {...register("name", { required: true })}
                    placeholder="Enter Song Name"
                    className="w-full p-2 rounded-md text-black"
                    value={inputValue}
                    onChange={handleInputChange}
                  />
                  {errors.name && (
                    <span className="text-err text-sm">
                      Album Name is required.
                    </span>
                  )}
                  {isDirty && (
                    <span
                      className={`text-sm ${
                        isTitleAvailable ? "text-green-500" : "text-red-500"
                      }`}
                    >
                      {status === "loading" && (
                        <span>
                          <LoadingButton /> &nbsp; Checking
                        </span>
                      )}
                      {isTitleAvailable === null
                        ? ""
                        : isTitleAvailable
                        ? "Title is available"
                        : "Title is unavailable"}
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
                  <label htmlFor="description">Album Description*</label>
                  <textarea
                    id="description"
                    {...register("description", { required: true })}
                    placeholder="description"
                    className="w-full p-2 rounded-md  text-black min-h-[120px]"
                  />
                  {errors.description && (
                    <span className="text-err text-sm">
                      Album Description is required.
                    </span>
                  )}
                </div>
                {/* Cover Photo Upload */}
                <div className="flex flex-col items-start m-2 w-[40%]">
                  <Controller
                    name="coverPhoto"
                    control={control}
                    rules={{ required: "Please select a cover photo" }}
                    render={({ field, fieldState: { error } }) => (
                      <>
                        <label
                          htmlFor="file-upload-cover"
                          className="bg-galvin-grey text-white w-full p-2 rounded-md cursor-pointer hover:bg-gray-700"
                        >
                          {coverPhotoName
                            ? `Selected: ${coverPhotoName}`
                            : "Choose a cover photo*"}
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

                <button
                  className={`bg-galvin-green w-[60%] p-2 m-2 text-black font-extrabold border-0 border-white border-solid rounded-full ${
                    isTitleAvailable ? "cursor-pointer" : "cursor-not-allowed"
                  }`}
                  type="submit"
                  disabled={!isTitleAvailable}
                >
                  {status === "loading" ? <LoadingButton /> : "Create Album"}
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

export default CreateAlbum;
