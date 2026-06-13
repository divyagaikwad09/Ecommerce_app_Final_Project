import { useState, useEffect } from "react";
import API from "../services/api";

function Profile() {
  const currentUser = JSON.parse(localStorage.getItem("user"));

  const [user, setUser] = useState(currentUser);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const res = await API.get(
      `/orders?userId=${currentUser.id}`
    );

    setOrders(res.data);
  };

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = () => {
    localStorage.setItem("user", JSON.stringify(user));
    alert("Profile Updated");
  };

  if (!user) {
    return (
      <div className="p-6">
        <h2>Please Login First</h2>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-6">
        My Profile
      </h1>

      {/* Profile Card */}
      <div className="bg-white shadow-lg rounded-xl p-6 space-y-4">
        <input
          type="text"
          name="name"
          value={user.name}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg"
          placeholder="Name"
        />

        <input
          type="email"
          name="email"
          value={user.email}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg"
          placeholder="Email"
        />

        <button
          onClick={handleUpdate}
          className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg"
        >
          Update Profile
        </button>
      </div>

      {/* Shopping History */}
      <div className="mt-8 bg-white shadow-lg rounded-xl p-6">
        <h2 className="text-2xl font-bold mb-4">
          Shopping History
        </h2>

        {orders.length === 0 ? (
          <p>No Orders Yet</p>
        ) : (
          orders.map((order) => (
            <div
              key={order.id}
              className="border-b py-4"
            >
              <div className="flex justify-between">
                <h3 className="font-semibold">
                  Order #{order.id}
                </h3>

                <span className="text-green-600">
                  {order.status}
                </span>
              </div>

              <p className="text-gray-500 text-sm">
                {new Date(order.date).toLocaleString()}
              </p>

              <p className="font-medium mt-2">
                Total Items:
                {" "}
                {order.items?.length || 0}
              </p>

              {order.items?.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between text-sm py-1"
                >
                  <span>{item.name}</span>
                  <span>Qty: {item.qty}</span>
                </div>
              ))}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Profile;