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
    <header className="sticky top-0 z-50">
      <div className="bg-slate-900 text-white">
        <div className="container flex items-center gap-4 py-2">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-12 h-10 bg-amber-400 rounded-sm flex items-center justify-center text-black font-extrabold text-lg">MS</div>
            <div className="ml-1 text-lg font-semibold">MyStore</div>
          </Link>

          <div className="flex-1">
            <div className="relative max-w-2xl mx-auto">
              <input
                placeholder="Search products, e.g. sneakers, jackets, phones"
                className="w-full rounded-full py-3 px-4 pr-28 text-sm focus:outline-none"
              />
              <button className="absolute right-1 top-1/2 -translate-y-1/2 bg-amber-400 text-black px-4 py-2 rounded-full text-sm font-medium">Search</button>
            </div>
          </div>

          <nav className="flex items-center gap-4 text-sm">
            <Link href="/wishlist" className="flex items-center gap-2 px-3 py-2 hover:opacity-90 rounded">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7"/></svg>
              <span className="text-white">Wishlist</span>
              <span className="ml-1 text-xs bg-amber-400 text-black px-2 py-0.5 rounded-full">{wishlist?.length ?? 0}</span>
            </Link>

            <Link href="/cart" className="flex items-center gap-2 px-3 py-2 hover:opacity-90 rounded">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 9h14l-2-9M9 21a1 1 0 100-2 1 1 0 000 2zm8 0a1 1 0 100-2 1 1 0 000 2z"/></svg>
              <span className="text-white">Cart</span>
              <span className="ml-1 text-xs bg-amber-400 text-black px-2 py-0.5 rounded-full">{cartCount}</span>
            </Link>

            <Link href="/checkout" className="px-3 py-2 bg-amber-400 text-black rounded font-medium hover:brightness-95">Checkout</Link>
          </nav>
        </div>
      </div>

      <div className="bg-amber-400/10 border-t border-b border-amber-400/20">
        <div className="container flex items-center gap-6 text-xs text-slate-700 py-2">
          <span className="font-medium">Deliver to</span>
          <span className="hidden sm:inline">All Departments</span>
          <span className="hidden md:inline">Today's Deals</span>
          <span className="hidden lg:inline">Customer Service</span>
          <span className="hidden lg:inline">Gift Cards</span>
        </div>
      </div>
    </header>
  );
}
