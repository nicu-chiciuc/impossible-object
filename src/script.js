import models from './models'
import {triangleGrid, getLineXYatPercent, sin60, cos60} from './utils'
import CubeDrawer from './cubeDrawer'
import CanvasPivot from './canvasPivot'
import {DrawMethodSingle, DrawMethodFull} from './drawMethods'


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
		cubeDistance: 0.67,

		color1: '#ff6347',
		color2: '#008080',
		color3: '#ffd500',

		alpha: 0.999,
		drawBorder: true,

		run: true,

		model: 'standard',

		speed: 10,


		time: 0.001,
		drawNumbers: false,

		renderMethod: 'full',

		compositeMode: 'source-atop',
	}

	const compositeTypes = [
		'source-over',
		'source-atop',
		'destination-out',
		'-----',
		'source-in',
		'source-out',
		'destination-over',
		'destination-in',
		'destination-atop',
		'lighter',
		'copy',
		'xor',
		'multiply',
		'screen',
		'overlay',
		'darken',
		'lighten',
		'color-dodge',

		'difference',
		'exclusion',
		
	]

	function initDatGui () {
		const gui = new dat.GUI();
		gui.add(setupObj, 'cubeWidth', 20, 300).onChange(safeRedraw)
		gui.add(setupObj, 'cubeDistance', 0.5, 1.0).onChange(safeRedraw)
		gui.add(setupObj, 'speed', -50, 50)
		gui.add(setupObj, 'alpha', 0.0, 1.0).onChange(safeRedraw)
		gui.add(setupObj, 'drawBorder').onChange(safeRedraw)
		gui.add(setupObj, 'run').onChange(draw)
		gui.addColor(setupObj, 'color1').onChange(safeRedraw)
		gui.addColor(setupObj, 'color2').onChange(safeRedraw)
		gui.addColor(setupObj, 'color3').onChange(safeRedraw)
		gui.add(setupObj, 'model', Object.keys(models)).onChange(safeRedraw)

		const secretFolder = gui.addFolder('secret')
		secretFolder.add(setupObj, 'time', 0.0, 1.0).listen().onChange(safeRedraw)
		secretFolder.add(setupObj, 'drawNumbers').onChange(safeRedraw)
		secretFolder.add(setupObj, 'compositeMode', compositeTypes).onChange(safeRedraw)
		secretFolder.add(setupObj, 'renderMethod', ['single', 'full']).onChange(safeRedraw)
	}

	initDatGui()

	const canvas = document.getElementById('canvas')

	// For drawing the standard cubes
	const cubeDrawer = new CubeDrawer(setupObj.cubeWidth)
	cubeDrawer.draw(setupObj)
	// document.body.appendChild(cubeDrawer.canvas)

	// For draggin the canvas
	const canvasPivot = new CanvasPivot(canvas, safeRedraw, {x:120, y:250})

	// 2 drawing methods
	const drawMethSingle = new DrawMethodSingle()
	const drawMethFull = new DrawMethodFull(canvas.width, canvas.height)

	// Start animation
	window.requestAnimationFrame(draw)

	function safeRedraw () {
		cubeDrawer.draw(setupObj)
		if (!setupObj.run)
			draw()
	}

	function getCurrentPoints () {
		const currentModel = models[setupObj.model]

		// From triangle grid to canvas grid
		const setPoints = currentModel.map(triangleGrid).map(fn => fn(setupObj.cubeDistance * setupObj.cubeWidth))

		// Movement percentage
		const floatTimePoints = setPoints.map((pnt, ind, arr) =>
			getLineXYatPercent(pnt, arr[(ind + 1) % arr.length],
				setupObj.time)
		)

		// Add displacement
		const timePoints = floatTimePoints.map(({x, y}) => ({
			x: canvasPivot.pivot.x + x,
			y: canvasPivot.pivot.y + y
		}))

		return timePoints
	}

	function draw () {
		const ctx = canvas.getContext('2d')
		ctx.clearRect(0, 0, canvas.width, canvas.height)

		const timePoints = getCurrentPoints()

		const toPass = {
			destinationContext: ctx,
			sourceCanvas: cubeDrawer.canvas,
			points: timePoints,
			modelsNow: models[setupObj.model],
			width: setupObj.cubeWidth,
			compositeMode: setupObj.compositeMode,
			drawNumbers: setupObj.drawNumbers}

		if (setupObj.renderMethod == 'single')
			drawMethSingle.draw(toPass)
		else
			drawMethFull.draw(toPass)


		if (!setupObj.run)
			return

		setupObj.time += 0.001 * setupObj.speed

		if (setupObj.time >= 1)
			setupObj.time -= 1
		if (setupObj.time < 0)
			setupObj.time += 1

		window.requestAnimationFrame(draw)
	}
})
