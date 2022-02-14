import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Opportunity } from '.'

const app = () => express(apiRoot, routes)

let userSession, anotherSession, opportunity

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const anotherUser = await User.create({ email: 'b@b.com', password: '123456' })
  userSession = signSync(user.id)
  anotherSession = signSync(anotherUser.id)
  opportunity = await Opportunity.create({ author: user })
})

test('POST /opportunities 201 (user)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession, name: 'test', description: 'test', is_VEH: 'test', is_SAM: 'test', is_CSAR: 'test', is_UCAS: 'test', priority: 'test', age: 'test', coord_DMS: 'test', alt: 'test', campaign: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.name).toEqual('test')
  expect(body.description).toEqual('test')
  expect(body.is_VEH).toEqual('test')
  expect(body.is_SAM).toEqual('test')
  expect(body.is_CSAR).toEqual('test')
  expect(body.is_UCAS).toEqual('test')
  expect(body.priority).toEqual('test')
  expect(body.age).toEqual('test')
  expect(body.coord_DMS).toEqual('test')
  expect(body.alt).toEqual('test')
  expect(body.campaign).toEqual('test')
  expect(typeof body.author).toEqual('object')
})

test('POST /opportunities 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /opportunities 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /opportunities/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${opportunity.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(opportunity.id)
})

test('GET /opportunities/:id 404', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /opportunities/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${opportunity.id}`)
    .send({ access_token: userSession, name: 'test', description: 'test', is_VEH: 'test', is_SAM: 'test', is_CSAR: 'test', is_UCAS: 'test', priority: 'test', age: 'test', coord_DMS: 'test', alt: 'test', campaign: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(opportunity.id)
  expect(body.name).toEqual('test')
  expect(body.description).toEqual('test')
  expect(body.is_VEH).toEqual('test')
  expect(body.is_SAM).toEqual('test')
  expect(body.is_CSAR).toEqual('test')
  expect(body.is_UCAS).toEqual('test')
  expect(body.priority).toEqual('test')
  expect(body.age).toEqual('test')
  expect(body.coord_DMS).toEqual('test')
  expect(body.alt).toEqual('test')
  expect(body.campaign).toEqual('test')
  expect(typeof body.author).toEqual('object')
})

test('PUT /opportunities/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${opportunity.id}`)
    .send({ access_token: anotherSession, name: 'test', description: 'test', is_VEH: 'test', is_SAM: 'test', is_CSAR: 'test', is_UCAS: 'test', priority: 'test', age: 'test', coord_DMS: 'test', alt: 'test', campaign: 'test' })
  expect(status).toBe(401)
})

test('PUT /opportunities/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${opportunity.id}`)
  expect(status).toBe(401)
})

test('PUT /opportunities/:id 404 (user)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: anotherSession, name: 'test', description: 'test', is_VEH: 'test', is_SAM: 'test', is_CSAR: 'test', is_UCAS: 'test', priority: 'test', age: 'test', coord_DMS: 'test', alt: 'test', campaign: 'test' })
  expect(status).toBe(404)
})

test('DELETE /opportunities/:id 204 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${opportunity.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(204)
})

test('DELETE /opportunities/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${opportunity.id}`)
    .send({ access_token: anotherSession })
  expect(status).toBe(401)
})

test('DELETE /opportunities/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${opportunity.id}`)
  expect(status).toBe(401)
})

test('DELETE /opportunities/:id 404 (user)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: anotherSession })
  expect(status).toBe(404)
})
