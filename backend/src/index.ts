import express, { Express, Request, Response } from 'express'
import 'reflect-metadata'
import dotenv from 'dotenv'
import cors from 'cors'
import helmet from 'helmet'
import morganMiddleware from './middlewares/morgan.middleware'
import * as bodyParser from 'body-parser'
import routes from './routes/router'
import logger from '@/configs/logger.config'
import { env } from './configs/env.config'

const app: Express = express()
const port = env.PORT || 3000

app.use(morganMiddleware)
app.use(
  cors({
    origin: '*'
  })
)
app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ limit: '50mb', extended: false }))
app.use('/api', routes)

app.listen(port, () => {
  logger.info(`⚡️[server]: Server is running at http://localhost:${port}`)
  console.log()
})
