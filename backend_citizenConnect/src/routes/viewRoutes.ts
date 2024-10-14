import { Router } from 'express';
import { addView, getViews, getView, updateView, deleteView } from '../controllers/viewControllers';
import { isAdmin, isCitizen, isOfficial, isUserOrAdmin } from '../middlewares/authMiddle';


const viewRouter = Router();

// Citizen routes
viewRouter.post('/',  addView);        // Citizens can add views
viewRouter.get('/', getViews);        // Citizens can get all views
viewRouter.get('/:id', getView);     // Citizens can get a view by ID
viewRouter.put('/:id', updateView);  // Citizens can update a view by ID
viewRouter.delete('/:id', deleteView); // Only admins or the owner can delete a view

// Official routes
viewRouter.get('/official/views',getViews);         // Officials can get all views
viewRouter.get('/official/views/:id', getView);      // Officials can get a view by ID
viewRouter.delete('/official/views/:id', deleteView);   // Only admins can delete views

export default viewRouter
