import { QueryClient, QueryFunction } from "@tanstack/react-query";
import { mockProducts, mockCartItems, mockOrders } from "./mockData";

// Check if we're in a static deployment (no backend)
const isStaticDeployment =
  typeof window !== "undefined" && window.location.hostname.includes("netlify");

async function throwIfResNotOk(res: Response) {
  if (!res.ok) {
    const text = (await res.text()) || res.statusText;
    throw new Error(`${res.status}: ${text}`);
  }
}

// Mock API functions for static deployment
function mockApiRequest(
  method: string,
  url: string,
  data?: unknown
): Promise<Response> {
  return new Promise((resolve) => {
    let responseData: any;

    if (url === "/api/products") {
      responseData = mockProducts;
    } else if (url.startsWith("/api/products/")) {
      const productId = url.split("/")[3];
      responseData = mockProducts.find((p) => p.id === productId) || null;
    } else if (url === "/api/cart") {
      if (method === "GET") {
        responseData = mockCartItems;
      } else if (method === "POST") {
        const newItem = { id: Date.now().toString(), ...data };
        mockCartItems.push(newItem);
        responseData = newItem;
      } else if (method === "DELETE") {
        mockCartItems.length = 0;
        responseData = { success: true };
      }
    } else if (url.startsWith("/api/cart/")) {
      const itemId = url.split("/")[3];
      if (method === "PATCH") {
        const item = mockCartItems.find((item) => item.id === itemId);
        if (item) {
          item.quantity = (data as any).quantity;
          responseData = item;
        }
      } else if (method === "DELETE") {
        const index = mockCartItems.findIndex((item) => item.id === itemId);
        if (index > -1) {
          mockCartItems.splice(index, 1);
          responseData = { success: true };
        }
      }
    } else if (url === "/api/orders") {
      const newOrder = { id: Date.now().toString(), ...data };
      mockOrders.push(newOrder);
      responseData = newOrder;
    }

    const mockResponse = new Response(JSON.stringify(responseData), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

    setTimeout(() => resolve(mockResponse), 100); // Simulate network delay
  });
}

export async function apiRequest(
  method: string,
  url: string,
  data?: unknown | undefined
): Promise<Response> {
  if (isStaticDeployment) {
    return mockApiRequest(method, url, data);
  }

  const res = await fetch(url, {
    method,
    headers: data ? { "Content-Type": "application/json" } : {},
    body: data ? JSON.stringify(data) : undefined,
    credentials: "include",
  });

  await throwIfResNotOk(res);
  return res;
}

type UnauthorizedBehavior = "returnNull" | "throw";
export const getQueryFn: <T>(options: {
  on401: UnauthorizedBehavior;
}) => QueryFunction<T> =
  ({ on401: unauthorizedBehavior }) =>
  async ({ queryKey }) => {
    const url = queryKey.join("/") as string;

    if (isStaticDeployment) {
      const mockRes = await mockApiRequest("GET", url);
      return await mockRes.json();
    }

    const res = await fetch(url, {
      credentials: "include",
    });

    if (unauthorizedBehavior === "returnNull" && res.status === 401) {
      return null;
    }

    await throwIfResNotOk(res);
    return await res.json();
  };

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn({ on401: "throw" }),
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});
