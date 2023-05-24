import { Response , Request } from 'express'
import Controller from './Controller'

class CitaController extends Controller{
      /**
        * Crea un nuevo registro de cita en la base de datos.
        * @param req Request object de express que contiene los datos de la cita a crear.
        * @param res Response object de express.
        * @returns Un objeto JSON que contiene el mensaje de éxito y la cita creada.
        */
    async crearCita(req:Request, res: Response){
        try{

           const {fecha,pacienteCedula,tarjetaProfesional} = req.body

            // Validación de campos vacíos
           if (Object.values({ fecha,pacienteCedula,tarjetaProfesional }).some(value => !value)) {
            return res.status(400).json({ message: 'Debe completar todos los campos' })
            }

            // Validación de existencia de la cedula del paciente y de la tarjeta profesional del medico
            const cedulaExist = await this.prismaClient.paciente.findFirst({
                where: { cedula: { equals: pacienteCedula } },
            })
            const tarjetaExist = await this.prismaClient.medico.findFirst({
                where: { tarjetaProfesional: { equals: tarjetaProfesional } },
            })    
            
            if(!cedulaExist || !tarjetaExist){
              return res.status(400).json({ message: 'Este numero de cedula no existe!' })
            }

            // Convierte la fecha de nacimiento en formato de cadena (AAAA-MM-DD) a un objeto Date de JavaScript
            const fechaCita = new Date(fecha.split('-').reverse().join('-'))       

            // Creación del nuevo registro de cita en la base de datos
            const cita = await this.prismaClient.cita.create({
                data: {                    
                    fecha: fechaCita,
                    pacienteCedula,
                    tarjetaProfesional
                }
            }) 
            return res.status(201).json({ message: 'Creada con exito ', cita})   
        }catch(e){
            console.error(e)
            res.status(500).json({ message: 'Error en crear cita' })
        }
    }

    /**
        * Obtiene la lista de todas las citas
        * @param req Request object de express.
        * @param res Response object de express.
        * @returns Un objeto JSON que contiene información de las citas
    */
    async obtenerCitas(req:Request, res:Response){
        try{
            const resul = await this.prismaClient.cita.findMany({
                include: {
                  Paciente:true,
                  Medico:true
                },
              })
              /*
                Primero llama a todas las citas existentes y las añade a la variable citas
                Posteriormente se toma citas en un map en donde en modo json crea nombres representativos
                de lo que se mostrara tomando los datos de las citas uniendo los datos relacionados con las otras tablas
              */
              const citas = resul.map((cita) => ({
                Nombre_Medico: cita.Medico?.nombre,
                Apellido_Medico: cita.Medico?.apellido,
                Nombre_Paciente: cita.Paciente?.nombre,
                Apellido_Paciente: cita.Paciente?.apellido,
                Cedula_Paciente: cita.Paciente?.cedula,
                Dia_Cita: cita.fecha

              }))
            
            res.status(200).json({citas})
        }catch(e){
            console.error(e)
            res.status(500).json({ message: 'Error en listar las citas' })
        }
    }

}
export default CitaController