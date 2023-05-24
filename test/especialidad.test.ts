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
  
    /**Prueba unitaria para la ruta que lista las especialidades.*/
  it('Debe listar las especialidades', async () => {
    const response = await request(app.app).get('/Especialidad')
    expect(response.statusCode).toEqual(200)
    expect(response.body.length).toBeGreaterThan(0)
  })

  /**Prueba unitaria para la ruta que intenta crear una especialidad que ya existe.*/
  it('No debe crear una nueva especialidad', async () => {
    const nuevaEspecialidad = {
        nombre: 'Pediatria'
    }
    const response = await request(app.app)
      .post('/Especialidad')
      .send(nuevaEspecialidad); response
      expect(response.statusCode).toEqual(400)
  })
  
})