import { Fragment } from "react";

const LayoutGrad = (props) => {
  return (
    <Fragment>
      <div className="bg-gradient-to-b from-neutral-800 to-zinc-950 p-12 min-h-screen">
        {props.children}
      </div>
    </Fragment>
  );
  //   return <>{props.children}</>;
};

export default LayoutGrad;
