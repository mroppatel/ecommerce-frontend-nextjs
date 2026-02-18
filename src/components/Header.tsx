"use client";
import Link from "next/link";
import React from "react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

export default function Header() {
  const { cart } = useCart();
  const { wishlist } = useWishlist();

  const cartCount = cart?.reduce((s: number, it: any) => s + it.quantity, 0) ?? 0;

  return (
    <header className="bg-white border-b sticky top-0 z-40">
      <div className="container flex items-center justify-between py-4">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-sky-500 to-cyan-400 rounded-md flex items-center justify-center text-white font-bold">MS</div>
          <div className="text-lg font-semibold">MyStore</div>
        </Link>

        <div className="flex-1 px-6">
          <div className="relative max-w-xl mx-auto">
            <input placeholder="Search products, e.g. sneakers" className="w-full border rounded-full py-2 px-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-300" />
            <button className="absolute right-1 top-1/2 -translate-y-1/2 bg-sky-600 text-white px-4 py-1 rounded-full text-sm">Search</button>
          </div>
        </div>

        <nav className="flex items-center gap-4 text-sm">
          <Link href="/wishlist" className="flex items-center gap-2 px-3 py-2 hover:bg-slate-50 rounded">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"/></svg>
            <span className="text-slate-600">Wishlist</span>
            <span className="ml-1 text-xs text-sky-600">({wishlist?.length ?? 0})</span>
          </Link>

          <Link href="/cart" className="flex items-center gap-2 px-3 py-2 hover:bg-slate-50 rounded">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-600" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 9h14l-2-9M9 21a1 1 0 100-2 1 1 0 000 2zm8 0a1 1 0 100-2 1 1 0 000 2z"/></svg>
            <span className="text-slate-600">Cart</span>
            <span className="ml-1 text-xs text-sky-600">({cartCount})</span>
          </Link>

          <Link href="/checkout" className="px-3 py-2 bg-sky-600 text-white rounded hover:bg-sky-700">Checkout</Link>
        </nav>
      </div>
    </header>
  );
}
