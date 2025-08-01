// src/types/shopify.ts

export type ShopifyImage = {
  url: string;
  altText: string | null;
  width: number;
  height: number;
};

export type ShopifyPrice = {
  amount: string;
  currencyCode: string;
};

export type ShopifySelectedOption = {
  name: string;
  value: string;
};

export type MetaobjectField = {
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

export type ShopifyProductVariant = {
  id: string;
  title: string;
  availableForSale: boolean;
  selectedOptions: ShopifySelectedOption[];
  price: ShopifyPrice;
  image: ShopifyImage | null;
  variantProfile: VariantProfileReference | null;
  // Legg til dette nye, transformerte feltet fra forrige forslag
  variantProfileData?: { [key: string]: any };
};

export type ShopifyVariantEdge = {
  node: ShopifyProductVariant;
};

export type ShopifyVariantConnection = {
  edges: ShopifyVariantEdge[];
};

export type ShopifyMediaImage = {
  id: string;
  image: ShopifyImage;
};

export type ShopifyMediaEdge = {
  node: ShopifyMediaImage;
};

export type ShopifyMediaConnection = {
  edges: ShopifyMediaEdge[];
};

export type ShopifyOption = {
  name: string;
  values: string[];
};

export type ShopifyProduct = {
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

export type ShopifyCartLine = {
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

export type ShopifyCart = {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  cost: {
    totalAmount: ShopifyPrice;
    subtotalAmount: ShopifyPrice;
  };
  lines: {
    edges: {
      node: ShopifyCartLine;
    }[];
  };
};
export type ShopifyProductConnection = {
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

export type ShopifyCollection = {
  id: string;
  title: string;
  handle: string;
  description: string;
  products: ShopifyProductConnection;
};

export type MenuItem = {
  title: string;
  url: string;
  items?: MenuItem[];
};

export type Menu = {
  items: MenuItem[];
};
