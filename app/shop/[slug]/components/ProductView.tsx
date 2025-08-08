import { ProductWithImages } from "@/data-access/products";

export default function ProductView({ product }: { product: ProductWithImages }) {
  return <div>
    <h1>{product.title}</h1>
    <div>
      {product.images.map((image) => (
        <img key={image} src={image} alt={product.title} />
      ))}
    </div>
  </div>;
}
