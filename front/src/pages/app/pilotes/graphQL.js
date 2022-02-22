import gql from 'graphql-tag'

export const queryTest = gql`query queryTest{
    tests{
        id
        name
    }
}`