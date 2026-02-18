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
    <header style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem'}}>
      <Link href="/">
        <h2>MyStore</h2>
      </Link>
      <nav style={{display: 'flex', gap: '1rem', alignItems: 'center'}}>
        <Link href="/wishlist">Wishlist ({wishlist?.length ?? 0})</Link>
        <Link href="/cart">Cart ({cartCount})</Link>
        <Link href="/checkout">Checkout</Link>
      </nav>
    </header>
  );
}
