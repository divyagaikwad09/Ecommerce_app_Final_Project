import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function AddProduct() {
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: "",
    price: "",
    image: "",
    category: "",
    description: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    await API.post("/products", product);

    alert("Product Added");

    navigate("/admin");
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded shadow">
      <h1 className="text-3xl font-bold mb-5">
        Add Product
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          placeholder="Product Name"
          className="w-full border p-2 rounded"
          onChange={(e) =>
            setProduct({
              ...product,
              name: e.target.value,
            })
          }
        />

        <input
          placeholder="Price"
          className="w-full border p-2 rounded"
          onChange={(e) =>
            setProduct({
              ...product,
              price: e.target.value,
            })
          }
        />

        <input
          placeholder="Image URL"
          className="w-full border p-2 rounded"
          onChange={(e) =>
            setProduct({
              ...product,
              image: e.target.value,
            })
          }
        />

        <input
          placeholder="Category"
          className="w-full border p-2 rounded"
          onChange={(e) =>
            setProduct({
              ...product,
              category: e.target.value,
            })
          }
        />

        <textarea
          placeholder="Description"
          className="w-full border p-2 rounded"
          onChange={(e) =>
            setProduct({
              ...product,
              description: e.target.value,
            })
          }
        />

        <button className="bg-blue-500 text-white px-4 py-2 rounded">
          Add Product
        </button>

      </form>
    </div>
  );
}

export default AddProduct;