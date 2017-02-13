const models = {
	'small' : [
		{col: 1, row: 0, next: 1},
		{col: 0, row: 0, next: 2},
		{col: 0, row: 1, next: 3},
		{col: 0, row: 2, next: 4},
		{col: 1, row: 1, next: 5, parents: [0]},
		{col: 2, row: 0, next: 0, parents: [0, 1]},
	],

	'standard' : [
		{col: 1, row: 0, next: 1},
		{col: 0, row: 0, next: 2},
		{col: 0, row: 1, next: 3},
		{col: 0, row: 2, next: 4},
		{col: 0, row: 3, next: 5},
		{col: 1, row: 2, next: 6},
		{col: 2, row: 1, next: 7},
		{col: 3, row: 0, next: 8},
		{col: 2, row: 0, next: 0, parents: [0, 1, 2]},

		// {col: 1, row: 1, next: 10},
		// {col: 2, row: 1, next: 10},
	],

	'bigger': [
		{col: 1, row: 0, next: 1},
		{col: 0, row: 0, next: 2},
		{col: 0, row: 1, next: 3},
		{col: 0, row: 2, next: 4},
		{col: 0, row: 3, next: 5},
		{col: 0, row: 4, next: 6},
		{col: 1, row: 3, next: 7},
		{col: 2, row: 2, next: 8},
		{col: 3, row: 1, next: 9},
		{col: 4, row: 0, next: 10},
		{col: 3, row: 0, next: 11},
		{col: 2, row: 0, next: 0, parents: [0, 1, 2]},
	],

	'loop' : [
		{col: 1, row:  0, next: 1},
		{col: 0, row:  0, next: 2},
		{col: 0, row:  1, next: 3},
		{col: 0, row:  2, next: 4},
		{col: 0, row:  3, next: 5},
		{col: 1, row:  2, next: 6},
		{col: 2, row:  1, next: 7},
		{col: 3, row:  0, next: 8},
		{col: 4, row: -1, next: 9},
		{col: 5, row: -2, next: 10},
		{col: 6, row: -3, next: 11},
		{col: 6, row: -2, next: 12},
		{col: 6, row: -1, next: 13},
		{col: 6, row:  0, next: 14},
		{col: 5, row:  0, next: 15},
		{col: 4, row:  0, next: 16},
		{col: 3, row:  0, next: 17},
		{col: 2, row:  0, next: 0, parents: [0, 1, 2]},
	],

	'loop2' : [
		{col: 1, row:  0, next: 1},
		{col: 0, row:  0, next: 2},
		{col: 0, row:  1, next: 3},
		{col: 0, row:  2, next: 4},
		{col: 0, row:  3, next: 5},
		{col: 1, row:  2, next: 6},
		{col: 2, row:  1, next: 7},
		{col: 3, row:  0, next: 8},
		{col: 4, row: -1, next: 9},
		{col: 5, row: -2, next: 10},
		{col: 6, row: -3, next: 11},
		{col: 6, row: -2, next: 12},
		{col: 6, row: -1, next: 13},
		{col: 6, row:  0, next: 14},
		{col: 5, row:  0, next: 15, parents: [6, 7, 8]},
		{col: 4, row:  0, next: 16, parents: [5, 6, 7, 8]},
		{col: 3, row:  0, next: 17, parents: [5, 6, 7, 8]},
		{col: 2, row:  0, next: 0, parents: [0, 1, 2, 5, 6, 7]},
	],

	'hexSmall': [
		{col: -1, row:  0, next:  1},
		{col: -2, row:  0, next:  2},
		{col: -1, row: -1, next:  3},
		{col:  0, row: -2, next:  4},
		{col:  0, row: -1, next:  5},
		{col:  0, row:  0, next:  6},
		{col:  0, row:  1, next:  7},
		{col:  0, row:  2, next:  8},
		{col: -1, row:  2, next:  9},
		{col: -2, row:  2, next: 10},
		{col: -1, row:  1, next: 11},
		{col:  0, row:  0, next: 12},
		{col:  1, row: -1, next: 13},
		{col:  2, row: -2, next: 14},
		{col:  2, row: -1, next: 15},
		{col:  2, row:  0, next: 16},
		{col:  1, row:  0, next: 17},
		{col:  0, row:  0, next:  0, parents: [0, 1, 3]},
	],

	'hex': [
		{col: -2, row:  0, next:1 },
		{col: -3, row:  0, next:2 },
		{col: -2, row: -1, next:3 },
		{col: -1, row: -2, next:4 },
		{col:  0, row: -3, next:5 },
		{col:  0, row: -2, next:6 },
		{col:  0, row: -1, next:7 },

		{col:  0, row:  0, next:8 },
		{col:  0, row:  1, next:9 },
		{col:  0, row:  2, next:10 },
		{col:  0, row:  3, next:11 },
		{col: -1, row:  3, next:12 },
		{col: -2, row:  3, next:13 },
		{col: -3, row:  3, next:14 },
		{col: -2, row:  2, next:15 , parents: [6, 7, 8]},
		{col: -1, row:  1, next:16 , parents: [6, 7, 8]},

		{col:  0, row:  0, next:17 , parents: [5, 6, 7, 8]},
		{col:  1, row: -1, next:18 , parents: [5, 6, 7]},


		{col:  2, row: -2, next:19 },
		{col:  3, row: -3, next:20 },
		{col:  3, row: -2, next:21 },
		{col:  3, row: -1, next:22 },
		{col:  3, row:  0, next:23 },




		{col:  2, row:  0, next:24 , parents: [15, 16, 17,  6, 7, 8]},
		{col:  1, row:  0, next:25 , parents: [14, 15, 16, 17,  5, 6, 7, 8]},

		{col:  0, row:  0, next:26 , parents: [14, 15, 16, 17, 5, 6, 7, 8]},
		{col: -1, row:  0, next:0 , parents: [14, 15, 0, 1, 2, 5, 6, 7]},



	]
}

export default models