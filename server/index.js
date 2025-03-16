import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import typeDefs from './schema.js';
import resolvers from './resolvers.js';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const startServer = async () => {
  const app = express();

  
  const corsOptions = {
    origin: 'http://localhost:5173', 
    methods: 'GET,POST',
    credentials: true,
  };
  app.use(cors(corsOptions));

  
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

 
  await server.start();
  server.applyMiddleware({ app });

  
  const PORT = process.env.PORT || 4000;

  app.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);
  });
};

startServer().catch((err) => {
  console.error('Server failed to start', err);
});


