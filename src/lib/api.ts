const BASE_URL = "https://fakestoreapi.com";

export async function getProducts() {
  try {
    const res = await fetch(`${BASE_URL}/products`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: { revalidate: 3600 },
      cache: "force-cache"
    });

    if (!res.ok) {
      console.error(`API Error: ${res.status} ${res.statusText}`);
      throw new Error(`Failed to fetch products: ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("getProducts error:", error);
    throw error;
  }
}

export async function getProduct(id: string | number) {
  try {
    const res = await fetch(`${BASE_URL}/products/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: { revalidate: 3600 },
      cache: "force-cache"
    });

    if (!res.ok) {
      console.error(`API Error: ${res.status} ${res.statusText}`);
      throw new Error(`Failed to fetch product: ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("getProduct error:", error);
    throw error;
  }
}