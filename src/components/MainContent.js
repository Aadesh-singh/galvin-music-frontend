import Playlist from "./Playlist";

const MainContent = (props) => {
  return (
    <section
      className={`${props.className} side-container bg-galvin-bg m-2 p-5 rounded-md`}
    >
      <Playlist />
    </section>
  );
};

export default MainContent;
