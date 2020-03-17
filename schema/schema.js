const graphql = require('graphql'); //импорт

const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt } = graphql; //вытягиваем 

const movies = [
	{ id: '1', name: 'Pulp Fiction', genre: 'Crime', directorId: '1', },
	{ id: '2', name: '1984', genre: 'Sci-Fi', directorId: '2', },
	{ id: '3', name: 'V for vendetta', genre: 'Sci-Fi-Triller', directorId: '3', },
	{ id: '4', name: 'Snatch', genre: 'Crime-Comedy', directorId: '4', },
];

const directors = [
	{ id: '1', name: 'Quentin Tarantino', age: 55 },
	{ id: '2', name: 'Michael Radford', age: 72 },
	{ id: '3', name: 'James McTeigue', age: 51 },
	{ id: '4', name: 'Guy Ritchie', age: 50 },
];

const MovieType = new GraphQLObjectType({//описываем схему данных хранящихся в базе
  name: 'Movie',
  fields: () => ({//функция возращающая объект данных
    id: { type: GraphQLID },
    name: { type: GraphQLString },// GraphQLString обычная строка
    genre: { type: GraphQLString },
        director: {
            type: DirectorType,
            resolve(parent, args) {
                return directors.find(director => director.id === parent.id);
            },
        }
  }),
});

const DirectorType = new GraphQLObjectType({
    name: 'Director',
    fields: () => ({
      id: { type: GraphQLID },
      name: { type: GraphQLString },
      age: { type: GraphQLInt },
        movie: {
            type: MovieType,
            resolve(parent, args) {
                return movies.find(movie => movie.id === parent.id);
              },
        }
    }),
  });

const Query = new GraphQLObjectType({//корневой запрос
  name: 'Query',
  fields: {
    movie: { //под запрос
      type: MovieType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {//метод описывающий данные которые должны возвращатся
        return movies.find(movie => movie.id == args.id);
      },
    },
    director: {
        type: DirectorType,
        args: { id: { type: GraphQLID } },
        resolve(parent, args) {
          return directors.find(director => director.id === args.id);
        },
      },
  }
});

module.exports = new GraphQLSchema({
  query: Query,
});