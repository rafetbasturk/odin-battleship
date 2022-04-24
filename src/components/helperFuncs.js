const randomize = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
  // Min & Max are inclusive
}

const boardCoords = () => Array.from({ length: 10 }, (v, i) => {
  return Array.from({ length: 10 }, (a, j) => [i, j])
}).flat();

const occupiedCoords = (arr) => {
  let coords = []
  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      // if (i === 0 && j === 0) {
      //   null
      // }
      if (arr[0] + i < 0 || (arr[0] + i) > 9) {
        null
      }
      else if (arr[1] + j < 0 || (arr[1] + j) > 9) {
        null
      }
      else {
        coords = [...coords, [arr[0] + i, arr[1] + j]]
      }
    }
  }
  return [...coords]
}

const hitsBeforeSunk = (arr) => {
  const cells = [
    [arr[0] - 1, arr[1] - 1],
    [arr[0], arr[1]],
    [arr[0] - 1, arr[1] + 1],
    [arr[0] + 1, arr[1] - 1],
    [arr[0] + 1, arr[1] + 1],
  ].filter(item => item[0] >= 0 && item[1] >= 0)
    .filter(item => item[0] < 10 && item[1] < 10)
  return cells
}

const targetCoords = (ship, fire) => {
  let targets
  if (ship.length === 1 && ship.isSunk()) {
    targets = ship.coordinates.map(item => {
      return occupiedCoords([item.x, item.y]);
    })[0]
  }
  else if (ship.length > 1 && !ship.isSunk()) {
    targets = hitsBeforeSunk(fire)
  }
  else if (ship.length > 1 && ship.isSunk()) {
    targets = Array.from(new Set(ship.coordinates
      .map(item => occupiedCoords([item.x, item.y]))
      .flat()
      .map(JSON.stringify)), JSON.parse)
      .sort()
  }
  return targets
}

const allCells = (coordinates) => {
  return Array.from(new Set(coordinates
    .map(el => occupiedCoords(el))
    .flat()
    .map(JSON.stringify)), JSON.parse)
    .sort()
}


const startInfo = [
  {
    id: 0,
    name: "Carrier",
    length: 4
  },
  {
    id: 1,
    name: "Battleship",
    length: 3
  },
  {
    id: 2,
    name: "Cruiser",
    length: 3
  },
  {
    id: 3,
    name: "Submarine",
    length: 2
  },
  {
    id: 4,
    name: "Submarine",
    length: 2
  },
  {
    id: 5,
    name: "Destroyer",
    length: 1
  },
  {
    id: 6,
    name: "Destroyer",
    length: 1
  },
  {
    id: 7,
    name: "Destroyer",
    length: 1
  },
  {
    id: 8,
    name: "Destroyer",
    length: 1
  },
]

const createShipCoords = (array, length) => {
  let alignment
  let startCoord
  let coordinates = []
  let valid = false

  while (!valid) {
    valid = true
    alignment = randomize(0, 1) === 0 ? "vertical" : "horizontal"
    const random = randomize(0, array.length - 1)
    startCoord = array[random]
    if (alignment === "horizontal" && startCoord[0] + length > 9) {
      valid = false
    }
    else if (alignment === "vertical" && startCoord[1] + length > 9) {
      valid = false
    }
    else {
      let nextCoord
      for (let i = 0; i < length; i++) {
        if (alignment === "horizontal") {
          nextCoord = [startCoord[0] + i, startCoord[1]]
          coordinates = [...coordinates, nextCoord]
        }
        else {
          nextCoord = [startCoord[0], startCoord[1] + i]
          coordinates = [...coordinates, nextCoord]
        }
      }
    }
  }

  return {
    length,
    alignment,
    startCoord,
    coordinates
  }
}

const createFleet = () => {
  let availableCoords = boardCoords()
  let usedCoords = []
  const fleet = startInfo.map(info => {
    const id = info.id
    const name = info.name
    let ship
    let shipCoords
    let valid = false

    while (!valid) {
      valid = true
      ship = createShipCoords(availableCoords, info.length)
      const { coordinates } = ship
      shipCoords = allCells(coordinates)

      const overlap = ship.coordinates.some(el => {
        return usedCoords.some(coord => coord[0] === el[0] && coord[1] === el[1])
      })

      if (overlap) {
        valid = false
      }
      else {
        usedCoords = [...usedCoords, ...shipCoords]

        usedCoords.forEach(el => {
          const index = availableCoords.findIndex(coord => coord[0] === el[0] && coord[1] === el[1])
          index > -1
            ? availableCoords.splice(index, 1)
            : null
        })
        return { id, name, ...ship }
      }
    }

  })
  return fleet
}

const droppedShip = (length, startCoord, alignment) => {
  let coordinates = []
  let nextCoord
  for (let i = 0; i < length; i++) {
    if (alignment === "horizontal") {
      nextCoord = [startCoord[0] + i, startCoord[1]]
      coordinates = [...coordinates, nextCoord]
    }
    else {
      nextCoord = [startCoord[0], startCoord[1] + i]
      coordinates = [...coordinates, nextCoord]
    }
  }
  return {
    length,
    startCoord,
    alignment,
    coordinates
  }
}

const checkAvailability = (fleet, newShip) => {
  let unavailableCoords = []
  const otherShips = fleet.filter(ship => newShip.id !== ship.id)
  otherShips.forEach(ship => {
    const shipCoords = allCells(ship.coordinates)
    unavailableCoords = [...unavailableCoords, ...shipCoords]

    unavailableCoords = Array.from(new Set(unavailableCoords.map(JSON.stringify)), JSON.parse).sort()
  })

  const overlap = newShip.coordinates.some(el => {
    return unavailableCoords.some(coord => coord[0] === el[0] && coord[1] === el[1])
  })

  const outOfGrid = newShip.coordinates.some(el => el[0] > 9 || el [1] > 9)

  const isValid = !(overlap || outOfGrid)

  return isValid
}

export {
  randomize,
  boardCoords,
  targetCoords,
  createShipCoords,
  createFleet,
  droppedShip,
  checkAvailability
}