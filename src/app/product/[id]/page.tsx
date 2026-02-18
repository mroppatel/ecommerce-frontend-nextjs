import { getProduct } from '@/lib/api';
import ProductActions from '@/components/ProductActions';

type Props = { params: { id: string } };

export default async function ProductPage({ params }: Props) {
  const product = await getProduct(params.id);

  return (
    <div style={{padding: 16}}>
      <div style={{display:'flex', gap: 24}}>
        <img src={product.image} alt={product.title} style={{width: 320, height: 320, objectFit: 'contain'}} />
        <div>
          <h1>{product.title}</h1>
          <p style={{fontWeight:'bold'}}>${product.price.toFixed(2)}</p>
          <p>{product.description}</p>
          <p><strong>Category:</strong> {product.category}</p>
          <ProductActions product={product} />
        </div>
      </div>
    </div>
  );
}
