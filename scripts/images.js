import fs from "fs";
import path from "path";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });
function bytesToKb(bytes) {
  if (bytes === 0) return "0 KB";
  const kb = bytes / 1024;
  return `${kb.toFixed(2)} KB`;
}

function categorizeImage(image) {
  const altText = (image.alt || "").toLowerCase();
  const url = image.url.toLowerCase();
  const searchText = `${altText} ${url}`;

  if (searchText.includes("blue")) return "Blue";
  if (searchText.includes("dark") || searchText.includes("black"))
    return "Dark/Black";
  if (searchText.includes("comfy")) return "Comfyrobe";
  if (searchText.includes("special")) return "Special Edition";
  if (searchText.includes("favicon") || searchText.includes("logo"))
    return "Logo/Favicon";

  return "Generale";
}

// --- Konfigurasjon ---
const shopifyDomain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
const adminApiToken = process.env.SHOPIFY_ADMIN_API_TOKEN;
const apiVersion = "2024-07";
const endpoint = `https://${shopifyDomain}/admin/api/${apiVersion}/graphql.json`;
const outputPath = path.join(
  process.cwd(),
  "src",
  "lib",
  "image-manifest.json"
);

// --- GraphQL-spørring ---
const filesQuery = `
  query getShopifyFiles($cursor: String) {
    files(first: 100, after: $cursor, query: "media_type:IMAGE") {
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        node {
          ... on MediaImage {
            id
            alt
            originalSource {
              url
              fileSize
            }
            image {
              url
              width
              height
            }
          }
        }
      }
    }
  }
`;

async function shopifyAdminFetch(query, variables) {
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Access-Token": adminApiToken,
    },
    body: JSON.stringify({ query, variables }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Admin API HTTP Error: ${response.status} ${errorBody}`);
  }

  const jsonResponse = await response.json();

  if (jsonResponse.errors) {
    console.error(
      "GraphQL Errors:",
      JSON.stringify(jsonResponse.errors, null, 2)
    );
    throw new Error("Feil i GraphQL-spørring. Se loggen over for detaljer.");
  }

  return jsonResponse;
}
async function fetchAllImages() {
  console.log("🚀 Starter henting av bilder fra Shopify...");
  const allImages = [];
  let hasNextPage = true;
  let cursor = null;
  let pageCount = 1;

  // Steg 1: Hent alle bildene (som før)
  while (hasNextPage) {
    console.log(`Henter side ${pageCount}...`);
    const response = await shopifyAdminFetch(filesQuery, { cursor });
    const imageData = response.data.files.edges
      .map((edge) => {
        const node = edge.node;
        if (!node || !node.image || !node.originalSource) return null;
        return {
          id: node.id,
          alt: node.alt,
          url: node.image.url,
          width: node.image.width,
          height: node.image.height,
          fileSize: bytesToKb(node.originalSource.fileSize),
        };
      })
      .filter(Boolean);
    allImages.push(...imageData);
    hasNextPage = response.data.files.pageInfo.hasNextPage;
    cursor = response.data.files.pageInfo.endCursor;
    pageCount++;
  }

  // Steg 2: Sorter bildene inn i den nye, nestede strukturen
  console.log(
    `\n🔄 Sorterer ${allImages.length} bilder i kategorier og underkategorier...`
  );
  const categorizedImages = {
    Blue: { main: [], Mobile: [] },
    "Dark/Black": { main: [], Mobile: [] },
    Comfyrobe: { main: [], Mobile: [] },
    "Special Edition": { main: [], Mobile: [] },
    "Logo/Favicon": { main: [], Mobile: [] },
    Generale: { main: [], Mobile: [] },
  };

  for (const image of allImages) {
    const category = categorizeImage(image);

    // Sjekk for "mobile"
    const altText = (image.alt || "").toLowerCase();
    const url = image.url.toLowerCase();
    const searchText = `${altText} ${url}`;

    if (searchText.includes("mob") || searchText.includes("mobile")) {
      categorizedImages[category].Mobile.push(image);
    } else {
      categorizedImages[category].main.push(image);
    }
  }

  // Steg 3: Skriv det nye, kategoriserte objektet til fil
  fs.writeFileSync(outputPath, JSON.stringify(categorizedImages, null, 2));

  console.log(`\n✅ Ferdig! Lagret de sorterte bildene til ${outputPath}`);
}
// Kjør scriptet
fetchAllImages().catch((error) => {
  console.error("\n❌ Noe gikk galt:");
  console.error(error);
});
