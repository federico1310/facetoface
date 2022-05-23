import { gql } from '@apollo/client';

const AUTENTICAR_USUARIO = gql`
    mutation autenticarUsuario($input: AutenticarInput) {
        autenticarUsuario(input: $input) {
          token
        }
    }
`;

const NUEVA_CUENTA = gql`
    mutation nuevoUsuario($input: UsuarioInput) {
        nuevoUsuario(input: $input) {
            id
            name
            last_name
            email
            gender
            birthday
        }
    }
`;

const OBTENER_USUARIO = gql`
    query obtenerUsuario($token: String!) {
        obtenerUsuario(token: $token) {
          id
          name
          last_name
          registered_at
        }
    }
`;


module.exports = {AUTENTICAR_USUARIO, NUEVA_CUENTA, OBTENER_USUARIO}