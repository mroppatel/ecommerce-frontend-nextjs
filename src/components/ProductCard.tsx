import React from "react";
import Link from "next/link";

export default function ProductCard({ product }: any) {
  return (
    <div style={{border: '1px solid #ddd', padding: 12, borderRadius: 6, width: 260}}>
      <Link href={`/product/${product.id}`}>
        <img src={product.image} alt={product.title} style={{width: '100%', height: 180, objectFit: 'contain'}} />
      </Link>
      <h3 style={{fontSize: 16, margin: '8px 0'}}>{product.title}</h3>
      <p style={{fontWeight: 'bold'}}>${product.price.toFixed(2)}</p>
      <p style={{color:'#555', fontSize: 13}}>{product.description?.slice(0, 80)}...</p>
      <div style={{marginTop:8}}>
        <Link href={`/product/${product.id}`}>View details</Link>
      </div>
    </div>
  );
}
