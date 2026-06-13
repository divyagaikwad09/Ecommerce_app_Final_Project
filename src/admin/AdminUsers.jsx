import { useEffect, useState } from "react";
import API from "../services/api";
import { Link } from "react-router-dom";

function AdminUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const res = await API.get("/users");
    setUsers(res.data);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (!confirmDelete) return;

    await API.delete(`/users/${id}`);
    fetchUsers();
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">
          Users Management
        </h1>

        <Link
          to="/admin/add-user"
          className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-lg"
        >
          Add User
        </Link>
      </div>

      <div className="grid gap-4">
        {users.map((user) => (
          <div
            key={user.id}
            className="bg-white shadow-md rounded-xl p-5 border"
          >
            <p className="mb-2">
              <span className="font-semibold">
                Name:
              </span>{" "}
              {user.name}
            </p>

            <p className="mb-2">
              <span className="font-semibold">
                Email:
              </span>{" "}
              {user.email}
            </p>

            <p className="mb-4">
              <span className="font-semibold">
                Role:
              </span>{" "}
              <span
                className={
                  user.role === "admin"
                    ? "text-red-500 font-semibold"
                    : "text-green-600 font-semibold"
                }
              >
                {user.role}
              </span>
            </p>

            <div className="flex gap-3">
              <Link
                to={`/admin/edit-user/${user.id}`}
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"
              >
                Edit
              </Link>

              <button
                onClick={() => handleDelete(user.id)}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminUsers;