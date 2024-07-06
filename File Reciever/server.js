const express = require('express')
const multer = require('multer')
const path = require('path')

const app = express()
const port = 8000

// Multer setup for file uploads
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/') // Specify where to store uploaded files
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname) // Rename file if needed
    }
})

const upload = multer({ storage: storage })

// Serve static files from the 'public' directory
app.use(express.static('public'))

// Endpoint to render the HTML form
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

// Endpoint to handle file and folder upload
app.post(
        '/upload',
        upload.fields([{ name: 'files', maxCount: 10 }, { name: 'folders' }]),
        (req, res) => {
            // Files and/or folders have been uploaded successfully
            res.send('Files and folders uploaded successfully!')
        }
    )
    // Start server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
})