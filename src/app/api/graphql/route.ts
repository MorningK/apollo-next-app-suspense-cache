import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { ApolloServer } from "@apollo/server";
import { gql } from "graphql-tag";

const peopleData = [
  { id: 1, name: "John Smith" },
  { id: 2, name: "Sara Smith" },
  { id: 3, name: "Budd Deey" },
];

const resolvers = {
  Query: {
    people() {
      console.debug('people', peopleData);
      return peopleData;
    },
  },
  Mutation: {
    addPerson(_: unknown, { name }: { name: string }) {
      console.debug('addPerson', name);
      const person = {
        id: peopleData[peopleData.length - 1].id + 1,
        name,
      };

      peopleData.push(person);
      return person;
    },
  },
};

const typeDefs = gql`
  type Query {
    people: [Person!]!
  }
  type Mutation {
    addPerson(name: String!): Person!
  }
  type Person {
    id: ID!
    name: String!
  }
`;

const server = new ApolloServer({
  resolvers,
  typeDefs,
});

const handler = startServerAndCreateNextHandler(server);

export { handler as GET, handler as POST };
