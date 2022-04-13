import { success, notFound, authorOrAdmin } from '../../services/response/'
import { Pak } from '.'
import { Moa } from '../moa'

export const create = ({ user, bodymen: { body } }, res, next) =>
  Pak.create({ ...body, author: user })
    .then((pak) => pak.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Pak.count(query)
    .then(count => Pak.find(query, select, cursor)
      .populate('author')
      .populate('campaign')
      .then((paks) => ({
        count,
        rows: paks.map((pak) => pak.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Pak.findById(params.id)
    .populate('author')
    .populate('campaign')
    .then(notFound(res))
    .then((pak) => pak ? pak.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ user, bodymen: { body }, params }, res, next) =>
  Pak.findById(params.id)
    .populate('author')
    .populate('campaign')
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'author'))
    .then((pak) => pak ? Object.assign(pak, body).save() : null)
    .then((pak) => pak ? pak.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ user, params }, res, next) =>
  Pak.findById(params.id)
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'author'))
    .then((pak) => pak ? deleteDependencies(pak) : null)
    .then(success(res, 204))
    .catch(next)


// Suppression des objets qui font référence à la campagne détruite
function deleteDependencies(pak) {
  Moa.find({ 'pak': pak.id }, deleteMongooseArray)
  return pak.remove();
}


function deleteMongooseArray(err, array) {
  for (var i = 0; i < array.length; i++) {
    var element = array[i];
    if(typeof element.deleteDependencies === "function"){
      element.deleteDependencies(element);
    } else {
      element.remove();
    }
  }
}