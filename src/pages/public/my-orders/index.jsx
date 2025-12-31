import { useEffect, useState } from "react";
import { getOrder } from "../../../_services/orders";
import { getProducts } from "../../../_services/products";
import { getMeasurement } from "../../../_services/measurements";

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [measurements, setMeasurements] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("userInfo"));

  useEffect(() => {
    if (!user?.id) {
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        const [ordersData, productsData, measurementsData] = await Promise.all([
          getOrder(),
          getProducts(),
          getMeasurement(),
        ]);

        const userOrders = Array.isArray(ordersData)
          ? ordersData.filter((order) => order.customer_id === user.id)
          : [];

        const userMeasurements = Array.isArray(measurementsData)
          ? measurementsData.filter(
              (measurement) => measurement.customer_id === user.id
            )
          : [];

        setOrders(userOrders);
        setMeasurements(userMeasurements);
        setProducts(Array.isArray(productsData) ? productsData : []);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
        setOrders([]);
        setProducts([]);
        setMeasurements([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user?.id]);

  const getProductName = (productId) => {
    const product = products.find((p) => p.id === productId);
    return product ? product.name : "Unknown Product";
  };

  if (!user) {
    return (
      <section className="pt-28 text-center text-gray-600">
        Please login to see your orders.
      </section>
    );
  }

  const statusStyle = {
    requested: "bg-yellow-100 text-yellow-800",
    in_progress: "bg-blue-100 text-blue-800",
    done: "bg-green-100 text-green-800",
    cancelled: "bg-red-100 text-red-800",
  };

  const statusLabel = {
    requested: "Menunggu",
    in_progress: "Dikerjakan",
    done: "Selesai",
    cancelled: "Dibatalkan",
  };

  return (
    <section className="bg-[#f6f1e9] pt-28 pb-14 min-h-screen">
      <div className="mx-auto max-w-screen-xl px-6">
        <h1 className="mb-6 text-2xl font-bold text-[#4b3b18]">Pesananku</h1>

        <div className="overflow-x-auto rounded-2xl border border-[#e2d8c3] bg-white shadow-sm">
          <table className="w-full border-collapse">
            <thead className="bg-[#fdfaf4]">
              <tr className="text-left text-sm text-[#8a7a52]">
                <th className="px-6 py-4">Nomor Pesanan</th>
                <th className="px-6 py-4">Pesanan</th>
                <th className="px-6 py-4">Tipe</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Total Harga</th>
              </tr>
            </thead>

            <tbody>
              {loading && (
                <tr>
                  <td colSpan="5" className="px-6 py-6 text-center">
                    Memuat data...
                  </td>
                </tr>
              )}

              {!loading && orders.length === 0 && (
                <tr>
                  <td colSpan="5" className="px-6 py-6 text-center">
                    Anda belum memiliki pesanan
                  </td>
                </tr>
              )}

              {!loading &&
                orders.map((order, index) => (
                  <tr
                    key={order.id}
                    className={`border-t ${
                      index % 2 === 0 ? "bg-white" : "bg-[#fdfaf4]"
                    }`}
                  >
                    <td className="px-6 py-4 font-medium">
                      {order.order_number}
                    </td>

                    <td className="px-6 py-4">
                      {getProductName(order.product_id)}
                    </td>

                    <td className="px-6 py-4">
                      <span className="rounded-full bg-[#eef3e6] text-[#5b6f3a] px-3 py-1 text-xs font-semibold">
                        {order.type ?? "Stok Tersedia"}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                        {order.status ?? "Siap Diambil"}
                      </span>
                    </td>

                    <td className="px-6 py-4 font-semibold">
                      RP {Number(order.total_price).toLocaleString("id-ID")}
                    </td>
                  </tr>
                ))}

              {!loading &&
                measurements.map((measurement, index) => (
                  <tr
                    key={measurement.id}
                    className={`border-t ${
                      index % 2 === 0 ? "bg-white" : "bg-[#fdfaf4]"
                    }`}
                  >
                    <td className="px-6 py-4 font-medium">
                      {measurement.order_number}
                    </td>

                    <td className="px-6 py-4">
                      {(() => {
                        const product = measurement.product_type; 
                        if (product === "shirt") return "Atasan";
                        if (product === "pants") return "Bawahan";
                        return "-";
                      })()}
                    </td>

                    <td className="px-6 py-4">
                      <span className="rounded-full bg-[#f3e7c8] text-[#8a6d3b] px-3 py-1 text-xs font-semibold">
                        {measurement.type ?? "Pre Order"}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          statusStyle[measurement.status] ||
                          "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {statusLabel[measurement.status] || measurement.status}
                      </span>
                    </td>

                    <td className="px-6 py-4 font-semibold">
                      {!measurement.total_price ||
                      measurement.total_price === 0 ? (
                        <span className="italic text-[#8a7a52]">
                          Menunggu konfirmasi harga
                        </span>
                      ) : (
                        <>
                          RP{" "}
                          {Number(measurement.total_price).toLocaleString(
                            "id-ID"
                          )}
                        </>
                      )}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
