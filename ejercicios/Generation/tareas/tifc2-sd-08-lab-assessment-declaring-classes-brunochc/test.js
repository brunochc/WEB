
import * as task1 from "./task1.js";
import * as task2 from "./task2.js";
import * as task3 from "./task3.js";
import * as task4 from "./task4.js";

// test con 
describe("task1", () => {
    test("Player class is defined", () => {
        expect(task1.Player).toBeDefined();
    });
    test("Player class accepts name as argument and sets it as property", () => {
        const playerName = "Test Player";
        const player = new task1.Player(playerName);
        expect(player.name).toBe(playerName);
    });
    });

describe("task2", () => {
    test("Player class is defined", () => {
        expect(task2.Player).toBeDefined();
    });
    test("Player class accepts name and level as arguments and sets them as properties", () => {
        const playerName = "Test Player";
        const playerLevel = 5;
        const player = new task2.Player(playerName, playerLevel);
        expect(player.name).toBe(playerName);
        expect(player.level).toBe(playerLevel);
    });

    }
);

describe("task3", () => {
    test("Player class is defined", () => {
        expect(task3.Player).toBeDefined();
    });

    test("Player class accepts name and level as arguments and sets them as properties", () => {
        const playerName = "Test Player";
        const playerLevel = 5;
        const player = new task3.Player(playerName, playerLevel);
        expect(player.name).toBe(playerName);
        expect(player.level).toBe(playerLevel);
    });

    test("Player class info method prints correct message", () => {
        const playerName = "Tara";
        const playerLevel = 6;
        const player = new task3.Player(playerName, playerLevel);
        console.log = jest.fn();
        player.info();
        expect(console.log).toHaveBeenCalledWith(`${playerName} has reached Level ${playerLevel}!`);
    });
});

describe("task4", () => {
    test("Player class is defined", () => {
        expect(task4.Player).toBeDefined();
    });

    test("Player class accepts name and level as arguments and sets them as properties", () => {
        const playerName = "Test Player";
        const playerLevel = 5;
        const player = new task4.Player(playerName, playerLevel);
        expect(player.name).toBe(playerName);
        expect(player.level).toBe(playerLevel);
    });

    test("Player class info method prints correct message", () => {
        const playerName = "Tara";
        const playerLevel = 6;
        const player = new task4.Player(playerName, playerLevel);
        console.log = jest.fn();
        player.info();
        expect(console.log).toHaveBeenCalledWith(`${playerName} has reached Level ${playerLevel}!`);
    });

    test("Player class levelUp method increments level", () => {
        const playerName = "Tara";
        const playerLevel = 6;
        const player = new task4.Player(playerName, playerLevel);
        player.levelUp();
        expect(player.level).toBe(playerLevel + 1);
    });
});


