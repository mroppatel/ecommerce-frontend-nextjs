import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import Header from "@/components/Header";
import "@/styles/globals.css";

export default function RootLayout({ children }: any) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <WishlistProvider>
            <Header />
            <main className="container">{children}</main>
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  );
}