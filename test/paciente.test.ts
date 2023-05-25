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
  it('Listar los pacientes', async () => {
    const response = await request(app.app).get('/Paciente')
    expect(response.statusCode).toEqual(200)
    expect(response.body.length).toBeGreaterThan(0)
  })


  /**Prueba unitaria para la ruta que intenta crear un paciente que ya existe.*/
  it('No Debe crear un paciente', async () => {
    const nuevoPaciente = {
        cedula: 17197755,
        nombre: test,
        apellido: test,
        fechaNacimiento: '06-01-1948',
        telefono: 3112317
    }
    const response = await request(app.app)
      .post('/Paciente')
      .send(nuevoPaciente)
      expect(response.statusCode).toEqual(400)
  })
  
})