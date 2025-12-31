import { useState } from "react";
import { createMeasurement } from "../../../_services/measurements"; // pakai service

export default function PreOrder() {
  const [productType, setProductType] = useState("");
  const [measurementType, setMeasurementType] = useState("");
  const [size, setSize] = useState("");
  const [form, setForm] = useState({});
  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validasi
    if (!productType) return alert("Silakan pilih jenis produk");
    if (!measurementType) return alert("Silakan pilih jenis ukuran");

    if (measurementType === "standard" && !size) {
      return alert("Silakan pilih ukuran standard");
    }

    if (measurementType === "custom") {
      const requiredFields =
        productType === "shirt"
          ? ["panjang_bahu","panjang_lengan","lingkar_dada","panjang_baju","lingkar_pinggang"]
          : ["lingkar_pinggang","panjang_celana","lingkar_paha","lingkar_betis","lingkar_lutut","lingkar_kaki"];

      const empty = requiredFields.some((f) => !form[f]);
      if (empty) return alert("Semua ukuran custom wajib diisi");
    }

    if (!file) return alert("Silakan upload referensi model");

    // FormData
    const payload = new FormData();
    payload.append("product_type", productType);
    payload.append("measurement_type", measurementType);
    if (measurementType === "standard") payload.append("size", size);
    Object.entries(form).forEach(([key, value]) => {
      if (value) payload.append(key, value);
    });
    payload.append("image", file);

    try {
      const response = await createMeasurement(payload); // pakai service
      console.log(response);
      alert("Pre-order berhasil dikirim!");
      
      // Reset form
      setProductType("");
      setMeasurementType("");
      setSize("");
      setForm({});
      setFile(null);
    } catch (error) {
      console.error(error);
      alert("Gagal mengirim pre-order");
    }
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
          {/* Jenis Produk */}
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
               transition"
            >
              <option value="" disabled>--- Pilih Jenis Produk ---</option>
              <option value="shirt">Atasan</option>
              <option value="pants">Bawahan</option>
            </select>
          </div>

          {/* Jenis Ukuran */}
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
               transition"
            >
              <option value="" disabled>--- Pilih Jenis Ukuran ---</option>
              <option value="standard">Standard</option>
              <option value="custom">Custom</option>
            </select>
          </div>

          {/* Standard */}
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
                 focus:outline-none focus:ring-2 focus:ring-[#c6a84d]"
              >
                <option value="" disabled>--- Pilih Ukuran ---</option>
                {["XS", "S", "M", "L", "XL", "XXL", "3XL"].map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
          )}

          {/* Custom */}
          {measurementType === "custom" && productType === "shirt" && (
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-[#4b3b18]">Ukuran Custom Baju (cm)</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {["panjang_bahu","panjang_lengan","lingkar_dada","panjang_baju","lingkar_pinggang"].map((f) => (
                  <CustomInput key={f} label={f.replace("_"," ")} name={f} onChange={handleChange}/>
                ))}
              </div>
            </div>
          )}

          {measurementType === "custom" && productType === "pants" && (
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-[#4b3b18]">Ukuran Custom Celana (cm)</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {["lingkar_pinggang","panjang_celana","lingkar_paha","lingkar_betis","lingkar_lutut","lingkar_kaki"].map((f) => (
                  <CustomInput key={f} label={f.replace("_"," ")} name={f} onChange={handleChange}/>
                ))}
              </div>
            </div>
          )}

          {/* Upload Gambar */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-[#4b3b18]">
              Referensi Model
            </label>
            <input
              type="file"
              onChange={handleFileChange}
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

          {/* Catatan */}
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

function CustomInput({ label, name, onChange }) {
  return (
    <div className="space-y-1">
      <label className="block text-sm text-[#4b3b18] font-medium">{label}</label>
      <input
        type="number"
        name={name}
        onChange={onChange}
        placeholder={`Masukkan ${label.toLowerCase()}`}
        className="w-full px-4 py-3 rounded-xl border border-[#e2d8c3]
                   bg-[#fdfaf4] text-[#4b3b18]
                   placeholder-gray-400
                   focus:outline-none focus:ring-2 focus:ring-[#c6a84d]
                   transition"
      />
    </div>
  );
}
