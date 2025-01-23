import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";
import { FaGoogle } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";

export default function SignUp() {
  const navigate = useNavigate();
  const location = useLocation();
  const axiosPublic = useAxiosPublic();
  const { createUser, setUser, googleLogin, updateUserProfile } = useAuth();

  // Google login handler
  const googleloginHandle = (e) => {
    e.preventDefault();
    googleLogin()
      .then((result) => {
        const user = result.user;
        setUser(user);

        const userItem = {
          name: user?.displayName,
          photoURL: user?.photoURL,
          email: user?.email,
          role: "user",
          subs: "Subscribe $10",
        };

        axiosPublic
          .post("/users", userItem)
          .then(() => {
            toast.success("Account created successfully!");
            navigate(location?.state ? location.state : "/");
          })
          .catch(() => {
            toast.error("Error saving user data.");
          });
      })
      .catch((error) => {
        console.error("Google login error:", error);
        toast.error("Error logging in with Google");
      });
  };

  // Signup handler
  const signUpHandle = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const photoURL = form.photoURL.value;
    const email = form.email.value;
    const password = form.password.value;

    const userItem = {
      name,
      photoURL,
      email,
      password,
      role: "user",
      subs: "Subscribe $10",
    };
    createUser(email, password)
      .then((result) => {
        const user = result.user;
        setUser(user);
        updateUserProfile({ displayName: name, photoURL: photoURL }).then(
          () => {
            axiosPublic.post("/users", userItem);
            toast.success("Account created successfully!");
            navigate(location?.state ? location.state : "/");
          }
        );
      })
      .catch(() => {
        toast.error("Problem creating account");
      });
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('https://i.ibb.co.com/kcjCvs4/download-38.jpg')",
      }}
    >
      <div className="bg-black bg-opacity-50 w-full py-6 text-center">
        <h1 className="text-4xl font-extrabold text-white">
          Create Your Account
        </h1>
        <p className="text-gray-300 mt-2">
          Join us to access exclusive content and features!
        </p>
      </div>

      <div className="flex justify-center items-center min-h-[80vh]">
        <div className="bg-white bg-opacity-90 shadow-lg rounded-lg w-full max-w-lg p-8">
          <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>
          <form onSubmit={signUpHandle} className="space-y-6">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                placeholder="Enter your full name"
                className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-200 focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Photo URL
              </label>
              <input
                type="text"
                name="photoURL"
                placeholder="Enter your photo URL"
                className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-200 focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-200 focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-200 focus:outline-none"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
            >
              Create Account
            </button>
          </form>
          <div className="text-center mt-6">
            <button
              onClick={googleloginHandle}
              className="bg-red-500 text-white py-2 px-4 rounded-lg flex items-center gap-2 justify-center w-full hover:bg-red-600"
            >
              <FaGoogle /> Sign Up with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
