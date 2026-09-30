import { BsCpu } from "react-icons/bs";
import { HiSquares2X2 } from "react-icons/hi2";
import { NavLink } from "react-router";
import { TbSettings } from "react-icons/tb";
import { BsBoxSeam } from "react-icons/bs";
import { GrShop } from "react-icons/gr";
import { RiGroupLine } from "react-icons/ri";
import { LuChartNoAxesCombined } from "react-icons/lu";
import { Avatar } from "../assets";

const NavItem = ({ to, icon: Icon, label, count }) => {
  return (
    <NavLink
      to={to}
      end={to === "/"}
      className={({ isActive }) =>
        `flex items-center text-base gap-3 w-full px-3 py-2 rounded-md transition-colors ${
          isActive ? "bg-[#453229]" : "hover:bg-[#352e29]"
        }`
      }
    >
      {({ isActive }) => (
        <>
          <Icon className={`h-5 w-5 ${isActive ? "text-[#D85A30]" : ""}`} />
          {label}
          {typeof count === "number" && count > 0 && (
            <span className="flex items-center justify-center rounded-2xl bg-chart-1 font-semibold text-xs py-0.5 px-2.5 animate-pulse">
              {count}
            </span>
          )}
        </>
      )}
    </NavLink>
  );
};

const Sidebar = () => {
  const orderCount = 12; // replace with real data

  return (
    <div className="w-full ">
      <div className="w-[90%] mx-auto py-2">
        <div className="flex items-center gap-2 ">
          <div className="flex items-center justify-center bg-chart-1 py-1.5  px-1.5 rounded-md">
            <BsCpu className="w-5 h-5" />
          </div>
          <h3 className="text-xl font-semibold">GadgetMart</h3>
        </div>

        <div className="mt-8 flex items-start flex-col gap-2">
          <NavItem to="/" icon={HiSquares2X2} label="Overview" />
          <NavItem to="/product" icon={BsBoxSeam} label="Product" />
          <NavItem
            to="/orders"
            icon={GrShop}
            label="Orders"
            count={orderCount}
          />
          <NavItem to="/customer" icon={RiGroupLine} label="Customers" />
          <NavItem
            to="/analytics"
            icon={LuChartNoAxesCombined}
            label="Analytics"
          />
          <NavItem to="/settings" icon={TbSettings} label="Settings" />
        </div>

        <div className="mt-8">
          <div className="w-full bg-[#352e29] py-2.5 rounded-lg ">
            <div className="w-[90%] mx-auto">
              <div className="flex items-center justify-between">
                <h4 className="text-sm text-[#9c9184]">Store Status </h4>
                <div className="bg-green-500 animate-pulse w-2 h-2 rounded-full"></div>
              </div>
              <h2 className="text-base font-semibold my-1.5">
                All system normal
              </h2>
              <h4 className="text-xs">Inventory synced 2m ago</h4>
            </div>
          </div>
        </div>
        <div className="fixed bottom-6 ">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full">
              <img
                src={Avatar}
                alt="profile-img"
                className="w-fit h-fit rounded-full"
              />
            </div>
            <div className="">
              <h2 className="">Maya Chen </h2>
              <p className="text-xs">Store Manager</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
