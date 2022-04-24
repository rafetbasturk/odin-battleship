import { domElements } from "./dom"

const uiController = (() => {

  return {
    disableBoard: (name) => {
      const disable = domElements.disableBoard(name)
      document.querySelector(`.${name}-area`).appendChild(disable)
    },
    enableBoard: (name) => {
      const disable = document.getElementsByClassName(`${name} disable`)[0]
      document.querySelector(`.${name}-area`).removeChild(disable)
    },
    showMessage: (message) => {
      document.querySelector(".message").textContent = message
    },
    markAttack: (board, fire, cell) => {
      const target = board[fire[0]][fire[1]]
      if (!target.hasShip) {
        cell.innerHTML = ""
        cell.appendChild(domElements.missedAttackDOM())
      }
      else {
        if (cell.childElementCount) {
          if (cell.firstChild.classList.contains("ship") && cell.childElementCount === 1) {
            cell.insertAdjacentElement("beforeend", domElements.hitDOM())
          }
        }
        else {
          cell.appendChild(domElements.hitDOM())
        }
      }
    },
    showShips: (array, name) => {
      const shipsDOM = array.map(el => {
        const { length, startCoord, alignment, id } = el
        return domElements.getShipsDOM(length, startCoord, alignment, id)
      })
      document.querySelectorAll(`.${name} .cells`).forEach(cell => {
        shipsDOM.forEach(ship => {
          const { startCoord, shipDOM } = ship
          if ((cell.dataset.x == startCoord[0]) && (cell.dataset.y == startCoord[1])) {
            cell.appendChild(shipDOM)
          }
        })
      });
    },
    removeShips: (name) => {
      document.querySelectorAll(`.${name} .ship`).forEach(ship => ship.remove())
    },
    loadDOM: () => {
      document.body.appendChild(domElements.header)
      document.body.appendChild(domElements.main)
      document.body.appendChild(domElements.form)
      document.body.appendChild(domElements.footer)
    },
    toggleBtns: () => {
      document.querySelector(".start").classList.toggle("hidden")
      document.querySelector(".reset").classList.toggle("hidden")
    },
    createGrid: (name) => {
      const grid = domElements.grid(name)
      if (name !== "computer") {
        domElements.main.firstChild.appendChild(grid)
      }
      else {
        domElements.main.lastChild.appendChild(grid)
      }
    },
  }
})()

export { uiController }