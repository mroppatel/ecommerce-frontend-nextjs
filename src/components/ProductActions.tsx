"use client";
import React from "react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

export default function ProductActions({ product }: any) {
  const { addToCart } = useCart();
  const { wishlist, toggleWishlist, isInWishlist } = useWishlist();

  const handleAdd = () => addToCart(product, 1);
  const handleToggleWishlist = () => toggleWishlist(product);

  return (
    <div style={{display:'flex', gap:8, marginTop:12}}>
      <button onClick={handleAdd}>Add to cart</button>
      <button onClick={handleToggleWishlist}>{isInWishlist(product.id) ? 'Remove from wishlist' : 'Add to wishlist'}</button>
    </div>
  );
}
