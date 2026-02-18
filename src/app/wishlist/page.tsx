"use client";
import React from "react";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";

export default function WishlistPage() {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  return (
    <div className="py-8">
      <h1 className="text-2xl font-bold mb-4">Your Wishlist</h1>
      {wishlist.length === 0 && <p className="text-slate-600">Your wishlist is empty.</p>}
      <div className="grid gap-4">
        {wishlist.map((item: any) => (
          <div key={item.id} className="card p-4 flex items-center gap-4">
            <img src={item.image} alt={item.title} className="w-20 h-20 object-contain" />
            <div className="flex-1">
              <div className="font-medium">{item.title}</div>
              <div className="text-slate-600">${item.price.toFixed(2)}</div>
            </div>
            <div>
              <button className="px-3 py-2 bg-sky-600 text-white rounded" onClick={() => addToCart(item,1)}>Add to cart</button>
              <button className="ml-2 px-3 py-2 border rounded" onClick={() => removeFromWishlist(item.id)}>Remove</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
