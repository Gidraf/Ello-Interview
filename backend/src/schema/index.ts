export const typeDefs = `#graphql
scalar JSON

type Book {
  author: String!
  coverPhotoURL: String!
  readingLevel: String!
  title: String!
}

type Query {
  books: [Book!]!
  readingList: JSON!
  searchBooks(query: String!): [Book!]!
}

type Mutation {
  addBookToReadingList(title: String!): Book!
  removeBookFromReadingList(title: String!): Book!
}
`;
