import express, {json} from 'express'
import cors from 'cors'
import authRoutes from './routes/authRoutes'
import viewRouter from './routes/viewRoutes'
import viewRoutes from './routes/viewRoutes'
import { verifyToken } from './middlewares/authMiddle'
import incidentRoutes from './routes/incidentRoutes'
import educateRoutes from './routes/educateRoutes'
import chatRoutes from './routes/chatRoutes'
import pollRoutes from './routes/pollRoutes'


const app = express()  //  initialize the application

app.use(json())        //add a body to the requests
app.use(cors()) 

// add all the middlewares and urls
app.use('/auth', authRoutes)
app.use('/view', verifyToken, viewRoutes)
app.use('/incident', incidentRoutes)
app.use('/educate',educateRoutes)
app.use('/chat',chatRoutes)
app.use('/polls',pollRoutes)


// start the application
app.listen(4000,()=>{
    console.log('Server Running..')
})