import axios from "axios";

const BASE_URL = "https://ecommerce-backend-913t.onrender.com";

//https://ecommerce-backend-913t.onrender.com
// const BASE_URL = "http://localhost:3000";

const api = axios.create({
  baseURL: BASE_URL,
});

// ─── AUTH ───────────────────────────────────────────────

export const loginUser = async (email, password) => {
  const res = await api.get(`/users?email=${email}&password=${password}`);
  return res.data[0] || null;
};

export const registerUser = async (userData) => {
  const existing = await api.get(`/users?email=${userData.email}`);

  if (existing.data.length > 0) {
    throw new Error("Email already registered");
  }

  const res = await api.post("/users", {
    ...userData,
    role: "user",
    avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${userData.name}`,
    cart: [],
    orders: [],
    wishlist: [],
  });

  return res.data;
};

export const updateUser = async (id, data) => {
  const res = await api.patch(`/users/${id}`, data);
  return res.data;
};

// ─── PRODUCTS ───────────────────────────────────────────

export const getProducts = async (params = {}) => {
  let url = "/products?";

  if (params.category) url += `category=${params.category}&`;
  if (params.search) url += `name_like=${params.search}&`;

  if (params._sort) {
    url += `_sort=${params._sort}&_order=${params._order || "asc"}&`;
  }

  const res = await api.get(url);
  return res.data;
};

export const getProductById = async (id) => {
  const res = await api.get(`/products/${id}`);
  return res.data;
};

export const createProduct = async (data) => {
  const res = await api.post("/products", data);
  return res.data;
};

export const updateProduct = async (id, data) => {
  const res = await api.patch(`/products/${id}`, data);
  return res.data;
};

export const deleteProduct = async (id) => {
  await api.delete(`/products/${id}`);
};

// ─── ORDERS ─────────────────────────────────────────────

export const createOrder = async (orderData) => {
  const res = await api.post("/orders", orderData);
  return res.data;
};

export const getOrdersByUser = async (userId) => {
  const res = await api.get(`/orders?userId=${userId}`);
  return res.data;
};

export const getAllOrders = async () => {
  const res = await api.get("/orders");
  return res.data;
};

export const updateOrderStatus = async (id, status) => {
  const res = await api.patch(`/orders/${id}`, { status });
  return res.data;
};

// ─── USERS ──────────────────────────────────────────────

export const getAllUsers = async () => {
  const res = await api.get("/users");
  return res.data;
};

export const deleteUser = async (id) => {
  await api.delete(`/users/${id}`);
};

//important: do not delete this line, it is used in other files
export default api;