import toast from "react-hot-toast";
import { logOut } from "../redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const user = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logOut());
    toast.success("successfully logged out");
  };

  return (
    <div>
      <h1 className="bg-neutral text-neutral-content text-5xl font-semibold text-center py-5">
        Gift Shop Management
      </h1>
      <div className="flex justify-center gap-5 bg-neutral pb-5">
        {user?.user && (
          <div className="">
            <div className="flex gap-2 items-center">
              <h3 className="text-neutral-content text-2xl font-semibold">
                {user?.user?.name}
              </h3>
              <button
                onClick={handleLogout}
                className="btn btn-outline text-neutral-content btn-sm"
              >
                Logout
              </button>
            </div>
            <div className=" flex justify-center gap-2 mt-4">
              <NavLink className="btn btn-outline text-white btn-sm" to="/">
                Home
              </NavLink>
              <NavLink
                className="btn btn-outline text-white btn-sm"
                to="/inventory"
              >
                Inventory
              </NavLink>
              <NavLink
                className="btn btn-outline text-white btn-sm"
                to="/add-product"
              >
                Add Product
              </NavLink>
              <NavLink
                className="btn btn-outline text-white btn-sm"
                to="/sell-history"
              >
                Sell History
              </NavLink>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
