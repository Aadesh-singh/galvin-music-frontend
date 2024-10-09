const SocialButton = (props) => {
  const types = {
    google: "/google.png",
    facebook: "/facebook.png",
  };
  return (
    <button
      type={props.type}
      className={`${props.className} min-w-[70%] inline-flex justify-between items-center mt-2 border-2 py-[10px] px-[1.5rem] ml-2 rounded-full border-white border-solid`}
      onClick={props.onClick}
    >
      <div className="w-[25px] h-[25px] basis-1/4">
        <img
          src={types[props.socialType]}
          alt={props.socialType}
          className="w-full h-full object-contain"
        />
      </div>
      <div className="mx-6 text-center basis-3/4">{props.name}</div>
    </button>
  );
};

export default SocialButton;
