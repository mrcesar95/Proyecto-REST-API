import App from '../src/App'
import request from 'supertest'
    
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

    /**Prueba unitaria para la ruta que lista las citas.*/
    it('Debe listar las citas', async () => {
    const response = await request(app.app).get('/Cita')
    expect(response.statusCode).toEqual(200)
    expect(response.body.length).toBeGreaterThan(0)
    })
    
    /**Prueba unitaria para la ruta que intenta crear una cita que ya existe.*/
      it('No Debe crear una cita', async () => {
      const nuevaCita = {
      fecha: '27-05-2023',
      pacienteCdula: 454545,
      tarjetaProfesional: 595951,
      }
      const response = await request(app.app)
      .post('/Cita')
      .send(nuevaCita)
      expect(response.statusCode).toEqual(400)
    })
  })