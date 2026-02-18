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
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="container flex items-center gap-4 py-3">
        <Link href="/" className="flex items-center gap-3 text-slate-800 hover:text-slate-600 transition-colors duration-150 font-semibold text-lg ">
          <div className="w-10 h-8 bg-amber-400 rounded-sm flex items-center justify-center text-black font-bold">MS</div>
          <div className="ml-1 text-base font-bold text-slate-800 ">MyStore</div>
        </Link>


        <nav className="flex items-center gap-3 text-sm">
          <Link href="/wishlist" className="flex items-center gap-2 px-2 py-1 rounded hover:bg-slate-50">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7"/></svg>
            <span className="text-slate-700">Wishlist</span>
            {(wishlist?.length ?? 0) > 0 && <span className="ml-1 text-xs bg-amber-400 text-black px-2 py-0.5 rounded-full">{wishlist?.length}</span>}
          </Link>

          <Link href="/cart" className="flex items-center gap-2 px-2 py-1 rounded hover:bg-slate-50">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-600" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 9h14l-2-9M9 21a1 1 0 100-2 1 1 0 000 2zm8 0a1 1 0 100-2 1 1 0 000 2z"/></svg>
            <span className="text-slate-700">Cart</span>
            {cartCount > 0 && <span className="ml-1 text-xs bg-amber-400 text-black px-2 py-0.5 rounded-full">{cartCount}</span>}
          </Link>

          <Link href="/checkout" className="px-3 py-1.5 bg-amber-400 text-black rounded text-sm font-medium hover:brightness-95">Checkout</Link>
        </nav>
      </div>
    </header>
  );
}
