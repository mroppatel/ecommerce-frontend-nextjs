import { getProduct } from '@/lib/api';
import ProductActions from '@/components/ProductActions';

type Props = { params: { id: string } };

export default async function ProductPage({ params }: Props) {
  const product = await getProduct(params.id);

  return (
    <div className="py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        <div className="md:col-span-1 card p-6 flex items-center justify-center">
          <img src={product.image} alt={product.title} className="max-h-96 object-contain" />
        </div>
        <div className="md:col-span-2">
          <h1 className="text-2xl font-bold">{product.title}</h1>
          <div className="mt-2 text-2xl text-sky-600 font-semibold">${product.price.toFixed(2)}</div>
          <p className="mt-4 text-slate-600">{product.description}</p>
          <p className="mt-3 text-sm text-slate-500"><strong>Category:</strong> {product.category}</p>
          <ProductActions product={product} />
        </div>
      </div>
    </div>
  );
}
