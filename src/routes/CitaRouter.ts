import {Request,Response } from 'express'
import routerClass from './RouterClass'
import CitaController from '../controllers/CitaController'

class citaRouter extends routerClass{
    citaController: CitaController

    constructor(){
        // Llama al constructor de la clase padre
        super()
        this.citaController = new CitaController()
        // Define las rutas para los endpoints GET y POST
        this.routes()
    }

    
    public routes():void{

        // Endpoint GET para crear una cita
        this.router.post('/Cita',
            (req:Request,res:Response)=>{
                this.citaController.crearCita(req,res)
            }
        )

        // Endpoint POST para obtener la lista de citas
        this.router.get('/Cita',
        (req:Request,res:Response)=>{
            this.citaController.obtenerCitas(req,res)
        }
    )
    }
}
export default new citaRouter().router