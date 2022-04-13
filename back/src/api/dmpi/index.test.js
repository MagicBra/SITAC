import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Dmpi } from '.'

const app = () => express(apiRoot, routes)

let userSession, anotherSession, dmpi

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const anotherUser = await User.create({ email: 'b@b.com', password: '123456' })
  userSession = signSync(user.id)
  anotherSession = signSync(anotherUser.id)
  dmpi = await Dmpi.create({ author: user })
})

test('POST /dmpis 201 (user)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession, name: 'test', description: 'test', value: 'test', type: 'test', coord_DMS: 'test', alt: 'test', image_link: 'test', activity: 'test', moa: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.name).toEqual('test')
  expect(body.description).toEqual('test')
  expect(body.value).toEqual('test')
  expect(body.type).toEqual('test')
  expect(body.coord_DMS).toEqual('test')
  expect(body.alt).toEqual('test')
  expect(body.image_link).toEqual('test')
  expect(body.activity).toEqual('test')
  expect(body.moa).toEqual('test')
  expect(typeof body.author).toEqual('object')
})

test('POST /dmpis 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /dmpis 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
})

test('GET /dmpis/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${dmpi.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(dmpi.id)
})

test('GET /dmpis/:id 404', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /dmpis/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${dmpi.id}`)
    .send({ access_token: userSession, name: 'test', description: 'test', value: 'test', type: 'test', coord_DMS: 'test', alt: 'test', image_link: 'test', activity: 'test', moa: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(dmpi.id)
  expect(body.name).toEqual('test')
  expect(body.description).toEqual('test')
  expect(body.value).toEqual('test')
  expect(body.type).toEqual('test')
  expect(body.coord_DMS).toEqual('test')
  expect(body.alt).toEqual('test')
  expect(body.image_link).toEqual('test')
  expect(body.activity).toEqual('test')
  expect(body.moa).toEqual('test')
  expect(typeof body.author).toEqual('object')
})

test('PUT /dmpis/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${dmpi.id}`)
    .send({ access_token: anotherSession, name: 'test', description: 'test', value: 'test', type: 'test', coord_DMS: 'test', alt: 'test', image_link: 'test', activity: 'test', moa: 'test' })
  expect(status).toBe(401)
})

test('PUT /dmpis/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${dmpi.id}`)
  expect(status).toBe(401)
})

test('PUT /dmpis/:id 404 (user)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: anotherSession, name: 'test', description: 'test', value: 'test', type: 'test', coord_DMS: 'test', alt: 'test', image_link: 'test', activity: 'test', moa: 'test' })
  expect(status).toBe(404)
})

test('DELETE /dmpis/:id 204 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${dmpi.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(204)
})

test('DELETE /dmpis/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${dmpi.id}`)
    .send({ access_token: anotherSession })
  expect(status).toBe(401)
})

test('DELETE /dmpis/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${dmpi.id}`)
  expect(status).toBe(401)
})

test('DELETE /dmpis/:id 404 (user)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: anotherSession })
  expect(status).toBe(404)
})
