"use client";
import React, { useState } from "react";
import { useCart } from "@/context/CartContext";

export default function CheckoutPage() {
  const { cart, subtotal, clearCart, shipping, total } = useCart();
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
    <div className="py-8">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      {cart.length === 0 && <p className="text-slate-600">Your cart is empty.</p>}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <form onSubmit={handlePlace} className="md:col-span-2 p-4 card">
          <div className="grid gap-3">
            <input className="border p-2 rounded" placeholder="Name" value={name} onChange={(e)=>setName(e.target.value)} />
            <input className="border p-2 rounded" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} />
            <textarea className="border p-2 rounded" placeholder="Address" value={address} onChange={(e)=>setAddress(e.target.value)} />
            <button className="px-4 py-2 bg-sky-600 text-white rounded" type="submit">Place Order</button>
            {placed && <div className="text-green-600">Order placed — thank you!</div>}
          </div>
        </form>

        <div className="p-4 card">
          <h3 className="font-semibold mb-3">Order Summary</h3>
          <div className="space-y-2">
            {cart.map((it:any)=> (
              <div key={it.id} className="flex justify-between text-sm">
                <div className="truncate pr-4">{it.title} x {it.quantity}</div>
                <div>${(it.price*it.quantity).toFixed(2)}</div>
              </div>
            ))}
          </div>
          <div className="mt-4 flex justify-between"><div>Subtotal</div><div>${subtotal.toFixed(2)}</div></div>
          <div className="flex justify-between"><div>Shipping</div><div>${shipping.toFixed(2)}</div></div>
          <div className="mt-3 text-lg font-bold flex justify-between"><div>Total</div><div>${total.toFixed(2)}</div></div>
        </div>
      </div>
    </div>
  );
}
