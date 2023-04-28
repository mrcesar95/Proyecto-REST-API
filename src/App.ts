/* eslint-disable no-mixed-spaces-and-tabs */
import swaggerUi from 'swagger-ui-express'
import { swaggerSpec } from './swagger.conf'
import express,{Application, Request, Response} from 'express'

import PacienteRouter from './routes/Paciente.routes'
import MedicoRouter from './routes/Medico.routes'
import FormularioRouter from './routes/Formulario.routes'
import cors from 'cors'

/**
 * Clase principal de la API. Define las rutas de la API
 * 
 * @author Paulo César Coronado
 * @description Clase inicial de ejemplo para manejar rutas y documentación
 */
class App{

	//Atributos
	public app:Application
	private server:any
	

	/**
     * Método constructor de la clase
     * 
     * @author Paulo César Coronado
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
	}

	/**
	 * Definir y agregar las rutas de la API con express
	 */
	private routes():void{
		
        this.app.use('/', PacienteRouter)
		this.app.use('/', MedicoRouter)
		this.app.use('/', FormularioRouter)

		
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