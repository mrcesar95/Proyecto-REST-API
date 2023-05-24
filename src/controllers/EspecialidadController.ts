import { Response , Request } from 'express'
import Controller from './Controller'

class EspecialidadController extends Controller{
      /**
        * Crea un nuevo registro de especialidad en la base de datos.
        * @param req Request object de express que contiene los datos de la especialidad a crear.
        * @param res Response object de express.
        * @returns Un objeto JSON que contiene el mensaje de éxito y la especialidad creada.
        */
    async crearEspecialidad(req:Request,res:Response){	
        try{            
            const { nombre } = req.body
            // Validación de campos vacíos
            if (!nombre) {
                return res.status(400).json({ mensaje: 'Falta el nombre de la especialidad' })
            }

            // Verificación de si la especialidad ya está registrada
            const nombreM = nombre.toUpperCase()
            const nombreRepeat = await this.prismaClient.especialidad.findFirst({
                where: { nombre: { equals: nombreM } },
            })
            if(nombreRepeat){
                return res.status(400).json({ message: 'Esta especialidad ya existe'})
            }

            // Creación del nuevo registro de especialidad en la base de datos
            const especialidad = await this.prismaClient.especialidad.create({
                  data: {
                    nombre: nombreM,
                  },
                })
            return res.status(201).json({ message: 'Creado con exito ', especialidad})
                        
            
        }catch(e){
            console.error(e)
            res.status(500).json({ message: 'Error creando especialidad' })
        }			
    }

      /**
         * Obtiene la lista de todas las especialidades
         * @param req Request object de express.
         * @param res Response object de express.
         * @returns Un objeto JSON que contiene información de las especialidades.
         */
    async obtenerEspecialidad(req:Request, res:Response){
        try{
            const especialidades = await this.prismaClient.especialidad.findMany()
            res.status(200).json({especialidades})
        }catch(e){
            console.error(e)
            res.status(500).json({ message: 'Error en listar la especialidad' })
        }
        
        
    }
      
}
export default EspecialidadController