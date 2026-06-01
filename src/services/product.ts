import type { FilterParams } from '../interfaces/filter-params';
import type { Product } from '../interfaces/product';
import type { ProductsResponse } from '../interfaces/products-response';

const BASE_URL = 'https://3a2cbc2a2b454671.mokky.dev';

export async function fetchProducts(filters: FilterParams): Promise<ProductsResponse> {
  const params = new URLSearchParams();

  params.set('page', String(filters.page));
  params.set('limit', '10');

  if (filters.search) {
    params.set('title', `*${filters.search}*`);
  }
  if (filters.category) {
    params.set('category', filters.category);
  }
  if (filters.priceMin) {
    params.set('price[from]', filters.priceMin);
  }
  if (filters.priceMax) {
    params.set('price[to]', filters.priceMax);
  }
  if (filters.sortField) {
    const prefix = filters.sortOrder === 'desc' ? '-' : '';
    params.set('sortBy', `${prefix}${filters.sortField}`);
  }

  const res = await fetch(`${BASE_URL}/products?${params}`);
  if (!res.ok) {
    throw new Error(`HTTP ${res.status}`);
  }
  return res.json();
}

export async function fetchAllProducts(): Promise<Product[]> {
  const res = await fetch(`${BASE_URL}/products?limit=100`);
  if (!res.ok) {
    throw new Error(`HTTP ${res.status}`);
  }
  const data: ProductsResponse = await res.json();
  return data.items;
}
