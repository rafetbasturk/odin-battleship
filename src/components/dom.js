const domElements = (() => {

  //header
  const header = document.createElement("header")
  header.classList.add("header")
  const h1 = document.createElement("h1")
  h1.classList.add("logo")
  h1.textContent = "Battleship"
  header.appendChild(h1)
  const notifications = document.createElement("div")
  notifications.classList.add("notifications")
  header.appendChild(notifications)
  const message = document.createElement("p")
  message.classList.add("message")
  message.textContent = "Place the ships by dragging, change alignment by clicking"
  notifications.appendChild(message)

  //main
  const main = document.createElement("main")
  main.classList.add("main")

  const playerBoard = (name) => {
    const board = document.createElement("section")
    board.classList.add(`${name}-area`)
    const heading = document.createElement("h2")
    heading.textContent = `${name === "computer" ? "Computer Board" : "Player Board"}`
    const xCoords = document.createElement("div")
    xCoords.classList.add("x-coords")
    const xCoordLabels = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"]
    xCoordLabels.forEach(item => {
      const xName = document.createElement("span")
      xName.textContent = item
      xCoords.appendChild(xName)
    })
    const yCoords = document.createElement("div")
    yCoords.classList.add("y-coords")
    const yCoordLabels = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]
    yCoordLabels.forEach(item => {
      const yName = document.createElement("span")
      yName.textContent = item
      yCoords.appendChild(yName)
    })
    board.appendChild(xCoords)
    board.appendChild(yCoords)
    board.appendChild(heading)
    return board
  }

  main.appendChild(playerBoard("player"))
  main.appendChild(playerBoard("computer"))

  // form
  const form = document.createElement("form")
  form.classList.add("form")
  const btnStart = document.createElement("button")
  btnStart.classList.add("btn")
  btnStart.classList.add("start")
  btnStart.setAttribute("type", "submit")
  btnStart.textContent = "Start Game"
  form.append(btnStart)
  const btnReset = document.createElement("button")
  btnReset.classList.add("btn")
  btnReset.classList.add("reset")
  btnReset.classList.add("hidden")
  btnReset.setAttribute("type", "submit")
  btnReset.textContent = "Reset Game"
  form.append(btnReset)

  // footer
  const footer = document.createElement("footer")
  footer.classList.add("footer")

  footer.innerHTML = `
    <p>Coded by
      <a href="https://github.com/rafetbasturk" rel="noreferrer noopener" target="_blank">Rafet</a>
      -
      <a href="https://www.theodinproject.com/" rel="noreferrer noopener" target="_blank">The Odin Project</a>
    </p>
  `

  const grid = (name) => {
    const grid = document.createElement("div")
    grid.classList.add(name)
    grid.classList.add("grid")

    for (let i = 0; i < 100; i++) {
      const cell = document.createElement("div")
      cell.classList.add("cells")
      grid.style.gridTemplateColumns = `repeat(10, 3.2rem)`;
      grid.style.gridTemplateRows = `repeat(10, 3.2rem)`;
      grid.appendChild(cell)
    }

    grid.childNodes.forEach((cell, i) => {
      cell.setAttribute("data-x", i % 10);

      for (let y = 0; y < 10; y++) {
        if (i >= y * 10 && i < (y + 1) * 10) cell.setAttribute("data-y", y)
      }
    })
    return grid
  }

  const getShipsDOM = (length, startCoord, alignment, id) => {
    const shipDOM = document.createElement("div")
    shipDOM.classList.add("ship")
    shipDOM.setAttribute("draggable", "true")
    shipDOM.setAttribute("data-id", id)

    if (alignment === "horizontal") {
      shipDOM.style.width = `${(length * 3.2) - 0.1}rem`
      shipDOM.style.height = `3.1rem`
    }
    else {
      shipDOM.style.height = `${(length * 3.2) - 0.1}rem`
      shipDOM.style.width = `3.1rem`
    }
    return { startCoord, shipDOM }
  }

  const missedAttackDOM = () => {
    const missedAttack = document.createElement("div")
    missedAttack.classList.add("miss")
    const dot = document.createElement("span")
    dot.classList.add("dot")
    missedAttack.appendChild(dot)
    return missedAttack
  }

  const hitDOM = () => {
    const hit = document.createElement("div")
    hit.classList.add("hit")
    hit.innerHTML = "<span class='material-icons-outlined'>clear</span>"
    return hit
  }

  const disableBoard = (name) => {
    const disable = document.createElement("div")
    disable.classList.add(`${name}`)
    disable.classList.add("disable")
    return disable
  }

  return {
    header,
    main,
    form,
    footer,
    grid,
    getShipsDOM,
    missedAttackDOM,
    hitDOM,
    disableBoard
  }
})()


export { domElements }