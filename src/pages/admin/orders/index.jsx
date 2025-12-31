import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deleteOrder, getOrder } from "../../../_services/orders";
import { getUsers } from "../../../_services/users";
import { getProducts } from "../../../_services/products";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);

  const toggleDropdown = (id) => {
    setOpenDropdownId(openDropdownId === id ? null : id);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [ordersData, usersData, productsData] = await Promise.all([
          getOrder(),
          getUsers(),
          getProducts(),
        ]);

        setOrders(Array.isArray(ordersData) ? ordersData : []);
        setUsers(Array.isArray(usersData) ? usersData : []);
        setProducts(Array.isArray(productsData) ? productsData : []);
      } catch (error) {
        console.error(error);
        setOrders([]);
        setUsers([]);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getCustomerName = (id) => {
    const user = users.find((user) => user.id === id);
    return user ? user.name : "Unknown Name";
  };

  const getProductName = (id) => {
    const product = products.find((product) => product.id === id);
    return product ? product.name : "Unknown product";
  };

  // console.log(orders);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Apakah Anda yakin menghapus pesanan ini?"
    );

    if (confirmDelete) {
      await deleteOrder(id);
      setOrders(orders.filter((order) => order.id !== id)); 
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5">
      <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
        {/* HEADER + ADD USER */}
        <div className="flex items-center p-4">
          <Link
            to="/admin/orders/create"
            className="flex items-center justify-center text-white bg-indigo-700 hover:bg-indigo-800
                       focus:ring-4 focus:ring-indigo-300 font-medium rounded-lg text-sm
                       px-4 py-2 dark:bg-indigo-600 dark:hover:bg-indigo-700
                       focus:outline-none dark:focus:ring-indigo-800"
          >
            + Tambah Pesanan
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th className="px-4 py-3">Nomor Pesanan</th>
                <th className="px-4 py-3">Nama</th>
                <th className="px-4 py-3">Produk</th>
                <th className="px-4 py-3">Ukuran</th>
                <th className="px-4 py-3">Total Harga</th>
                <th className="px-4 py-3">Jumlah</th>
                <th className="px-4 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="6" className="text-center py-4">
                    Memuat Data...
                  </td>
                </tr>
              ) : orders.length > 0 ? (
                orders.map((order) => (
                  <tr key={order.id} className="border-b dark:border-gray-700">
                    <th
                      scope="row"
                      className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {order.order_number}
                    </th>

                    <td className="px-4 py-3">
                      {getCustomerName(order.customer_id)}
                    </td>
                    <td className="px-4 py-3">{getProductName(order.product_id)}</td>
                    <td className="px-4 py-3">{order.size}</td>
                    <td className="px-4 py-3">{order.total_price}</td>
                    <td className="px-4 py-3">{order.quantity}</td>

                    {/* ACTIONS */}
                    <td className="px-4 py-3 flex items-center justify-end relative overflow-visible">
                      <button
                        onClick={() => toggleDropdown(order.id)}
                        className="inline-flex items-center p-0.5 text-sm font-medium
                                   text-gray-500 hover:text-gray-800 rounded-lg
                                   focus:outline-none dark:text-gray-400 dark:hover:text-gray-100"
                        type="button"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                        </svg>
                      </button>

                      {openDropdownId === order.id && (
                        <div
                          className="absolute top-full right-0 z-50 w-44 bg-white rounded
                                     divide-y divide-gray-100 shadow
                                     dark:bg-gray-700 dark:divide-gray-600"
                        >
                          <ul className="py-1 text-sm text-gray-700 dark:text-gray-200">
                            <li>
                              <Link
                                to={`/admin/orders/edit/${order.id}`}
                                className="block py-2 px-4 hover:bg-gray-100
                                           dark:hover:bg-gray-600 dark:hover:text-white"
                              >
                                Edit
                              </Link>
                            </li>
                          </ul>
                          <div className="py-1">
                            <button
                              onClick={() => handleDelete(order.id)}
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
  );
}
