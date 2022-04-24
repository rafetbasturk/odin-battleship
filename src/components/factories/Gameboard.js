import { Ship } from "./Ship"

const Gameboard = () => {
  let board = Array(10).fill().map(() => Array(10).fill({ hasShip: false }))

  return {
    getBoard: () => board,
    removeBoard: () => {
      board = Array(10).fill().map(() => Array(10).fill({ hasShip: false }))
    },
    placeShip: (id, length, coordinates) => {
      const ship = Ship(id, length, coordinates)

      coordinates.forEach(el => {
        board[el[0]][el[1]] = {
          hasShip: true,
          ship
        }
      });
    },
    receiveAttack: (fire) => {
      const x = fire[0]
      const y = fire[1]

      if (board[x][y].hasShip) {
        board[x][y].ship.isHit(fire)
      }
      else {
        board[x][y] = { 
          ...board[x][y],
          missedShot: true
        }
      }

    },
    checkResult: () => {
      return board
        .flat()
        .filter(el => el.hasShip)
        .map(el => el.ship)
        .every(el => el.isSunk())
    }
  }
}

export { Gameboard }