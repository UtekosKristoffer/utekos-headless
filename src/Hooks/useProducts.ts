import { useQuery } from "@tanstack/react-query";
import getProducts from "@/Lib/Server/Queries/GetProducts";

function useProducts() {
  return useQuery<ShopifyProduct[]>({
    queryKey: ["products"],
    queryFn: getProducts,
  });
}

export default useProducts;
