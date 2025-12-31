import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deleteProduct, getProducts } from "../../../_services/products";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDropdownId, setOpenDropdownId] = useState(null);

  const toggleDropdown = (id) => {
    setOpenDropdownId(openDropdownId === id ? null : id);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Apakah Anda yakin menghapus produk ini?"
    );

    if (confirmDelete) {
      await deleteProduct(id);
      setProducts(products.filter((product) => product.id !== id)); 
    }
  };

  return (
    <>
      <section className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5">
        <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
          <div className="flex flex-col md:flex-row items-center justify-between p-4">
            <Link
              to={"/admin/products/create"}
              className="flex items-center justify-center text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:ring-indigo-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-indigo-600 dark:hover:bg-indigo-700"
            >
              + Tambah Produk
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th className="px-4 py-3">Nama Produk</th>
                  <th className="px-4 py-3">Deskripsi</th>
                  <th className="px-4 py-3">Harga</th>
                  <th className="px-4 py-3">Stok</th>
                  <th className="px-4 py-3">Foto Produk</th>
                  <th className="px-4 py-3">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="6" className="text-center py-4">
                      Memuat data...
                    </td>
                  </tr>
                ) : products.length > 0 ? (
                  products.map((product) => (
                    <tr
                      key={product.id}
                      className="border-b dark:border-gray-700"
                    >
                      <th className="px-4 py-3 font-medium text-gray-900 dark:text-white">
                        {product.name}
                      </th>

                      <td className="px-4 py-3 max-w-[200px] truncate">
                        {product.description}
                      </td>

                      <td className="px-4 py-3">
                        Rp {Number(product.price).toLocaleString("id-ID")}
                      </td>

                      <td className="px-4 py-3">{product.stock}</td>

                      <td className="px-4 py-3 max-w-[150px] truncate">
                        {product.image}
                      </td>

                      <td className="px-4 py-3 flex items-center justify-end relative">
                        <button
                          onClick={() => toggleDropdown(product.id)}
                          className="inline-flex items-center p-0.5 text-sm font-medium text-gray-500 hover:text-gray-800 rounded-lg dark:text-gray-400 dark:hover:text-gray-100"
                        >
                          <svg
                            className="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                          </svg>
                        </button>

                        {openDropdownId === product.id && (
                          <div
                            className="absolute top-full right-0 z-50 w-44 bg-white rounded
                            divide-y divide-gray-100 shadow
                            dark:bg-gray-700 dark:divide-gray-600"
                          >
                            <ul className="py-1 text-sm text-gray-700 dark:text-gray-200">
                              <li>
                                <Link
                                  to={`/admin/products/edit/${product.id}`}
                                  className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600"
                                >
                                  Edit
                                </Link>
                              </li>
                            </ul>
                            <div className="py-1">
                              <button
                                onClick={() => handleDelete(product.id)}
                                className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-100"
                              >
                                Hapus
                              </button>
                            </div>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center py-4">
                      Tidak ada data
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
}
