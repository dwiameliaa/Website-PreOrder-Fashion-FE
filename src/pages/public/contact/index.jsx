export default function Contact() {
  return (
    <>
      <section class="pt-28 pb-20 px-6 bg-white text-gray-800">
        {/* HERO */}
        <div class="text-center mb-14">
          <h1 class="text-4xl font-bold text-[#c6a84d]">
            Contact Azmya Fashion
          </h1>
          <p class="mt-3 text-lg text-gray-600">
            Kami siap membantu untuk semua pertanyaan seputar Pre-Order,
            Product, dan layanan lainnya.
          </p>
        </div>

        {/* GRID KONTAK + FORM */}
        <div class="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* INFORMASI KONTAK */}
          <div class="space-y-6">
            <h2 class="text-2xl font-bold text-gray-800">Informasi Kontak</h2>

            <div>
              <p class="font-semibold text-gray-700">📍 Alamat:</p>
              <p class="text-gray-600">
                Ponorogo, Jawa Timur
              </p>
            </div>

            <div>
              <p class="font-semibold text-gray-700">📞 Telepon / WhatsApp:</p>
              <a
                href="https://wa.me/6281234567890"
                class="text-[#c6a84d] hover:underline"
              >
                +62 812-3456-7890
              </a>
            </div>

            <div>
              <p class="font-semibold text-gray-700">📧 Email:</p>
              <a
                href="mailto:azmyafashion@gmail.com"
                class="text-[#c6a84d] hover:underline"
              >
                azmyafashion@gmail.com
              </a>
            </div>

            <div>
              <p class="font-semibold text-gray-700">🕒 Jam Operasional:</p>
              <p class="text-gray-600">Senin – Sabtu, 08.00 – 21.00 WIB</p>
            </div>
          </div>

          {/* FORM KONTAK */}
          <form class="bg-white shadow-lg rounded-xl p-6 border border-gray-200">
            <h2 class="text-2xl font-bold mb-5 text-gray-800">Kirim Pesan</h2>

            <div class="mb-4">
              <label class="block font-semibold mb-1">Nama Lengkap</label>
              <input
                type="text"
                class="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-[#c6a84d] outline-none"
                placeholder="Masukkan nama"
              />
            </div>

            <div class="mb-4">
              <label class="block font-semibold mb-1">Email</label>
              <input
                type="email"
                class="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-[#c6a84d] outline-none"
                placeholder="Masukkan email"
              />
            </div>

            <div class="mb-4">
              <label class="block font-semibold mb-1">Pesan</label>
              <textarea
                rows="5"
                class="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-[#c6a84d] outline-none"
                placeholder="Tuliskan pesan Anda..."
              ></textarea>
            </div>

            <button
              type="submit"
              class="w-full bg-[#c6a84d] text-white font-semibold py-3 rounded-lg hover:bg-[#b59742] transition-all"
            >
              Kirim Pesan
            </button>
          </form>
        </div>

        {/* GOOGLE MAPS */}
        <div class="max-w-4xl mx-auto mt-16">
          <h2 class="text-2xl font-bold mb-4 text-gray-800 text-center">
            Lokasi Kami
          </h2>
          <iframe
            class="w-full h-64 rounded-xl shadow-md border border-gray-200"
            src="https://maps.google.com/maps?q=surabaya&t=&z=13&ie=UTF8&iwloc=&output=embed"
            loading="lazy"
          ></iframe>
        </div>
      </section>
    </>
  );
}
