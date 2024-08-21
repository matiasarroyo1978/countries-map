import { gql } from '@apollo/client'

export const GET_COUNTRIES = gql`
  query GetCountries {
    countries {
      name
      code
      native
      capital
      currency
      languages {
        name
      }
    }
  }
`;