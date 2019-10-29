const {GraphQLServer} = require("graphql-yoga");
const FALSE = -1;
let links = [
    { id: 'link-0', url: 'www.howtographql.com', description: 'Fullstack tutorial for GraphQL'},
    { id: 'link-1', url: 'www.graphql.com', description: 'Fullstack tutorial for GraphQL'},
    { id: 'link-2', url: 'www.graphql.org', description: 'Fullstack tutorial for GraphQL'}
]

let idCount = links.length

const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    feed: () => links,
  },
  Mutation: {
    post:(parent, args)=>{
      const link = {  id: `link-${idCount++}`,
                      description: args.description,
                      url: args.url }
      links.push(link)
      return link
    },
    updateLink:(parent, args)=>{
      var found = links.findIndex((element) => element.id === args.id );
      if(found != FALSE){
        links = links[found].url = args.url;
        links = links[found].description = args.description;
        return links[found];
      }else{
        console.log("Não há o que atualizar, turu pom");
        return null;
      }
    },
    deleteLink: ()=>{
      var found = links.findIndex((element) => element.id === args.id );
      if(found != FALSE){
        links.splice(found,1);
      }else{
        console.log("Não há o que deletar, turu pom");
        return null;
      }
    }
  },
  Link: {
    id: (parent) => parent.id,
    description: (parent) => parent.description,
    url: (parent) => parent.url,
  }
}

const server = new GraphQLServer({ typeDefs:'./src/schema.graphql',
                                  resolvers });
server.start(() => console.log(`Server is running on http://localhost:4000`));


/*

    Query(s)

    query {
        info
    }

    query {
        feed{
            id
            description
            url
        }
    }

    mutation{
      post(description:"Fullstack GraphQL", 
          url:"www.graphql.org"){
        id
      }
    }

*/