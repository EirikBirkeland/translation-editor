const express = require('express');
const express_graphql = require('express-graphql');
const { buildSchema } = require('graphql');
const _segmentsData = require('./data/hagakure');
const cloneDeep = require('lodash/cloneDeep');
const cors = require('cors');


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

const segmentsData = cloneDeep(_segmentsData).reduce((acc, ele, i) => {
  ele.id = i + 1;
  acc[i] = ele;
  return acc;
}, []);

const getSegment = ({ id }) => segmentsData.filter(seg => seg.id == id)[0];
const getSegments = () => segmentsData;

const root = {
  segment: getSegment,
  segments: getSegments,
};

const app = express();
app.use(cors())
app.use('/graphql', express_graphql({
  schema: schema,
  rootValue: root,
  graphiql: true
}));

app.listen(3333, () => console.log('Express GraphQL Server Now Running On localhost:3333/graphql'));
