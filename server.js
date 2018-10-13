const express = require('express');
const express_graphql = require('express-graphql');
const { buildSchema } = require('graphql');
const cors = require('cors');
const { createDb, getSegmentsData } = require('./server/sqliteWrapper');

// GraphQL schema
const schema = buildSchema(`
    type Query {
        segment(id: Int!): Segment
        segments: [Segment]
    },
    type Segment {
        id: Int
        source: String
        target: String
    }
`);

let getSegments;
let getSegment = ({ id }) => getSegments.filter(seg => seg.id == id)[0];

getSegmentsData('Hagakure', (res) => {
  console.log(res.dataValues.segments)

  getSegments = JSON.parse(res.dataValues.segments);

  const root = {
    segment: getSegment,
    segments: getSegments,
  };

  const app = express();
  app.use(cors());
  app.use('/graphql', express_graphql({
    schema: schema,
    rootValue: root,
    graphiql: false
  }));

  app.listen(3333, () => console.log('Express GraphQL Server Now Running On localhost:3333/graphql'));
});
