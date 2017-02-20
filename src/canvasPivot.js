class CanvasPivot {
	constructor (canvas, onmoveFn, pivot = {x:0, y:0}) {
		this.pivot = pivot
		this.onmoveFn = onmoveFn

		this.isDragging = false
		this.crnStart = {x: 0, y: 0}
		this.start = {x:0, y:0}
		this.current = {x:0, y:0}

		canvas.onmousedown = (event) => {
			this.start.x = event.clientX
			this.start.y = event.clientY
			this.crnStart.x = this.pivot.x
			this.crnStart.y = this.pivot.y

			this.isDragging = true
		}

		canvas.onmouseup = (event) => {
			this.isDragging = false
		}

		canvas.onmousemove = (event) => {
			if (this.isDragging) {
				this.pivot.x = this.crnStart.x + event.clientX - this.start.x
				this.pivot.y = this.crnStart.y + event.clientY - this.start.y

				this.current.x = event.clientX
				this.current.y = event.clientY

				this.onmoveFn()
			}
		}
	}
}

export default CanvasPivot

