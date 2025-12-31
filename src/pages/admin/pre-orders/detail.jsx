import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { showMeasurement } from "../../../_services/measurements";
import { getUsers } from "../../../_services/users";
import { measurementsImageStorage } from "../../../_api";

export default function MeasurementDetail() {
  const { id } = useParams();
  const [measurement, setMeasurement] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [measurementData, usersData] = await Promise.all([
          showMeasurement(id),
          getUsers(),
        ]);

        setMeasurement(measurementData);
        setUsers(usersData);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const getCustomerName = (customerId) => {
    const user = users.find((u) => u.id === customerId);
    return user ? user.name : "-";
  };

  if (loading) {
    return <p className="p-6 text-center">Memuat detail ukuran...</p>;
  }

  if (!measurement) {
    return <p className="p-6 text-center">Data tidak ditemukan</p>;
  }

  return (
    <section className="p-6 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-700 dark:text-white">
            Detail Ukuran
          </h2>
          <Link
            to="/admin/measurements"
            className="text-sm text-blue-600 hover:underline"
          >
            Kembali
          </Link>
        </div>

        {/* Info Utama */}
        <div className="grid grid-cols-2 gap-4 text-sm mb-6">
          <div>
            <p className="text-gray-500">Nomor Pesanan</p>
            <p className="font-medium">{measurement.order_number}</p>
          </div>
          <div>
            <p className="text-gray-500">Nama Pelanggan</p>
            <p className="font-medium">
              {getCustomerName(measurement.customer_id)}
            </p>
          </div>
          <div>
            <p className="text-gray-500">Jenis Produk</p>
            <p className="font-medium">
              {measurement.product_type === "shirt" ? "Atasan" : "Bawahan"}
            </p>
          </div>
          <div>
            <p className="text-gray-500">Tipe Ukuran</p>
            <p className="font-medium">
              {measurement.measurement_type === "custom" ? (
                "Kustom"
              ) : (
                <>
                  Standar{" "}
                  <span className="text-sm text-gray-600">
                    ({measurement.size})
                  </span>
                </>
              )}
            </p>
          </div>
        </div>

        {/* Ukuran */}
        <div className="space-y-6">
          {/* Atasan */}
          {(measurement.panjang_bahu ||
            measurement.panjang_lengan ||
            measurement.lingkar_dada ||
            measurement.panjang_baju ||
            (measurement.lingkar_pinggang &&
              measurement.product_type === "shirt")) && (
            <div>
              <h3 className="font-semibold mb-3">Ukuran Atasan</h3>
              <div className="grid grid-cols-2 gap-3 text-sm">
                {measurement.panjang_bahu && (
                  <p>Panjang Bahu: {measurement.panjang_bahu} cm</p>
                )}
                {measurement.panjang_lengan && (
                  <p>Panjang Lengan: {measurement.panjang_lengan} cm</p>
                )}
                {measurement.lingkar_dada && (
                  <p>Lingkar Dada: {measurement.lingkar_dada} cm</p>
                )}
                {measurement.panjang_baju && (
                  <p>Panjang Baju: {measurement.panjang_baju} cm</p>
                )}
                {measurement.lingkar_pinggang &&
                  measurement.product_type === "shirt" && (
                    <p>Lingkar Pinggang: {measurement.lingkar_pinggang} cm</p>
                  )}
              </div>
            </div>
          )}

          {/* Bawahan */}
          {(measurement.panjang_celana ||
            (measurement.lingkar_pinggang &&
              measurement.product_type === "pants") ||
            measurement.lingkar_paha ||
            measurement.lingkar_betis ||
            measurement.lingkar_lutut ||
            measurement.lingkar_kaki) && (
            <div>
              <h3 className="font-semibold mb-3">Ukuran Bawahan</h3>
              <div className="grid grid-cols-2 gap-3 text-sm">
                {measurement.panjang_celana && (
                  <p>Panjang Celana: {measurement.panjang_celana} cm</p>
                )}
                {measurement.lingkar_pinggang &&
                  measurement.product_type === "pants" && (
                    <p>Lingkar Pinggang: {measurement.lingkar_pinggang} cm</p>
                  )}
                {measurement.lingkar_paha && (
                  <p>Lingkar Paha: {measurement.lingkar_paha} cm</p>
                )}
                {measurement.lingkar_betis && (
                  <p>Lingkar Betis: {measurement.lingkar_betis} cm</p>
                )}
                {measurement.lingkar_lutut && (
                  <p>Lingkar Lutut: {measurement.lingkar_lutut} cm</p>
                )}
                {measurement.lingkar_kaki && (
                  <p>Lingkar Kaki: {measurement.lingkar_kaki} cm</p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Catatan */}
        {measurement.catatan && (
          <div className="mt-6">
            <h3 className="font-semibold mb-2">Catatan</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {measurement.catatan}
            </p>
          </div>
        )}

        {/* Gambar */}
        {measurement.image && (
          <div className="mt-6">
            <h3 className="font-semibold mb-2">Referensi Gambar</h3>
            <img
              src={`${measurementsImageStorage}/${measurement.image}`}
              alt="Referensi"
              className="w-48 rounded border"
            />
          </div>
        )}
      </div>
    </section>
  );
}
