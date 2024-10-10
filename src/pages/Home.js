import { Fragment } from "react";
import CurrentSong from "../components/CurrentSong";
import Header from "../components/Header";
import MainContent from "../components/MainContent";
import Sidebar from "../components/Sidebar";

const Home = () => {
  return (
    <Fragment>
      <Header />
      <section className="flex justify-between items-start bg-neutral-950 text-white min-h-[75vh]">
        <Sidebar className="basis-1/4 h-[70vh] overflow-auto" />
        <MainContent className="basis-3/4 h-[70vh] overflow-auto" />
      </section>
      <CurrentSong />
    </Fragment>
  );
};

export default Home;
