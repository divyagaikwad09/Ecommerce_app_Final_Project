import { useState } from "react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await API.get("/users");

      const user = res.data.find(
        (u) =>
          u.email.trim() === email.trim() &&
          u.password.trim() === password.trim()
      );

      if (user) {
        login(user);

        toast.success("Login Successful");

        if (user.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/products");
        }
      } else {
        toast.error("Invalid Email or Password");
      }
    } catch (error) {
      console.error(error);
      toast.error("Login Failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh]">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6">
          Login
        </h2>

        <div className="space-y-4">
          <input
            type="email"
            placeholder="Enter Email"
            className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)} required
          />

          <input
            type="password"
            placeholder="Enter Password"
            className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            onClick={handleLogin}
            className="w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transition"
          >
            Login
          </button>
        </div>

        <p className="text-center mt-4">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-orange-500 font-semibold hover:underline"
          >
            Register Here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;