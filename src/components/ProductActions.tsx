"use client";
import React from "react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

export default function ProductActions({ product }: any) {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const handleAdd = () => addToCart(product, 1);
  const handleToggleWishlist = () => toggleWishlist(product);

  return (
    <div className="mt-4 flex gap-3">
      <button onClick={handleAdd} className="px-4 py-2 bg-sky-600 text-white rounded hover:bg-sky-700">Add to cart</button>
      <button onClick={handleToggleWishlist} className="px-4 py-2 border rounded hover:bg-slate-50">{isInWishlist(product.id) ? 'Remove' : 'Wishlist'}</button>
    </div>
  );
}
