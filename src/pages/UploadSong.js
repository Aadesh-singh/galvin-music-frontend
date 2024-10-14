import { NavLink } from "react-router-dom";
import ModelLayout from "../ui/ModelLayout";
import LayoutGrad from "../ui/LayoutGrad";
import { FaMusic } from "react-icons/fa6";

import { useState } from "react";

const UploadSong = () => {
  const [fileName, setFileName] = useState("");

  // Handle file selection
  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setFileName(e.target.files[0].name);
    }
  };

  const submitHandler = (event) => {
    event.preventDefault();
  };
  return (
    <>
      <LayoutGrad>
        <ModelLayout>
          <div className="container">
            <div className="container image-container text-center">
              <div className="image-box w-[60px] h-[60px] mx-auto">
                <img
                  src="/music-512-removebg-preview.png"
                  className="w-[100%] h-[100%]"
                  alt="logo"
                />
              </div>
              <div className="text-3xl font-extrabold title-box">
                <h1 className="flex justify-center items-center">
                  <span className="m-3">
                    <FaMusic />
                  </span>
                  <span className="m-3">Upload Song</span>{" "}
                  <span className="m-3">
                    <FaMusic />
                  </span>
                </h1>
              </div>

              <hr className="w-[80%] mx-auto my-[37px]" />

              <div className="container">
                <form onSubmit={submitHandler}>
                  <div className="flex flex-col w-[50%] mx-auto">
                    <div className="flex flex-col items-start m-2 w-full">
                      <label htmlFor="song_name">Song Name*</label>
                      <input
                        type="text"
                        id="song_name"
                        placeholder="Enter Song Name"
                        className="w-full p-2 rounded-md  text-black"
                      />
                    </div>
                    {/* Author */}
                    <div className="flex flex-col items-start m-2 w-full">
                      <label htmlFor="author">Lyrics By*</label>
                      <input
                        type="text"
                        id="author"
                        placeholder="Lyrics by"
                        className="w-full p-2 rounded-md  text-black"
                      />
                    </div>
                    {/* Music by */}
                    <div className="flex flex-col items-start m-2 w-full">
                      <label htmlFor="music_by">Music By*</label>
                      <input
                        type="text"
                        id="music_by"
                        placeholder="Music by"
                        className="w-full p-2 rounded-md  text-black"
                      />
                    </div>
                    {/* Singer's NOTE: MUST BE ARRAY */}
                    <div className="flex flex-col items-start m-2 w-full">
                      <label htmlFor="singer">Singer(s)*</label>
                      <input
                        type="text"
                        id="singer"
                        placeholder="Singer(s)"
                        className="w-full p-2 rounded-md  text-black"
                      />
                    </div>
                    {/* Lyrics */}
                    <div className="flex flex-col items-start m-2 w-full">
                      <label htmlFor="lyrics">Lyrics*</label>
                      <textarea
                        id="lyrics"
                        placeholder="Lyrics"
                        className="w-full p-2 rounded-md  text-black"
                      ></textarea>
                    </div>
                    <div className="flex flex-col items-start m-2 w-full">
                      {/* Song Upload */}
                      {/* Custom upload button and hidden file input */}
                      <label
                        htmlFor="file-upload"
                        className="bg-galvin-grey text-white w-full  p-2 rounded-md cursor-pointer hover:bg-gray-700"
                      >
                        {fileName
                          ? `Selected: ${fileName}`
                          : "Choose a song to upload*"}
                      </label>
                      <input
                        id="file-upload"
                        type="file"
                        accept="audio/*"
                        className="hidden"
                        onChange={handleFileChange}
                      />
                    </div>

                    <button
                      className="bg-galvin-green w-full p-2 m-2 text-black font-extrabold border-0 border-white border-solid rounded-full"
                      type="submit"
                    >
                      Continue
                    </button>
                    {/* <div className="text-[#575656] m-7"> */}
                    <NavLink
                      to={"/"}
                      className="bg-galvin-grey w-full p-2 m-2 text-white font-extrabold border-0 border-white border-solid rounded-full"
                    >
                      Cancel
                    </NavLink>
                    {/* </div> */}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </ModelLayout>
      </LayoutGrad>
    </>
  );
};

export default UploadSong;
