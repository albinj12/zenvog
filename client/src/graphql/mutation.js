import gql from 'graphql-tag'

export const SIGNUP_MUTATION = gql`
    mutation($name:String!,$email:String!,$password:String!){
        signup(name:$name,email:$email,password:$password)
    }
`
export const CREATE_CONTEST_MUTATION = gql`
    mutation($name: String!, $tagline: String, $deadline: Date, $description: String!, $rules: [String], $contestType: String!, $maxParticipants: Int!){
        createContest(name: $name, tagline:$tagline, deadline: $deadline, description: $description, rules:$rules, contestType:$contestType, maxParticipants: $maxParticipants){
            name,
            deadline
        }
    }
`