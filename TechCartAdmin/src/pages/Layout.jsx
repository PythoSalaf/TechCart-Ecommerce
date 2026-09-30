import { Outlet } from "react-router"; // "react-router-dom" on v6
import { Sidebar, Topbar } from "./../components";

const Layout = () => {
  return (
    <div className="w-full flex items-start">
      <aside className="hidden md:block bg-charcoal text-cream fixed h-screen md:w-[16%]">
        <Sidebar />
      </aside>
      <main className="w-full min-h-screen bg-white ml-auto md:w-[84%]">
        <Topbar />
        <div className="w-[97%] mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;
