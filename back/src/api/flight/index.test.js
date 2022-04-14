import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Flight } from '.'

const app = () => express(apiRoot, routes)

let userSession, anotherSession, flight

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const anotherUser = await User.create({ email: 'b@b.com', password: '123456' })
  userSession = signSync(user.id)
  anotherSession = signSync(anotherUser.id)
  flight = await Flight.create({ author: user })
})

test('POST /flights 201 (user)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession, iff_m1: 'test', iff_m3: 'test', cypher_canal: 'test', pkg: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.iff_m1).toEqual('test')
  expect(body.iff_m3).toEqual('test')
  expect(body.cypher_canal).toEqual('test')
  expect(body.pkg).toEqual('test')
  expect(typeof body.author).toEqual('object')
})

test('POST /flights 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /flights 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
})

test('GET /flights/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${flight.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(flight.id)
})

test('GET /flights/:id 404', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /flights/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${flight.id}`)
    .send({ access_token: userSession, iff_m1: 'test', iff_m3: 'test', cypher_canal: 'test', pkg: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(flight.id)
  expect(body.iff_m1).toEqual('test')
  expect(body.iff_m3).toEqual('test')
  expect(body.cypher_canal).toEqual('test')
  expect(body.pkg).toEqual('test')
  expect(typeof body.author).toEqual('object')
})

test('PUT /flights/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${flight.id}`)
    .send({ access_token: anotherSession, iff_m1: 'test', iff_m3: 'test', cypher_canal: 'test', pkg: 'test' })
  expect(status).toBe(401)
})

test('PUT /flights/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${flight.id}`)
  expect(status).toBe(401)
})

test('PUT /flights/:id 404 (user)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: anotherSession, iff_m1: 'test', iff_m3: 'test', cypher_canal: 'test', pkg: 'test' })
  expect(status).toBe(404)
})

test('DELETE /flights/:id 204 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${flight.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(204)
})

test('DELETE /flights/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${flight.id}`)
    .send({ access_token: anotherSession })
  expect(status).toBe(401)
})

test('DELETE /flights/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${flight.id}`)
  expect(status).toBe(401)
})

test('DELETE /flights/:id 404 (user)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: anotherSession })
  expect(status).toBe(404)
})
