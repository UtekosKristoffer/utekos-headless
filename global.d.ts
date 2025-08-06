declare global {
  type ShopifyPrice = {
    amount: string;
    currencyCode: string;
  };

  type ShopifyImage = {
    url: string;
    altText: string | null;
    width: number;
    height: number;
  };

  type Cart = {
    id: string;
    checkoutUrl: string;
    totalQuantity: number;
    cost: {
      totalAmount: ShopifyPrice;
      subtotalAmount: ShopifyPrice;
    };
    lines: {
      edges: {
        node: CartLine;
      }[];
    };
  };

  type CartLine = {
    id: string;
    quantity: number;
    merchandise: {
      id: string;
      title: string;
      price: ShopifyPrice;
      product: {
        title: string;
        handle: string;
        featuredImage: ShopifyImage | null;
      };
    };
  };

  type AddItemResult = {
    success: boolean;
    message: string;
    cart?: Cart | null;
  };
  type Menu = {
    title: string;
    url: string;
    items?: MenuItem[];
  };

  type MenuItem = {
    title: string;
    url: string;
    items?: MenuItem[];
  };

  type ShopifyPrice = {
    amount: string;
    currencyCode: string;
  };

  type ShopifyImage = {
    url: string;
    altText: string | null;
    width: number;
    height: number;
  };

  type ShopifySelectedOption = {
    name: string;
    value: string;
  };

  type MetaobjectField = {
    value: string;
  } | null;

  type MetaobjectReference = {
    images: MetaobjectField;
    subtitle: MetaobjectField;
    materials: MetaobjectField;
    functions: MetaobjectField;
    properties: MetaobjectField;
    usage: MetaobjectField;
    sizeFit: MetaobjectField;
    storageAndMaintenance: MetaobjectField;
    colorLabel: MetaobjectField;
    backgroundColor: MetaobjectField;
    swatchHexcolorForVariant: MetaobjectField;
    length: MetaobjectField;
    centerToWrist: MetaobjectField;
    flatWidth: MetaobjectField;
  };

  type VariantProfileReference = {
    reference: MetaobjectReference | null;
  };

  type ShopifyProductVariant = {
    id: string;
    title: string;
    availableForSale: boolean;
    selectedOptions: ShopifySelectedOption[];
    price: ShopifyPrice;
    image: ShopifyImage | null;
    variantProfile: VariantProfileReference | null;
    variantProfileData?: { [key: string]: any };
  };

  type ShopifyVariantEdge = {
    node: ShopifyProductVariant;
  };

  type ShopifyVariantConnection = {
    edges: ShopifyVariantEdge[];
  };

  type ShopifyMediaImage = {
    id: string;
    image: ShopifyImage;
  };

  type ShopifyMediaEdge = {
    node: ShopifyMediaImage;
  };

  type ShopifyMediaConnection = {
    edges: ShopifyMediaEdge[];
  };

  type ShopifyOption = {
    name: string;
    values: string[];
  };

  type ShopifyProduct = {
    id: string;
    title: string;
    handle: string;
    descriptionHtml: string;
    featuredImage: ShopifyImage | null;
    priceRange: {
      minVariantPrice: ShopifyPrice;
    };
    options: ShopifyOption[];
    media: ShopifyMediaConnection;
    variants: ShopifyVariantConnection;
  };

  type ShopifyProductConnection = {
    edges: Array<{
      node: ShopifyProduct;
    }>;
    pageInfo?: {
      hasNextPage: boolean;
      hasPreviousPage: boolean;
      startCursor?: string;
      endCursor?: string;
    };
  };

  type ShopifyCollection = {
    id: string;
    title: string;
    handle: string;
    description: string;
    products: ShopifyProductConnection;
  };
}
export {};
