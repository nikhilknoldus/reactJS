import React, { Component } from "react";
import { graphql } from "react-apollo";
import { getBooksQuery } from "../queries/queries";

import BookDetails from "./book-details";

class BookList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: null
        };
    }
    displayBooks() {
        var responseData = this.props.data;
        if (responseData.loading) {
            return <div> Loading... </div>;
        } else {
            return responseData.books.map(book => {
                return (
                    <li
                        key={book.id}
                        onClick={e => this.setState({ selected: book.id })}
                    >
                        {" "}
                        {book.name}
                    </li>
                );
            });
        }
    }
    render() {
        return (
            <div className="book-list">
                <ul>{this.displayBooks()}</ul>
                <BookDetails bookId={this.state.selected} />
            </div>
        );
    }
}

export default graphql(getBooksQuery)(BookList);
