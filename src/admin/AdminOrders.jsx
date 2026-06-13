import { useEffect, useState } from "react";
import API from "../services/api";

function AdminOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await API.get("/orders");
      setOrders(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await API.patch(`/orders/${id}`, {
        status,
      });

      fetchOrders();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-8">
        Orders Management
      </h1>

      {orders.length === 0 ? (
        <div className="bg-white p-6 rounded-xl shadow">
          No Orders Found
        </div>
      ) : (
        <div className="space-y-5">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white border rounded-xl p-5 shadow"
            >
              <div className="space-y-2">

                <p>
                  <strong>User:</strong>{" "}
                  {order.userName || order.name || "N/A"}
                </p>

                <p>
                  <strong>Email:</strong>{" "}
                  {order.userEmail || "N/A"}
                </p>

                <p>
                  <strong>Phone:</strong>{" "}
                  {order.phone || "N/A"}
                </p>

                <p>
                  <strong>Address:</strong>{" "}
                  {order.address},{" "}
                  {order.city},{" "}
                  {order.state} -{" "}
                  {order.pincode}
                </p>

                <p>
                  <strong>Payment:</strong>{" "}
                  {order.payment}
                </p>

                <p>
                  <strong>Total:</strong> ₹
                  {order.total?.toLocaleString()}
                </p>

                <p>
                  <strong>Status:</strong>{" "}
                  <span
                    className={`font-semibold ${order.status === "Delivered"
                        ? "text-green-600"
                        : "text-orange-500"
                      }`}
                  >
                    {order.status}
                  </span>
                </p>

                <p>
                  <strong>Date:</strong>{" "}
                  {new Date(
                    order.date
                  ).toLocaleString()}
                </p>

              </div>

              <div className="mt-4">
                {order.status !==
                  "Delivered" ? (
                  <button
                    onClick={() =>
                      updateStatus(
                        order.id,
                        "Delivered"
                      )
                    }
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
                  >
                    Mark Delivered
                  </button>
                ) : (
                  <button
                    disabled
                    className="bg-gray-400 text-white px-4 py-2 rounded-lg cursor-not-allowed"
                  >
                    Delivered
                  </button>
                )}
              </div>

              {/* Ordered Products */}
              <div className="mt-5 border-t pt-4">
                <h3 className="font-bold mb-3">
                  Ordered Items
                </h3>

                {order.items?.map((item) => (
                  <div
                    key={item.productId}
                    className="flex justify-between border-b py-2"
                  >
                    <span>
                      {item.name}
                    </span>

                    <span>
                      Qty: {item.qty}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminOrders;