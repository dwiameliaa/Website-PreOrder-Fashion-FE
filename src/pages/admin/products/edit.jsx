import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { showProduct, updateProduct } from "../../../_services/products";

export default function ProductEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    image: null,
    _method: "PUT",
  });

  useEffect(() => {
    const fetchData = async () => {
      const [userData] = await Promise.all([showProduct(id)]);

      setFormData({
        name: userData.name,
        stock: userData.stock,
        price: userData.price,
        description: userData.description,
        image: userData.image,
        _method: "PUT",
      });
    };

    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image") {
      setFormData({
        ...formData,
        image: files[0],
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = new FormData();

      for (const key in formData) {
        if (key === "image") {
          if (formData.image instanceof File) {
            payload.append("image", formData.image);
          }
        } else {
          payload.append(key, formData[key]);
        }
      }

      await updateProduct(id, payload);
      navigate("/admin/products");
    } catch (error) {
      console.log(error);
      alert("Error update product");
    }
  };

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="max-w-2xl px-4 py-8 mx-auto lg:py-16">
        <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
          Edit Produk
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5">
            {/* NAME */}
            <div className="sm:col-span-2">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Nama Produk
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Kemeja Flanel Kotak"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                           focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5
                           dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
              />
            </div>

            {/* PRICE */}
            <div className="w-full">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Harga
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="185000"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                           focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5
                           dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
              />
            </div>

            {/* STOCK */}
            <div className="w-full">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Stok
              </label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                placeholder="10"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                           focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5
                           dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
              />
            </div>

            {/* IMAGE */}
            <div className="sm:col-span-2">
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Foto Produk
              </label>
              <input
                type="file"
                name="image"
                onChange={handleChange}
                accept="image/*"
                className="w-full px-4 py-3 rounded-xl border border-gray-300"
              />
            </div>

            {/* DESCRIPTION */}
            <div className="sm:col-span-2">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Deskripsi
              </label>
              <textarea
                name="description"
                rows="6"
                value={formData.description}
                onChange={handleChange}
                placeholder="Deskripsi"
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg
                           border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500
                           dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
              ></textarea>
            </div>
          </div>
          <button
            type="submit"
            className="text-white bg-indigo-700 hover:bg-indigo-800
                         focus:ring-4 focus:outline-none focus:ring-indigo-300
                         font-medium rounded-lg text-sm px-5 py-2.5
                         dark:bg-indigo-600 dark:hover:bg-indigo-700"
          >
            Simpan Produk
          </button>
        </form>
      </div>
    </section>
  );
}
