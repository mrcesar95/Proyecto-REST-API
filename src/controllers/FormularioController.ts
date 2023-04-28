import { Request, Response } from 'express'

import * as jsonSchema from '../json-schema.json'

type JsonSchema = Record < string, any >

class FormularioController{

    obtenerDefinicion(req:Request, res:Response){

        //1. Extraer el nombre del formulario
        const { formulario }= req.params
        const miEsquema: JsonSchema= jsonSchema

        if (miEsquema.definitions[formulario]){

            res.json(miEsquema.definitions[formulario])
        }else{
            res.status(400)
            res.json({error: `No se encontró el formulario ${formulario}`})
        }
    }
}

export default FormularioController




