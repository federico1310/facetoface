import { gql } from '@apollo/client';

const NUEVO_ANUNCIO = gql`
    mutation nuevoAnuncio($input: AnuncioInput) {
        nuevoAnuncio(input: $input) {
            id
            title
            city
            state
            country
            bedrooms
            beds
            toilets
            estado
            modified_at
        }
    }
`;

const OBTENER_ANUNCIOS = gql`
    query obtenerAnuncios {
        obtenerAnuncios {
            id
            title
            city
            state
            country
            bedrooms
            beds
            toilets
            estado
            modified_at
        }
    }
`;

module.exports = {NUEVO_ANUNCIO, OBTENER_ANUNCIOS}