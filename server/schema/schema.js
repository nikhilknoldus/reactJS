const graphql = require('graphql');
const _ = require('lodash');
const Book = require('../models/book');
const Author = require('../models/author');

const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLList, GraphQLNonNull} = graphql;

//dummy data

// var books= [
//     {name: 'Book Name One', genre: 'Business', id: '1', authorId: '1'},
//     {name: 'Book Name Two', genre: 'Finance', id: '2', authorId: '2'},
//     {name: 'Book Name Three', genre: 'Money', id: '3', authorId: '3'},
//     {name: 'Book Name Four', genre: 'Sci-Fi', id: '4', authorId: '1'},
//     {name: 'Book Name Five', genre: 'Action', id: '5', authorId: '2'},
//     {name: 'Book Name Six', genre: 'Passion', id: '6', authorId: '3'}
// ];

// var authors = [
//     {name: 'Chris', age: '35', id: '1'},
//     {name: 'Carlos', age: '35', id: '2'},
//     {name: 'Alex', age: '35', id: '3'}
// ];

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLString },
        name:  { type: GraphQLString },
        genre: { type: GraphQLString },
        author: {
            type: AuthorType,
            resolve( parent, args ){
                console.log(parent);
                // return _.find(authors, { id: parent.authorId})
                return Author.findById(parent.authorId);
            }
        }
    })
});

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: { type: GraphQLString },
        name:  { type: GraphQLString },
        age: { type: GraphQLString },
        books: {
            type: new GraphQLList(BookType),
            resolve ( parent, args) {
                // return _.filter(books, {authorId: parent.id})
                return Book.find({ authorId: parent.id})
            }
        }
    })
});


const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: { id: { type: GraphQLString }},
            resolve( parent, args ){
                //code to get the data from the db/other source
                // return _.find(books, {id: args.id})
                return Book.findById(args.id);

            }
        },
        author: {
            type: AuthorType,
            args: { id: {type: GraphQLString}},
            resolve (parent, args){
                // return _.find(authors, {id: args.id})
                return Author.findById(args.id);
            }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve (parent) {
                // return books
                return Book.find({})
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve (parent, args){
                // return authors
                return Author.find({})
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addAuthor: {
            type: AuthorType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                age: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args){
                let author = new Author({
                    name: args.name,
                    age: args.age
                });
                return author.save();
            }
        },
        addBook: {
            type: BookType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                genre: { type: new GraphQLNonNull(GraphQLString) },
                authorId: { type: GraphQLString }
            },
            resolve(parent, args){
                let book = new Book({
                    name: args.name,
                    genre: args.genre,
                    authorId: args.authorId
                });
                return book.save();
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});