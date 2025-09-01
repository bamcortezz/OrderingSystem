import { React, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate, useParams, Link } from "react-router-dom";

const ResetPassword = () => {
  const { resetPassword } = useContext(AuthContext);
  const { user_id, reset_token } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    password: "",
    confirm_password: "",
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await resetPassword(
        user_id,
        reset_token,
        formData.password,
        formData.confirm_password
      );
      alert(response.message);
      navigate("/login");
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const EyeIcon = ({ visible }) =>
    visible ? (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        viewBox="0 0 20 20"
        fill="currentColor">
        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
        <path
          fillRule="evenodd"
          d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
          clipRule="evenodd"
        />
      </svg>
    ) : (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        viewBox="0 0 20 20"
        fill="currentColor">
        <path
          fillRule="evenodd"
          d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z"
          clipRule="evenodd"
        />
        <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
      </svg>
    );

  return (
    <div className="flex items-center justify-center min-h-screen bg-black px-4">
      <div className="w-full max-w-md bg-neutral-900 shadow-lg rounded-lg p-8 border border-neutral-800">
        <h2 className="text-2xl font-bold text-center text-white mb-6">
          Reset Password
        </h2>
        <p className="text-neutral-400 text-center mb-6">
          Enter your new password below
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-neutral-300 mb-1">New Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter new password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-neutral-700 rounded-lg bg-neutral-800 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-white pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-neutral-400 hover:text-white">
                <EyeIcon visible={showPassword} />
              </button>
            </div>
          </div>

          <div>
            <label className="block text-neutral-300 mb-1">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirm_password"
                placeholder="Confirm new password"
                value={formData.confirm_password}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-neutral-700 rounded-lg bg-neutral-800 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-white pr-10"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-neutral-400 hover:text-white">
                <EyeIcon visible={showConfirmPassword} />
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-white text-black font-semibold py-2 px-4 rounded-lg hover:bg-neutral-200 transition disabled:opacity-50 mt-4">
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>

        <p className="mt-4 text-center text-neutral-400">
          Remember your password?{" "}
          <Link to="/login" className="text-white hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ResetPassword;
