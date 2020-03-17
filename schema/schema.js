const graphql = require('graphql'); //импорт

const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql; //вытягиваем 

const MovieType = new GraphQLObjectType({//описываем схему данных хранящихся в базе
  name: 'Movie',
  fields: () => ({//функция возращающая объект данных
    id: { type: GraphQLString },// GraphQLString обычная строка
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
  }),
});

const Query = new GraphQLObjectType({//корневой запрос
  name: 'Query',
  fields: {
    movie: { //под запрос
      type: MovieType,
      args: { id: { type: GraphQLString } },
      resolve(parent, args) {//метод описывающий данные которые должны возвращатся

      },
    },
  }
});

module.exports = new GraphQLSchema({
  query: Query,
});