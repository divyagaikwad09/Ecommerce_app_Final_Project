import { useState } from "react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

function Register() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/users", {
        ...user,
        cart: [],
        orders: [],
      });

      toast.success("Registered Successfully");
      navigate("/login");
    } catch (error) {
      toast.error("Registration Failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh] bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6">
          Create Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
            onChange={(e) =>
              setUser({ ...user, name: e.target.value })
            }
          />

          <input
            type="email"
            placeholder="Email Address"
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
            onChange={(e) =>
              setUser({ ...user, email: e.target.value })
            }
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
            onChange={(e) =>
              setUser({ ...user, password: e.target.value })
            }
          />

          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transition"
          >
            Register
          </button>
        </form>

        <p className="text-center mt-4 text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-orange-500 font-semibold hover:underline"
          >
            Login Here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;