import { NavLink, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    try {
      const result = await login(email, password);
      const user = result.user;
      console.log(user);

      Swal.fire({
        title: "Login Successful!",
        text: "Welcome back!",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });

      navigate("/");
    } catch (err) {
      console.error(err);
      setError("Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        backgroundImage: "url('https://i.ibb.co.com/kcjCvs4/download-38.jpg')",
      }}
      className="w-full  bg-cover object-cover bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 min-h-screen flex items-center justify-center"
    >
      <div className="card bg-white w-full max-w-md shadow-2xl p-6 rounded-lg">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-4">
          Login
        </h1>
        <p className="text-gray-600 text-center mb-6">
          Welcome back! Please login to your account.
        </p>
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text text-gray-700">Email</span>
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="input input-bordered w-full bg-gray-50 border border-gray-300 rounded-md p-3"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text text-gray-700">Password</span>
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              className="input input-bordered w-full bg-gray-50 border border-gray-300 rounded-md p-3"
              required
            />
            <label className="label">
              <NavLink
                to="/forgot-password"
                className="text-sm text-sky-600 hover:underline"
              >
                Forgot password?
              </NavLink>
            </label>
          </div>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <div className="form-control mt-6">
            <button
              type="submit"
              className={`btn btn-primary w-full ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </div>
        </form>
        <div className="flex gap-2 text-sm justify-center items-center mt-4">
          <p>Don’t have an account?</p>
          <NavLink to="/signUp" className="text-sky-600 hover:underline">
            Register Now
          </NavLink>
        </div>
      </div>
    </div>
  );
}
