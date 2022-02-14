import { success, notFound, authorOrAdmin } from '../../services/response/'
import { Homeplate } from '.'

export const create = ({ user, bodymen: { body } }, res, next) =>
  Homeplate.create({ ...body, author: user })
    .then((homeplate) => homeplate.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Homeplate.find(query, select, cursor)
    .populate('author')
    .populate('campaign')
    .then((homeplates) => homeplates.map((homeplate) => homeplate.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Homeplate.findById(params.id)
    .populate('author')
    .populate('campaign')
    .then(notFound(res))
    .then((homeplate) => homeplate ? homeplate.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ user, bodymen: { body }, params }, res, next) =>
  Homeplate.findById(params.id)
    .populate('author')
    .populate('campaign')
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'author'))
    .then((homeplate) => homeplate ? Object.assign(homeplate, body).save() : null)
    .then((homeplate) => homeplate ? homeplate.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ user, params }, res, next) =>
  Homeplate.findById(params.id)
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'author'))
    .then((homeplate) => homeplate ? homeplate.remove() : null)
    .then(success(res, 204))
    .catch(next)
