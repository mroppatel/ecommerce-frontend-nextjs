"use client";
import React from "react";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";

export default function WishlistPage() {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  return (
    <div style={{padding:16}}>
      <h1>Your Wishlist</h1>
      {wishlist.length === 0 && <p>Your wishlist is empty.</p>}
      <div style={{display:'grid', gap:12}}>
        {wishlist.map((item: any) => (
          <div key={item.id} style={{display:'flex', gap:12, alignItems:'center', border: '1px solid #eee', padding:12}}>
            <img src={item.image} alt={item.title} style={{width:80, height:80, objectFit:'contain'}} />
            <div style={{flex:1}}>
              <div style={{fontWeight:'bold'}}>{item.title}</div>
              <div>${item.price.toFixed(2)}</div>
            </div>
            <div>
              <button onClick={() => addToCart(item,1)}>Add to cart</button>
              <button style={{marginLeft:8}} onClick={() => removeFromWishlist(item.id)}>Remove</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
