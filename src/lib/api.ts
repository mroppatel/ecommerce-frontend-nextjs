const BASE_URL = "https://fakestoreapi.com";

const mockProducts = [
  {
    id: 1,
    title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
    price: 109.95,
    description: "Your perfect pack for everyday use and walks in the forest",
    category: "electronics",
    image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
    rating: { rate: 3.9, count: 120 }
  },
  {
    id: 2,
    title: "Mens Casual Premium Slim Fit T-Shirts",
    price: 22.3,
    description: "Slim-fitting style, contrast raglan long sleeve",
    category: "electronics",
    image: "https://fakestoreapi.com/img/71-ypmgnccXL._AC_UY879_.jpg",
    rating: { rate: 4.1, count: 259 }
  },
  {
    id: 3,
    title: "Mens Cotton Jacket",
    price: 55.99,
    description: "Great outerwear jackets for Spring/Autumn/Winter",
    category: "electronics",
    image: "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg",
    rating: { rate: 4.7, count: 500 }
  },
  {
    id: 4,
    title: "John Hardy Women's Legends Naga Gold & Silver Dragon Station Chain Bracelet",
    price: 695,
    description: "From our Legends Collection, the Naga was inspired",
    category: "jewelery",
    image: "https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_.jpg",
    rating: { rate: 4.6, count: 400 }
  },
  {
    id: 5,
    title: "White Gold Plated Princess",
    price: 9.99,
    description: "Classic Created Wedding Engagement Solitaire Diamond Promise",
    category: "jewelery",
    image: "https://fakestoreapi.com/img/71JMCVQ7WIL._AC_UY879_.jpg",
    rating: { rate: 3, count: 70 }
  },
  {
    id: 6,
    title: "Samsung 49-Inch CHG90 144Hz Gaming Monitor",
    price: 999.99,
    description: "49 INCH SUPER ULTRAWIDE 32:9 CURVED GAMING MONITOR with 144Hz refresh rate",
    category: "electronics",
    image: "https://fakestoreapi.com/img/81Zt42ioCgL._AC_SX679_.jpg",
    rating: { rate: 2.2, count: 140 }
  },
  {
    id: 7,
    title: "BIYLACLESEN Women's Winter Snow Boots",
    price: 51.97,
    description: "Winter Boots Waterproof Ski Thermal Snowboard Layers",
    category: "electronics",
    image: "https://fakestoreapi.com/img/51eg55aV5UL._AC_UX679_.jpg",
    rating: { rate: 3.6, count: 235 }
  },
  {
    id: 8,
    title: "Sony VAIO E Series White",
    price: 999,
    description: "Intel Core 2 Duo CPU T6600 @ 2.2GHz 4 GB DDR2",
    category: "electronics",
    image: "https://fakestoreapi.com/img/71AUXVBUBXL._AC_UY879_.jpg",
    rating: { rate: 3.6, count: 450 }
  }
];

export async function getProducts() {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);

    const res = await fetch(`${BASE_URL}/products`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!res.ok) {
      console.warn(`API returned ${res.status}, using fallback data`);
      return mockProducts;
    }

    const data = await res.json();
    return data && Array.isArray(data) && data.length > 0 ? data : mockProducts;
  } catch (error) {
    console.warn("API fetch failed, using fallback mock data:", error);
    return mockProducts;
  }
}

export async function getProduct(id: string | number) {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);

    const res = await fetch(`${BASE_URL}/products/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!res.ok) {
      console.warn(`API returned ${res.status}, checking fallback`);
      const mock = mockProducts.find(p => p.id === Number(id));
      if (mock) return mock;
      throw new Error(`Product not found: ${id}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.warn(`getProduct error for ID ${id}:`, error);
    const mock = mockProducts.find(p => p.id === Number(id));
    if (mock) return mock;
    throw new Error(`Failed to fetch product ${id}`);
  }
}