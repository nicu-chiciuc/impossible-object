const cos60 = 1/2
const sin60 = Math.sqrt(3) / 2

const triangleGrid = ({col, row}) => (dist) => ({
	x: col*dist + row*cos60*dist, 
	y: -row*dist*sin60
})

function getLineXYatPercent(start, end, percent) {
  const dx = end.x - start.x;
  const dy = end.y - start.y;
  const x = start.x + dx*percent;
  const y = start.y + dy*percent;

  return {x, y}
}

export {sin60, cos60, triangleGrid, getLineXYatPercent}