import {ApolloClient, InMemoryCache }from  "@apollo/client";
import {createUploadLink} from "apollo-upload-client";
import {setContext} from "apollo-link-context";
import {getToken} from "../Token/token"

const httpLink = createUploadLink({
    uri:"https://new-apps-5202d6696df2.herokuapp.com/",
})

const authLink = setContext(async (_, { headers }) => {
    const token = getToken();
    return {
        headers: {
            ...headers,
            Authorization: token ? `Bearer ${token}` : "",
        },
    };
});


const client = new ApolloClient({
    connectToDevTools:true,
    cache:new InMemoryCache(),
    link:authLink.concat(httpLink),
});

export default client