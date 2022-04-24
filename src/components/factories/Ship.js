const Ship = (id, length, coordinates) => {
  coordinates = coordinates.map(coordinate => {
    return { x: coordinate[0], y: coordinate[1], hit: false }
  })

  const isHit = fire => {
    coordinates.map(coord => {
      coord.x === fire[0] && coord.y === fire[1]
        ? coord.hit = true
        : null
    })
  }

  const isSunk = () => coordinates.every(coord => coord.hit)

  return {
    id,
    length,
    coordinates,
    isHit,
    isSunk
  }
}

export { Ship }
