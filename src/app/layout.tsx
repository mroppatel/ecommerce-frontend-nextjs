import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import Header from "@/components/Header";
import "@/styles/globals.css";
import Footer from "@/components/Footer";

export default function RootLayout({ children }: any) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <WishlistProvider>
            <Header />
            <main className="container">{children}</main>
            <Footer />
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  );
}