import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Pak } from '.'

const app = () => express(apiRoot, routes)

let userSession, anotherSession, pak

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const anotherUser = await User.create({ email: 'b@b.com', password: '123456' })
  userSession = signSync(user.id)
  anotherSession = signSync(anotherUser.id)
  pak = await Pak.create({ author: user })
})

test('POST /paks 201 (user)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession, name: 'test', campaign: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.name).toEqual('test')
  expect(body.campaign).toEqual('test')
  expect(typeof body.author).toEqual('object')
})

test('POST /paks 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /paks 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /paks/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${pak.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(pak.id)
})

test('GET /paks/:id 404', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /paks/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${pak.id}`)
    .send({ access_token: userSession, name: 'test', campaign: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(pak.id)
  expect(body.name).toEqual('test')
  expect(body.campaign).toEqual('test')
  expect(typeof body.author).toEqual('object')
})

test('PUT /paks/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${pak.id}`)
    .send({ access_token: anotherSession, name: 'test', campaign: 'test' })
  expect(status).toBe(401)
})

test('PUT /paks/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${pak.id}`)
  expect(status).toBe(401)
})

test('PUT /paks/:id 404 (user)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: anotherSession, name: 'test', campaign: 'test' })
  expect(status).toBe(404)
})

test('DELETE /paks/:id 204 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${pak.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(204)
})

test('DELETE /paks/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${pak.id}`)
    .send({ access_token: anotherSession })
  expect(status).toBe(401)
})

test('DELETE /paks/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${pak.id}`)
  expect(status).toBe(401)
})

test('DELETE /paks/:id 404 (user)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: anotherSession })
  expect(status).toBe(404)
})
