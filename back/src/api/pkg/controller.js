import { success, notFound, authorOrAdmin } from '../../services/response/'
import { Pkg } from '.'

export const create = ({ user, bodymen: { body } }, res, next) =>
  Pkg.create({ ...body, author: user })
    .then((pkg) => pkg.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Pkg.count(query)
    .then(count => Pkg.find(query, select, cursor)
      .populate('author')
      .then((pkgs) => ({
        count,
        rows: pkgs.map((pkg) => pkg.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Pkg.findById(params.id)
    .populate('author')
    .then(notFound(res))
    .then((pkg) => pkg ? pkg.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ user, bodymen: { body }, params }, res, next) =>
  Pkg.findById(params.id)
    .populate('author')
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'author'))
    .then((pkg) => pkg ? Object.assign(pkg, body).save() : null)
    .then((pkg) => pkg ? pkg.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ user, params }, res, next) =>
  Pkg.findById(params.id)
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'author'))
    .then((pkg) => pkg ? pkg.remove() : null)
    .then(success(res, 204))
    .catch(next)
