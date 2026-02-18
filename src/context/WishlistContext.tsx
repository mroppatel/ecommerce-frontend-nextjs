"use client";
import { createContext, useContext, useState, useEffect, useCallback } from "react";

type WishlistItem = {
  id: number;
  title: string;
  price: number;
  image?: string;
};

const WishlistContext = createContext<any>(null);

export function WishlistProvider({ children }: any) {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("wishlist");
      if (stored) setWishlist(JSON.parse(stored));
    } catch (e) {
      console.error("Failed to parse wishlist from localStorage", e);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
    } catch (e) {
      console.error("Failed to save wishlist to localStorage", e);
    }
  }, [wishlist]);

  const addToWishlist = useCallback((product: any) => {
    setWishlist((prev) => {
      if (prev.find((p) => p.id === product.id)) return prev;
      return [...prev, { id: product.id, title: product.title, price: product.price, image: product.image }];
    });
  }, []);

  const removeFromWishlist = useCallback((id: number) => {
    setWishlist((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const toggleWishlist = useCallback((product: any) => {
    setWishlist((prev) => (prev.find((p) => p.id === product.id) ? prev.filter((p) => p.id !== product.id) : [...prev, { id: product.id, title: product.title, price: product.price, image: product.image }]));
  }, []);

  const isInWishlist = useCallback((id: number) => wishlist.some((p) => p.id === id), [wishlist]);

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist, toggleWishlist, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}

export const useWishlist = () => useContext(WishlistContext);
