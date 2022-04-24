import { Gameboard } from "../src/components/factories/Gameboard";

describe("GAMEBOARD", () => {
  const gameboard = Gameboard()
  let board = gameboard.getBoard()
  
  beforeEach(() => {
    gameboard.placeShip(0, 3, [[0, 1], [0, 2], [0, 3]])
    gameboard.receiveAttack([0, 1])
    gameboard.receiveAttack([0, 2])
    gameboard.receiveAttack([0, 3])
    gameboard.receiveAttack([1, 0])
  })
  it("places a ship", () => {
    expect(board[0][0].hasShip).toBeFalsy()
    expect(board[0][1].hasShip).toBeTruthy()
  })
  it("receives attack", () => {
    expect(board[0][1].ship.coordinates[0].hit).toBeTruthy()
  })
  it("records a missed shot", () => {
    expect(board[1][0].hasShip).toBeFalsy()
    expect(board[1][0].missedShot).toBeTruthy()
  })
  it("ship sinks if all positions hit", () => {
    expect(board[0][1].ship.isSunk()).toBeTruthy()
    expect(board[1][0].missedShot).toBeTruthy()
  })
  it("all ships are sunk", () => {
    gameboard.placeShip(1, 4, [[9, 6], [9, 7], [9, 8], [9, 9]])
    gameboard.receiveAttack([9, 6])
    gameboard.receiveAttack([9, 7])
    gameboard.receiveAttack([9, 8])
    gameboard.receiveAttack([9, 9])
    expect(gameboard.checkResult()).toBeTruthy()
  })
  it("removes board", () => {
    gameboard.removeBoard()
    expect(gameboard.getBoard()[0][1].hasShip).toBeFalsy()
  })
})