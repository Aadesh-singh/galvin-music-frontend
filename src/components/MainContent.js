import { Outlet } from "react-router-dom";

const MainContent = (props) => {
  // const location = useLocation();
  // const queryParams = new URLSearchParams(location.search);

  return (
    <section
      className={`${props.className} side-container bg-galvin-bg m-2 p-5 rounded-md`}
    >
      <Outlet />
    </section>
  );
};

export default MainContent;
