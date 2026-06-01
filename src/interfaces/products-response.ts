import type { Meta } from './meta';
import type { Product } from './product';

export interface ProductsResponse {
  meta: Meta;
  items: Product[];
}
