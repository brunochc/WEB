
const task1 = require("./task1.js");
const task2 = require("./task2");
const task3 = require('./task3')
const task4 = require('./task4')

describe("Test de tarea de objetos", () => {
  it("should log the new mail object with subject and message", () => {
    const consoleSpy = jest.spyOn(console, "log");
    const subject = "hello";
    const message = "world";
    task1(subject, message);
    expect(consoleSpy).toHaveBeenCalledWith(`${subject}: ${message}`);
    consoleSpy.mockRestore();
  });
  it("should log the new mail object where the user provides their own subject and message", () => {
 
    const consoleSpy = jest.spyOn(console, "log");
    const subject = "Test Subject";
    const message = "Test Message";

    jest.mock("prompt-sync", () => {
      return () => {
        return jest
          .fn()
          .mockReturnValueOnce(subject)
          .mockReturnValueOnce(message);
      };
    });

    task2();
    expect(consoleSpy).toHaveBeenCalledWith(`${subject}: ${message}`);
    consoleSpy.mockRestore();
  });
    it("Modify the code so that the user provides their own subject and message as execution parameters in that order", () => {
         
      const consoleSpy = jest.spyOn(console, "log");
      const subject = "Test Subject";
      const message = "Test Message";
  
      jest.mock("prompt-sync", () => {
        return () => {
          return jest
            .fn()
            .mockReturnValueOnce(subject)
            .mockReturnValueOnce(message);
        };
      });
  
      task3();
      expect(consoleSpy).toHaveBeenCalledWith(`${subject}: ${message}`);
      consoleSpy.mockRestore();
    });
    it("Create a pair of constants called from and to, and assign them the values from the command line arguments", () => {
         
        const consoleSpy = jest.spyOn(console, "log");
        const from = "Machali";
        const to = "Santiago";
    
        jest.mock("prompt-sync", () => {
          return () => {
            return jest
              .fn()
              .mockReturnValueOnce(from)
              .mockReturnValueOnce(to);
          };
        });
    
        task4();
        expect(consoleSpy).toHaveBeenCalledWith(`Booking a taxi from ${from} to ${to}.`);
        consoleSpy.mockRestore();
      });
      afterEach(() => {
        jest.resetModules();
    });
});

