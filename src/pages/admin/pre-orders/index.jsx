import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getMeasurement,
  deleteMeasurement,
  updateMeasurementStatus,
} from "../../../_services/measurements";
import { getUsers } from "../../../_services/users";

export default function AdminMeasurements() {
  const [measurements, setMeasurements] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDropdownId, setOpenDropdownId] = useState(null);

  // Modal states
  const [editingOrder, setEditingOrder] = useState(null);
  const [editingData, setEditingData] = useState({
    status: "",
    total_price: "",
  });

  const toggleDropdown = (id) => {
    setOpenDropdownId(openDropdownId === id ? null : id);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [measurementsData, usersData] = await Promise.all([
          getMeasurement(),
          getUsers(),
        ]);

        setMeasurements(
          Array.isArray(measurementsData) ? measurementsData : []
        );
        setUsers(Array.isArray(usersData) ? usersData : []);
      } catch (error) {
        console.error(error);
        setMeasurements([]);
        setUsers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Yakin ingin menghapus pesanan ini?")) return;
    await deleteMeasurement(id);
    setMeasurements(measurements.filter((m) => m.id !== id));
  };

  const getCustomerName = (id) => {
    const user = users.find((user) => user.id === id);
    return user ? user.name : "Unknown Name";
  };

  const statusMap = {
    requested: {
      label: "Menunggu",
      className: "bg-yellow-100 text-yellow-800",
    },
    in_progress: {
      label: "Dikerjakan",
      className: "bg-blue-100 text-blue-800",
    },
    done: { label: "Selesai", className: "bg-green-100 text-green-800" },
    cancelled: { label: "Dibatalkan", className: "bg-red-100 text-red-800" },
  };

  const productTypeLabel = { shirt: "Atasan", pants: "Bawahan" };
  const measurementTypeClass = {
    standard: "bg-indigo-100 text-indigo-800",
    custom: "bg-amber-100 text-amber-800",
  };
  const measurementTypeLabel = { standard: "Standar", custom: "Kustom" };

  const handleSave = async (id) => {
    try {
      const dataToUpdate = {
        status: editingData.status,
        total_price: editingData.total_price,
      };

      const response = await updateMeasurementStatus(id, dataToUpdate);

      setMeasurements((prev) =>
        prev.map((m) => (m.id === id ? response.data : m))
      );

      setEditingOrder(null);
      alert("Pesanan berhasil diperbarui!");
    } catch (error) {
      console.error(error);
      alert("Gagal memperbarui pesanan");
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900 p-4">
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
        <div className="flex items-center p-4">
          <Link
            to="/admin/measurements/create"
            className="flex items-center justify-center text-white bg-indigo-700 hover:bg-indigo-800
                       focus:ring-4 focus:ring-indigo-300 font-medium rounded-lg text-sm
                       px-4 py-2 dark:bg-indigo-600 dark:hover:bg-indigo-700
                       focus:outline-none dark:focus:ring-indigo-800"
          >
            + Tambah Pre-Order
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th className="px-4 py-3">Nomor Pesanan</th>
                <th className="px-4 py-3">Nama</th>
                <th className="px-4 py-3">Produk</th>
                <th className="px-4 py-3">Jenis Ukuran</th>
                <th className="px-4 py-3">Ukuran</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Total Harga</th>
                <th className="px-4 py-3">Tanggal</th>
                <th className="px-4 py-3">
                  <span className="sr-only">Aksi</span>
                </th>
              </tr>
            </thead>

            <tbody>
              {loading && (
                <tr>
                  <td colSpan="9" className="py-4 text-center">
                    Memuat data...
                  </td>
                </tr>
              )}

              {!loading && measurements.length === 0 && (
                <tr>
                  <td colSpan="9" className="py-6 text-center">
                    Tidak ada data
                  </td>
                </tr>
              )}

              {!loading &&
                measurements.map((m) => {
                  const status = statusMap[m.status] ?? statusMap.requested;

                  return (
                    <tr key={m.id} className="border-b dark:border-gray-700">
                      <td className="px-4 py-3 font-medium max-w-[150px] truncate">
                        {m.order_number}
                      </td>
                      <td className="px-4 py-3 font-medium">
                        {getCustomerName(m.customer_id)}
                      </td>
                      <td className="px-4 py-3">
                        {productTypeLabel[m.product_type] ?? "-"}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium 
                          ${measurementTypeClass[m.measurement_type]}`}
                        >
                          {measurementTypeLabel[m.measurement_type]}
                        </span>
                      </td>
                      <td className="px-4 py-3">{m.size ?? "-"}</td>
                      <td className="px-4 py-3">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-semibold ${status.className}`}
                        >
                          {status.label}
                        </span>
                      </td>
                      <td className="px-4 py-3 font-semibold">
                        Rp {Number(m.total_price).toLocaleString("id-ID")}
                      </td>
                      <td className="px-4 py-3">
                        {new Date(m.created_at).toLocaleDateString("id-ID")}
                      </td>
                      <td className="px-4 py-3 text-right relative">
                        <button
                          onClick={() => toggleDropdown(m.id)}
                          className="text-gray-500 hover:text-gray-800"
                        >
                          •••
                        </button>

                        {openDropdownId === m.id && (
                          <div
                            className="absolute top-full right-0 z-50 w-44 bg-white rounded
                                     divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
                          >
                            <ul className="py-1 text-sm text-gray-700 dark:text-gray-200">
                              <li>
                                <button
                                  onClick={() => {
                                    setEditingOrder(m);
                                    setEditingData({
                                      status: m.status,
                                      total_price: m.total_price || "",
                                    });
                                    setOpenDropdownId(null);
                                  }}
                                  className="block w-full text-left py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                >
                                  Edit Status & Harga
                                </button>
                              </li>
                              <li>
                                <Link
                                  to={`/admin/measurements/edit/${m.id}`}
                                  className="block w-full text-left py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                >
                                  Edit
                                </Link>
                              </li>
                              <li>
                                <Link
                                  to={`/admin/measurements/${m.id}`}
                                  className="block w-full text-left py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                >
                                  Detail
                                </Link>
                              </li>
                              <li>
                                <button
                                  onClick={() => handleDelete(m.id)}
                                  className="block w-full text-left py-2 px-4 text-red-600 hover:bg-red-100"
                                >
                                  Hapus
                                </button>
                              </li>
                            </ul>
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Edit Status & Harga */}
      {editingOrder && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-80">
            <h3 className="text-lg font-semibold mb-4">Perbarui Pesanan</h3>

            <label className="block mb-2 text-sm font-medium">Status</label>
            <select
              value={editingData.status}
              onChange={(e) =>
                setEditingData({ ...editingData, status: e.target.value })
              }
              className="w-full mb-4 border rounded px-2 py-1"
            >
              <option value="requested">Menunggu</option>
              <option value="in_progress">Dikerjakan</option>
              <option value="done">Selesai</option>
              <option value="cancelled">Dibatalkan</option>
            </select>

            <label className="block mb-2 text-sm font-medium">
              Total Harga
            </label>
            <input
              type="number"
              value={editingData.total_price}
              onChange={(e) =>
                setEditingData({ ...editingData, total_price: e.target.value })
              }
              className="w-full mb-4 border rounded px-2 py-1"
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setEditingOrder(null)}
                className="px-3 py-1 rounded bg-gray-300 dark:bg-gray-600"
              >
                Batal
              </button>
              <button
                onClick={() => handleSave(editingOrder.id)}
                className="px-3 py-1 rounded bg-blue-600 text-white"
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
