import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUsers } from "../../../_services/users";
import { getProducts } from "../../../_services/products";
import { createOrder } from "../../../_services/orders";

export default function OrderCreate() {
  //   const [size, setSize] = useState("");
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    product_id: "",
    customer_id: "",
    size: "",
    quantity: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const [usersData, productsData] = await Promise.all([
        getUsers(),
        getProducts(),
      ]);

      setUsers(usersData);
      setProducts(productsData);
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("FORM DATA:", formData);
      await createOrder(formData);
      navigate("/admin/orders");
    } catch (error) {
      console.log(error.response.data);
      alert("Error creating order");
    }
  };

  return (
    <>
      <section className="bg-white dark:bg-gray-900">
        <div className="max-w-2xl px-4 py-8 mx-auto lg:py-16">
          <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
            Tambah Pesanan Baru
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5">
              <div className="sm:col-span-2">
                <label
                  htmlFor="customer_id"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Nama
                </label>
                <select
                  id="customer_id"
                  name="customer_id"
                  value={formData.customer_id}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500"
                >
                  <option value="" disabled>
                    ---Pilih Pelanggan---
                  </option>
                  {users.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="product_id"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Produk
                </label>
                <select
                  id="product_id"
                  name="product_id"
                  value={formData.product_id}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500"
                >
                  <option value="" disabled>
                    ---Pilih Produk---
                  </option>
                  {products.map((product) => (
                    <option key={product.id} value={product.id}>
                      {product.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="size"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Ukuran
                </label>
                <select
                  name="size"
                  id="size"
                  value={formData.size}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500"
                >
                  <option value="" disabled>
                    ---Pilih Ukuran---
                  </option>
                  {["XS", "S", "M", "L", "XL", "XXL", "3XL"].map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="quantity"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Jumlah
                </label>
                <input
                  type="number"
                  name="quantity"
                  id="quantity"
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                           focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5
                           dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="Jumlah"
                  required
                />
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                type="submit"
                className="text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
              >
                Tambah Pesanan
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
