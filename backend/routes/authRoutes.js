import express from 'express'
import authController from '../controllers/authController.js'

const Router = express.Router();


Router.get("/google", authController);


// module.exports = Router;
export default Router