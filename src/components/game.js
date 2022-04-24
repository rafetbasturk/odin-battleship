import { uiController as ui } from "./uiController"
import { Player } from "./factories/Player"
import { randomize, boardCoords, targetCoords, droppedShip, checkAvailability } from "./helperFuncs"

const game = (() => {
  const p1 = Player("player")
  const p2 = Player("computer")
  ui.createGrid(p1.name)
  ui.createGrid(p2.name)

  const setGame = (fleet1, fleet2) => {
    p1.placeFleet(fleet1)
    p2.placeFleet(fleet2)
    ui.showShips(fleet1, p1.name)
  }

  const playerMove = e => {
    e.currentTarget.classList.add("fired")
    const x = Number(e.currentTarget.dataset.x)
    const y = Number(e.currentTarget.dataset.y)
    const fire = [x, y]
    p1.attack(p2.board, fire)

    const boardArray = p2.board.getBoard()

    let sunkShipIds = boardArray
      .flat()
      .filter(el => el.hasShip)
      .map(el => el.ship)
      .filter(ship => {
        if (ship.isSunk()) {
          return ship
        }
      })
      .map(ship => ship.id);

    sunkShipIds = [...new Set(sunkShipIds)]

    const sunkShips = p2.fleet.filter(ship => {
      for (let i = 0; i < sunkShipIds.length; i++) {
        if (sunkShipIds[i] === ship.id) {
          return ship
        }
      }
    })
    ui.removeShips(p2.name)
    ui.showShips(sunkShips, p2.name)


    if (boardArray[x][y].hasShip) {
      const ship = boardArray[x][y].ship
      const cells = [...document.querySelectorAll(`.${p2.name} .cells`)]
      const targets = targetCoords(ship, fire)

      targets.forEach(target => {
        cells.forEach(cell => {
          if (cell.dataset.x == target[0] && cell.dataset.y == target[1]) {
            cell.removeEventListener("click", playerMove)
            cell.classList.add("fired")
            ui.markAttack(boardArray, target, cell)
          }
        })
      })
    }
    else {
      ui.markAttack(boardArray, fire, e.currentTarget)
    }

    if (p2.board.checkResult()) {
      ui.showMessage("Game over! You win.")
      document.querySelectorAll(`.${p2.name} .cells`).forEach(cell => {
        cell.removeEventListener("click", playerMove)
      })
      ui.enableBoard(p1.name)
      return
    }

    ui.disableBoard(p2.name)
    ui.enableBoard(p1.name)
    ui.showMessage("Computer's turn")
    setTimeout(() => {
      aiMove()
    }, 300);
  }

  const allCoords = boardCoords()
  const aiMove = () => {
    const random = randomize(0, allCoords.length - 1)
    const fire = allCoords[random]
    p2.attack(p1.board, fire)

    const boardArray = p1.board.getBoard()

    if (boardArray[fire[0]][fire[1]].hasShip) {
      const ship = boardArray[fire[0]][fire[1]].ship
      const cells = [...document.querySelectorAll(`.${p1.name} .cells`)]

      const targets = targetCoords(ship, fire)

      targets.forEach(target => {
        const index = allCoords.findIndex(coord => coord[0] === target[0] && coord[1] === target[1])
        index >= 0 ? allCoords.splice(index, 1) : null

        cells.forEach(cell => {
          if (cell.dataset.x == target[0] && cell.dataset.y == target[1]) {
            ui.markAttack(boardArray, target, cell)
          }
        })
      })
    }
    else {
      allCoords.splice(random, 1)
      document.querySelectorAll(`.${p1.name} .cells`).forEach(cell => {
        Number(cell.dataset.x) === fire[0] && Number(cell.dataset.y) === fire[1]
          ? ui.markAttack(boardArray, fire, cell)
          : null
      })
    }

    if (p1.board.checkResult()) {
      ui.showMessage("Game over! Computer wins.")
      ui.enableBoard(p2.name)
      document.querySelectorAll(`.${p2.name} .cells`).forEach(cell => {
        cell.removeEventListener("click", playerMove)
      })
      return
    }

    ui.disableBoard(p1.name)
    ui.enableBoard(p2.name)
    ui.showMessage("Your turn")
  }

  const startGame = (e) => {
    e.preventDefault()
    ui.disableBoard(p1.name)
    ui.disableBoard(p2.name)
    ui.toggleBtns()
    document.querySelectorAll(`.${p2.name} > .cells`).forEach(cell => {
      cell.addEventListener("click", playerMove, { once: true })
    })
    const player = randomize(0, 1) === 0 ? p1 : p2
    if (player === p2) {
      ui.showMessage("Computer's turn")
      ui.enableBoard(p1.name)
      setTimeout(() => {
        aiMove()
      }, 500);
    }
    else {
      ui.showMessage("Your turn")
      ui.enableBoard(p2.name)
    }
  }

  const resetGame = (e) => {
    e.preventDefault
    ui.enableBoard(p1.name)
    ui.enableBoard(p2.name)
    ui.removeShips(p1.name)
    setGame(p1.fleet, p2.fleet)
  }

  const loadEventListeners = () => {
    document.querySelectorAll(`.${p1.name} .ship`).forEach(ship => {
      ship.addEventListener("dragstart", dragStart)
      ship.addEventListener("dragend", dragEnd)
      ship.addEventListener("click", alignShip)
    })

    document.querySelectorAll(`.${p1.name} > .cells`).forEach(cell => {
      cell.addEventListener("dragover", dragOver)
      cell.addEventListener("drop", dragDrop)
    })

    document.querySelector(".start").addEventListener("click", startGame)
    document.querySelector(".reset").addEventListener("click", resetGame)
  }

  const dragStart = (e) => {
    e.target.classList.add("hold")
  }
  const dragEnd = (e) => {
    e.target.classList.remove("hold")
  }
  const dragOver = (e) => {
    e.preventDefault()
    const hold = document.querySelector(".hold")
    e.currentTarget.append(hold)
  }
  const dragDrop = () => {
    const cell = document.querySelector(".hold")
    const id = Number(cell.dataset.id)
    const x = Number(cell.parentElement.dataset.x)
    const y = Number(cell.parentElement.dataset.y)
    const coord = [x, y]

    let newShip
    p1.fleet = p1.fleet.map(ship => {
      if (id === ship.id) {
        const name = ship.name
        newShip = { id, name, ...droppedShip(ship.length, coord, ship.alignment) }
        const isValid = checkAvailability(p1.fleet, newShip)
        if (isValid) {
          return newShip
        }
        else {
          ui.showMessage("Not available!", "alarm")
          setTimeout(() => {
            ui.showMessage("Place the ships by dragging, change alignment by clicking")
          }, 1000);
          return ship;
        }
      }
      else {
        return ship
      }
    })

    p1.board.removeBoard()
    ui.removeShips(p1.name)
    p1.placeFleet(p1.fleet)
    ui.showShips(p1.fleet, p1.name)
    loadEventListeners()
  }

  const alignShip = (e) => {
    const id = Number(e.target.dataset.id)
    const x = Number(e.target.parentElement.dataset.x)
    const y = Number(e.target.parentElement.dataset.y)
    const coord = [x, y]

    let newShip
    p1.fleet = p1.fleet.map(ship => {
      if (id === ship.id) {
        const alignment = ship.alignment === "vertical" ? "horizontal" : "vertical"
        const name = ship.name
        newShip = { id, name, ...droppedShip(ship.length, coord, alignment) }
        const isValid = checkAvailability(p1.fleet, newShip)
        if (isValid) {
          return newShip
        }
        else {
          ui.showMessage("Not available!")
          setTimeout(() => {
            ui.showMessage("Place the ships by dragging, change alignment by clicking")
          }, 1000);
          return ship
        }
      }
      else {
        return ship
      }
    })

    p1.board.removeBoard()
    ui.removeShips(p1.name)
    setGame(p1.fleet, p2.fleet)
    loadEventListeners()
  }

  return {
    init: () => {
      ui.loadDOM()
      setGame(p1.fleet, p2.fleet)
      loadEventListeners()
    }
  }
})()

export { game }