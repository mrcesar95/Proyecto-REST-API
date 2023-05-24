/* eslint-disable no-mixed-spaces-and-tabs */
import swaggerUi from 'swagger-ui-express'
import { swaggerSpec } from './swagger.conf'
import express,{Application, NextFunction, Request, Response} from 'express'
import {Prisma, PrismaClient} from '@prisma/client'

import PacienteRouter from './routes/Paciente.routes'
import MedicoRouter from './routes/Medico.routes'
import especialidadRoutes from './routes/EspecialidadRouter'
import citaRouter from './routes/CitaRouter'
import FormularioRouter from './routes/Formulario.routes'
import cors from 'cors'

/**
 * Clase principal de la API. Define las rutas de la API
 * 
 * @author Cesar Molina
 * @description Clase inicial de ejemplo para manejar rutas y documentación
 */
class App{

	//Atributos
	private prismaClient:PrismaClient
	public app:Application
	private server:any
	

	/**
     * Método constructor de la clase
     * 
     * @author Cesar Molina
     */
	constructor(){

		/**
         * Express es la biblioteca para definir API en el ecosistema de Node.js
         */
		this.app=express()

		this.app.use(express.json())
		this.app.use(
			'/api-docs',
			swaggerUi.serve,
			swaggerUi.setup(swaggerSpec)
		)
		this.app.use(cors())
		this.routes()
		this.prismaClient = new PrismaClient()
	}

	/**
	 * Definir y agregar las rutas de la API con express
	 */
	private routes():void{
		
        this.app.use('/', PacienteRouter)
		this.app.use('/', MedicoRouter)
		this.app.use('/', FormularioRouter)
		this.app.use('/', especialidadRoutes)
		this.app.use('/', citaRouter)
		this.app.use(
			(req:Request,res:Response,next:NextFunction)=>{
				res.status(404).json({message: 'No encontrado'})
				next()
			})

		
	}

	public start():void{

		this.server=this.app.listen(
			3000,
			()=>{console.log('El servidor está escuchando en el puerto 3000')}
		)
	}

	public close():void{
		this.server.close()
	}

}

export default App