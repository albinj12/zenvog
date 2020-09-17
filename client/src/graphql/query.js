import gql from 'graphql-tag'

export const LOGIN_QUERY = gql`
    query($email:String!,$password:String!){
        login(email:$email,password:$password)
    }
`