//import segmentsCollection from '../data/hagakure';
import ApolloClient from 'apollo-boost';
import gql from 'graphql-tag';

const client = new ApolloClient({
  uri: 'http://localhost:3333/graphql'
});

let segmentsCollection;

client.query({
  query: gql`
    query {
      segments {
        id,
        source,
        target
      }
    }
  `,
})
  .then(data => segmentsCollection = data)
  .catch(error => console.error(error));

const segments = (state = segmentsCollection, action) => {
  let newState;
  switch (action.type) {
    case 'CHANGE_SEGMENT_CONTENT':
      newState = Object.assign([], state);
      newState[action.index].target = action.value;
      return newState;

    case 'SEARCH_REPLACE':
      const { findValue, replaceValue, options } = action;
      const { regex, caseInsensitive, replaceAll } = options;

      newState = Object.assign([], state);

      const newCollection = newState.map(seg => {
        const adjustedFindValue = (() => {
          if (regex) {
            let flags = '';
            if (caseInsensitive) {
              flags += "i";
            }
            if (replaceAll) {
              flags += "g";
            }
            return new RegExp(findValue, flags);
          } else {
            return findValue;
          }
        })();

        seg.target = seg.target.replace(adjustedFindValue, replaceValue);
        return seg;
      });
      return newCollection || [];
    default:
      return state || [];
  }
};

export default segments;