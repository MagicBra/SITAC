import { success, notFound, authorOrAdmin } from '../../services/response/'
import { Campaign } from '.'
import { Pak } from '../pak'
import { Opportunity } from '../opportunity'
import { Homeplate } from '../homeplate'

export const create = ({ user, bodymen: { body } }, res, next) =>
  Campaign.create({ ...body, author: user })
    .then((campaign) => campaign.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Campaign.count(query)
    .then(count => Campaign.find(query, select, cursor)
      .populate('author')
      .then((campaigns) => ({
        count,
        rows: campaigns.map((campaign) => campaign.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Campaign.findById(params.id)
    .populate('author')
    .then(notFound(res))
    .then((campaign) => campaign ? campaign.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ user, bodymen: { body }, params }, res, next) =>
  Campaign.findById(params.id)
    .populate('author')
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'author'))
    .then((campaign) => campaign ? Object.assign(campaign, body).save() : null)
    .then((campaign) => campaign ? campaign.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ user, params }, res, next) =>
  Campaign.findById(params.id)
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'author'))
    .then((campaign) => campaign ? deleteDependencies(campaign) : null)
    .then(success(res, 204))
    .catch(next)


// Suppression des objets qui font référence à la campagne détruite
function deleteDependencies(campaign) {
  Pak.find({ 'campaign': campaign.id }, deleteMongooseArray)
  Opportunity.find({ 'campaign': campaign.id }, deleteMongooseArray)
  Homeplate.find({ 'campaign': campaign.id }, deleteMongooseArray)
  return campaign.remove();
}


function deleteMongooseArray(err, array) {
  for (var i = 0; i < array.length; i++) {
    array[i].remove();
  }
}