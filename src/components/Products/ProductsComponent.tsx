// I komponenten:
import GetProducts from "@/Lib/Server/Queries/GetProducts";
import { useQuery } from "@tanstack/react-query";

function ProductsComponent() {
  const {
    data: products,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: GetProducts,
  });

  if (isLoading) return <div>Laster produkter...</div>;
  if (error) return <div>Feil: {error.message}</div>;
  return (
    <ul>
      {products?.map((p) => (
        <li key={p.id}>{p.title}</li>
      ))}
    </ul>
  );
}

export default ProductsComponent;
