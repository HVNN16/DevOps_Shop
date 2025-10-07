import useFetch from "../hooks/useFetch";
import ProductCard from "../components/ProductCard";

export default function Products() {
  const { data, loading } = useFetch("/api/products");

  if (loading) return <p className="text-center mt-10">Loading products...</p>;

  return (
    <div className="p-8 grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
      {data.length === 0 ? (
        <p className="col-span-full text-center text-gray-600">No products found.</p>
      ) : (
        data.map((p) => <ProductCard key={p._id} p={p} />)
      )}
    </div>
  );
}
