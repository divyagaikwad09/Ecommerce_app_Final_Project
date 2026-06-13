import { useEffect, useState } from "react";
import API from "../services/api";
import { Link } from "react-router-dom";

function Dashboard() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const res = await API.get("/products");
    setProducts(res.data);
  };

  const deleteProduct = async (id) => {
    await API.delete(`/products/${id}`);
    fetchProducts();
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">
        Admin Dashboard
      </h1>

      {/* Admin Buttons */}
      <div className="flex gap-4 mb-8">
        <Link
          to="/add-product"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Product
        </Link>

        <Link
          to="/admin/users"
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Manage Users
        </Link>

        <Link
          to="/admin/orders"
          className="bg-orange-500 text-white px-4 py-2 rounded"
        >
          Manage Orders
        </Link>
      </div>

      {/* Product List */}
     {products.map((item) => (
  <div
    key={item.id}
    className="border p-4 mb-3 rounded flex justify-between items-center"
  >
    <div>
      <img
        src={item.image}
        alt={item.name}
        className="w-20 h-20 object-cover rounded mb-2"
      />

      <h3 className="font-semibold">
        {item.name}
      </h3>

      <p>₹{item.price}</p>
    </div>

    <div className="flex gap-2">
      <Link
        to={`/edit-product/${item.id}`}
        className="bg-yellow-500 text-white px-3 py-1 rounded"
      >
        Edit
      </Link>

      <button
        onClick={() => deleteProduct(item.id)}
        className="bg-red-500 text-white px-3 py-1 rounded"
      >
        Delete
      </button>
    </div>
  </div>
))}
    </div>
  );
}

export default Dashboard;