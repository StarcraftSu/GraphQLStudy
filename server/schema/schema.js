const graphql = require('graphql')
const Book = require('../models/book')
const Author = require('../models/author')

const { GraphQLObjectType, 
        GraphQLString, 
        GraphQLSchema, 
        GraphQLID,
        GraphQLInt,
        GraphQLList
    } = graphql;

//Define para's type for authors
const AuthorType = new GraphQLObjectType({
    name:'Author',
    fields:()=>({
        id:{ type:GraphQLID },
        name:{ type:GraphQLString },
        age:{ type:GraphQLInt },
        books:{ // Link book data with author ( authorId linked to parent.id ) 
            type:  new GraphQLList(BookType),
            resolve(parent,args){
                const { id } = parent
                return books.filter(book=>book.authorId===id)
            }
        }
    })    
})
//Define para's type for books            
const BookType = new GraphQLObjectType({
    name:'Book',
    fields:()=>({
        id:{ type: GraphQLID },
        name:{ type:GraphQLString },
        genre:{ type:GraphQLString },
        author:{ // Link author data with book
            type:  AuthorType,
            resolve(parent,args){
                const { authorId } = parent
                // return authors.find(author=>author.id===authorId)
                return Author.findById(authorId);
            }
        }
    })
})
//Create root node for searching
const RootQuery = new GraphQLObjectType({
    name:'RootQueryType',
    fields:{
        books:{
            type:new GraphQLList(BookType), // What type the result is going to be
            resolve(){                      // Resolve the actual data
                return books
            }
        },
        authors:{
            type:new GraphQLList(AuthorType),
            resolve(){
                return authors
            }
        },
        book:{
            type:BookType,
            args:{ id:{type:GraphQLID} },
            resolve(parent,args){
                //code to get data from db / other source
                return books.find(book=>book.id===args.id)
            }
        },
        author:{
            type:AuthorType,
            args:{ id:{type:GraphQLID} },
            resolve(parent,args){
                return authors.find(author=>author.id===args.id)
            }
        }
    }
})

const Mutation = new GraphQLObjectType({
    name:'Mutation',
    fields:{
        addAuthor:{
            type:AuthorType,
            args:{
                name:{
                    type:GraphQLString
                },
                age:{
                    type:GraphQLInt
                }
            },
            resolve(parent,args){
                const { name,args } = args
                let author = new Author({
                    name,
                    age
                })
                return author.save()
            }
        },
        addBook:{
            type:BookType,
            args:{
                name:{
                    type:GraphQLString
                },
                genre:{
                    type:GraphQLString
                },
                authorId:{
                    type:GraphQLID
                }
            },
            resolve(parent,{name,genre,authorId}){
                let book = new Book({
                    name,
                    genre,
                    authorId
                })
                return book.save()
            }
        }
    }
})

module.exports = new GraphQLSchema({ 
    query:RootQuery,
    mutation:Mutation
})