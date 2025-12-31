import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <div className="min-h-screen bg-[#e7dcce]">
        {/* HERO SECTION */}
        <section className="relative min-h-screen">
          <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen">
            {/* KONTEN KIRI */}
            <div className="px-8 md:px-20 pt-44">
              <h2 className="text-4xl md:text-5xl font-bold text-[#4b3b18] mb-6 leading-tight">
                Elegan & Stylish <br /> untuk Setiap Momen
              </h2>
              <p className="text-[#6b5a2b] mb-8 max-w-xl">
                Azmya Fashion menghadirkan koleksi pakaian modern dengan
                sentuhan elegan, nyaman digunakan, dan sesuai dengan gaya kamu.
              </p>
              <Link
                to="/products"
                className="inline-block bg-[#c6a84d] hover:bg-[#b1913e] text-white font-semibold px-6 py-3 rounded-xl transition"
              >
                Lihat Koleksi
              </Link>
            </div>

            {/* GAMBAR */}
            <div className="relative flex justify-center md:block">
              <img
                src="/pic.png"
                alt="Azmya Fashion"
                className="
            mt-12
            max-h-[420px]
            md:mt-0
            md:absolute md:bottom-0 md:right-0
            md:max-h-[520px]
          "
              />
            </div>
          </div>
        </section>
      </div>

      {/* FEATURE SECTION */}
      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-4">
          {/* HEADER */}
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#4b3b18] mb-4">
              Kenapa Memilih Azmya Fashion?
            </h2>
            <p className="text-[#6b5a2b]">
              Kami percaya bahwa setiap pakaian bukan hanya soal gaya, tetapi
              juga kenyamanan dan kepercayaan diri.
            </p>
          </div>

          {/* CARD */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#f6f1e9] p-6 rounded-2xl text-center">
              <h3 className="text-lg font-semibold text-[#4b3b18] mb-2">
                Desain Eksklusif
              </h3>
              <p className="text-sm text-[#6b5a2b]">
                Setiap produk dirancang dengan detail dan karakter unik.
              </p>
            </div>

            <div className="bg-[#f6f1e9] p-6 rounded-2xl text-center">
              <h3 className="text-lg font-semibold text-[#4b3b18] mb-2">
                Bahan Nyaman
              </h3>
              <p className="text-sm text-[#6b5a2b]">
                Menggunakan material berkualitas tinggi dan nyaman dipakai.
              </p>
            </div>

            <div className="bg-[#f6f1e9] p-6 rounded-2xl text-center">
              <h3 className="text-lg font-semibold text-[#4b3b18] mb-2">
                Harga Terjangkau
              </h3>
              <p className="text-sm text-[#6b5a2b]">
                Kualitas premium dengan harga yang bersahabat.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SIZE GUIDE SECTION */}
      <section className="bg-[#f6f1e9] py-20">
        <div className="max-w-6xl mx-auto px-4">
          {/* HEADER */}
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#4b3b18] mb-4">
              Panduan Ukuran
            </h2>
            <p className="text-[#6b5a2b]">
              Gunakan panduan ukuran di bawah ini untuk memastikan pakaian yang
              kamu pilih pas dan nyaman digunakan.
            </p>
          </div>

          {/* TABLE */}
          <div className="overflow-x-auto text-center">
            <table className="w-full border-collapse rounded-2xl overflow-hidden shadow-lg">
              <thead>
                {/* HEADER ATAS (GROUP) */}
                <tr className="bg-[#b1913e] text-white text-sm uppercase tracking-wide">
                  <th
                    rowSpan="2"
                    className="py-4 px-4 text-center align-middle"
                  >
                    Ukuran
                  </th>
                  <th
                    colSpan="2"
                    className="py-4 px-4 text-center border-l border-white/30"
                  >
                    Baju 👕
                  </th>
                  <th
                    colSpan="2"
                    className="py-4 px-4 text-center border-l border-white/30"
                  >
                    Celana 👖
                  </th>
                </tr>

                {/* HEADER BAWAH (DETAIL) */}
                <tr className="bg-[#c6a84d] text-white text-sm">
                  <th className="py-3 px-4 text-center border-l border-white/30">
                    Lingkar Dada (cm)
                  </th>
                  <th className="py-3 px-4 text-center">Panjang Baju (cm)</th>
                  <th className="py-3 px-4 text-center border-l border-white/30">
                    Lingkar Pinggang (cm)
                  </th>
                  <th className="py-3 px-4 text-center">Panjang Celana (cm)</th>
                </tr>
              </thead>

              <tbody className="bg-white text-[#4b3b18] text-sm">
                {[
                  ["XS", "88", "63", "66 – 72", "92"],
                  ["S", "94", "65", "70 – 76", "94"],
                  ["M", "100", "68", "76 – 84", "96"],
                  ["L", "106", "70", "82 – 90", "98"],
                  ["XL", "112", "72", "88 – 96", "100"],
                  ["XXL", "120", "74", "94 – 104", "102"],
                  ["3XL", "128", "77", "100 – 110", "104"],
                ].map((row, index) => (
                  <tr
                    key={index}
                    className="border-b last:border-none hover:bg-[#f6f1e9] transition"
                  >
                    <td className="py-4 px-4 font-semibold">{row[0]}</td>
                    <td className="py-4 px-4">{row[1]}</td>
                    <td className="py-4 px-4">{row[2]}</td>
                    <td className="py-4 px-4">{row[3]}</td>
                    <td className="py-4 px-4">{row[4]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* NOTE */}
          <p className="text-sm text-[#6b5a2b] mt-6 text-center">
            *Ukuran dapat berbeda ±1–2 cm tergantung proses produksi.
          </p>
        </div>

        {/* SIZE GUIDE NOTE */}
        <div className="bg-white rounded-2xl p-8 my-8 mx-20 shadow-md border border-[#eee3cf]">
          {/* HEADER */}
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-full bg-[#f6f1e9] flex items-center justify-center">
              📏
            </div>
            <h3 className="text-lg font-semibold text-[#4b3b18]">
              Cara Membaca Ukuran
            </h3>
          </div>

          {/* LIST */}
          <ul className="space-y-4 text-[#6b5a2b] text-sm leading-relaxed">
            <li className="flex gap-3">
              <span className="text-[#c6a84d] font-bold">•</span>
              <p>
                <span className="font-semibold text-[#4b3b18]">
                  Lingkar Dada (Baju):
                </span>{" "}
                Diukur mengelilingi bagian dada paling lebar. Pastikan meteran
                tidak terlalu ketat.
              </p>
            </li>

            <li className="flex gap-3">
              <span className="text-[#c6a84d] font-bold">•</span>
              <p>
                <span className="font-semibold text-[#4b3b18]">
                  Panjang Baju:
                </span>{" "}
                Diukur dari bahu paling atas hingga bagian bawah baju.
              </p>
            </li>

            <li className="flex gap-3">
              <span className="text-[#c6a84d] font-bold">•</span>
              <p>
                <span className="font-semibold text-[#4b3b18]">
                  Lingkar Pinggang (Celana):
                </span>{" "}
                Diukur mengelilingi pinggang atau bagian celana yang biasa
                dipakai.
              </p>
            </li>

            <li className="flex gap-3">
              <span className="text-[#c6a84d] font-bold">•</span>
              <p>
                <span className="font-semibold text-[#4b3b18]">
                  Panjang Celana:
                </span>{" "}
                Diukur dari pinggang hingga ujung bawah celana.
              </p>
            </li>
          </ul>

          {/* TIPS */}
          <div className="mt-6 bg-[#f6f1e9] rounded-xl p-4 text-sm text-[#6b5a2b]">
            💡 <span className="font-semibold text-[#4b3b18]">Tips : </span>
            Jika ukuran tubuh kamu berada di antara dua ukuran, disarankan
            memilih ukuran yang lebih besar agar lebih nyaman.
          </div>

          {/* CTA CHAT */}
          <div className="mt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <p className="text-sm text-[#6b5a2b]">
              Masih ragu dengan ukuran yang cocok?
            </p>

            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 bg-[#c6a84d] hover:bg-[#b1913e] text-white font-semibold px-6 py-3 rounded-xl transition"
            >
              💬 Chat Kami
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
