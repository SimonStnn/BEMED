export const table = "products";
type Product = {
  id: number;
  name: string;
  description: string | null;
  price: number | null;
  weight: number | null;
  EF: number | null;
};

export default Product;
