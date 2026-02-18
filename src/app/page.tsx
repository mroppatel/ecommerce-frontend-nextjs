import { getProducts } from "@/lib/api";
import ProductCard from '@/components/ProductCard';

export default async function HomePage() {
  let products = [];
  try {
    products = await getProducts();
  } catch (e) {
    return <div className="py-8">Failed to load products.</div>;
  }

  return (
    <div className="py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Products</h1>
        <div className="text-sm text-slate-500">{products.length} items</div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((p: any) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}