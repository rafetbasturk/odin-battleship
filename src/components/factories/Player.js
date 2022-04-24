import { createFleet } from "../helperFuncs"
import { Gameboard } from "./Gameboard"

const Player = (name) => {
  const board = Gameboard()
  const fleet = createFleet()

  return {
    name,
    board,
    fleet,
    attack: (board, fire) => {
      board.receiveAttack(fire)
    },
    placeFleet: (fleetArray) => {
      fleetArray.forEach(ship => {
        const { id, length, coordinates } = ship
        board.placeShip(id, length, coordinates)
      })
    }
  }
}

export { Player }