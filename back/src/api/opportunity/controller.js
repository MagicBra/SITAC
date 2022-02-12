import { success, notFound, authorOrAdmin } from '../../services/response/'
import { Opportunity } from '.'

export const create = ({ user, bodymen: { body } }, res, next) =>
  Opportunity.create({ ...body, author: user })
    .then((opportunity) => opportunity.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Opportunity.find(query, select, cursor)
    .populate('author')
    .populate('campaign')
    .then((opportunities) => opportunities.map((opportunity) => opportunity.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Opportunity.findById(params.id)
    .populate('author')
    .populate('campaign')
    .then(notFound(res))
    .then((opportunity) => opportunity ? opportunity.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ user, bodymen: { body }, params }, res, next) =>
  Opportunity.findById(params.id)
    .populate('author')
    .populate('campaign')
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'author'))
    .then((opportunity) => opportunity ? Object.assign(opportunity, body).save() : null)
    .then((opportunity) => opportunity ? opportunity.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ user, params }, res, next) =>
  Opportunity.findById(params.id)
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'author'))
    .then((opportunity) => opportunity ? opportunity.remove() : null)
    .then(success(res, 204))
    .catch(next)
