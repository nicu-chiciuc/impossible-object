import models from './src/models'


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

	  model: 'standard',

		speed: 10,


		time: 0.1,
		showNumbers: false,

		renderMode: 'destination-out'
	}

	const compositeTypes = [
		'source-over',
		'source-in',
		'source-out',
		'source-atop',
		'destination-over',
		'destination-in',
		'destination-out',
		'destination-atop',
		'lighter',
		'copy',
		'xor',
		'multiply',
		'screen',
		'overlay',
		'darken',
		'lighten',
		'color-edge'
	]

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
	secretFolder.add(setupObj, 'renderMode', compositeTypes).onChange(safeRedraw)

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
	magicCanvas.width = canvas.width
	magicCanvas.height = canvas.height




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
	  const halfWidth = setupObj.cubeWidth/2 - 2

	  hlp.lineWidth = 1
	  hlp.lineCap = 'round'
	  hlp.globalAlpha = setupObj.alpha


	  
	  hlp.fillStyle = hlp.strokeStyle = setupObj.color1
	  hlp.beginPath()
	  hlp.moveTo(middle.x, middle.y)
	  hlp.lineTo(middle.x - cos60*halfWidth, middle.y - sin60*halfWidth)
	  hlp.lineTo(middle.x - halfWidth, middle.y)
	  hlp.lineTo(middle.x - cos60*halfWidth, middle.y + sin60*halfWidth)
	  hlp.closePath()
	  hlp.fill()
	  hlp.stroke()

	  hlp.fillStyle = hlp.strokeStyle = setupObj.color3
	  hlp.beginPath()
	  hlp.moveTo(middle.x, middle.y)
	  hlp.lineTo(middle.x - cos60*halfWidth, middle.y - sin60*halfWidth)
	  hlp.lineTo(middle.x + cos60*halfWidth, middle.y - sin60*halfWidth)
	  hlp.lineTo(middle.x + halfWidth, middle.y)
	  hlp.closePath()
	  hlp.fill()
	  hlp.stroke()

	  hlp.fillStyle = hlp.strokeStyle = setupObj.color2
	  hlp.beginPath()
	  hlp.moveTo(middle.x, middle.y)
	  hlp.lineTo(middle.x + halfWidth, middle.y)
	  hlp.lineTo(middle.x + cos60*halfWidth, middle.y + sin60*halfWidth)
	  hlp.lineTo(middle.x - cos60*halfWidth, middle.y + sin60*halfWidth)
	  hlp.closePath()
	  hlp.fill()
	  hlp.stroke()


	  if (setupObj.drawBorder) {
	  	hlp.strokeStyle = 'black'
	  	hlp.lineWidth = 1.2

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

		const floatTimePoints = setPoints.map((pnt, ind, arr) => 
			getLineXYatPercent(pnt, arr[currentModel[ind].next],
				setupObj.time)
		)

		const timePoints = floatTimePoints.map(({x, y}) => ({
			x: crn.x + x,
			y: crn.y + y
		}))

		function prepareMagicCanvas (ind, drawNumber=false) {
			const pnow = timePoints[ind]
			const width = setupObj.cubeWidth

			mag.clearRect(pnow.x, pnow.y, width, width)
			// mag.clearRect(0, 0, magicCanvas.width, magicCanvas.height)

			mag.globalCompositeOperation = 'source-over'
			mag.drawImage(hlpCanvas,
				 pnow.x,  pnow.y)

			if (drawNumber) {
				console.log('here')
				mag.font = "30px Arial"
				mag.fillText(''+ind, pnow.x + width/2, pnow.y + width/2)
			}
			
			mag.globalCompositeOperation = setupObj.renderMode

			;(models[setupObj.model][ind].parents || []).forEach(num => {
				const posX = timePoints[num].x - pnow.x
				const posY = timePoints[num].y - pnow.y

				mag.drawImage(hlpCanvas,
					timePoints[num].x, timePoints[num].y)
			})

			
		}

		drawCube()

		function drawOneCube (pnts, ind) {
			const pnt = pnts[ind]
			const width = setupObj.cubeWidth
			const parents = models[setupObj.model][ind].parents

			if (true || parents && parents.length > 0) {

				prepareMagicCanvas(ind, setupObj.showNumbers)
				

				ctx.drawImage(magicCanvas,
					pnt.x, pnt.y, width, width,
					pnt.x, pnt.y, width, width)
			}
			else {
				ctx.drawImage(hlpCanvas, pnt.x, pnt.y)
			}
		}

		function prepareMagicCanvas2 (ind, drawNumber=false) {
			const pnow = timePoints[ind]
			const width = setupObj.cubeWidth

			magicCanvas.width = width
			magicCanvas.height = width
			// mag.clearRect(pnow.x, pnow.y, width, width)
			// mag.clearRect(0, 0, magicCanvas.width, magicCanvas.height)

			mag.globalCompositeOperation = 'source-over'
			mag.drawImage(hlpCanvas, 0, 0)

			if (drawNumber) {
				console.log('here')
				mag.font = "30px Arial"
				mag.fillText(''+ind, width/2, width/2)
			}
			
			mag.globalCompositeOperation = setupObj.renderMode

			;(models[setupObj.model][ind].parents || []).forEach(num => {
				const posX = timePoints[num].x - pnow.x
				const posY = timePoints[num].y - pnow.y

				mag.drawImage(hlpCanvas, posX, posY)
			})	
		}

		function drawOneCube2 (pnts, ind) {
			const pnt = pnts[ind]
			const width = setupObj.cubeWidth
			const parents = models[setupObj.model][ind].parents

			if (true || parents && parents.length > 0) {

				prepareMagicCanvas2(ind, setupObj.showNumbers)
				

				ctx.drawImage(magicCanvas, pnt.x, pnt.y)
			}
			else {
				ctx.drawImage(hlpCanvas, pnt.x, pnt.y)
			}
		}

		timePoints.forEach((pnt, ind, arr) => {
			drawOneCube(arr, ind)
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


