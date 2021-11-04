import { gql } from '@apollo/client';

const NUEVO_BROKER = gql`
    mutation createBroker($brokerInput: BrokerInput!) {
      createBroker(brokerInput: $brokerInput) {
        id
        name
        address
      }
    }
`;

const OBTENER_BROKERS = gql`
  query brokers {
    brokers {
      id
      name
      address
    }
  }
`;

module.exports = {NUEVO_BROKER, OBTENER_BROKERS}