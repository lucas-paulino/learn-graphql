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
      const found = links.find( (element) => element.id == args.id );
      
      if(found != null && found != undefined){
        const index = links.indexOf(found);
        links[index].url = args.url;
        links[index].description = args.description;
        return links[index];
      }else{
        console.log("There isn't what to update");
        return null;
      }
    },
    deleteLink: (parent, args)=>{
      const found = links.find( (element) => element.id == args.id );
      if(found != null && found != undefined){
        const index = links.indexOf(found);
        links.splice(index,1);
        return true 
      }else{
        console.log("There isn't what to delete");
        return false;
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
      updateLink(id: "link-2", 
                 description:"Teste", 
                 url:"Teste"){
        id
        description
        url
      }
      deleteLink(id: "link-2")
    }

*/