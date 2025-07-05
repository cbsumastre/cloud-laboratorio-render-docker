
import express from "express"
import path from "node:path"

const app = express()
const staticFilesPath = path.resolve(process.cwd(), './app');
app.use('/', express.static(staticFilesPath));

app.get(/(.*)/, (_req, res) => {
    res.sendFile(path.resolve(staticFilesPath, 'index.html'))
})

const PORT = process.env.PORT || 8081
app.listen(PORT, () => {
    console.log(`App running on http://localhost:${PORT}`)
})