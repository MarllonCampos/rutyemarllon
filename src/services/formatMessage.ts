import { Product } from "@prisma/client";

function formatMessage(products: Product[]){
  return products.map(product => `- ${product.name} ${product.description.length > 0 ? `(${product.description})`:""}`).join(`-`)
}

export { formatMessage }