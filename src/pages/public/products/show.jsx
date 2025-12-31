import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { showProduct } from "../../../_services/products";
import { createOrder } from "../../../_services/orders";
import { productImageStorage } from "../../../_api";

export default function ProductDetail() {
  const { id } = useParams();

  const [product, setProduct] = useState({});
  const [showOrder, setShowOrder] = useState(false);
  const [size, setSize] = useState("");
  const [quantity, setQuantity] = useState("1");

  const navigate = useNavigate();
  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productData = await showProduct(id);
        setProduct(productData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!accessToken) {
      navigate("/login");
      return;
    }

    if (!size) {
      alert("Silakan pilih ukuran");
      return;
    }

    try {
      const payload = {
        product_id: id,
        quantity: Number(quantity),
        size: size,
      };

      await createOrder(payload);

      setProduct((prev) => ({
        ...prev,
        stock: prev.stock - quantity,
      }));

      alert("Pesanan berhasil dibuat");

      // Reset & hide order form
      setShowOrder(false);
      setSize("");
      setQuantity(1);
    } catch (error) {
      console.log(error.response.data);
    }
  };
  // console.log(product)

  return (
    <section className="bg-[#f6f1e9] min-h-screen pt-28 pb-16">
      <div className="max-w-5xl mx-auto px-6">
        <div className="bg-white rounded-2xl shadow p-8 grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* IMAGE */}
          <div className="rounded-xl overflow-hidden bg-[#fdfaf4]">
            <img
              src={`${productImageStorage}/${product.image}`}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* DETAILS */}
          <div className="space-y-5">
            {/* PRODUCT NAME */}
            <h1 className="text-3xl font-bold text-[#4b3b18]">
              {product.name}
            </h1>

            {/* DESCRIPTION */}
            <p className="text-[#6b5a2b] leading-relaxed">
              {product.description}
            </p>

            {/* PRICE & STOCK */}
            <div className="space-y-2">
              <p className="text-2xl font-extrabold text-[#4b3b18]">
                RP {product.price?.toLocaleString("id-ID")}
              </p>

              {/* STOCK BADGE */}
              {product.stock > 0 ? (
                <span className="inline-flex items-center gap-2 text-sm font-semibold px-3 py-1 rounded-full bg-green-100 text-green-700">
                  ● Stok Tersedia ({product.stock})
                </span>
              ) : (
                <span className="inline-flex items-center gap-2 text-sm font-semibold px-3 py-1 rounded-full bg-red-100 text-red-700">
                  ✖ Stok Habis
                </span>
              )}
            </div>

            {/* ACTION BUTTONS */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              {product.stock > 0 ? (
                <button
                  onClick={() => setShowOrder(!showOrder)}
                  className="flex-1 rounded-xl bg-[#c6a84d] py-3 text-white font-semibold
                           hover:bg-[#b1913e] transition"
                >
                  Pesan Sekarang
                </button>
              ) : (
                <button
                  disabled
                  className="bg-gray-300 text-gray-500 font-semibold px-6 py-3 rounded-xl cursor-not-allowed"
                >
                  Stok Habis
                </button>
              )}

              <Link
                to="/products"
                className="flex-1 rounded-xl border border-[#4b3b18] py-3 text-center
                           font-semibold text-[#4b3b18] hover:bg-[#f6f1e9] transition"
              >
                Kembali
              </Link>
            </div>

            {/* ORDER FORM */}
            {showOrder && (
              <div className="mt-6 space-y-4 border-t pt-6">
                {/* SIZE */}
                <div>
                  <label className="block text-sm font-semibold text-[#4b3b18] mb-1">
                    Pilih Ukuran
                  </label>
                  <select
                    value={size}
                    onChange={(e) => setSize(e.target.value)}
                    className="w-full rounded-xl border border-[#e2d8c3]
                               bg-[#fdfaf4] px-4 py-3
                               focus:outline-none focus:ring-2 focus:ring-[#c6a84d]"
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

                {/* QUANTITY */}
                <div className="space-y-3">
                  <label className="block text-sm font-semibold text-[#4b3b18]">
                    Jumlah{" "}
                    <span className="text-gray-400 font-normal">
                      (minimal 1)
                    </span>
                  </label>

                  <div className="flex items-center gap-2 w-40">
                    {/* Minus */}
                    <button
                      type="button"
                      onClick={() => {
                        const num = Number(quantity) || 1;
                        if (num > 1) setQuantity(String(num - 1));
                      }}
                      className="px-3 py-2 bg-[#f6f1e9] rounded-xl font-bold text-[#4b3b18] hover:bg-[#e2d8c3] transition"
                      disabled={Number(quantity) <= 1 || quantity === ""}
                    >
                      −
                    </button>

                    {/* Input */}
                    <input
                      type="number"
                      min={1}
                      value={quantity}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (value === "") {
                          setQuantity("");
                        } else {
                          const num = Number(value);
                          if (!isNaN(num) && num >= 0) setQuantity(String(num));
                        }
                      }}
                      className={`flex-1 text-center rounded-xl border px-4 py-2 focus:outline-none focus:ring-2
                        ${
                          Number(quantity) > product.stock
                            ? "border-red-400 focus:ring-red-300"
                            : "border-[#e2d8c3] focus:ring-[#c6a84d]"
                        }
                      `}
                    />

                    {/* Plus */}
                    <button
                      type="button"
                      onClick={() => {
                        const num = Number(quantity) || 1;
                        if (num < product.stock) setQuantity(String(num + 1));
                      }}
                      className="px-3 py-2 bg-[#f6f1e9] rounded-xl font-bold text-[#4b3b18] hover:bg-[#e2d8c3] transition"
                      disabled={
                        Number(quantity) >= product.stock || quantity === ""
                      }
                    >
                      +
                    </button>
                  </div>

                  {Number(quantity) > product.stock && (
                    <p className="text-sm text-red-600 font-medium">
                      ⚠️ Stok tersisa hanya {product.stock}. Silakan kurangi
                      jumlah pembelian.
                    </p>
                  )}

                  <div className="flex gap-4 pt-2">
                    {product.stock > 0 && (
                      <button
                        onClick={handleSubmit}
                        disabled={
                          Number(quantity) > product.stock ||
                          Number(quantity) < 1
                        }
                        className={`flex-1 rounded-xl py-3 font-semibold transition
                          ${
                            Number(quantity) > product.stock || Number(quantity) < 1
                              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                              : "bg-[#4b3b18] text-white hover:bg-[#3a2e12]"
                          }
                        `}
                      >
                        Konfirmasi Pesanan
                      </button>
                    )}

                    <button
                      onClick={() => setShowOrder(false)}
                      className="flex-1 text-center rounded-xl border border-[#4b3b18]
                      py-3 font-semibold text-[#4b3b18]
                      hover:bg-[#f6f1e9] transition"
                    >
                      Batal
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
