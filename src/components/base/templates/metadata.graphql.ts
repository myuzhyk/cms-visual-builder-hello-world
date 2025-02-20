import { graphql } from "@generated/graphql/gql";

export const MetadataQuery = graphql(/* GraphQL */ `
  query GetPageMetaData($url: String) {
    content: _Content(
      where: { _metadata: { url: { default: { eq: $url } } } }
    ) {
      items {
        _metadata {
          displayName
          key
          types
        }
      }
    }
  }
`);
