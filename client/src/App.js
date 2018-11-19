import React, { Component } from "react";
import BookList from "./components/book-list";

class App extends Component {
    render() {
        return (
            <div className="App">
                Books List
                <BookList />
            </div>
        );
    }
}

export default App;
