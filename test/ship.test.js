import { Ship } from "../src/components/factories/Ship"

describe("SHIP METHODS", () => {
  let testShip, testShip2;
  beforeEach(() => {
    testShip = Ship(0, 3, [[0, 1], [0, 2], [0, 3]])
    testShip2 = Ship(1, 2, [[2, 0], [2, 1]])
  })
  it("creates ship coordinates", () => {
    expect(testShip.coordinates).toEqual([
      { x: 0, y: 1, hit: false },
      { x: 0, y: 2, hit: false },
      { x: 0, y: 3, hit: false }
    ])
    expect(testShip2.coordinates).toEqual([
      { x: 2, y: 0, hit: false },
      { x: 2, y: 1, hit: false }
    ])
  })
  it("ships take hit", () => {
    testShip.isHit([0, 1])
    testShip.isHit([0, 2])
    expect(testShip.coordinates[0].hit).toBeTruthy()
    expect(testShip.coordinates[1].hit).toBeTruthy()
    expect(testShip.coordinates[2].hit).toBeFalsy()
  })
  it("ship is sunk when all coordinates hit", () => {
    testShip.isHit([0, 1])
    testShip.isHit([0, 2])
    testShip.isHit([0, 3])
    testShip2.isHit([2, 0])
    testShip2.isHit([2, 2])
    expect(testShip.isSunk()).toBeTruthy()
    expect(testShip2.isSunk()).toBeFalsy()
  })
})