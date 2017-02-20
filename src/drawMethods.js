
class DrawMethodSingle {
	constructor () {
		this.magicCanvas = document.createElement('canvas')
	}

	prepareMagicCanvas (ind) {
		const pnow = this.points[ind]
		const mag = this.magicCanvas.getContext('2d')

		this.magicCanvas.width = this.width
		this.magicCanvas.height = this.width

		mag.globalCompositeOperation = 'source-over'
		mag.drawImage(this.sourceCanvas, 0, 0)

		if (this.drawNumbers) {
			mag.font = "30px Arial"
			mag.fillText(''+ind, this.width/2, this.width/2)
		}

		mag.globalCompositeOperation = this.compositeMode

		;(this.modelsNow[ind].parents || []).forEach(num => {
			const posX = this.points[num].x - pnow.x
			const posY = this.points[num].y - pnow.y

			mag.drawImage(this.sourceCanvas, posX, posY)
		})
	}

	drawOneCube (ind) {
		const pnt = this.points[ind]
		const parents = this.modelsNow[ind].parents

		if (true || parents && parents.length > 0) {
			this.prepareMagicCanvas(ind)

			this.destinationContext.drawImage(this.magicCanvas, pnt.x, pnt.y)
		}
		else {
			this.destinationContext.drawImage(this.sourceCanvas, pnt.x, pnt.y)
		}
	}

	draw ({destinationContext, sourceCanvas, points, modelsNow, width, compositeMode, drawNumbers}) {
		this.compositeMode = compositeMode
		this.destinationContext = destinationContext
		this.sourceCanvas = sourceCanvas
		this.modelsNow = modelsNow
		this.points = points
		this.width = width
		this.drawNumbers = drawNumbers


		points.forEach((pnt, ind) => {
			this.drawOneCube(ind)
		})
	}
}

class DrawMethodFull {
	constructor (width, height) {
		this.magicCanvas = document.createElement('canvas')
		this.mag = this.magicCanvas.getContext('2d')
		
		this.setSize(width, height)
	}

	setSize (width, height) {
		this.magicCanvas.width = width
		this.magicCanvas.height = height
	}


	prepareMagicCanvas (ind) {
		const pnow = this.points[ind]
		const width = this.width
		const mag = this.mag
		
		mag.clearRect(pnow.x, pnow.y, width, width)

		mag.globalCompositeOperation = 'source-over'
		mag.drawImage(this.sourceCanvas,
				pnow.x,  pnow.y)

		if (this.drawNumbers) {
			mag.font = "30px Arial"
			mag.fillText(''+ind, pnow.x + width/2, pnow.y + width/2)
		}

		mag.globalCompositeOperation = this.compositeMode

		;(this.modelsNow[ind].parents || []).forEach(num => {
			const posX = this.points[num].x - pnow.x
			const posY = this.points[num].y - pnow.y

			mag.drawImage(this.sourceCanvas,
				this.points[num].x, this.points[num].y)
		})
	}


	drawOneCube (ind) {
		const pnt = this.points[ind]
		const width = this.width

		this.prepareMagicCanvas(ind)

		this.destinationContext.drawImage(this.magicCanvas,
			pnt.x, pnt.y, width, width,
			pnt.x, pnt.y, width, width)
	}

	draw ({destinationContext, sourceCanvas, points, modelsNow, width, compositeMode, drawNumbers}) {
		this.compositeMode = compositeMode
		this.destinationContext = destinationContext
		this.sourceCanvas = sourceCanvas
		this.modelsNow = modelsNow
		this.points = points
		this.width = width
		this.drawNumbers = drawNumbers


		points.forEach((pnt, ind) => {
			this.drawOneCube(ind)
		})
	}


}

export {DrawMethodSingle, DrawMethodFull}