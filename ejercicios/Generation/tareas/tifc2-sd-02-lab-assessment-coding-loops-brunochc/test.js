// crea los test para las tareas 1, 2, 3 y 4.

const  task1  = require("./task1.js");
const  task2 = require("./task2.js");
const task3 = require("./task3.js");
const  task4  = require("./task4.js");

describe("Task 1", () => {
    it('should print numbers from 1 to 105', () => {
        const consoleSpy = jest.spyOn(console, 'log');

        task1();

        for (let i = 0; i < 105; i++) {
            expect(consoleSpy.mock.calls[i][0]).toBe(i + 1);
        }

        // Limpiar el espía
        consoleSpy.mockRestore();
    });
});

describe("Task 2", () => {
    it('should print numbers from 1 to 105, replacing multiples of 3 with "Fizz"', () => {
        const consoleSpy = jest.spyOn(console, 'log');

        task2();

        for (let i = 0; i < 105; i++) {
            if ((i + 1) % 3 === 0) {
                expect(consoleSpy.mock.calls[i][0]).toBe('Fizz');
            } else {
                expect(consoleSpy.mock.calls[i][0]).toBe(i + 1);
            }
        }

        // Limpiar el espía
        consoleSpy.mockRestore();
    });
});

describe("Task 3", () => {
    it('should print numbers from 1 to 105, replacing multiples of 3 and 5 with "FizzBuzz"', () => {
        const consoleSpy = jest.spyOn(console, 'log');

        task3();

        for (let i = 0; i < 105; i++) {
            if ((i + 1) % 3 === 0 && (i + 1) % 5 === 0) {
                expect(consoleSpy.mock.calls[i][0]).toBe('FizzBuzz');
            } else if ((i + 1) % 3 === 0) {
                expect(consoleSpy.mock.calls[i][0]).toBe('Fizz');
            } else if ((i + 1) % 5 === 0) {
                expect(consoleSpy.mock.calls[i][0]).toBe('Buzz');
            } else {
                expect(consoleSpy.mock.calls[i][0]).toBe(i + 1);
            }
        }

        // Limpiar el espía
        consoleSpy.mockRestore();
    });
});

describe("Task 4", () => {
    it('should print numbers from 1 to 105, replacing multiples of 3, 5 and 7 with "FizzBuzzWoof"', () => {
        const consoleSpy = jest.spyOn(console, 'log');

        task4();

        for (let i = 0; i < 105; i++) {
            if ((i + 1) % 3 === 0 && (i + 1) % 5 === 0 && (i + 1) % 7 === 0) {
                expect(consoleSpy.mock.calls[i][0]).toBe('FizzBuzzWoof');
            } else if ((i + 1) % 3 === 0 && (i + 1) % 7 === 0) {
                expect(consoleSpy.mock.calls[i][0]).toBe('FizzWoof');
            } else if ((i + 1) % 5 === 0 && (i + 1) % 7 === 0) {
                expect(consoleSpy.mock.calls[i][0]).toBe('BuzzWoof');
            } else if ((i + 1) % 3 === 0 && (i + 1) % 5 === 0) {
                expect(consoleSpy.mock.calls[i][0]).toBe('FizzBuzz');
            } else if ((i + 1) % 3 === 0) {
                expect(consoleSpy.mock.calls[i][0]).toBe('Fizz');
            } else if ((i + 1) % 5 === 0) {
                expect(consoleSpy.mock.calls[i][0]).toBe('Buzz');
            } else if ((i + 1) % 7 === 0) {
                expect(consoleSpy.mock.calls[i][0]).toBe('Woof');
            } else {
                expect(consoleSpy.mock.calls[i][0]).toBe(i + 1);
            }
        }

        // Limpiar el espía
        consoleSpy.mockRestore();
    });
});
