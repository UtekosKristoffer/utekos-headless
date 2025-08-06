import { useQuery } from "@tanstack/react-query";
import 
function ProductsResults() {
  const {
    data: products,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['products', productSearch], 
    queryFn: () => fetchProducts(productSearch), 
    staleTime: 5 * 60 * 1000, // ✅ Cache for 5 minutes
    retry: 2, 
  });

  // ✅ Same conditional rendering, but managed automatically
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  return <div>{/* render FeaturedProductPage*/}</div>;
}