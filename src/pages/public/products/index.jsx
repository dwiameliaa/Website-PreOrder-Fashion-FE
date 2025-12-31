import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProducts } from "../../../_services/products";
import { productImageStorage } from "../../../_api";

export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsData = await getProducts();
        setProducts(productsData);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <section className="bg-[#f6f1e9] antialiased pt-28 pb-14">
      <div className="mx-auto max-w-screen-xl px-6">
        {/* GRID PRODUK */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.length > 0 ? (
            products.map((product) => (
              <div
                key={product.id}
                className="rounded-2xl border border-[#e2d8c3] bg-white p-5 shadow-sm hover:shadow-md transition"
              >
                {/* IMAGE */}
                <div className="h-56 w-full overflow-hidden rounded-xl bg-[#fdfaf4]">
                  <Link to={`/products/show/${product.id}`}>
                    <img
                      src={`${productImageStorage}/${product.image}`}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </Link>
                </div>

                {/* CONTENT */}
                <div className="pt-5 space-y-3">
                  <Link
                    to={`/products/show/${product.id}`}
                    className="block text-lg font-semibold text-[#4b3b18] hover:underline"
                  >
                    {product.name}
                  </Link>

                  <div className="flex items-center justify-between">
                    <p className="text-lg font-bold text-[#4b3b18]">
                      RP {product.price}
                    </p>

                    <Link
                      to={`/products/show/${product.id}`}
                      className="rounded-xl bg-[#c6a84d] px-4 py-2 text-sm font-semibold text-white
                                 hover:bg-[#b1913e] transition
                                 focus:outline-none focus:ring-2 focus:ring-[#c6a84d]"
                    >
                      Detail
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500">
              Memuat Data
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
