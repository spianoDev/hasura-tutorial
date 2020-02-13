import { WebSocketLink } from 'apollo-link-ws';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';

export default new ApolloClient({
    cache: new InMemoryCache(),
    link: new WebSocketLink({
        // changes the html link to a websocket link
        uri: "wss://spiano-pixels.herokuapp.com/v1/graphql",
        options: {
            // if the connection drops, it will automatically reconnect
            reconnect: true
        }
    })
});
