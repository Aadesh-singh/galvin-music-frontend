const Settings = () => {
  return (
    <section id={"settings"} className="bg-neutral-950 p-6">
      <div className="">
        <h1 className="text-5xl py-5 text-white">Settings</h1>
        <hr />
      </div>
      <div className="flex justify-between items-start bg-neutral-950 text-white min-h-[75vh] p-5">
        <div className="basis-1/4 h-[70vh] overflow-auto">Sidebar</div>
        <div className="basis-3/4 h-[70vh] overflow-auto">Main Setting</div>
      </div>
    </section>
  );
};

export default Settings;
