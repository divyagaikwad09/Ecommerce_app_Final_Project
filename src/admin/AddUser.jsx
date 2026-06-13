import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function AddUser() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    await API.post("/users", user);

    alert("User Added Successfully");
    navigate("/admin/users");
  };

  return (
    <div className="max-w-lg mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">
        Add User
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <input
          type="text"
          placeholder="Name"
          className="w-full border p-3 rounded"
          onChange={(e) =>
            setUser({
              ...user,
              name: e.target.value,
            })
          }
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-3 rounded"
          onChange={(e) =>
            setUser({
              ...user,
              email: e.target.value,
            })
          }
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-3 rounded"
          onChange={(e) =>
            setUser({
              ...user,
              password: e.target.value,
            })
          }
        />

        <select
          className="w-full border p-3 rounded"
          onChange={(e) =>
            setUser({
              ...user,
              role: e.target.value,
            })
          }
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>

        <button
          className="bg-blue-500 text-white px-5 py-3 rounded"
        >
          Add User
        </button>
      </form>
    </div>
  );
}

export default AddUser;