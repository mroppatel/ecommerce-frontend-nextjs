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
    <header className="bg-white border-b">
      <div className="container flex items-center justify-between py-4">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-sky-500 to-cyan-400 rounded-md flex items-center justify-center text-white font-bold">MS</div>
          <div className="text-lg font-semibold">MyStore</div>
        </Link>

        <nav className="flex items-center gap-4 text-sm">
          <Link href="/wishlist" className="px-3 py-2 hover:bg-slate-100 rounded">Wishlist <span className="text-blue-600">({wishlist?.length ?? 0})</span></Link>
          <Link href="/cart" className="px-3 py-2 hover:bg-slate-100 rounded">Cart <span className="text-blue-600">({cartCount})</span></Link>
          <Link href="/checkout" className="px-3 py-2 bg-sky-600 text-white rounded hover:bg-sky-700">Checkout</Link>
        </nav>
      </div>
    </header>
  );
}
