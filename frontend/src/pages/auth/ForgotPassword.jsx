import { React, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const ForgotPassword = () => {
  const { forgotPassword } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await forgotPassword(email);

      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        title: response.message,
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
      });

      setEmail("");
    } catch (error) {
      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "error",
        title: error.message,
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black px-4">
      <div className="w-full max-w-md bg-neutral-900 shadow-lg rounded-lg p-8 border border-neutral-800">
        <h2 className="text-2xl font-bold text-center text-white mb-6">
          Forgot Password
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-neutral-300 mb-1">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border border-neutral-700 rounded-lg bg-neutral-800 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-white"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-white text-black font-semibold py-2 px-4 rounded-lg hover:bg-neutral-200 transition disabled:opacity-50">
            {loading ? "Sending..." : "Send Reset Link"}
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

export default ForgotPassword;
