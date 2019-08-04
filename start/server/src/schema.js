const { gql } = require('apollo-server');

const typeDefs = `
type Query {
  launches(
    pageSize: Int
    after: String
  ): LaunchConnection!
  launch(id: ID!): Launch
  # Queries for the current user
  me: User
}

type Launch {
  id: ID!
  site: String
  mission: Mission
  rocket: Rocket
  isBooked: Boolean!
}

type Rocket {
  id: ID!
  name: String
  type: String
}

type User {
  id: ID!
  email: String!
  trips: [Launch]!
}

type Mission {
  name: String
  missionPatch(mission: String, size: PatchSize): String
}

"""
Simple wrapper around our list of launches that contains a cursor to the
last item in the list. Pass this cursor to the launches query to fetch results
after these.
"""
type LaunchConnection {
  cursor: String!
  hasMore: Boolean!
  launches: [Launch]!
}

enum PatchSize {
  SMALL
  LARGE
}

type Mutation {
  bookTrips(launchIds: [ID]!): TripUpdateResponse!

  cancelTrip(launchId: ID!): TripUpdateResponse!

  login(email: String): String
}

type TripUpdateResponse {
  success: Boolean!
  message: String
  launches: [Launch]
}
`;

module.exports = typeDefs;