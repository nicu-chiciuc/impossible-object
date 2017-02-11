import Test, {a, b} from './src/triangle'

console.log(Test)

const t = new Test(4)
console.log(t.a)

console.log(a, b)


function ready(fn) {
  if (document.readyState != 'loading'){
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

ready(function () {

	const setupObj = {
		cubeWidth: 100,
		cubeDistance: 0.86,

		color1: '#ff6347',
	  color2: '#008080',
	  color3: '#ffd500',

	  alpha: 0.999,
	  drawBorder: true,

	  run: true,

	  model: 'hex',

		speed: 10,


		time: 0.1,
		showNumbers: false,

		renderMode: 'destination-out'
	}

	const cScale = 1

	const gui = new dat.GUI();
	const cubeWidthDatGui = gui.add(setupObj, 'cubeWidth', 20, 300)
	gui.add(setupObj, 'cubeDistance', 0.5, 1.0).onChange(safeRedraw)
	gui.add(setupObj, 'speed', -50, 50)
	gui.add(setupObj, 'alpha', 0.0, 1.0).onChange(safeRedraw)
	gui.add(setupObj, 'drawBorder').onChange(safeRedraw)
	gui.add(setupObj, 'run').onChange(draw)
	gui.addColor(setupObj, 'color1').onChange(safeRedraw)
	gui.addColor(setupObj, 'color2').onChange(safeRedraw)
	gui.addColor(setupObj, 'color3').onChange(safeRedraw)
	gui.add(setupObj, 'model', ['standard', 'bigger', 'loop', 'loop2', 'small', 'hexSmall', 'hex']).onChange(safeRedraw)

	const secretFolder = gui.addFolder('secret')
	secretFolder.add(setupObj, 'time', 0.0, 1.0).listen().onChange(safeRedraw)
	secretFolder.add(setupObj, 'showNumbers').onChange(safeRedraw)
	secretFolder.add(setupObj, 'renderMode', ['destination-out', 'source-atop']).onChange(safeRedraw)

	const crn = {x: 260, y: 400}

	const canvas = document.getElementById('canvas')

	const dragging = {
		isDragging: false,
		crnStart: {x: 0, y: 0},
		start: {x:0, y:0},
		current: {x:0, y:0},
	}

	canvas.onmousedown = (event) => {
		console.log('down', event)
		dragging.start.x = event.clientX
		dragging.start.y = event.clientY
		dragging.crnStart.x = crn.x
		dragging.crnStart.y = crn.y

		dragging.isDragging = true
	}

	canvas.onmouseup = (event) => {
		dragging.isDragging = false
	}

	canvas.onmousemove = (event) => {
		if (dragging.isDragging) {
			crn.x = dragging.crnStart.x + event.clientX - dragging.start.x
			crn.y = dragging.crnStart.y + event.clientY - dragging.start.y

			dragging.current.x = event.clientX
			dragging.current.y = event.clientY
		}
	}

	const hlpCanvas = document.createElement('canvas')
	document.body.appendChild(hlpCanvas)
	const magicCanvas = document.createElement('canvas')




	const hlp = hlpCanvas.getContext('2d')
	const mag = magicCanvas.getContext('2d')
	const ctx = canvas.getContext('2d');

	document.body.appendChild(magicCanvas)
	const cos60 = 1/2
	const sin60 = Math.sqrt(3) / 2

	const drawCube = () => {
		hlpCanvas.width = setupObj.cubeWidth
		hlpCanvas.height = setupObj.cubeWidth

		hlp.clearRect(0, 0, setupObj.cubeWidth, setupObj.cubeWidth)

	  const middle = {x:setupObj.cubeWidth/2, y:setupObj.cubeWidth/2}
	  const halfWidth = setupObj.cubeWidth/2

	  hlp.lineWidth = 1
	  hlp.globalAlpha = setupObj.alpha


	  
	  hlp.fillStyle = hlp.strokeStyle = setupObj.color1
	  hlp.beginPath()
	  hlp.moveTo(middle.x, middle.y)
	  hlp.lineTo(middle.x - cos60*halfWidth, middle.y - sin60*halfWidth)
	  hlp.lineTo(middle.x - halfWidth, middle.y)
	  hlp.lineTo(middle.x - cos60*halfWidth, middle.y + sin60*halfWidth)
	  hlp.fill()
	  hlp.stroke()

	  hlp.fillStyle = hlp.strokeStyle = setupObj.color3
	  hlp.beginPath()
	  hlp.moveTo(middle.x, middle.y)
	  hlp.lineTo(middle.x - cos60*halfWidth, middle.y - sin60*halfWidth)
	  hlp.lineTo(middle.x + cos60*halfWidth, middle.y - sin60*halfWidth)
	  hlp.lineTo(middle.x + halfWidth, middle.y)
	  hlp.fill()
	  hlp.stroke()

	  hlp.fillStyle = hlp.strokeStyle = setupObj.color2
	  hlp.beginPath()
	  hlp.moveTo(middle.x, middle.y)
	  hlp.lineTo(middle.x + halfWidth, middle.y)
	  hlp.lineTo(middle.x + cos60*halfWidth, middle.y + sin60*halfWidth)
	  hlp.lineTo(middle.x - cos60*halfWidth, middle.y + sin60*halfWidth)
	  hlp.fill()
	  hlp.stroke()


	  if (setupObj.drawBorder) {
	  	hlp.strokeStyle = 'black'
	  	hlp.lineWidth = 1

	  	hlp.beginPath()
			hlp.moveTo(middle.x - cos60*halfWidth, middle.y - sin60*halfWidth)
			hlp.lineTo(middle.x - halfWidth, middle.y)
	  	hlp.lineTo(middle.x - cos60*halfWidth, middle.y + sin60*halfWidth)
	  	hlp.lineTo(middle.x + cos60*halfWidth, middle.y + sin60*halfWidth)
	  	hlp.lineTo(middle.x + halfWidth, middle.y)
	  	hlp.lineTo(middle.x + cos60*halfWidth, middle.y - sin60*halfWidth)
	  	hlp.closePath()
	  	hlp.stroke()
	  }
	}

	const fromTriangleGrid = ({col, row}) => (dist) => ({
		x: col*dist + row*cos60*dist, 
		y: -row*dist*sin60
	})

	// drawCube()

	function getLineXYatPercent(start, end, percent) {
	    const dx = end.x - start.x;
	    const dy = end.y - start.y;
	    const x = start.x + dx*percent;
	    const y = start.y + dy*percent;
	    return {x, y}
	}


	const models = {
		'small' : [
			{col: 1, row: 0, next: 1},
			{col: 0, row: 0, next: 2},
			{col: 0, row: 1, next: 3},
			{col: 0, row: 2, next: 4},
			{col: 1, row: 1, next: 5, parents: [0]},
			{col: 2, row: 0, next: 0, parents: [0, 1]},
		],

		'standard' : [
			{col: 1, row: 0, next: 1},
			{col: 0, row: 0, next: 2},
			{col: 0, row: 1, next: 3},
			{col: 0, row: 2, next: 4},
			{col: 0, row: 3, next: 5},
			{col: 1, row: 2, next: 6},
			{col: 2, row: 1, next: 7},
			{col: 3, row: 0, next: 8},
			{col: 2, row: 0, next: 0, parents: [0, 1, 2]},

			// {col: 1, row: 1, next: 10},
			// {col: 2, row: 1, next: 10},
		],

		'bigger': [
			{col: 1, row: 0, next: 1},
			{col: 0, row: 0, next: 2},
			{col: 0, row: 1, next: 3},
			{col: 0, row: 2, next: 4},
			{col: 0, row: 3, next: 5},
			{col: 0, row: 4, next: 6},
			{col: 1, row: 3, next: 7},
			{col: 2, row: 2, next: 8},
			{col: 3, row: 1, next: 9},
			{col: 4, row: 0, next: 10},
			{col: 3, row: 0, next: 11},
			{col: 2, row: 0, next: 0, parents: [0, 1, 2]},
		],

		'loop' : [
			{col: 1, row:  0, next: 1},
			{col: 0, row:  0, next: 2},
			{col: 0, row:  1, next: 3},
			{col: 0, row:  2, next: 4},
			{col: 0, row:  3, next: 5},
			{col: 1, row:  2, next: 6},
			{col: 2, row:  1, next: 7},
			{col: 3, row:  0, next: 8},
			{col: 4, row: -1, next: 9},
			{col: 5, row: -2, next: 10},
			{col: 6, row: -3, next: 11},
			{col: 6, row: -2, next: 12},
			{col: 6, row: -1, next: 13},
			{col: 6, row:  0, next: 14},
			{col: 5, row:  0, next: 15},
			{col: 4, row:  0, next: 16},
			{col: 3, row:  0, next: 17},
			{col: 2, row:  0, next: 0, parents: [0, 1, 2]},
		],

		'loop2' : [
			{col: 1, row:  0, next: 1},
			{col: 0, row:  0, next: 2},
			{col: 0, row:  1, next: 3},
			{col: 0, row:  2, next: 4},
			{col: 0, row:  3, next: 5},
			{col: 1, row:  2, next: 6},
			{col: 2, row:  1, next: 7},
			{col: 3, row:  0, next: 8},
			{col: 4, row: -1, next: 9},
			{col: 5, row: -2, next: 10},
			{col: 6, row: -3, next: 11},
			{col: 6, row: -2, next: 12},
			{col: 6, row: -1, next: 13},
			{col: 6, row:  0, next: 14},
			{col: 5, row:  0, next: 15, parents: [6, 7, 8]},
			{col: 4, row:  0, next: 16, parents: [5, 6, 7, 8]},
			{col: 3, row:  0, next: 17, parents: [5, 6, 7, 8]},
			{col: 2, row:  0, next: 0, parents: [0, 1, 2, 5, 6, 7]},
		],

		'hexSmall': [
			{col: -1, row:  0, next:  1},
			{col: -2, row:  0, next:  2},
			{col: -1, row: -1, next:  3},
			{col:  0, row: -2, next:  4},
			{col:  0, row: -1, next:  5},
			{col:  0, row:  0, next:  6},
			{col:  0, row:  1, next:  7},
			{col:  0, row:  2, next:  8},
			{col: -1, row:  2, next:  9},
			{col: -2, row:  2, next: 10},
			{col: -1, row:  1, next: 11},
			{col:  0, row:  0, next: 12},
			{col:  1, row: -1, next: 13},
			{col:  2, row: -2, next: 14},
			{col:  2, row: -1, next: 15},
			{col:  2, row:  0, next: 16},
			{col:  1, row:  0, next: 17},
			{col:  0, row:  0, next:  0, parents: [0, 1, 3]},
		],

		'hex': [
			{col: -2, row:  0, next:1 },
			{col: -3, row:  0, next:2 },
			{col: -2, row: -1, next:3 },
			{col: -1, row: -2, next:4 },
			{col:  0, row: -3, next:5 },
			{col:  0, row: -2, next:6 },
			{col:  0, row: -1, next:7 },

			{col:  0, row:  0, next:8 },
			{col:  0, row:  1, next:9 },
			{col:  0, row:  2, next:10 },
			{col:  0, row:  3, next:11 },
			{col: -1, row:  3, next:12 },
			{col: -2, row:  3, next:13 },
			{col: -3, row:  3, next:14 },
			{col: -2, row:  2, next:15 , parents: [6, 7, 8]},
			{col: -1, row:  1, next:16 , parents: [6, 7, 8]},

			{col:  0, row:  0, next:17 , parents: [5, 6, 7, 8]},
			{col:  1, row: -1, next:18 , parents: [5, 6, 7]},


			{col:  2, row: -2, next:19 },
			{col:  3, row: -3, next:20 },
			{col:  3, row: -2, next:21 },
			{col:  3, row: -1, next:22 },
			{col:  3, row:  0, next:23 },




			{col:  2, row:  0, next:24 , parents: [15, 16, 17,  6, 7, 8]},
			{col:  1, row:  0, next:25 , parents: [14, 15, 16, 17,  5, 6, 7, 8]},

			{col:  0, row:  0, next:26 , parents: [14, 15, 16, 17, 5, 6, 7, 8]},
			{col: -1, row:  0, next:0 , parents: [14, 15, 0, 1, 2, 5, 6, 7]},



		]
	}

	window.requestAnimationFrame(draw)

	function isLast (arr, index) {
		return index+1 >= arr.length
	}

	function safeRedraw () {
		if (!setupObj.run)
			draw()
	}

	function draw () {
		ctx.clearRect(0, 0, canvas.width, canvas.height)
		const currentModel = models[setupObj.model]

		const setPoints = currentModel.map(fromTriangleGrid).map(fn => fn(setupObj.cubeDistance * setupObj.cubeWidth))

		const timePoints = setPoints.map((pnt, ind, arr) => 
			getLineXYatPercent(pnt, arr[currentModel[ind].next],
				setupObj.time)
		)

		// const timePoints = floatTimePoints.map(({x, y}) => ({
		// 	x: Math.round(x),
		// 	y: Math.round(y)
		// }))

		function prepareMagicCanvas (ind, drawNumber=false) {
			const pnow = timePoints[ind]
			const width = setupObj.cubeWidth

			magicCanvas.width = width*cScale
			magicCanvas.height = width*cScale

			// mag.clearRect(0, 0, width, width)

			mag.globalCompositeOperation = 'source-over'
			mag.drawImage(hlpCanvas,
				0, 0, width, width,
				0, 0, width*cScale, width*cScale)

			if (drawNumber) {
				mag.font = "30px Arial"
				mag.fillText(''+ind, width/2, width/2)
			}
			
			mag.globalCompositeOperation = setupObj.renderMode
			;(models[setupObj.model][ind].parents || []).forEach(num => {
				const posX = timePoints[num].x - pnow.x
				const posY = timePoints[num].y - pnow.y
				mag.drawImage(hlpCanvas,
					0, 0, width, width,
					posX*cScale, posY*cScale, width*cScale, width*cScale)
			})

			
		}

		drawCube()

		timePoints.forEach((pnt, ind, arr) => {
			prepareMagicCanvas(ind, setupObj.showNumbers)

			ctx.drawImage(magicCanvas,
				0, 0, setupObj.cubeWidth*cScale, setupObj.cubeWidth*cScale,
				crn.x + pnt.x, crn.y + pnt.y, setupObj.cubeWidth, setupObj.cubeWidth)
		})

		if (!setupObj.run)
			return
		
		setupObj.time += 0.001 * setupObj.speed
		if (setupObj.time >= 1)
			setupObj.time -= 1

		if (setupObj.time < 0) setupObj.time += 1

		window.requestAnimationFrame(draw)
	}
})


