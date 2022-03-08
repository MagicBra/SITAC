import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Moa } from '.'

const app = () => express(apiRoot, routes)

let userSession, anotherSession, moa

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const anotherUser = await User.create({ email: 'b@b.com', password: '123456' })
  userSession = signSync(user.id)
  anotherSession = signSync(anotherUser.id)
  moa = await Moa.create({ author: user })
})

test('POST /moas 201 (user)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession, name: 'test', side: 'test', pak: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.name).toEqual('test')
  expect(body.side).toEqual('test')
  expect(body.pak).toEqual('test')
  expect(typeof body.author).toEqual('object')
})

test('POST /moas 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /moas 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
})

test('GET /moas/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${moa.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(moa.id)
})

test('GET /moas/:id 404', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /moas/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${moa.id}`)
    .send({ access_token: userSession, name: 'test', side: 'test', pak: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(moa.id)
  expect(body.name).toEqual('test')
  expect(body.side).toEqual('test')
  expect(body.pak).toEqual('test')
  expect(typeof body.author).toEqual('object')
})

test('PUT /moas/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${moa.id}`)
    .send({ access_token: anotherSession, name: 'test', side: 'test', pak: 'test' })
  expect(status).toBe(401)
})

test('PUT /moas/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${moa.id}`)
  expect(status).toBe(401)
})

test('PUT /moas/:id 404 (user)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: anotherSession, name: 'test', side: 'test', pak: 'test' })
  expect(status).toBe(404)
})

test('DELETE /moas/:id 204 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${moa.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(204)
})

test('DELETE /moas/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${moa.id}`)
    .send({ access_token: anotherSession })
  expect(status).toBe(401)
})

test('DELETE /moas/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${moa.id}`)
  expect(status).toBe(401)
})

test('DELETE /moas/:id 404 (user)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: anotherSession })
  expect(status).toBe(404)
})
