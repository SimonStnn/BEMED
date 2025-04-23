export const table = "products";
type Product = {
  id: number;
  name: string;
  description: string | null;
  price: number | null;
  weight: number | null;
  EF: number | null;
  alternatives?: {
    id: number;
    name: string;
    description: string | null;
    price: number | null;
    weight: number | null;
    EF: number | null;
  }[] | null;
};

export default Product;
