import { success, notFound, authorOrAdmin } from '../../services/response/'
import { Moa } from '.'

export const create = ({ user, bodymen: { body } }, res, next) =>
  Moa.create({ ...body, author: user })
    .then((moa) => moa.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Moa.count(query)
    .then(count => Moa.find(query, select, cursor)
      .populate('author')
      .populate('pak')
      .then((moas) => ({
        count,
        rows: moas.map((moa) => moa.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Moa.findById(params.id)
    .populate('author')
    .populate('pak')
    .then(notFound(res))
    .then((moa) => moa ? moa.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ user, bodymen: { body }, params }, res, next) =>
  Moa.findById(params.id)
    .populate('author')
    .populate('pak')
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'author'))
    .then((moa) => moa ? Object.assign(moa, body).save() : null)
    .then((moa) => moa ? moa.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ user, params }, res, next) =>
  Moa.findById(params.id)
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'author'))
    .then((moa) => moa ? moa.remove() : null)
    .then(success(res, 204))
    .catch(next)