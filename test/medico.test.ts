import request from 'supertest'
import App from '../src/App'

/**Pruebas unitarias de las rutas de la API.*/
describe('Routes', () => {
  let app: App

  /**Crea una instancia de la aplicación antes de ejecutar las pruebas.*/
  beforeAll(() => {
    app = new App()
  })

   /**Cierra la instancia de la aplicación después de ejecutar las pruebas.*/
  afterAll(() => {
    app.close()
  })

  /**Prueba unitaria para la ruta que lista los medicos.*/
  it('Listar los medicos', async () => {
    const response = await request(app.app).get('/Medico')
    expect(response.statusCode).toEqual(200)
    expect(response.body.length).toBeGreaterThan(0)
  })

  
  /**Prueba unitaria para la ruta que intenta crear un medico que ya existe.*/
  it('No crear un medico', async () => {
    const nuevoMedico = {
        tarjetaProfesional: 5928174306,
		nombre: 'Pedro',
		apellido: 'Gomez',
		consultorio: '401',
		correo: 'pedro@gmail.com',
		especialidad: 'Odontologia'
    }
    const response = await request(app.app)
      .post('/Medico')
      .send(nuevoMedico)
      expect(response.statusCode).toEqual(400)
  })
  
})