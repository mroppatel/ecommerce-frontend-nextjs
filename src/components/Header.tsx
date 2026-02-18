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
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200">
      <div className="container flex items-center justify-between py-4">
        {/* Logo Left */}
        <Link href="/" className="flex items-center gap-3 flex-shrink-0 hover:opacity-80 transition">
          <div className="w-12 h-12 bg-amber-400 rounded-lg flex items-center justify-center text-black font-black text-lg">MS</div>
          <span className="text-2xl font-black text-slate-900">MyStore</span>
        </Link>

        {/* Nav Right */}
        <nav className="flex items-center gap-4 md:gap-12">
          <Link href="/wishlist" className="flex items-center gap-2 px-4 py-2 text-slate-700 hover:bg-slate-100 rounded-lg transition font-semibold">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
            <span>Wishlist</span>
            {(wishlist?.length ?? 0) > 0 && <span className="bg-amber-400 text-black px-2.5 py-0.5 rounded-full text-xs font-bold">{wishlist?.length}</span>}
          </Link>

          <Link href="/cart" className="flex items-center gap-2 px-4 py-2 text-slate-700 hover:bg-slate-100 rounded-lg transition font-semibold">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M9 2C8.45 2 8 2.45 8 3V4H4C3.45 4 3 4.45 3 5C3 5.55 3.45 6 4 6H5L7 18C7.1 18.9 7.95 19.5 8.9 19.5H17.1C18.05 19.5 18.9 18.9 19 18L21 6H22C22.55 6 23 5.55 23 5C23 4.45 22.55 4 22 4H18V3C18 2.45 17.55 2 17 2H9M9 4H17V3H9V4M8.9 7H19.1L17.3 18H8.7L8.9 7Z"/></svg>
            <span>Cart</span>
            {cartCount > 0 && <span className="bg-amber-400 text-black px-2.5 py-0.5 rounded-full text-xs font-bold">{cartCount}</span>}
          </Link>

          <Link href="/checkout" className="px-6 py-2.5 bg-amber-400 text-black rounded-lg font-bold hover:bg-amber-500 transition">
            Checkout
          </Link>
        </nav>
      </div>
    </header>
  );
}
