import gql from 'graphql-tag'

export const SIGNUP_MUTATION = gql`
    mutation($name:String!,$email:String!,$password:String!){
        signup(name:$name,email:$email,password:$password)
    }
`