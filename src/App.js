import React, { useEffect, useState } from 'react';

const width = 75
const initialTiles = Array(width*width).fill(1).map(
    () => Math.random() > 0.7 ? 1 : 0
  );

const tileStyleOff = {
  borderStyle: "solid",
  borderWidth: "1px",
  borderColor: "white",
  backgroundColor: "white"
}
const tileStyle = {
  borderStyle: "solid",
  borderWidth: "1px",
  borderColor: "white",
  backgroundColor: "black"
}

const gameOfLife = tileSet => {
  return tileSet.map( (cell, idx) => {
    const liveNeighbors = [
      tileSet[idx-1],
      tileSet[idx-width-1],
      tileSet[idx+width-1],
      tileSet[idx-width],
      tileSet[idx+width],
      tileSet[idx+1],
      tileSet[idx+width+1],
      tileSet[idx-width+1],
    ].reduce((accum, neighbor) => neighbor ? accum + 1 : accum, 0);
    return cell && (liveNeighbors === 2 || liveNeighbors === 3)
      ? 1
      : !cell && liveNeighbors === 3 
      ? 1
      : 0
  });
}

const App = () => {
  const [tileSet, setTileset] = useState(initialTiles);
  useEffect(() => {
    setTimeout(() => {
      setTileset(gameOfLife(tileSet));
    }, 30)
  });
  return (
    <div className="bg-dark center" align="center" style={{fontSize: "8px"}}>
        {
          tileSet
            .map( (tile, i)=> {
              return tile
                ? <span key={i} style={tileStyle}>&emsp;</span>
                : <span key={i} style={tileStyleOff}>&emsp;</span>
            })
            .map((tile, idx) =>
              idx % width === 0
                ? <React.Fragment key={idx+"frag"}><br key={idx+"abc"} />{tile}</React.Fragment>
                : tile
            )
        }
    </div>
  )
}

export default App;
