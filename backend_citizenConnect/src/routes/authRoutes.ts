import { Router } from 'express'
import { approveOfficial, deleteUser, getUser, getUsers, loginUser, registerUser, updateUser } from '../controllers/authControllers'
import { isAdmin, isUserOrAdmin, verifyToken } from '../middlewares/authMiddle'

const authRouter = Router()

authRouter.post('/register', registerUser)
authRouter.post('/login', loginUser)
authRouter.get('/users', verifyToken, isAdmin, getUsers)
authRouter.get('/users/:id', verifyToken, isUserOrAdmin, getUser)
authRouter.put('/users/:id', verifyToken, isUserOrAdmin, updateUser)
authRouter.delete('/users/:id', verifyToken, isAdmin, deleteUser)
authRouter.put('/users/approve/:id', verifyToken, isAdmin, approveOfficial)

export default authRouter