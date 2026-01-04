export interface IProduct {
  name: string;
  brand: string;
  category: string;
  price: number;
  description: string;
  materials: string[];
  packaging: string;
  shipping_type: string;
  eco_tags: string[];
  eco_score?: number;
  image?: string;
}