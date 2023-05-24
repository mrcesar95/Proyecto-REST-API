import request from 'supertest'
import App from '../src/App'

describe('Routes', () => {
  let app: App

  beforeAll(() => {
    app = new App()
    app.start()
  })

  afterAll(() => {
    app.close()
  })

  
  it('Debe retornar 404 ya que no existe la ruta', async () => {
    const response = await request(app.app).get('/non-existent-route')
    expect(response.status).toBe(404)
    expect(response.body).toEqual({ message: 'Recurso no encontrado' })
  })
})