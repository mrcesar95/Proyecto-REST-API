
import { Router, Request, Response } from 'express'
import MedicoController from '../controllers/MedicoController'

class MedicoRouter{

    router:Router
    medicoController: MedicoController

    constructor(){

        this.router=Router()
        this.medicoController= new MedicoController()
        this.routes()
    }

    private routes():void{

        this.router.get('/medicos',
            (req:Request, res:Response)=> {
                this.medicoController.obtenerMedicos(req,res)
            }        
        )
    }

}

export default new MedicoRouter().router