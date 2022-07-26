import { gql } from "@apollo/client";

export const GET_CATEGORY = gql`
  query GetCategory {
    category(input: { title: "all" }) {
      name
      products {
        id
        name
        inStock
        gallery
        prices {
          currency {
            label
            symbol
          }
          amount
        }
      }
    }
  }
`;
