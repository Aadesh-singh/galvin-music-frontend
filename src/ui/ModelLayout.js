const ModelLayout = (props) => {
  return (
    <div className="shadow-lg w-[80%] min-h-[80vh] mx-auto bg-neutral-950 rounded-lg p-5 text-white">
      {props.children}
    </div>
  );
};

export default ModelLayout;
