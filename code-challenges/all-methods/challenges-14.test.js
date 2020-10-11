'use strict';

/* ------------------------------------------------------------------------------------------------
CHALLENGE 1

Write a function named toTitleCase that takes in an array of strings and returns an array of strings with the first character in upper case and the rest as is.

For example, ['apple', 'banana', macGyver'] returns ['Apple', 'Banana', 'MacGyver'].
------------------------------------------------------------------------------------------------ */

const toTitleCase = arr => {
	return arr.map(str => {
		return str.slice(0, 1).toUpperCase() + str.slice(1, str.length);
	});
};

/* ------------------------------------------------------------------------------------------------
CHALLENGE 2

Write a function named biggerThanLuke that, given the Star Wars data, below, returns the names of the characters whose mass is greater than Luke's.

The names should be combined into a single string with each character name separated by a dash.

For example, "Lando Calrisian - Boba Fett - Princess Amidala".
------------------------------------------------------------------------------------------------ */

let starWarsData = [
	{
		name: 'Luke Skywalker',
		height: '172',
		mass: '77',
		hair_color: 'blond',
		skin_color: 'fair',
		eye_color: 'blue',
		birth_year: '19BBY',
		gender: 'male',
	},
	{
		name: 'C-3PO',
		height: '167',
		mass: '75',
		hair_color: 'n/a',
		skin_color: 'gold',
		eye_color: 'yellow',
		birth_year: '112BBY',
		gender: 'n/a',
	},
	{
		name: 'R2-D2',
		height: '96',
		mass: '32',
		hair_color: 'n/a',
		skin_color: 'white, blue',
		eye_color: 'red',
		birth_year: '33BBY',
		gender: 'n/a',
	},
	{
		name: 'Darth Vader',
		height: '202',
		mass: '136',
		hair_color: 'none',
		skin_color: 'white',
		eye_color: 'yellow',
		birth_year: '41.9BBY',
		gender: 'male',
	},
	{
		name: 'Leia Organa',
		height: '150',
		mass: '49',
		hair_color: 'brown',
		skin_color: 'light',
		eye_color: 'brown',
		birth_year: '19BBY',
		gender: 'female',
	},
	{
		name: 'Pex Kylar',
		height: '180',
		mass: '190',
		hair_color: 'orange',
		skin_color: 'brown',
		eye_color: 'none',
		birth_year: '27BBY',
		gender: 'n/a',
	},
];

let biggerThanLuke = arr => {
	let luke = parseInt(starWarsData[0].mass);
	let result = [];
	arr.forEach(character => {
		let weight = parseInt(character.mass);
		if (typeof weight === 'number') {
			if (weight > luke) {
				result.push(character.name);
			}
		} else {
			return 'undefined mass';
		}
	});
	return result.join(' - ');
};

/* ------------------------------------------------------------------------------------------------
CHALLENGE 3
Write a function named sortBy that takes in an array of objects, each of which has a particular property, and sorts those objects by that property, lowest to highest, returning the same array.

Here is an example of the input:
[
  {name: 'Sweatshirt', price: 45},
  {name: 'Bookmark', price: 2.50},
  {name: 'Tote bag', price: 15}
];

This data could be sorted by name or price.
------------------------------------------------------------------------------------------------ */

const sortBy = (property, arr) => {
	return arr.sort((v, v2) =>
		typeof v[property] === 'string' || v[property] instanceof String
			? v[property].localeCompare(v2[property])
			: v[property] - v2[property]
	);
};

/* ------------------------------------------------------------------------------------------------
CHALLENGE 4

Write a function that determines if a given URL is secure, beginning with https://

Guard against malformed URLs, such as: https:missing-slashes.bad

For example:
http://www.insecure.com returns false because the URL is not secure
https://secure.com returns true because the URL is secure
https:/missingslash.org returns false because the URL is malformed
------------------------------------------------------------------------------------------------ */

const isSecure = url => {
	return url.substr(0, 8) === 'https://';
};

/*
This one to check the postfix as well

const isSecure = (url) => {
  let prefix = url.substr(0, 8);
  let postfix = url.substr(url.length - 4, url.length);
  return prefix === 'https://' && (postfix === '.net' || postfix === '.com' || postfix === '.org');
};
*/

/* ------------------------------------------------------------------------------------------------
CHALLENGE 5 - Stretch Goal

Write a function named detectTicTacToeWin that accepts a two-dimensional array of strings. Each string is guaranteed to be either "X", "O" or an empty string. Your function should check to see if any row, column, or either diagonal direction has three matching "X" or "O" symbols (non-empty strings), three-in-a-line.

This function should return either true or false to indicate if someone won the game.

Instead of trying to write crazy for loops to automate checking the rows, columns and diagonals consider writing one helper function that accepts three coordinate pairs and checks the values of the array at those locations. For instance helpCheck(row1, col1, row2, col2, row3, col3).

Your function does not need to work for boards of any size other than 3x3.

Here is a sample board:
[
  ['X', '', 'O'],
  ['X', 'O', ''],
  ['X', 'O', 'X'],
];
------------------------------------------------------------------------------------------------ */

const detectTicTacToeWin = b => {
	let iv1m = true; // initial value match 1 diagonal
	let iv2m = true; // initial  value match 2 diagonal
	let ivhm = false; // initial value horizontal match
	let ivvm = false; // initial value vertical match
	let hFlag = false; // short circuit flag for horizontal
	let vFlag = false; // short circuit flag vertical
	let iv1 = b[0][0]; // initial value diagonal top left
	let iv2 = b[b.length - 1][0]; // initial value diagonal top right
	let i = 0; // index move left to right
	let j = b.length - 1; // index move right to left
	while (i < b.length && j >= 0) {
		// sliding window close together same rate
		// diagonal top right to bottom left
		if (b[j][i] && b[j][i] !== iv2) iv2m = false;
		// diagonal top left to bottom right
		if (b[i][i] && b[i][i] !== iv1) iv1m = false;
		for (let k = 1; k < b.length; k++) {
			// check horizontal
			if (b[i][0] && !hFlag) {
				if (b[i][k] && b[i][k] === b[i][0]) {
					ivhm = true;
				} else {
					ivhm = false;
					hFlag = true;
				}
			}
			// check vert
			if (b[0][i] && !ivvm && !vFlag) {
				if (b[k][i] && b[k][i] === b[0][i]) {
					ivvm = true;
				} else {
					ivvm = false;
					vFlag = true;
				}
			}
		}
		i++;
		j--;
		hFlag = false;
		vFlag = false;
	}
	console.log(iv1m, iv2m, ivhm, ivvm);
	return iv1m || iv2m || ivhm || ivvm;
};

/* ------------------------------------------------------------------------------------------------
TESTS

All the code below will verify that your functions are working to solve the challenges.

DO NOT CHANGE any of the below code.

Run your tests from the console: jest challenge-14.test.js

------------------------------------------------------------------------------------------------ */

// describe('Testing challenge 1', () => {
// 	test('It should convert each word to title case', () => {
// 		const words = ['apple', 'banana', 'MacGyver'];
// 		expect(toTitleCase(words)).toStrictEqual(['Apple', 'Banana', 'MacGyver']);

// 		expect(toTitleCase([])).toStrictEqual([]);
// 	});
// });

// describe('Testing challenge 2', () => {
// 	test('It should return only characters that are bigger than Luke', () => {
// 		expect(biggerThanLuke(starWarsData)).toStrictEqual(
// 			'Darth Vader - Pex Kylar'
// 		);
// 		expect(biggerThanLuke([])).toStrictEqual('');
// 	});
// });

// describe('Testing challenge 3', () => {
// 	test('It should sort items by a price', () => {
// 		expect(
// 			sortBy('price', [
// 				{ name: 'Sweatshirt', price: 45 },
// 				{ name: 'Bookmark', price: 2.5 },
// 				{ name: 'Tote bag', price: 15 },
// 			])
// 		).toStrictEqual([
// 			{ name: 'Bookmark', price: 2.5 },
// 			{ name: 'Tote bag', price: 15 },
// 			{ name: 'Sweatshirt', price: 45 },
// 		]);
// 	});

// 	test('It should sort items by name', () => {
// 		expect(
// 			sortBy('name', [
// 				{ name: 'Sweatshirt', price: 45 },
// 				{ name: 'Bookmark', price: 2.5 },
// 				{ name: 'Tote bag', price: 15 },
// 			])
// 		).toStrictEqual([
// 			{ name: 'Bookmark', price: 2.5 },
// 			{ name: 'Sweatshirt', price: 45 },
// 			{ name: 'Tote bag', price: 15 },
// 		]);
// 	});
// });

// describe('Testing challenge 4', () => {
// 	test('It should check if url is https', () => {
// 		expect(isSecure('http://www.insecure.com')).toBe(false);
// 		expect(isSecure('https://secure.com')).toBe(true);
// 		expect(isSecure('https:/missingslash.org')).toBe(false);
// 	});
// });

/**********/

describe('Testing challenge 5', () => {
	test('It should return true if there are three in a column', () => {
		expect(
			detectTicTacToeWin([
				['X', '', 'O'],
				['X', 'O', ''],
				['X', 'O', 'X'],
			])
		).toStrictEqual(true);
	});

	test('It should return true if there are three in a row', () => {
		expect(
			detectTicTacToeWin([
				['', '', 'O'],
				['X', 'O', ''],
				['X', 'X', 'X'],
			])
		).toStrictEqual(true);
	});

	test('It should return true for diagonals top right bottom left', () => {
		expect(
			detectTicTacToeWin([
				['O', '', 'X'],
				['X', 'X', 'O'],
				['X', '', 'O'],
			])
		).toStrictEqual(true);
	});

	test('It should return true for diagonals top left bottom right', () => {
		expect(
			detectTicTacToeWin([
				['O', '', 'X'],
				['X', 'O', 'O'],
				['X', '', 'O'],
			])
		).toStrictEqual(true);
	});

	test('It should return true for diagonals top left bottom right 5x5', () => {
		expect(
			detectTicTacToeWin([
				['O', 'O', 'X', 'O', 'X'],
				['X', 'O', 'O', 'X', 'O'],
				['X', 'T', 'O', 'X', 'X'],
				['X', 'X', 'O', 'O', 'X'],
				['X', 'M', 'O', 'X', 'O'],
			])
		).toStrictEqual(true);
	});

	test('It should return true for diagonals top right bottom left 5x5', () => {
		expect(
			detectTicTacToeWin([
				['O', 'O', 'X', 'O', 'X'],
				['X', 'O', 'O', 'X', 'O'],
				['X', 'T', 'X', 'X', 'X'],
				['X', 'X', 'O', 'O', 'X'],
				['X', 'M', 'O', 'X', 'O'],
			])
		).toStrictEqual(true);
	});

	test('It should return true for columns 5x5', () => {
		expect(
			detectTicTacToeWin([
				['O', 'O', 'O', 'O', 'X'],
				['O', 'O', 'O', 'X', 'O'],
				['O', 'T', 'O', 'X', 'X'],
				['O', 'X', 'O', 'O', 'X'],
				['X', 'M', 'O', 'X', 'O'],
			])
		).toStrictEqual(true);
	});

	test('It should return true for rows 5x5', () => {
		expect(
			detectTicTacToeWin([
				['O', 'O', 'O', 'O', 'O'],
				['O', 'O', 'O', 'X', 'O'],
				['O', 'T', 'O', 'X', 'X'],
				['O', 'X', 'O', 'O', 'X'],
				['X', 'M', 'O', 'X', 'O'],
			])
		).toStrictEqual(true);
	});

	test('It should not treat empty 3 in row as winner', () => {
		expect(
			detectTicTacToeWin([
				['', '', ''],
				['O', 'O', ''],
				['X', 'O', 'X'],
			])
		).toEqual(false);
	});
});

test('It should return false if there are not three in a row', () => {
	expect(
		detectTicTacToeWin([
			['X', '', 'O'],
			['O', 'O', ''],
			['X', 'O', 'X'],
		])
	).toStrictEqual(false);
});
