import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Campaign } from '.'

const app = () => express(apiRoot, routes)

let userSession, anotherSession, adminSession, campaign

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const anotherUser = await User.create({ email: 'b@b.com', password: '123456' })
  const admin = await User.create({ email: 'c@c.com', password: '123456', role: 'admin' })
  userSession = signSync(user.id)
  anotherSession = signSync(anotherUser.id)
  adminSession = signSync(admin.id)
  campaign = await Campaign.create({ author: user })
})

test('POST /campaigns 201 (user)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession, name: 'test', description: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.name).toEqual('test')
  expect(body.description).toEqual('test')
  expect(typeof body.author).toEqual('object')
})

test('POST /campaigns 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /campaigns 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /campaigns/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${campaign.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(campaign.id)
})

test('GET /campaigns/:id 404', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /campaigns/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${campaign.id}`)
    .send({ access_token: userSession, name: 'test', description: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(campaign.id)
  expect(body.name).toEqual('test')
  expect(body.description).toEqual('test')
  expect(typeof body.author).toEqual('object')
})

test('PUT /campaigns/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${campaign.id}`)
    .send({ access_token: anotherSession, name: 'test', description: 'test' })
  expect(status).toBe(401)
})

test('PUT /campaigns/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${campaign.id}`)
  expect(status).toBe(401)
})

test('PUT /campaigns/:id 404 (user)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: anotherSession, name: 'test', description: 'test' })
  expect(status).toBe(404)
})

test('DELETE /campaigns/:id 204 (admin)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${campaign.id}`)
    .query({ access_token: adminSession })
  expect(status).toBe(204)
})

test('DELETE /campaigns/:id 401 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${campaign.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(401)
})

test('DELETE /campaigns/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${campaign.id}`)
  expect(status).toBe(401)
})

test('DELETE /campaigns/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: adminSession })
  expect(status).toBe(404)
})
