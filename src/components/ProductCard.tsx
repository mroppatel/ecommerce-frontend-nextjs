import React from "react";
import Link from "next/link";

export default function ProductCard({ product }: any) {
  return (
    <div className="card p-4">
      <Link href={`/product/${product.id}`}>
        <div className="w-full h-44 flex items-center justify-center">
          <img src={product.image} alt={product.title} className="max-h-40 object-contain" />
        </div>
      </Link>
      <h3 className="mt-3 text-sm font-medium line-clamp-2 h-10">{product.title}</h3>
      <div className="mt-2 flex items-center justify-between">
        <div className="text-lg font-bold">${product.price.toFixed(2)}</div>
        <Link href={`/product/${product.id}`} className="text-sm text-sky-600 hover:underline">View</Link>
      </div>
      <p className="mt-2 text-xs text-slate-500 line-clamp-2">{product.description}</p>
    </div>
  );
}
