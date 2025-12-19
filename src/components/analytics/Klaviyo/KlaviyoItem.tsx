export function KlaviyoTrackViewedProductScript(item: {
  ProductName: string
  ProductID: string
  SKU?: string
  Categories?: string[]
  ImageURL: string
  URL?: string
  Brand: string
  Price: number
  CompareAtPrice?: number
}) {
  const scriptContent = `
   var item = {
     "ProductName": ${JSON.stringify(item.ProductName)},
     "ProductID": ${JSON.stringify(item.ProductID)},
     "SKU": ${JSON.stringify(item.SKU)},
     "Categories": ${JSON.stringify(item.Categories)},
     "ImageURL": ${JSON.stringify(item.ImageURL)},
     "URL": ${JSON.stringify(item.URL)},
     "Brand": ${JSON.stringify(item.Brand)},
     "Price": ${item.Price},
     "CompareAtPrice": ${JSON.stringify(item.CompareAtPrice)}
   };
   klaviyo.track("Viewed Product", item);
  `
  return (
    <script
      type='text/javascript'
      dangerouslySetInnerHTML={{ __html: scriptContent }}
    ></script>
  )
}
