const BASE_URL = "https://fakestoreapi.com";

export async function getProducts() {
  const res = await fetch(`${BASE_URL}/products`, {
    next: { revalidate: 60 }
  });

  if (!res.ok) throw new Error("Failed to fetch products");

  return res.json();
}

export async function getProduct(id: string | number) {
  const res = await fetch(`${BASE_URL}/products/${id}`, {
    next: { revalidate: 60 }
  });

  if (!res.ok) throw new Error("Failed to fetch product");

  return res.json();
}