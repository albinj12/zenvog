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
            _id
            name
            tagline
          }
        }
      }
`

export const GET_CONTEST_QUERY=gql`
    query($id:ID!){
      getContest(id:$id){
        name
        tagline
        description
        maxParticipants
        currentParticipants
        createdBy{
          name
        }
        entry{
          _id
          url
          votes
          participant{
            name
          }
        }
        deadline
        status
        startDate
        showEditOption
        rules
        participateOption
      }
    }
`

export const LOGOUT_QUERY=gql`
  query{
    logout
  }
`

export const GET_CONTESTS_QUERY=gql`
  query{
    getContests{
      _id
      name
      tagline
      createdBy{
        name
      }
      maxParticipants
      currentParticipants
      deadline
      startDate
      status
    }
  }
`