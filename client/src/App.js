import React, { Component } from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

// Components
import BookList from "./components/book-list";
import AddBook from "./components/add-book";

// apollo client setup
const client = new ApolloClient({
    uri: "http://localhost:4000/graphql"
});

class App extends Component {
    render() {
        return (
            <ApolloProvider client={client}>
                <div className="App">
                    Books List
                    <BookList />
                    <AddBook />
                </div>
            </ApolloProvider>
        );
    }
}

export default App;
