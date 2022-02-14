import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Homeplate } from '.'

const app = () => express(apiRoot, routes)

let userSession, anotherSession, homeplate

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const anotherUser = await User.create({ email: 'b@b.com', password: '123456' })
  userSession = signSync(user.id)
  anotherSession = signSync(anotherUser.id)
  homeplate = await Homeplate.create({ author: user })
})

test('POST /homeplates 201 (user)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession, name: 'test', description: 'test', campaign: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.name).toEqual('test')
  expect(body.description).toEqual('test')
  expect(body.campaign).toEqual('test')
  expect(typeof body.author).toEqual('object')
})

test('POST /homeplates 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /homeplates 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /homeplates/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${homeplate.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(homeplate.id)
})

test('GET /homeplates/:id 404', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /homeplates/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${homeplate.id}`)
    .send({ access_token: userSession, name: 'test', description: 'test', campaign: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(homeplate.id)
  expect(body.name).toEqual('test')
  expect(body.description).toEqual('test')
  expect(body.campaign).toEqual('test')
  expect(typeof body.author).toEqual('object')
})

test('PUT /homeplates/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${homeplate.id}`)
    .send({ access_token: anotherSession, name: 'test', description: 'test', campaign: 'test' })
  expect(status).toBe(401)
})

test('PUT /homeplates/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${homeplate.id}`)
  expect(status).toBe(401)
})

test('PUT /homeplates/:id 404 (user)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: anotherSession, name: 'test', description: 'test', campaign: 'test' })
  expect(status).toBe(404)
})

test('DELETE /homeplates/:id 204 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${homeplate.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(204)
})

test('DELETE /homeplates/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${homeplate.id}`)
    .send({ access_token: anotherSession })
  expect(status).toBe(401)
})

test('DELETE /homeplates/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${homeplate.id}`)
  expect(status).toBe(401)
})

test('DELETE /homeplates/:id 404 (user)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: anotherSession })
  expect(status).toBe(404)
})
