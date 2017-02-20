import {sin60, cos60} from './utils'

class CubeDrawer {
	constructor (width=100) {
		this.canvas = document.createElement('canvas')
		this.context = this.canvas.getContext('2d')
	}

	draw ({color1, color2, color3, cubeWidth, alpha=1.0, drawBorder=true}) {
		const ctx = this.context
		const width = cubeWidth

		this.canvas.width = width
		this.canvas.height = width

		const middle = {x:width/2, y:width/2}
		const halfWidth = width/2 - 2

		ctx.lineWidth = 1
		ctx.lineCap = 'round'
		ctx.globalAlpha = alpha

		ctx.fillStyle = ctx.strokeStyle = color1
		ctx.beginPath()
		ctx.moveTo(middle.x, middle.y)
		ctx.lineTo(middle.x - cos60*halfWidth, middle.y - sin60*halfWidth)
		ctx.lineTo(middle.x - halfWidth, middle.y)
		ctx.lineTo(middle.x - cos60*halfWidth, middle.y + sin60*halfWidth)
		ctx.closePath()
		ctx.fill()
		ctx.stroke()

		ctx.fillStyle = ctx.strokeStyle = color3
		ctx.beginPath()
		ctx.moveTo(middle.x, middle.y)
		ctx.lineTo(middle.x - cos60*halfWidth, middle.y - sin60*halfWidth)
		ctx.lineTo(middle.x + cos60*halfWidth, middle.y - sin60*halfWidth)
		ctx.lineTo(middle.x + halfWidth, middle.y)
		ctx.closePath()
		ctx.fill()
		ctx.stroke()

		ctx.fillStyle = ctx.strokeStyle = color2
		ctx.beginPath()
		ctx.moveTo(middle.x, middle.y)
		ctx.lineTo(middle.x + halfWidth, middle.y)
		ctx.lineTo(middle.x + cos60*halfWidth, middle.y + sin60*halfWidth)
		ctx.lineTo(middle.x - cos60*halfWidth, middle.y + sin60*halfWidth)
		ctx.closePath()
		ctx.fill()
		ctx.stroke()


		if (drawBorder) {
			ctx.strokeStyle = 'black'
			ctx.lineWidth = 1.2

			ctx.beginPath()
			ctx.moveTo(middle.x - cos60*halfWidth, middle.y - sin60*halfWidth)
			ctx.lineTo(middle.x - halfWidth, middle.y)
			ctx.lineTo(middle.x - cos60*halfWidth, middle.y + sin60*halfWidth)
			ctx.lineTo(middle.x + cos60*halfWidth, middle.y + sin60*halfWidth)
			ctx.lineTo(middle.x + halfWidth, middle.y)
			ctx.lineTo(middle.x + cos60*halfWidth, middle.y - sin60*halfWidth)
			ctx.closePath()
			ctx.stroke()
		}

		return this.context
	}

}

export default CubeDrawer