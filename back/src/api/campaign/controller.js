import { success, notFound, authorOrAdmin } from '../../services/response/'
import { Campaign } from '.'
import { Pak } from '../pak'

export const create = ({ user, bodymen: { body } }, res, next) =>
  Campaign.create({ ...body, author: user })
    .then((campaign) => campaign.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Campaign.find(query, select, cursor)
    .populate('author')
    .then((campaigns) => campaigns.map((campaign) => campaign.view()))
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

export const destroy = ({  user, params }, res, next) =>
  Campaign.findById(params.id)
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'author'))
    .then((campaign) => campaign ? deleteDependencies(campaign) : null)
    .then(success(res, 204))
    .catch(next)


// Suppression des objets qui font référence à la campagne détruite détruit
function deleteDependencies(campaign) {
    Pak.find({'campaign': campaign.id}, deletePaks)
    return campaign.remove();
  }


  function deletePaks (err, paks)
  { 
    console.log(paks)
    for (var i = 0; i < paks.length; i++) {
      paks[i].remove();
    }
  }