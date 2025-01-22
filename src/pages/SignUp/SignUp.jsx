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

        // Update user profile and save to the database
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
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center md-w-full lg:text-left">
          <h1 className="text-5xl font-bold">Sign Up Now!</h1>
          <p className="py-6">Create your account and enjoy our services.</p>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form onSubmit={signUpHandle} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Full Name</span>
              </label>
              <input
                type="text"
                name="name"
                placeholder="Enter your Name"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">User Photo</span>
              </label>
              <input
                type="text"
                name="photoURL"
                placeholder="Enter your photo URL"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Sign Up</button>
            </div>
          </form>
          <div className="form-control mx-auto w-10/12  mb-6">
            <button
              onClick={googleloginHandle}
              className="btn  btn-outline btn-primary"
            >
              <FaGoogle />
              Sign Up with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
