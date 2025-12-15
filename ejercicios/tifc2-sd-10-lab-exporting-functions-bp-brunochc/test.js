

import * as task1 from "./task1.js";
import * as task2 from "./task2.js";
import * as task3 from "./task3.js";
import * as task4 from "./task4.js";
import * as task5 from "./task5.js";
import * as task6 from "./task6.js";
import * as task7 from "./task7.js";

const today = new Date();

describe('calculatePayment', () => {
    it('calcula correctamente el costo de los pagos mensuales', () => {
      const input = 100; // cantidad de la transacción
      const expectedOutput = 100 * 0.01 + 3 + 100; // 1% de interés, $3 de tarifa y el monto original
      const result = task1.costCalculator(input);
      expect(result).toBe(expectedOutput);
    });
  });
  describe('Friends', () => {
    it('crea un objeto con los nombres de tres amigos', () => {
      const friends = new task2.FriendNames('Juan', 'Ana', 'Pedro');
      expect(friends.name1).toBe('Juan');
      expect(friends.name2).toBe('Ana');
      expect(friends.name3).toBe('Pedro');
    });
  });
  
  describe('ageCalculator', () => {
    it('calcula la edad a partir de una fecha de nacimiento', () => {
      const age = task3.ageCalculator(2000, 12, 25);
      const expectedAge = today.getFullYear() - 2000 - 1; // -1 porque aún no es 25 de diciembre
      expect(age).toBe(expectedAge);
    });
  });
  
  describe('Friend', () => {
    it('calcula la edad de un amigo y devuelve una cadena con su nombre y edad', () => {
      const friend = new task4.FriendAge('Juan', 1990, 1, 1);
      const expectedString = `Juan is ${today.getFullYear() - 1990} today!`;
      expect(friend.returnAge()).toBe(expectedString);
    });
  });
  
  describe('Puntuaciones de rubric', () => {
    it('devuelve "Fail" para puntuaciones menores a 5', () => {
      expect(task5.rubricPassFail(4)).toBe('Fail');
      expect(task5.rubricPassFail(0)).toBe('Fail');
    });
  
    it('devuelve "Pass" para puntuaciones de 5 a 11', () => {
      expect(task5.rubricPassFail(5)).toBe('Pass');
      expect(task5.rubricPassFail(11)).toBe('Pass');
    });
  
    it('devuelve "Excellent" para puntuaciones de 9 o mas', () => {
      expect(task6.rubricExcellent(9)).toBe('Excellent');
      expect(task6.rubricExcellent(10)).toBe('Excellent');
    });
  
    it('devuelve "Perfect" para una puntuación de 11', () => {
      expect(task7.rubricPerfect(11)).toBe('Perfect');
    });
  });