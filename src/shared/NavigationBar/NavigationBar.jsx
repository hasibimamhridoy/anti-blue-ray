import { Link, NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../ContextProvider/AuthContextProvider";

const NavigationBar = () => {
  const { user , handleManualLogout,isAdmin } = useContext(AuthContext);

  console.log(isAdmin);

  return (
    <div className=" shadow-[0_2px_0px_-1px_rgb(0,0,0,0.1),0_2px_4px_-2px_rgb(0,0,0,0.1)]	">
      <div className="navigationBarContainer  h-[4.8rem]">
        <div className="navigationBar h-[4.8rem] flex items-center justify-between">
          <div className="logo flex items-center">
            <Link to='/'>
            <h1 className="text-gray-300 text-xl ">Ray Glassess</h1>
            </Link>
          </div>
          <div className="menuItems flex justify-center items-center gap-10">
            <ul className="flex gap-10">
              <div className="hidden gap-8 text-white lg:flex">
                <NavLink
                  to="/"
                  className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? "text-purple-500" : ""
                  }
                >
                  <li className="hover:text-purple-500 hover:transition hover:duration-500 cursor-pointer">
                    Home
                  </li>
                </NavLink>

                {isAdmin && <NavLink
                  to="/admin/orders"
                  className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? "text-purple-500" : ""
                  }
                >
                  <li className="hover:text-purple-500 hover:transition hover:duration-500 cursor-pointer">
                    Orders
                  </li>
                </NavLink>}

                {user && (
                  <NavLink
                    to="/myOrders"
                    className={({ isActive, isPending }) =>
                      isPending ? "pending" : isActive ? "text-purple-500" : ""
                    }
                  >
                    <li className="hover:text-purple-500 hover:transition hover:duration-500 cursor-pointer">
                      My Orders
                    </li>
                  </NavLink>
                )}
                {user && (
                  <li onClick={handleManualLogout} className="hover:text-purple-500 hover:transition hover:duration-500 cursor-pointer">
                    Logout
                  </li>
                )}
              </div>
            </ul>
            <div className="hidden lg:block">
              {user ? (
                <Link>
                  <label
                    tabIndex={0}
                    className="btn tooltip tooltip-bottom btn-ghost btn-circle avatar"
                    data-tip={user && user.displayName}
                  >
                    <div className="w-10 text-white rounded-full">
                      <img src={user && user.photoURL} />
                    </div>
                  </label>
                </Link>
              ) : (
                <Link to="/login">
                  <button
                    type="button"
                    className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-full text-sm px-5 py-2 text-center "
                  >
                    লগিন
                  </button>
                </Link>
              )}
            </div>

            {/* <div className="block lg:hidden">
              <MobileDrawer></MobileDrawer>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavigationBar;
