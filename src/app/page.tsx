import { getProducts } from "@/lib/api";
import ProductCard from '@/components/ProductCard';

export default async function HomePage() {
  let products = [];
  try {
    products = await getProducts();
  } catch (e) {
    return <div style={{padding:16}}>Failed to load products.</div>;
  }

  return (
    <div style={{padding: 16}}>
      <h1>Products</h1>
      <div style={{display:'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 16}}>
        {products.map((p: any) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}