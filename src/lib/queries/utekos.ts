
import { storefrontClient } from "../../clients/storefrontApiClient";

const productQuery = `
  query ProductQuery($handle: String) {
    product(handle: $handle) {
      id
      title
      handle
    }
  }
`;

export const {data, errors, extensions} = await storefrontClient.request(productQuery, {
  variables: {
    handle: 'sample-product',
  },
});