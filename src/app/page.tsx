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
      <div className="bg-gradient-to-r from-sky-50 to-cyan-50 rounded-lg p-6 mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Shop our collection</h1>
          <p className="text-slate-600 mt-1">Curated products from Fake Store API — top picks for you.</p>
        </div>
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