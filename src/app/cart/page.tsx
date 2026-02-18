"use client";
import React from "react";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, subtotal, shipping, total } = useCart();

  return (
    <div className="py-8">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      {cart.length === 0 && <p className="text-slate-600">Your cart is empty.</p>}
      <div className="grid gap-4">
        {cart.map((item: any) => (
          <div key={item.id} className="card p-4 flex items-center gap-4">
            <img src={item.image} alt={item.title} className="w-20 h-20 object-contain" />
            <div className="flex-1">
              <div className="font-medium">{item.title}</div>
              <div className="text-slate-600">${item.price.toFixed(2)}</div>
              <div className="mt-2 flex items-center gap-2">
                <button className="px-2 py-1 border rounded" onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                <div className="px-3">{item.quantity}</div>
                <button className="px-2 py-1 border rounded" onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
              </div>
            </div>
            <div className="text-right">
              <div className="font-semibold">${(item.price * item.quantity).toFixed(2)}</div>
              <button className="mt-2 text-sm text-red-600" onClick={() => removeFromCart(item.id)}>Remove</button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 card">
        <div className="flex justify-between"><div>Subtotal</div><div>${subtotal.toFixed(2)}</div></div>
        <div className="flex justify-between"><div>Shipping</div><div>${shipping.toFixed(2)}</div></div>
        <div className="flex justify-between mt-3 text-lg font-bold"><div>Total</div><div>${total.toFixed(2)}</div></div>
      </div>
    </div>
  );
}
