import express, { Express, Request, Response } from 'express'
import multer from 'multer'
import dotenv from 'dotenv'
import cors from 'cors'
import path from 'path'


// init project
dotenv.config()
const app: Express = express()
const upload = multer({ dest: 'uploads/' })
const port = process.env.PORT || 3000

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
app.use(cors({ optionsSuccessStatus: 200 })) // some legacy browsers choke on 204

// enables express json parser
app.use(express.urlencoded())
app.use(express.json())

// http://expressjs.com/en/starter/static-files.html
app.use('/public', express.static(path.join(__dirname, '../public')))

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function (_req: Request, res: Response) {
    res.sendFile(path.join(__dirname, '../views/index.html'))
})

// File analyzer route
app.post('/api/fileanalyse', upload.single("upfile"), function (req: Request, res: Response) {
    res.json({
        name: req.file?.originalname,
        type: req.file?.mimetype,
        size: req.file?.size,
    })
})

// listen for requests :)
app.listen(port, function () {
    console.log(`Your app is listening on port ${port}`)
})