import { useState } from "react";

export default function PreOrder() {
  const [productType, setProductType] = useState("");
  const [measurementType, setMeasurementType] = useState("");
  const [size, setSize] = useState("");
  const [form, setForm] = useState({});

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  /* ✅ VALIDASI & SUBMIT */
  const handleSubmit = (e) => {
    e.preventDefault();

    if (measurementType === "standard" && !size) {
      alert("Silakan pilih ukuran standard");
      return;
    }

    if (measurementType === "custom") {
      const requiredFields =
        productType === "shirt"
          ? [
              "panjang_bahu",
              "panjang_lengan",
              "lingkar_dada",
              "panjang_baju",
              "lingkar_pinggang",
            ]
          : [
              "lingkar_pinggang",
              "panjang_celana",
              "lingkar_paha",
              "lingkar_betis",
              "lingkar_lutut",
              "lingkar_kaki",
            ];

      const empty = requiredFields.some((f) => !form[f]);
      if (empty) {
        alert("Semua ukuran custom wajib diisi");
        return;
      }
    }

    /* 🚀 PAYLOAD */
    const payload = {
      product_type: productType,
      measurement_type: measurementType,
      size: measurementType === "standard" ? size : null,
      ...form,
    };

    console.log(payload);
    alert("Pre-order berhasil (simulasi)");
  };

  return (
    <div className="min-h-screen bg-[#f6f1e9] pt-28 pb-14">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow">
        <h2 className="text-3xl font-bold text-[#4b3b18] mb-2">
          Pre-Order Pakaian
        </h2>
        <p className="text-[#6b5a2b] mb-8">
          Pesan pakaian sesuai ukuran dan kebutuhan kamu
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* JENIS PRODUK */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-[#4b3b18]">
              Jenis Produk
            </label>

            <select
              value={productType}
              onChange={(e) => {
                setProductType(e.target.value);
                setForm({});
                setSize("");
              }}
              className="w-full px-4 py-3 rounded-xl border border-[#e2d8c3]
               bg-[#fdfaf4] text-[#4b3b18]
               focus:outline-none focus:ring-2 focus:ring-[#c6a84d]
               focus:border-[#c6a84d]
               transition"
            >
              <option value="" disabled>
                --- Pilih Jenis Produk ---
              </option>
              <option value="shirt">Baju</option>
              <option value="pants">Celana</option>
            </select>
          </div>

          {/* JENIS UKURAN */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-[#4b3b18]">
              Jenis Ukuran
            </label>

            <select
              value={measurementType}
              onChange={(e) => {
                setMeasurementType(e.target.value);
                setForm({});
                setSize("");
              }}
              className="w-full px-4 py-3 rounded-xl border border-[#e2d8c3]
               bg-[#fdfaf4] text-[#4b3b18]
               focus:outline-none focus:ring-2 focus:ring-[#c6a84d]
               focus:border-[#c6a84d]
               transition"
            >
              <option value="" disabled>
                --- Pilih Jenis Ukuran ---
              </option>
              <option value="standard">Standard</option>
              <option value="custom">Custom</option>
            </select>
          </div>

          {/* STANDARD */}
          {measurementType === "standard" && (
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-[#4b3b18]">
                Ukuran
              </label>

              <select
                value={size}
                onChange={(e) => setSize(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-[#e2d8c3]
                 bg-[#fdfaf4] text-[#4b3b18]
                 focus:outline-none focus:ring-2 focus:ring-[#c6a84d]
                 transition"
              >
                <option value="" disabled>--- Pilih Ukuran ---</option>
                {["XS", "S", "M", "L", "XL", "XXL", "3XL"].map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
          )}

          {measurementType === "custom" && productType === "shirt" && (
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-[#4b3b18]">
                Ukuran Custom Baju (cm)
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <CustomInput
                  label="Panjang Bahu"
                  name="panjang_bahu"
                  onChange={handleChange}
                />
                <CustomInput
                  label="Panjang Lengan"
                  name="panjang_lengan"
                  onChange={handleChange}
                />
                <CustomInput
                  label="Lingkar Dada"
                  name="lingkar_dada"
                  onChange={handleChange}
                />
                <CustomInput
                  label="Panjang Baju"
                  name="panjang_baju"
                  onChange={handleChange}
                />
                <CustomInput
                  label="Lingkar Pinggang"
                  name="lingkar_pinggang"
                  onChange={handleChange}
                />
              </div>
            </div>
          )}

          {measurementType === "custom" && productType === "pants" && (
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-[#4b3b18]">
                Ukuran Custom Celana (cm)
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <CustomInput
                  label="Lingkar Pinggang"
                  name="lingkar_pinggang"
                  onChange={handleChange}
                />
                <CustomInput
                  label="Panjang Celana"
                  name="panjang_celana"
                  onChange={handleChange}
                />
                <CustomInput
                  label="Lingkar Paha"
                  name="lingkar_paha"
                  onChange={handleChange}
                />
                <CustomInput
                  label="Lingkar Betis"
                  name="lingkar_betis"
                  onChange={handleChange}
                />
                <CustomInput
                  label="Lingkar Lutut"
                  name="lingkar_lutut"
                  onChange={handleChange}
                />
                <CustomInput
                  label="Lingkar Kaki"
                  name="lingkar_kaki"
                  onChange={handleChange}
                />
              </div>
            </div>
          )}

          {/* UPLOAD GAMBAR */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-[#4b3b18]">
              Referensi Model{" "}
              <span className="text-xs text-gray-500">(Opsional)</span>
            </label>

            <input
              type="file"
              className="w-full px-4 py-3 rounded-xl border border-[#e2d8c3]
               bg-[#fdfaf4] text-[#4b3b18]
               file:mr-4 file:px-4 file:py-2
               file:rounded-lg file:border-0
               file:bg-[#c6a84d] file:text-white
               file:font-semibold
               hover:file:bg-[#b1913e]
               transition
               focus:outline-none focus:ring-2 focus:ring-[#c6a84d]"
            />
          </div>

          {/* CATATAN */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-[#4b3b18]">
              Catatan
            </label>

            <textarea
              name="catatan"
              onChange={handleChange}
              rows="4"
              placeholder="Catatan tambahan (warna, bahan, model, dll)"
              className="w-full px-4 py-3 rounded-xl border border-[#e2d8c3]
               bg-[#fdfaf4] text-[#4b3b18]
               placeholder-gray-400
               focus:outline-none focus:ring-2 focus:ring-[#c6a84d]
               focus:border-[#c6a84d]
               transition resize-none"
            />
          </div>

          <button className="w-full bg-[#c6a84d] hover:bg-[#b1913e] text-white py-3 rounded-xl font-semibold">
            Kirim
          </button>
        </form>
      </div>
    </div>
  );
}

/* 🔹 INPUT COMPONENT */
function Input({ name, label, onChange }) {
  return (
    <input
      type="number"
      name={name}
      placeholder={`${label} (cm)`}
      onChange={onChange}
      className="input"
    />
  );
}

function CustomInput({ label, name, onChange }) {
  return (
    <div className="space-y-1">
      <label className="block text-sm text-[#4b3b18] font-medium">
        {label} (cm)
      </label>

      <input
        type="number"
        name={name}
        onChange={onChange}
        placeholder={`Masukkan ${label.toLowerCase()}`}
        className="w-full px-4 py-3 rounded-xl border border-[#e2d8c3]
                   bg-[#fdfaf4] text-[#4b3b18]
                   placeholder-gray-400
                   focus:outline-none focus:ring-2 focus:ring-[#c6a84d]
                   focus:border-[#c6a84d]
                   transition"
      />
    </div>
  );
}
