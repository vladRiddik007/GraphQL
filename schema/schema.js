// const graphql = require('graphql'); //импорт

// const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLList  } = graphql; //вытягиваем 

// const movies = [
// 	{ id: '1', name: 'Pulp Fiction', genre: 'Crime', directorId: '1', },
// 	{ id: '2', name: '1984', genre: 'Sci-Fi', directorId: '2', },
// 	{ id: '3', name: 'V for vendetta', genre: 'Sci-Fi-Triller', directorId: '3', },
// 	{ id: '4', name: 'Snatch', genre: 'Crime-Comedy', directorId: '4', },
// 	{ id: '5', name: 'Reservoir Dogs', genre: 'Crime', directorId: '1' },
// 	{ id: '6', name: 'The Hateful Eight', genre: 'Crime', directorId: '1' },
// 	{ id: '7', name: 'Inglourious Basterds', genre: 'Crime', directorId: '1' },
// 	{ id: '7', name: 'Lock, Stock and Two Smoking Barrels', genre: 'Crime-Comedy', directorId: '4' },
// ];

// const directors = [
// 	{ id: '1', name: 'Quentin Tarantino', age: 55 },
// 	{ id: '2', name: 'Michael Radford', age: 72 },
// 	{ id: '3', name: 'James McTeigue', age: 51 },
// 	{ id: '4', name: 'Guy Ritchie', age: 50 },
// ];

// const MovieType = new GraphQLObjectType({//описываем схему данных хранящихся в базе
//   name: 'Movie',
//   fields: () => ({//функция возращающая объект данных
//     id: { type: GraphQLID },
//     name: { type: GraphQLString },// GraphQLString обычная строка
//     genre: { type: GraphQLString },
//         director: {
//             type: DirectorType,
//             resolve(parent, args) {
//                 return directors.find(director => director.id === parent.id);
//             },
//         }
//   }),
// });

// const DirectorType = new GraphQLObjectType({
//     name: 'Director',
//     fields: () => ({// если мы делаем схемы со ссылками друг на друга мы должны оборачивать все в функции
//       id: { type: GraphQLID },
//       name: { type: GraphQLString },
//       age: { type: GraphQLInt },
//         movie: {
//             type: new GraphQLList(MovieType),
//             resolve(parent, args) {
//                 return movies.filter(movie => movie.directorId === parent.id);
//               },
//         }
//     }),
//   });

// const Query = new GraphQLObjectType({//корневой запрос
//   name: 'Query',
//   fields: {
//     movie: { //под запрос
//       type: MovieType,
//       args: { id: { type: GraphQLID } },
//       resolve(parent, args) {//метод описывающий данные которые должны возвращатся
//         return movies.find(movie => movie.id == args.id);
//       },
//     },
//     director: {
//         type: DirectorType,
//         args: { id: { type: GraphQLID } },
//         resolve(parent, args) {
//           return directors.find(director => director.id === args.id);
//         },
//       },
//         movies: {
//             type: new GraphQLList(MovieType),
//             resolve(parent, args) {
//                 return movies;
//             }
//         },
//         directors: {
//             type: new GraphQLList(DirectorType),
//             resolve(parent, args) {
//                 return directors;
//             }
//         }
//   }
// });

// module.exports = new GraphQLSchema({
//   query: Query,
// });

const graphql = require('graphql');

const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLList } = graphql;

const Movies = require('../models/movie');
const Directors = require('../models/directors');

/*
// All IDs set automatically by mLab
// Don't forget to update after creation
const directorsJson = [
  { "name": "Quentin Tarantino", "age": 55 }, // 5e70eda91c9d4400007e574d
  { "name": "Michael Radford", "age": 72 }, // 5e70ef5f1c9d4400007e574e
  { "name": "James McTeigue", "age": 51 }, // 5e70ef941c9d4400007e574f
  { "name": "Guy Ritchie", "age": 50 }, // 5e70efb71c9d4400007e5750
];
// directorId - it is ID from the directors collection
const moviesJson = [
  { "name": "Pulp Fiction", "genre": "Crime", "directorId": "5e70eda91c9d4400007e574d" },
  { "name": "1984", "genre": "Sci-Fi", "directorId": "5e70ef5f1c9d4400007e574e" },
  { "name": "V for vendetta", "genre": "Sci-Fi-Triller", "directorId": "5e70ef941c9d4400007e574f" },
  { "name": "Snatch", "genre": "Crime-Comedy", "directorId": "5e70efb71c9d4400007e5750" },
  { "name": "Reservoir Dogs", "genre": "Crime", "directorId": "5e70eda91c9d4400007e574d" },
  { "name": "The Hateful Eight", "genre": "Crime", "directorId": "5e70eda91c9d4400007e574d" },
  { "name": "Inglourious Basterds", "genre": "Crime", "directorId": "5e70eda91c9d4400007e574d" },
  { "name": "Lock, Stock and Two Smoking Barrels", "genre": "Crime-Comedy", "directorId": "5e70efb71c9d4400007e5750" },
];
const movies = [
  { id: '1', name: "Pulp Fiction", genre: "Crime", directorId: "1" },
  { id: '2', name: "1984", genre: "Sci-Fi", directorId: "2" },
  { id: '3', name: "V for vendetta", genre: "Sci-Fi-Triller", directorId: "3" },
  { id: '4', name: "Snatch", genre: "Crime-Comedy", directorId: "4" },
  { id: '5', name: "Reservoir Dogs", genre: "Crime", directorId: "1" },
  { id: '6', name: "The Hateful Eight", genre: "Crime", directorId: "1" },
  { id: '7', name: "Inglourious Basterds", genre: "Crime", directorId: "1" },
  { id: '8', name: "Lock, Stock and Two Smoking Barrels", genre: "Crime-Comedy", directorId: "4" },
];
const directors = [
	{ id: '1', name: "Quentin Tarantino", age: 55 },
  { id: '2', name: "Michael Radford", age: 72 },
  { id: '3', name: "James McTeigue", age: 51 },
  { id: '4', name: "Guy Ritchie", age: 50 },
];
*/

const MovieType = new GraphQLObjectType({
  name: 'Movie',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
		director: {
			type: DirectorType,
			resolve(parent, args) {
				// return directors.find(director => director.id === parent.id);
				return Directors.findById(parent.directorId);
			}
		}
  }),
});

const DirectorType = new GraphQLObjectType({
  name: 'Director',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
		movies: {
			type: new GraphQLList(MovieType),
			resolve(parent, args) {
				// return movies.filter(movie => movie.directorId === parent.id);
				return Movies.find({ directorId: parent.id });
			},
		},
  }),
});

const Mutation = new GraphQLObjectType({
	name: 'Mutation',
	fields: {
		addDirector: {
			type: DirectorType,
			args: {
				name: { type: GraphQLString },
				age: { type: GraphQLInt },
			},
			resolve(parent, args) {
				const director = new Directors({
					name: args.name,
					age: args.age,
				});
				return director.save();// метод библиотеки монгус
			},
		},
		addMovie: {
			type: MovieType,
			args: {
				name: { type: GraphQLString },
				genre: { type: GraphQLString },
				directorId: { type: GraphQLID },
			},
			resolve(parent, args) {
				const movie = new Movies({
					name: args.name,
					genre: args.genre,
					directorId: args.directorId,
				});
				return movie.save();
			},
		}
	}
});

const Query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    movie: {
      type: MovieType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // return movies.find(movie => movie.id === args.id);
				return Movies.findById(args.id);
      },
    },
		director: {
      type: DirectorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // return directors.find(director => director.id === args.id);
				return Directors.findById(args.id);
      },
    },
		movies: {
			type: new GraphQLList(MovieType),
			resolve(parent, args) {
				// return movies;
				return Movies.find({});
			}
		},
		directors: {
			type: new GraphQLList(DirectorType),
			resolve(parent, args) {
				// return directors;
				return Directors.find({});
			}
		}
  }
});

module.exports = new GraphQLSchema({
  query: Query,
  mutation: Mutation,
});