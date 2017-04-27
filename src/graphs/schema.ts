import {
	GraphQLBoolean,
	GraphQLInt,
	GraphQLList,
	GraphQLNonNull,
	GraphQLObjectType,
	GraphQLSchema,
	GraphQLString,
} from 'graphql'

// Test 1

interface Category {
	id: number
	title: string
	categories: Category[]
	todos: Todo[]
}

interface Todo {
	id: number
	title: string
	completed: boolean
}

let count = 2;
const TODOs: Category[] = [
	{
		id: 1,
		title: "Home",
		todos: [],
		categories: [
			{
				id: 3,
				title: "Important",
				categories: [],
				todos: [
					{
						id: 1,
						title: "TODO 1",
						completed: true
					},
					{
						id: 2,
						title: "TODO 2",
						completed: false
					}
				]
			},
			{
				id: 4,
				title: "Less important",
				categories: [],
				todos: [
					{
						id: 3,
						title: "TODO 3",
						completed: true
					},
					{
						id: 4,
						title: "TODO 4",
						completed: false
					}
				]
			}
		]
	},
	{
		id: 2,
		title: "Work",
		categories: [],
		todos: []
	}
]

const CategoryType = new GraphQLObjectType({
	name: 'category',
	fields: () => ({
		id: {
			type: GraphQLInt
		},
		title: {
			type: GraphQLString
		},
		categories: {
			type: new GraphQLList(CategoryType)
		},
		todos: {
			type: new GraphQLList(TodoType)
		}
	})
})

const TodoType = new GraphQLObjectType({
	name: 'todo',
	fields: {
		id: {
			type: GraphQLInt
		},
		title: {
			type: GraphQLString
		},
		completed: {
			type: GraphQLBoolean
		}
	}
})

const QueryType = new GraphQLObjectType({
	name: 'Query',
	fields: {
		todos: {
			type: new GraphQLList(CategoryType),
			description: 'Show Todos with categories',
			/*args: {
				id: {
					name : 'Todo id',
					type: GraphQLInt,
				}
			},*/
			resolve: (root, { id }) => {
				return TODOs //.filter((todo: Todo) => !id || todo.id == id)
			}
		}
	}
})

/*
const MutationAddType = new GraphQLObjectType({
	name: 'Mutation',
	fields: {
		add: {
			type: new GraphQLList(TodoType),
			description: 'Add a Todo',
			args: {
				title: {
					name : 'Todo title',
					type: new GraphQLNonNull(GraphQLString)
				}
			},
			resolve: (root, { title }) => {
				// Inc the ID
				count += 1;

				// Add a new Todo
				TODOs.push({
					id: count,
					title: title,
					completed: false
				})

				// Return all the Todos
				return TODOs
			}
		}
	}
}) */

export default new GraphQLSchema({
	query: QueryType,
	//mutation: MutationAddType
});


// Test 2
/*let count = 0

let schema = new GraphQLSchema({
	query: new GraphQLObjectType({
		name: 'Counter',
		fields: {
			count: {
				type: GraphQLInt,
				description: 'The count!',
				resolve: () => {
						console.info("Appel de query Counter");
						return count;
				}
			}
		}
	}),
	mutation: new GraphQLObjectType({
		name: 'CounterUpdate',
		fields: {
			updateCount: {
				type: GraphQLInt,
				description: 'Updates the count',
				resolve: function() {
					count += 1;
					return count;
				}
			}
		}
	})
});

export default schema;*/