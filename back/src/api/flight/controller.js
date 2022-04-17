import { success, notFound, authorOrAdmin } from '../../services/response/'
import { Flight } from '.'

export const create = ({ user, bodymen: { body } }, res, next) =>
  Flight.create({ ...body, author: user })
    .then((flight) => flight.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Flight.count(query)
    .then(count => Flight.find(query, select, cursor)
      .populate('author')
      .then((flights) => ({
        count,
        rows: flights.map((flight) => flight.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Flight.findById(params.id)
    .populate('author')
    .then(notFound(res))
    .then((flight) => flight ? flight.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ user, bodymen: { body }, params }, res, next) =>
  Flight.findById(params.id)
    .populate('author')
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'author'))
    .then((flight) => flight ? Object.assign(flight, body).save() : null)
    .then((flight) => flight ? flight.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ user, params }, res, next) =>
  Flight.findById(params.id)
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'author'))
    .then((flight) => flight ? flight.remove() : null)
    .then(success(res, 204))
    .catch(next)
