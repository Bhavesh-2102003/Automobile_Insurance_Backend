import axios from "axios";
import React, { use, useEffect, useState } from "react";
import { Link,NavLink, useNavigate } from "react-router-dom";

function Header() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [customerName,setCustomerName]=useState(null);
  const navigate=useNavigate()

  const handleSignOut=()=>{
    localStorage.removeItem('customerId');
    localStorage.removeItem('username');
    localStorage.removeItem('token');
    console.log("Signed Out");
    navigate("/");
  }

  useEffect(() => {
    const getUserName=async()=>{

    const token=localStorage.getItem('token');
    let response=await axios.get('http://localhost:8087/api/auth/user/details',
        {
            headers: {
                "Authorization": `Bearer ${token}`  
            }
        }
    )
    const userId = response.data.id;
    let customerReponse=await axios.get(`http://localhost:8087/api/customer/getByUserId/${userId}`);
    const customerId=customerReponse.data.id;
  setCustomerName(
  customerReponse.data.firstName + 
  (customerReponse.data.LastName ? " " + customerReponse.data.LastName : "")
);
    }
    getUserName();
  },[customerName])

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left side - Logo/Brand */}
          <div className="flex items-center">
            <Link to="/customer" className="flex items-center">
            <div className="flex items-center justify-center w-20 h-20 ">
                <img
                  src="/src/assets/icon-02-primary.png" // Replace this with the actual path to your logo
                  alt="."
                  className="w-full h-full object-contain rounded-md"
                />
              </div>
              <span className="ml-3 text-xl font-bold text-gray-900 ">
                HexaCover
              </span>
            </Link>
          </div>

          {/* Center Navigation Tabs */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink
              to="/customer/policy-list"
              className={({ isActive }) => 
                `px-3 py-2 text-sm font-medium ${isActive ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700'}`
              }
            >
              My Policies
            </NavLink>
            <NavLink
              to="/customer/submit-details"
              className={({ isActive }) => 
                `px-3 py-2 text-sm font-medium ${isActive ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700'}`
              }
            >
              Add New Policy
            </NavLink>
            <NavLink
              to="/customer/track-claim"
              className={({ isActive }) => 
                `px-3 py-2 text-sm font-medium ${isActive ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700'}`
              }
            >
              Track Claims
            </NavLink>
          </div>

          {/* Right side - Profile dropdown */}
          <div className="ml-4 flex items-center md:ml-6">
            <div className="relative">
              <button
                type="button"
                className="max-w-xs flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                id="user-menu"
                aria-expanded="false"
                aria-haspopup="true"
                onClick={() => setIsProfileOpen(!isProfileOpen)}
              >
                <span className="sr-only">Open user menu</span>
                <div className="relative">
                  <div className="h-8 w-8 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center text-white font-semibold">
                    <span>{customerName}</span>
                  </div>
                  <span className="absolute bottom-0 right-0 block h-2 w-2 rounded-full ring-2 ring-white bg-green-400"></span>
                </div>
                <span className="hidden md:inline ml-2 text-sm font-medium text-gray-700">
                  {customerName}
                </span>
                <i className="fas fa-chevron-down ml-1 text-gray-400 text-xs hidden md:inline"></i>
              </button>

              {/* Profile dropdown */}
              {isProfileOpen && (
                <div
                  className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="user-menu"
                >
                  <Link
                    to="/customer/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    role="menuitem"
                  >
                    <i className="fas fa-user mr-2"></i>Your Profile
                  </Link>
                  <Link
                    to="/settings"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    role="menuitem"
                  >
                    <i className="fas fa-cog mr-2"></i>Settings
                  </Link>
                  <Link
                    to="/help"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    role="menuitem"
                  >
                    <i className="fas fa-question-circle mr-2"></i>Help
                  </Link>
                  <div className="border-t border-gray-100"></div>
                  <Link
                    to="/"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    role="menuitem"
                    onClick={handleSignOut}
                  >
                    <i className="fas fa-sign-out-alt mr-2"></i>Sign out
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Navigation - shown on small screens */}
        <div className="md:hidden flex justify-center space-x-4 py-2 border-t">
          <NavLink
            to="/customer/policies"
            className={({ isActive }) => 
              `px-3 py-1 text-sm font-medium ${isActive ? 'text-indigo-600' : 'text-gray-500 hover:text-gray-700'}`
            }
          >
            My Policies
          </NavLink>
          <NavLink
            to="/customer/services"
            className={({ isActive }) => 
              `px-3 py-1 text-sm font-medium ${isActive ? 'text-indigo-600' : 'text-gray-500 hover:text-gray-700'}`
            }
          >
            Services
          </NavLink>
        </div>
      </div>
    </header>
  );
}

export default Header;