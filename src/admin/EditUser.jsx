import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate, useParams } from "react-router-dom";

function EditUser() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    const res = await API.get(`/users/${id}`);
    setUser(res.data);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    await API.put(`/users/${id}`, user);

    alert("User Updated");
    navigate("/admin/users");
  };

  return (
    <div className="max-w-lg mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">
        Edit User
      </h1>

      <form
        onSubmit={handleUpdate}
        className="space-y-4"
      >
        <input
          type="text"
          value={user.name}
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
          value={user.email}
          className="w-full border p-3 rounded"
          onChange={(e) =>
            setUser({
              ...user,
              email: e.target.value,
            })
          }
        />

        <input
          type="text"
          value={user.password}
          className="w-full border p-3 rounded"
          onChange={(e) =>
            setUser({
              ...user,
              password: e.target.value,
            })
          }
        />

        <select
          value={user.role}
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
          className="bg-green-500 text-white px-5 py-3 rounded"
        >
          Update User
        </button>
      </form>
    </div>
  );
}

export default EditUser;