import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getUsers } from "../../../_services/users";
import {
  updateMeasurement,
  //   getMeasurement,
  showMeasurement,
} from "../../../_services/measurements";

export default function MeasurementEdit() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    customer_id: "",
    product_type: "",
    measurement_type: "",
    size: "",
    catatan: "",
    image: null,
    panjang_bahu: "",
    panjang_lengan: "",
    lingkar_dada: "",
    panjang_baju: "",
    lingkar_pinggang: "",
    panjang_celana: "",
    lingkar_paha: "",
    lingkar_betis: "",
    lingkar_lutut: "",
    lingkar_kaki: "",
    _method: "PUT",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersData, measurementData] = await Promise.all([
          getUsers(),
          // getMeasurement(id),
          showMeasurement(id),
        ]);
        //   console.log("Raw API data:", measurement);

        setUsers(usersData);
        setFormData({
          customer_id: measurementData.customer_id,
          product_type: measurementData.product_type,
          measurement_type: measurementData.measurement_type,
          size: measurementData.size || "",
          catatan: measurementData.catatan || "",
          image: null,
          panjang_bahu: measurementData.panjang_bahu || "",
          panjang_lengan: measurementData.panjang_lengan || "",
          lingkar_dada: measurementData.lingkar_dada || "",
          panjang_baju: measurementData.panjang_baju || "",
          lingkar_pinggang: measurementData.lingkar_pinggang || "",
          panjang_celana: measurementData.panjang_celana || "",
          lingkar_paha: measurementData.lingkar_paha || "",
          lingkar_betis: measurementData.lingkar_betis || "",
          lingkar_lutut: measurementData.lingkar_lutut || "",
          lingkar_kaki: measurementData.lingkar_kaki || "",
          _method: "PUT",
        });
      } catch (err) {
        console.error(err);
        alert("Gagal mengambil data order measurement");
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();

    form.append("customer_id", parseInt(formData.customer_id));
    form.append("product_type", formData.product_type);
    form.append("measurement_type", formData.measurement_type);
    if (formData.measurement_type === "standard")
      form.append("size", formData.size);
    form.append("catatan", formData.catatan);
    if (formData.image) form.append("image", formData.image);

    // Custom Shirt
    if (
      formData.measurement_type === "custom" &&
      formData.product_type === "shirt"
    ) {
      form.append("panjang_bahu", formData.panjang_bahu);
      form.append("panjang_lengan", formData.panjang_lengan);
      form.append("lingkar_dada", formData.lingkar_dada);
      form.append("panjang_baju", formData.panjang_baju);
      form.append("lingkar_pinggang", formData.lingkar_pinggang);
    }

    // Custom Pants
    if (
      formData.measurement_type === "custom" &&
      formData.product_type === "pants"
    ) {
      form.append("panjang_celana", formData.panjang_celana);
      form.append("lingkar_pinggang", formData.lingkar_pinggang);
      form.append("lingkar_paha", formData.lingkar_paha);
      form.append("lingkar_betis", formData.lingkar_betis);
      form.append("lingkar_lutut", formData.lingkar_lutut);
      form.append("lingkar_kaki", formData.lingkar_kaki);
    }

    try {
      await updateMeasurement(id, form);
      alert("Pre-order berhasil diperbarui");
      navigate("/admin/measurements");
    } catch (err) {
      console.error(err);
      alert("Gagal memperbarui pre-order");
    }
  };

  //   console.log("Data from API:", formData);

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="max-w-2xl px-4 py-8 mx-auto lg:py-16">
        <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
          Edit Pre-Order
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
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
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
              >
                <option value="" disabled>
                  ---Pilih Customer---
                </option>
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Jenis Produk */}
            <div className="sm:col-span-2">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Jenis Produk
              </label>
              <select
                value={formData.product_type}
                name="product_type"
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                required
              >
                <option value="" disabled>
                  ---Pilih Produk---
                </option>
                <option value="shirt">Atasan</option>
                <option value="pants">Bawahan</option>
              </select>
            </div>

            {/* Jenis Ukuran */}
            <div className="sm:col-span-2">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Jenis Ukuran
              </label>
              <select
                name="measurement_type"
                value={formData.measurement_type}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                required
              >
                <option value="" disabled>
                  ---Pilih Jenis Ukuran---
                </option>
                <option value="standard">Standar</option>
                <option value="custom">Kustom</option>
              </select>
            </div>

            {/* Ukuran Standar */}
            {formData.measurement_type === "standard" && (
              <div className="sm:col-span-2">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Ukuran
                </label>
                <select
                  name="size"
                  value={formData.size}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                  required
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
            )}

            {/* Custom Baju */}
            {formData.measurement_type === "custom" &&
              formData.product_type === "shirt" && (
                <>
                  <CustomInputAdmin
                    label="Panjang Bahu"
                    name="panjang_bahu"
                    onChange={handleChange}
                    value={formData.panjang_bahu}
                  />
                  <CustomInputAdmin
                    label="Panjang Lengan"
                    name="panjang_lengan"
                    onChange={handleChange}
                    value={formData.panjang_lengan}
                  />
                  <CustomInputAdmin
                    label="Lingkar Dada"
                    name="lingkar_dada"
                    onChange={handleChange}
                    value={formData.lingkar_dada}
                  />
                  <CustomInputAdmin
                    label="Panjang Baju"
                    name="panjang_baju"
                    onChange={handleChange}
                    value={formData.panjang_baju}
                  />
                  <CustomInputAdmin
                    label="Lingkar Pinggang"
                    name="lingkar_pinggang"
                    onChange={handleChange}
                    value={formData.lingkar_pinggang}
                  />
                </>
              )}

            {/* Custom Celana */}
            {formData.measurement_type === "custom" &&
              formData.product_type === "pants" && (
                <>
                  <CustomInputAdmin
                    label="Lingkar Pinggang"
                    name="lingkar_pinggang"
                    onChange={handleChange}
                    value={formData.lingkar_pinggang}
                  />
                  <CustomInputAdmin
                    label="Panjang Celana"
                    name="panjang_celana"
                    onChange={handleChange}
                    value={formData.panjang_celana}
                  />
                  <CustomInputAdmin
                    label="Lingkar Paha"
                    name="lingkar_paha"
                    onChange={handleChange}
                    value={formData.lingkar_paha}
                  />
                  <CustomInputAdmin
                    label="Lingkar Betis"
                    name="lingkar_betis"
                    onChange={handleChange}
                    value={formData.lingkar_betis}
                  />
                  <CustomInputAdmin
                    label="Lingkar Lutut"
                    name="lingkar_lutut"
                    onChange={handleChange}
                    value={formData.lingkar_lutut}
                  />
                  <CustomInputAdmin
                    label="Lingkar Kaki"
                    name="lingkar_kaki"
                    onChange={handleChange}
                    value={formData.lingkar_kaki}
                  />
                </>
              )}

            {/* Referensi Model */}
            <div className="sm:col-span-2">
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Referensi Model
              </label>
              <input
                type="file"
                name="image"
                onChange={handleChange}
                accept="image/*"
                className="w-full px-4 py-3 rounded-xl border border-gray-300"
              />
            </div>

            {/* Catatan */}
            <div className="sm:col-span-2">
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Catatan
              </label>
              <textarea
                name="catatan"
                rows="4"
                value={formData.catatan}
                onChange={handleChange}
                placeholder="Warna, bahan, model, dll"
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300"
              />
            </div>
          </div>

          <button
            type="submit"
            className="text-white bg-indigo-700 hover:bg-indigo-800
                       focus:ring-4 focus:outline-none focus:ring-indigo-300
                       font-medium rounded-lg text-sm px-5 py-2.5 mt-4"
          >
            Simpan Perubahan
          </button>
        </form>
      </div>
    </section>
  );
}

/* 🔹 INPUT COMPONENT ADMIN */
function CustomInputAdmin({ label, name, onChange, value }) {
  return (
    <div className="sm:col-span-2">
      <label className="block mb-2 text-sm font-medium text-gray-900">
        {label} (cm)
      </label>
      <input
        type="number"
        name={name}
        value={value || ""}
        onChange={onChange}
        placeholder={`Masukkan ${label.toLowerCase()}`}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
        required
      />
    </div>
  );
}
