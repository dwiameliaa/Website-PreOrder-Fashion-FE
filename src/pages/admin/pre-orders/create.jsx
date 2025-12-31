import { useEffect, useState } from "react";
import { createMeasurement } from "../../../_services/measurements";
import { useNavigate } from "react-router-dom";
import { getUsers } from "../../../_services/users";

export default function MeasurementCreate() {
  const navigate = useNavigate();

  const [productType, setProductType] = useState("");
  const [measurementType, setMeasurementType] = useState("");
  const [size, setSize] = useState("");
  const [users, setUsers] = useState([]);
  const [catatan, setCatatan] = useState("");

  const [formData, setFormData] = useState({
    customer_id: "",
    productType: "", // shirt / pants
    measurementType: "", // standard / custom
    size: "", 
    catatan: "", 
    image: null, 
    // Ukuran custom baju
    panjang_bahu: "",
    panjang_lengan: "",
    lingkar_dada: "",
    panjang_baju: "",
    lingkar_pinggang: "",
    // Ukuran custom celana
    panjang_celana: "",
    lingkar_paha: "",
    lingkar_betis: "",
    lingkar_lutut: "",
    lingkar_kaki: "",
  });

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

  useEffect(() => {
    const fetchData = async () => {
      const [usersData] = await Promise.all([getUsers()]);

      setUsers(usersData);
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();

    form.append("customer_id", parseInt(formData.customer_id));
    form.append("product_type", productType);
    form.append("measurement_type", measurementType);
    if (measurementType === "standard") form.append("size", size);
    form.append("catatan", catatan);

    // File
    if (formData.image) form.append("image", formData.image);

    // Custom Shirt
    if (measurementType === "custom" && productType === "shirt") {
      form.append("panjang_bahu", formData.panjang_bahu);
      form.append("panjang_lengan", formData.panjang_lengan);
      form.append("lingkar_dada", formData.lingkar_dada);
      form.append("panjang_baju", formData.panjang_baju);
      form.append("lingkar_pinggang", formData.lingkar_pinggang);
    }

    // Custom Pants
    if (measurementType === "custom" && productType === "pants") {
      form.append("panjang_celana", formData.panjang_celana);
      form.append("lingkar_pinggang", formData.lingkar_pinggang);
      form.append("lingkar_paha", formData.lingkar_paha);
      form.append("lingkar_betis", formData.lingkar_betis);
      form.append("lingkar_lutut", formData.lingkar_lutut);
      form.append("lingkar_kaki", formData.lingkar_kaki);
    }

    try {
      await createMeasurement(form);
      alert("Pre-order berhasil ditambahkan");
      navigate("/admin/measurements");
    } catch (err) {
      console.error(err);
      alert("Gagal menambahkan pre-order");
    }
  };

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="max-w-2xl px-4 py-8 mx-auto lg:py-16">
        <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
          Tambah Pre-Order
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
                onChange={(e) => {
                  handleChange(e);
                  console.log("customer_id:", e.target.value);
                }}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500"
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
                value={productType}
                onChange={(e) => setProductType(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                           focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5
                           dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
              >
                <option value="" disabled>
                  -- Pilih Produk --
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
                value={measurementType}
                onChange={(e) => setMeasurementType(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                           focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5
                           dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
              >
                <option value="" disabled>
                  -- Pilih Jenis Ukuran --
                </option>
                <option value="standard">Standar</option>
                <option value="custom">Kustom</option>
              </select>
            </div>

            {/* Ukuran Standar */}
            {measurementType === "standard" && (
              <div className="sm:col-span-2">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Ukuran
                </label>
                <select
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                             focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5
                             dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  required
                >
                  <option value="" disabled>
                    -- Pilih Ukuran --
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
            {measurementType === "custom" && productType === "shirt" && (
              <>
                <CustomInputAdmin
                  label="Panjang Bahu"
                  name="panjang_bahu"
                  onChange={handleChange}
                />
                <CustomInputAdmin
                  label="Panjang Lengan"
                  name="panjang_lengan"
                  onChange={handleChange}
                />
                <CustomInputAdmin
                  label="Lingkar Dada"
                  name="lingkar_dada"
                  onChange={handleChange}
                />
                <CustomInputAdmin
                  label="Panjang Baju"
                  name="panjang_baju"
                  onChange={handleChange}
                />
                <CustomInputAdmin
                  label="Lingkar Pinggang"
                  name="lingkar_pinggang"
                  onChange={handleChange}
                />
              </>
            )}

            {/* Custom Celana */}
            {measurementType === "custom" && productType === "pants" && (
              <>
                <CustomInputAdmin
                  label="Lingkar Pinggang"
                  name="lingkar_pinggang"
                  onChange={handleChange}
                />
                <CustomInputAdmin
                  label="Panjang Celana"
                  name="panjang_celana"
                  onChange={handleChange}
                />
                <CustomInputAdmin
                  label="Lingkar Paha"
                  name="lingkar_paha"
                  onChange={handleChange}
                />
                <CustomInputAdmin
                  label="Lingkar Betis"
                  name="lingkar_betis"
                  onChange={handleChange}
                />
                <CustomInputAdmin
                  label="Lingkar Lutut"
                  name="lingkar_lutut"
                  onChange={handleChange}
                />
                <CustomInputAdmin
                  label="Lingkar Kaki"
                  name="lingkar_kaki"
                  onChange={handleChange}
                />
              </>
            )}

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-900">
                Referensi Model
              </label>

              <input
                type="file"
                name="image"
                onChange={handleChange}
                accept="image/*"
                className="w-full px-4 py-3 rounded-xl border border-gray-300
               bg-gray-50 text-gray-900
               file:mr-4 file:px-4 file:py-2
               file:rounded-lg file:border-0
               file:bg-gray-400 file:text-white
               file:font-semibold
               hover:file:bg-gray-700
               transition
               focus:outline-none focus:ring-2 focus:ring-[#c6a84d]"
              />
            </div>

            {/* Catatan */}
            <div className="sm:col-span-2">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Catatan
              </label>
              <textarea
                rows="4"
                onChange={(e) => setCatatan(e.target.value)}
                placeholder="Warna, bahan, model, dll"
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg
                           border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500
                           dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
          </div>

          <button
            type="submit"
            className="text-white bg-indigo-700 hover:bg-indigo-800
                       focus:ring-4 focus:outline-none focus:ring-indigo-300
                       font-medium rounded-lg text-sm px-5 py-2.5 mt-4
                       dark:bg-indigo-600 dark:hover:bg-indigo-700"
          >
            Simpan Pre-Order
          </button>
        </form>
      </div>
    </section>
  );
}

/* 🔹 INPUT COMPONENT ADMIN */
function CustomInputAdmin({ label, name, onChange }) {
  return (
    <div className="sm:col-span-2">
      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        {label} (cm)
      </label>
      <input
        type="number"
        name={name}
        onChange={onChange}
        placeholder={`Masukkan ${label.toLowerCase()}`}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                   focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5
                   dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        required
      />
    </div>
  );
}
