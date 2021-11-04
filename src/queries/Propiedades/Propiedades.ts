import { gql } from '@apollo/client';


const NUEVA_PROPIEDAD = gql`
    mutation createProperty($propertyInput: PropertyInput!) {
      createProperty(propertyInput: $propertyInput) {
        id
        broker {
          id
          name
          address
        }
        address
        latitude
        longitude
        price
        currency
      }
    }
`;
 const OBTENER_PROPIEDADES = gql`
    query properties {
      properties {
        id
        broker {
            id
            name
        }
        address
        latitude
        longitude
        price
        currency
      }
    }
`;

module.exports = {NUEVA_PROPIEDAD, OBTENER_PROPIEDADES}