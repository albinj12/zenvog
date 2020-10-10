import gql from 'graphql-tag'

export const SIGNUP_MUTATION = gql`
    mutation($name:String!,$email:String!,$password:String!){
        signup(name:$name,email:$email,password:$password)
    }
`
export const CREATE_CONTEST_MUTATION = gql`
    mutation($name: String!, $tagline: String, $deadline: Date, $description: String!, $rules: [String], $contestType: String!, $maxParticipants: Int!, $startDate: Date){
        createContest(name: $name, tagline:$tagline, deadline: $deadline, description: $description, rules:$rules, contestType:$contestType, maxParticipants: $maxParticipants, startDate: $startDate){
            _id
        }
    }
`

export const UPLOAD_IMAGE_MUTATION = gql`
    mutation($file:Upload!,$contestId:ID!){
        addImage(file: $file,contestId:$contestId){
            _id
            votes
            url
            participant{
                name
            }
        }
    }
`

export const VOTE_MUTATION = gql`
    mutation($contestId: ID!, $entryId: ID!){
        vote(contestId:$contestId, entryId:$entryId)
    }
`