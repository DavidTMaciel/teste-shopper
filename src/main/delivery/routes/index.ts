import express from 'express'
import { UploadRouter } from './measure'

class Router {

    constructor(app: express.Router) {
        app.use(new UploadRouter().getRouter())
        app.use('/static', express.static('public'));
    }
}

export { Router }
