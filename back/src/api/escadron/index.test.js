import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Escadron } from '.'

const app = () => express(apiRoot, routes)

let userSession, anotherSession, escadron

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const anotherUser = await User.create({ email: 'b@b.com', password: '123456' })
  userSession = signSync(user.id)
  anotherSession = signSync(anotherUser.id)
  escadron = await Escadron.create({ author: user })
})

test('POST /escadrons 201 (user)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession, name: 'test', desc: 'test', is_plane: 'test', is_heli: 'test', is_2D: 'test', total_planes: 'test', planes_available: 'test', planes_repair: 'test', planes_destroyed: 'test', combat_level: 'test', missions_types: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.name).toEqual('test')
  expect(body.desc).toEqual('test')
  expect(body.is_plane).toEqual('test')
  expect(body.is_heli).toEqual('test')
  expect(body.is_2D).toEqual('test')
  expect(body.total_planes).toEqual('test')
  expect(body.planes_available).toEqual('test')
  expect(body.planes_repair).toEqual('test')
  expect(body.planes_destroyed).toEqual('test')
  expect(body.combat_level).toEqual('test')
  expect(body.missions_types).toEqual('test')
  expect(typeof body.author).toEqual('object')
})

test('POST /escadrons 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /escadrons 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
})

test('GET /escadrons/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${escadron.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(escadron.id)
})

test('GET /escadrons/:id 404', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /escadrons/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${escadron.id}`)
    .send({ access_token: userSession, name: 'test', desc: 'test', is_plane: 'test', is_heli: 'test', is_2D: 'test', total_planes: 'test', planes_available: 'test', planes_repair: 'test', planes_destroyed: 'test', combat_level: 'test', missions_types: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(escadron.id)
  expect(body.name).toEqual('test')
  expect(body.desc).toEqual('test')
  expect(body.is_plane).toEqual('test')
  expect(body.is_heli).toEqual('test')
  expect(body.is_2D).toEqual('test')
  expect(body.total_planes).toEqual('test')
  expect(body.planes_available).toEqual('test')
  expect(body.planes_repair).toEqual('test')
  expect(body.planes_destroyed).toEqual('test')
  expect(body.combat_level).toEqual('test')
  expect(body.missions_types).toEqual('test')
  expect(typeof body.author).toEqual('object')
})

test('PUT /escadrons/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${escadron.id}`)
    .send({ access_token: anotherSession, name: 'test', desc: 'test', is_plane: 'test', is_heli: 'test', is_2D: 'test', total_planes: 'test', planes_available: 'test', planes_repair: 'test', planes_destroyed: 'test', combat_level: 'test', missions_types: 'test' })
  expect(status).toBe(401)
})

test('PUT /escadrons/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${escadron.id}`)
  expect(status).toBe(401)
})

test('PUT /escadrons/:id 404 (user)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: anotherSession, name: 'test', desc: 'test', is_plane: 'test', is_heli: 'test', is_2D: 'test', total_planes: 'test', planes_available: 'test', planes_repair: 'test', planes_destroyed: 'test', combat_level: 'test', missions_types: 'test' })
  expect(status).toBe(404)
})

test('DELETE /escadrons/:id 204 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${escadron.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(204)
})

test('DELETE /escadrons/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${escadron.id}`)
    .send({ access_token: anotherSession })
  expect(status).toBe(401)
})

test('DELETE /escadrons/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${escadron.id}`)
  expect(status).toBe(401)
})

test('DELETE /escadrons/:id 404 (user)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: anotherSession })
  expect(status).toBe(404)
})
