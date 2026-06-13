import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import API from "../services/api";
import toast from "react-hot-toast";

function Checkout() {
  const navigate = useNavigate();

  const {
    user,
    clearCart,
    cartTotal,
  } = useAuth();

  const [form, setForm] = useState({
    name: user?.name || "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    payment: "COD",
  });

  const handleOrder = async () => {
    try {
      if (
        !form.name ||
        !form.phone ||
        !form.address ||
        !form.city ||
        !form.state ||
        !form.pincode
      ) {
        toast.error("Please fill all details");
        return;
      }

      const cartItems = user?.cart || [];

      if (cartItems.length === 0) {
        toast.error("Cart is Empty");
        return;
      }

      // Check Product Stock
      for (const item of cartItems) {
        const productRes = await API.get(
          `/products/${item.productId}`
        );

        if (item.qty > productRes.data.stock) {
          toast.error(
            `${productRes.data.name} only has ${productRes.data.stock} items left`
          );
          return;
        }
      }

      // Create Order
      const order = {
        userId: user.id,

        userName: user.name,
        userEmail: user.email,
        phone: form.phone,

        items: cartItems,
        total: cartTotal,

        name: form.name,
        address: form.address,
        city: form.city,
        state: form.state,
        pincode: form.pincode,

        payment: form.payment,
        status: "Placed",
        date: new Date().toISOString(),
      };

      await API.post("/orders", order);

      // Reduce Product Stock
      for (const item of cartItems) {
        const productRes = await API.get(
          `/products/${item.productId}`
        );

        await API.patch(
          `/products/${item.productId}`,
          {
            stock:
              productRes.data.stock -
              item.qty,
          }
        );
      }

      // Clear User Cart
      await clearCart();

      toast.success(
        "Order Placed Successfully"
      );

      navigate("/orders");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="bg-white shadow-lg rounded-xl p-6">
        <h1 className="text-3xl font-bold mb-6">
          Checkout
        </h1>

        <div className="grid md:grid-cols-2 gap-4">

          <input
            type="text"
            placeholder="Full Name"
            className="border p-3 rounded-lg"
            value={form.name}
            onChange={(e) =>
              setForm({
                ...form,
                name: e.target.value,
              })
            }
          />

          <input
            type="text"
            placeholder="Phone Number"
            className="border p-3 rounded-lg"
            value={form.phone}
            onChange={(e) =>
              setForm({
                ...form,
                phone: e.target.value,
              })
            }
          />

          <input
            type="text"
            placeholder="City"
            className="border p-3 rounded-lg"
            value={form.city}
            onChange={(e) =>
              setForm({
                ...form,
                city: e.target.value,
              })
            }
          />

          <input
            type="text"
            placeholder="State"
            className="border p-3 rounded-lg"
            value={form.state}
            onChange={(e) =>
              setForm({
                ...form,
                state: e.target.value,
              })
            }
          />

          <input
            type="text"
            placeholder="Pincode"
            className="border p-3 rounded-lg"
            value={form.pincode}
            onChange={(e) =>
              setForm({
                ...form,
                pincode: e.target.value,
              })
            }
          />

          <select
            className="border p-3 rounded-lg"
            value={form.payment}
            onChange={(e) =>
              setForm({
                ...form,
                payment: e.target.value,
              })
            }
          >
            <option value="COD">
              Cash On Delivery
            </option>

            <option value="UPI">
              UPI
            </option>

            <option value="Card">
              Credit / Debit Card
            </option>
          </select>

        </div>

        <textarea
          rows="4"
          placeholder="Full Address"
          className="border p-3 rounded-lg w-full mt-4"
          value={form.address}
          onChange={(e) =>
            setForm({
              ...form,
              address: e.target.value,
            })
          }
        />

        <div className="mt-4 text-lg font-bold">
          Total Amount: ₹{cartTotal}
        </div>

        <button
          onClick={handleOrder}
          className="mt-6 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg"
        >
          Place Order
        </button>
      </div>
    </div>
  );
}

export default Checkout;