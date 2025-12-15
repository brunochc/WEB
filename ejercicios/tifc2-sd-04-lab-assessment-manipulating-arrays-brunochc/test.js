//crea los test para las funciones de cada archivo: task1.js, task2.js, task3.js, task4.js

const  task1  = require('./task1.js');
const  task2  = require('./task2');
const  task3  = require('./task3');
const  task4  = require('./task4');

// 1. Use the `arr.push()` method to populate an empty array with the numbers 1 to 20, in order.

// 2. Use the `arr.reverse()` method to reverse the order of the given array.

// 3. Use the `arr.splice()` method to insert the missing number in the given array at the correct position.

// 4. Use the `arr.splice()` method to delete one of the two duplicate numbers in the given array.

describe('task1', () => {
    it('should print each number from 1 to 20', () => {
        const arr = [];
        console.log = jest.fn(); // Espiar la función console.log
        task1(arr);
        const expectedArr = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];
        expectedArr.forEach((value, index) => {
            expect(console.log).toHaveBeenNthCalledWith(index + 1, value); // Verificar si console.log fue llamado con el valor correcto
        });
    });
});

describe('task2', () => {
    it('should print each number from the array in reverse order', () => {
        const arr = [1, 2, 3, 4, 5];
        console.log = jest.fn(); // Espiar la función console.log
        task2(arr);
        const expectedArr = [5, 4, 3, 2, 1];
        expectedArr.reverse().forEach((value, index) => {
            expect(console.log).toHaveBeenNthCalledWith(index + 1, value); // Verificar si console.log fue llamado con el valor correcto
        });
    });
});

describe('task3', () => {
    it('should print each number from the array, including the missing number', () => {
        const arr = [1, 2, 3, 4, 6, 7, 8, 9, 10];
        console.log = jest.fn(); // Espiar la función console.log
        task3(arr);
        const expectedArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        expectedArr.forEach((value, index) => {
            expect(console.log).toHaveBeenNthCalledWith(index + 1, value); // Verificar si console.log fue llamado con el valor correcto
        });
    });
});

describe('task4', () => {
    it('should print each number from the array, with one of the duplicate numbers removed', () => {
        const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10];
        console.log = jest.fn(); // Espiar la función console.log
        task4(arr);
        const expectedArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        expectedArr.forEach((value, index) => {
            expect(console.log).toHaveBeenNthCalledWith(index + 1, value); // Verificar si console.log fue llamado con el valor correcto
        });
    });
});








