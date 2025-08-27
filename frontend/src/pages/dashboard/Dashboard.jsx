import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSignout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");

    if (confirmLogout) {
      logout();
      navigate("/login");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md bg-neutral-900 shadow-lg rounded-lg p-6 sm:p-8 border border-neutral-800">
        <h2 className="text-xl sm:text-2xl font-bold text-center text-white mb-4 sm:mb-6">
          Dashboard
        </h2>

        {user ? (
          <p className="text-white text-center mb-6 text-sm sm:text-base">
            Welcome,{" "}
            <span className="font-semibold">{user.name || user.email}</span>!
          </p>
        ) : (
          <p className="text-white text-center mb-6 text-sm sm:text-base">
            Welcome!
          </p>
        )}

        <button
          onClick={handleSignout}
          className="w-full bg-white text-black font-semibold py-2 px-4 rounded-lg hover:bg-neutral-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-neutral-900 transition">
          Sign out
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
