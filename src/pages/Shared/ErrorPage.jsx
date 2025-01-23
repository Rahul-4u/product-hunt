import { NavLink } from "react-router-dom";

export default function ErrorPage() {
  return (
    <div className="p-56 flex flex-col space-y-7 text-center justify-center items-center">
      <h1 className="text-8xl font-bold">Oppos !</h1>
      <p>
        The page you are looking for might have been removed <br />
        had its name changed or is temporaily unavailable.
      </p>
      <NavLink to={"/"}>
        <button className="btn btn-error text-black bg-orange-400 p-3 rounded-md">
          Go To HomePage
        </button>
      </NavLink>
    </div>
  );
}
