import { useEffect, useState } from "react";
import API from "../services/api";
import { useAuth } from "../context/AuthContext";

function Orders() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (user) {
      fetchOrders();
    }
  }, [user]);

  const fetchOrders = async () => {
    const res = await API.get(`/orders?userId=${user.id}`);
    setOrders(res.data);
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">
        My Orders
      </h1>

      {orders.length === 0 ? (
        <div className="bg-white p-6 rounded-lg shadow">
          No Orders Found
        </div>
      ) : (
        orders.map((order) => (
          <div
            key={order.id}
            className="bg-white shadow rounded-xl p-5 mb-4"
          >
            <div className="flex justify-between mb-3">
              <h2 className="font-bold text-lg">
                Order #{order.id}
              </h2>

              <span className="text-green-600 font-semibold">
                {order.status}
              </span>
            </div>

            <p className="text-gray-500 text-sm mb-3">
              {new Date(order.date).toLocaleString()}
            </p>

            <p><strong>Address:</strong> {order.address}</p>

            <p><strong>Payment:</strong> {order.payment}</p>

            <p><strong>Total:</strong> ₹{order.total}</p>

            <p>
              <strong>Total Items:</strong>{" "}
              {order.items?.length || 0}
            </p>

            <div className="mt-4">
              {order.items?.length > 0 ? (
                order.items.map((item, index) => (
                  <div
                    key={index}
                    className="border-b py-2 flex justify-between"
                  >
                    <span>{item.name}</span>
                    <span>Qty: {item.qty}</span>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">
                  No products stored in this order
                </p>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Orders;