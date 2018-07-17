import ApolloClient from 'apollo-boost';
import gql from 'graphql-tag';

const client = new ApolloClient({
    uri: 'http://localhost:3333/graphql'
});

const dataService = store => next => action => {
    next(action);

    switch (action.type) {
        case 'FETCH_SEGMENTS':
            client.query({
                query: gql`
              query {
                segments {
                  id,
                  source,
                  target
                }
              }
            `
            }).then(data => {
                //window.segmentsCollection = data.data.segments;
                next({ type: 'GET_SEGMENTS_RECEIVED', data });
            }).catch(error => {
                next({ type: 'GET_SEGMENTS_ERROR' }, error);
            });
            break;
        default:
            break;
    }
};

export default dataService;