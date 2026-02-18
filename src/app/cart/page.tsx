"use client";
import React from "react";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, subtotal, shipping, total } = useCart();

  return (
    <div style={{padding:16}}>
      <h1>Your Cart</h1>
      {cart.length === 0 && <p>Your cart is empty.</p>}
      <div style={{display:'grid', gap:12}}>
        {cart.map((item: any) => (
          <div key={item.id} style={{display:'flex', gap:12, alignItems:'center', border: '1px solid #eee', padding:12}}>
            <img src={item.image} alt={item.title} style={{width:80, height:80, objectFit:'contain'}} />
            <div style={{flex:1}}>
              <div style={{fontWeight:'bold'}}>{item.title}</div>
              <div>${item.price.toFixed(2)}</div>
              <div style={{marginTop:8}}>
                <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                <span style={{margin: '0 8px'}}>{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
              </div>
            </div>
            <div>
              <div>${(item.price * item.quantity).toFixed(2)}</div>
              <button style={{marginTop:8}} onClick={() => removeFromCart(item.id)}>Remove</button>
            </div>
          </div>
        ))}
      </div>

      <div style={{marginTop:16}}>
        <div style={{fontWeight:'bold'}}>Subtotal: ${subtotal.toFixed(2)}</div>
        <div>Shipping: ${shipping.toFixed(2)}</div>
        <div style={{fontWeight:'bold', marginTop:8}}>Total: ${total.toFixed(2)}</div>
      </div>
    </div>
  );
}
