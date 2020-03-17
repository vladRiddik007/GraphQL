const graphql = require('graphql'); //импорт

const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID } = graphql; //вытягиваем 

const movies = [
	{ id: '1', name: 'Pulp Fiction', genre: 'Crime' },
	{ id: '2', name: '1984', genre: 'Sci-Fi' },
	{ id: 3, name: 'V for vendetta', genre: 'Sci-Fi-Triller' },
	{ id: 4, name: 'Snatch', genre: 'Crime-Comedy' },
];

const MovieType = new GraphQLObjectType({//описываем схему данных хранящихся в базе
  name: 'Movie',
  fields: () => ({//функция возращающая объект данных
    id: { type: GraphQLID },
    name: { type: GraphQLString },// GraphQLString обычная строка
    genre: { type: GraphQLString },
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
  }
});

module.exports = new GraphQLSchema({
  query: Query,
});