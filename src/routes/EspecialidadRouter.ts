import {Request,Response } from 'express'
import EspecialidadController from '../controllers/EspecialidadController'
import routerClass from './RouterClass'
class EspecialidadRouter extends routerClass{
    especialidadController:EspecialidadController

    constructor(){
        // Llama al constructor de la clase padre
        super()
        this.especialidadController = new EspecialidadController()
        // Define las rutas para los endpoints GET y POST
        this.routes()
    }
    
    // Método que define las rutas y los controladores que se ejecutan cuando se accede a ellas    
    private routes():void{
        // Endpoint POST para crear una especialidad       
        this.router.post('/Especialidad',
            (req:Request,res:Response)=>{
                this.especialidadController.crearEspecialidad(req,res)
            }
        )
         // Endpoint GET para obtener la lista de especialidades
        this.router.get('/Especialidad',
            (req:Request,res:Response)=>{
                this.especialidadController.obtenerEspecialidad(req,res)
            }
        )
    }
}
// Exportamos una instancia de EspecialidaRouter que contiene las rutas definidas
export default new EspecialidadRouter().router