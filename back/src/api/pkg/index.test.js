import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Pkg } from '.'

const app = () => express(apiRoot, routes)

let userSession, anotherSession, pkg

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const anotherUser = await User.create({ email: 'b@b.com', password: '123456' })
  userSession = signSync(user.id)
  anotherSession = signSync(anotherUser.id)
  pkg = await Pkg.create({ author: user })
})

test('POST /pkgs 201 (user)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession, numero: 'test', package_leader: 'test', is_flying: 'test', mission_nature: 'test', mission_cible: 'test', mission_description: 'test', mission_TOT: 'test', mission_time_margin: 'test', campaign: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.numero).toEqual('test')
  expect(body.package_leader).toEqual('test')
  expect(body.is_flying).toEqual('test')
  expect(body.mission_nature).toEqual('test')
  expect(body.mission_cible).toEqual('test')
  expect(body.mission_description).toEqual('test')
  expect(body.mission_TOT).toEqual('test')
  expect(body.mission_time_margin).toEqual('test')
  expect(body.campaign).toEqual('test')
  expect(typeof body.author).toEqual('object')
})

test('POST /pkgs 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /pkgs 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
})

test('GET /pkgs/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${pkg.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(pkg.id)
})

test('GET /pkgs/:id 404', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /pkgs/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${pkg.id}`)
    .send({ access_token: userSession, numero: 'test', package_leader: 'test', is_flying: 'test', mission_nature: 'test', mission_cible: 'test', mission_description: 'test', mission_TOT: 'test', mission_time_margin: 'test', campaign: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(pkg.id)
  expect(body.numero).toEqual('test')
  expect(body.package_leader).toEqual('test')
  expect(body.is_flying).toEqual('test')
  expect(body.mission_nature).toEqual('test')
  expect(body.mission_cible).toEqual('test')
  expect(body.mission_description).toEqual('test')
  expect(body.mission_TOT).toEqual('test')
  expect(body.mission_time_margin).toEqual('test')
  expect(body.campaign).toEqual('test')
  expect(typeof body.author).toEqual('object')
})

test('PUT /pkgs/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${pkg.id}`)
    .send({ access_token: anotherSession, numero: 'test', package_leader: 'test', is_flying: 'test', mission_nature: 'test', mission_cible: 'test', mission_description: 'test', mission_TOT: 'test', mission_time_margin: 'test', campaign: 'test' })
  expect(status).toBe(401)
})

test('PUT /pkgs/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${pkg.id}`)
  expect(status).toBe(401)
})

test('PUT /pkgs/:id 404 (user)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: anotherSession, numero: 'test', package_leader: 'test', is_flying: 'test', mission_nature: 'test', mission_cible: 'test', mission_description: 'test', mission_TOT: 'test', mission_time_margin: 'test', campaign: 'test' })
  expect(status).toBe(404)
})

test('DELETE /pkgs/:id 204 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${pkg.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(204)
})

test('DELETE /pkgs/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${pkg.id}`)
    .send({ access_token: anotherSession })
  expect(status).toBe(401)
})

test('DELETE /pkgs/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${pkg.id}`)
  expect(status).toBe(401)
})

test('DELETE /pkgs/:id 404 (user)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: anotherSession })
  expect(status).toBe(404)
})
