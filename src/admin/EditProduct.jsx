import { useEffect, useState } from "react";
import API from "../services/api";
import { useParams, useNavigate } from "react-router-dom";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: "",
    price: "",
    image: "",
    category: "",
    description: "",
  });

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    const res = await API.get(`/products/${id}`);
    setProduct(res.data);
  };

  const updateProduct = async (e) => {
    e.preventDefault();

    await API.put(`/products/${id}`, product);

    alert("Product Updated");

    navigate("/admin");
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded shadow">
      <h1 className="text-3xl font-bold mb-5">
        Edit Product
      </h1>

      <form onSubmit={updateProduct} className="space-y-4">

        <input
          value={product.name}
          className="w-full border p-2 rounded"
          onChange={(e) =>
            setProduct({
              ...product,
              name: e.target.value,
            })
          }
        />

        <input
          value={product.price}
          className="w-full border p-2 rounded"
          onChange={(e) =>
            setProduct({
              ...product,
              price: e.target.value,
            })
          }
        />

        <input
          value={product.image}
          className="w-full border p-2 rounded"
          onChange={(e) =>
            setProduct({
              ...product,
              image: e.target.value,
            })
          }
        />

        <button className="bg-green-500 text-white px-4 py-2 rounded">
          Update Product
        </button>

      </form>
    </div>
  );
}

export default EditProduct;