import React from "react";
import Link from "next/link";
import ProductActions from "./ProductActions";

export default function ProductCard({ product }: any) {
  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-150 overflow-hidden flex flex-col">
      <Link href={`/product/${product.id}`} className="block">
        <div className="w-full h-48 bg-gray-50 flex items-center justify-center">
          <img src={product.image} alt={product.title} className="max-h-40 object-contain" />
        </div>
      </Link>

      <div className="p-4 flex-1 flex flex-col">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-sm font-semibold line-clamp-2">{product.title}</h3>
          <div className="text-right">
            <div className="text-lg font-bold">${product.price.toFixed(2)}</div>
            <div className="text-xs text-slate-400 mt-1">{product.category}</div>
          </div>
        </div>

        <p className="mt-2 text-sm text-slate-600 line-clamp-3">{product.description}</p>

        <div className="mt-4">
          <ProductActions product={product} />
        </div>
      </div>
    </div>
  );
}
