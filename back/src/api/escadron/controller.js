import { success, notFound, authorOrAdmin } from '../../services/response/'
import { Escadron } from '.'

export const create = ({ user, bodymen: { body } }, res, next) =>
  Escadron.create({ ...body, author: user })
    .then((escadron) => escadron.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Escadron.count(query)
    .then(count => Escadron.find(query, select, cursor)
      .populate('author')
      .populate('homeplate')
      .then((escadrons) => ({
        count,
        rows: escadrons.map((escadron) => escadron.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Escadron.findById(params.id)
    .populate('author')
    .populate('homeplate')
    .then(notFound(res))
    .then((escadron) => escadron ? escadron.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ user, bodymen: { body }, params }, res, next) =>
  Escadron.findById(params.id)
    .populate('author')
    .populate('homeplate')
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'author'))
    .then((escadron) => escadron ? Object.assign(escadron, body).save() : null)
    .then((escadron) => escadron ? escadron.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ user, params }, res, next) =>
  Escadron.findById(params.id)
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'author'))
    .then((escadron) => escadron ? escadron.remove() : null)
    .then(success(res, 204))
    .catch(next)
