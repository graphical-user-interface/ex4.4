import React from "react"
import "./App.css"
import Box from "@material-ui/core/Box"
import getz from "./getz.jpg"
import Typography from "@material-ui/core/Typography"

function App() {
	const [heading, setHeading] = React.useState("A Car")
	const [image, setImage] = React.useState(getz)
	const [caption, setCaption] = React.useState("and a small one")
	const [mimeType, setMimeType] = React.useState("image/jpeg")

	const pagePaste = (event) => {
		let paste = event.clipboardData.items[0]
		if (paste.kind === "string" && paste.type === "text/plain") {
			let text = event.clipboardData.getData("text")
			let parts = text.split("\n")
			setHeading(parts[0])
			if (parts.length > 1) {
				setCaption(parts[1])
			} else {
				setCaption("")
			}
		}
		if (paste.kind === "string" && paste.type === "text/html") {
		}
		event.preventDefault()
	}

	const pageCopy = (event) => {
		event.clipboardData.setData(
			"text/html",
			"<h1>" + heading + "</h1><h6>" + caption + "</h6>",
		)
		event.preventDefault()
	}

	const imageDragStart = (event) => {
		console.log("image drag start", mimeType)
		event.dataTransfer.setData({ mimeType }, event.target.src)
		event.dataTransfer.dropEffect = "copy"
	}

	const imageDragOver = (event) => {
		event.preventDefault()
		event.dataTransfer.dropEffect = "copy"
	}
	const imageDragEnter = (event) => {
		event.preventDefault()
		let file = event.dataTransfer.files[0]
		if (file) {
			event.preventDefault() // we should check here also that the file type is suitable
		}
	}

	const imageOnDrop = (event) => {
		event.preventDefault()
		let file = event.dataTransfer.files[0]
		if (file) {
			let reader = new FileReader()
			reader.onloadend = function (evt) {
				setImage(reader.result)
				setMimeType(file.type)
			}
			reader.readAsDataURL(file)
		}
	}

	return (
		<div
			style={{ width: 400, height: 400 }}
			onPaste={pagePaste}
			onCopy={pageCopy}
			contentEditable={true}>
			<Box>
				<Box>
					<Typography variant='h1'>{heading}</Typography>
					<Box>
						<img
							src={image}
							alt='Old Huyndai Getz'
							id='DraggingImage'
							onDragStart={imageDragStart}
							onDragEnter={imageDragEnter}
							draggable={true}
							onDrop={imageOnDrop}
							onDragOver={imageDragOver}
						/>
					</Box>
					<Typography variant='caption'>{caption}</Typography>
				</Box>
				<Box border={1}>
					<Typography variant='caption'>
						You can copy and paste the text to and from the editable
						area above. You can drag an image file to replace the
						image.
					</Typography>
				</Box>
			</Box>
		</div>
	)
}

export default App
