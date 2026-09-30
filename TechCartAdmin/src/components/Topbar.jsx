import { BiSearch } from "react-icons/bi";
import { RiShareBoxFill } from "react-icons/ri";
import { IoMdNotificationsOutline } from "react-icons/io";

const Topbar = () => {
  return (
    <div className="w-full border border-border py-3">
      <div className="w-[97%] mx-auto flex items-center justify-between">
        <div className="bg-canvas rounded-md relative py-1.5 px-3">
          <BiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-[#756b62]" />

          <input
            type="search"
            placeholder="Search orders, products, customers..."
            className="w-78 pl-7 text-[#756b62] placeholder:text-sm placeholder:text-[#756b62] outline-none bg-transparent"
          />
        </div>

        <div className="flex items-center gap-5">
          <div className="flex items-center gap-1.5">
            <RiShareBoxFill className="w-5 h-5" />
            <span className="font-semibold text-base">View store</span>
          </div>
          <div className="relative cursor-pointer">
            <div className="bg-canvas border border-border p-1.5 flex items-center relative justify-center rounded-md">
              <IoMdNotificationsOutline className="w-6.5 h-6.5 " />
            </div>
            <div className="w-2 h-2 rounded-full bg-chart-1 absolute right-2 top-1"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
