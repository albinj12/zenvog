import gql from 'graphql-tag'

export const LOGIN_QUERY = gql`
    query($email:String!,$password:String!){
        login(email:$email,password:$password)
    }
`

export const USER_QUERY = gql`
    query{
        user{
          name
          profilePicture
          createdContests{
            _id
            name
            tagline
          }
          participatedContests{
            name
            tagline
          }
        }
      }
`