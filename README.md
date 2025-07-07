# Master Front End XVII - Módulo 7 - Cloud - Laboratorio

## Modulo Cloud - Laboratorio

### Opcional

Automatizar el despliegue de la app en Render, usando Docker.

### Para poder desplegar en Render usando Docker:

- Crear servidor (con express)

```bash
mkdir server
cd server
npm init -y
npm install express --save
```

- Crear fichero index.js dentro de server

```js
import express from 'express'
import path from 'node:path'

const app = express()
const staticFilesPath = path.resolve(process.cwd(), './app')
app.use('/', express.static(staticFilesPath))

app.get(/(.*)/, (_req, res) => {
  res.sendFile(path.resolve(staticFilesPath, 'index.html'))
})

const PORT = process.env.PORT || 8081
app.listen(PORT, () => {
  console.log(`App running on http://localhost:${PORT}`)
})
```