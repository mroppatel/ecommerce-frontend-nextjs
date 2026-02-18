"use client";
import React, { useState } from "react";
import { useCart } from "@/context/CartContext";

export default function CheckoutPage() {
  const { cart, subtotal, clearCart } = useCart();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [placed, setPlaced] = useState(false);

  const handlePlace = (e: any) => {
    e.preventDefault();
    // simple validation
    if (!name || !email || !address) return alert('Please fill the form');
    // pretend to place order
    setPlaced(true);
    clearCart();
  };

  return (
    <div style={{padding:16}}>
      <h1>Checkout</h1>
      {cart.length === 0 && <p>Your cart is empty.</p>}

      <div style={{display:'flex', gap:24}}>
        <form onSubmit={handlePlace} style={{flex:1, display:'grid', gap:8}}>
          <input placeholder="Name" value={name} onChange={(e)=>setName(e.target.value)} />
          <input placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} />
          <textarea placeholder="Address" value={address} onChange={(e)=>setAddress(e.target.value)} />
          <button type="submit">Place Order</button>
          {placed && <div style={{color:'green'}}>Order placed — thank you!</div>}
        </form>

        <div style={{width:320}}>
          <h3>Order Summary</h3>
          {cart.map((it:any)=> (
            <div key={it.id} style={{display:'flex', justifyContent:'space-between'}}>
              <div>{it.title} x {it.quantity}</div>
              <div>${(it.price*it.quantity).toFixed(2)}</div>
            </div>
          ))}
          <div style={{marginTop:12, fontWeight:'bold'}}>Total: ${subtotal.toFixed(2)}</div>
        </div>
      </div>
    </div>
  );
}
