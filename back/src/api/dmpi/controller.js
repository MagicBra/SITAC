import { success, notFound, authorOrAdmin } from '../../services/response/'
import { Dmpi } from '.'

export const create = ({ user, bodymen: { body } }, res, next) =>
  Dmpi.create({ ...body, author: user })
    .then((dmpi) => dmpi.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Dmpi.count(query)
    .then(count => Dmpi.find(query, select, cursor)
      .populate('author')
      .then((dmpis) => ({
        count,
        rows: dmpis.map((dmpi) => dmpi.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Dmpi.findById(params.id)
    .populate('author')
    .then(notFound(res))
    .then((dmpi) => dmpi ? dmpi.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ user, bodymen: { body }, params }, res, next) =>
  Dmpi.findById(params.id)
    .populate('author')
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'author'))
    .then((dmpi) => dmpi ? Object.assign(dmpi, body).save() : null)
    .then((dmpi) => dmpi ? dmpi.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ user, params }, res, next) =>
  Dmpi.findById(params.id)
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'author'))
    .then((dmpi) => dmpi ? dmpi.remove() : null)
    .then(success(res, 204))
    .catch(next)
