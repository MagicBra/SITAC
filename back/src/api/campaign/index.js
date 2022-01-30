import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Campaign, { schema } from './model'

const router = new Router()
const { name, description } = schema.tree

/**
 * @api {post} /campaigns Create campaign
 * @apiName CreateCampaign
 * @apiGroup Campaign
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam name Campaign's name.
 * @apiParam description Campaign's description.
 * @apiSuccess {Object} campaign Campaign's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Campaign not found.
 * @apiError 401 user access only.
 */
router.post('/',
  token({ required: true }),
  body({ name, description }),
  create)

/**
 * @api {get} /campaigns Retrieve campaigns
 * @apiName RetrieveCampaigns
 * @apiGroup Campaign
 * @apiUse listParams
 * @apiSuccess {Object[]} campaigns List of campaigns.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  index)

/**
 * @api {get} /campaigns/:id Retrieve campaign
 * @apiName RetrieveCampaign
 * @apiGroup Campaign
 * @apiSuccess {Object} campaign Campaign's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Campaign not found.
 */
router.get('/:id',
  show)

/**
 * @api {put} /campaigns/:id Update campaign
 * @apiName UpdateCampaign
 * @apiGroup Campaign
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam name Campaign's name.
 * @apiParam description Campaign's description.
 * @apiSuccess {Object} campaign Campaign's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Campaign not found.
 * @apiError 401 user access only.
 */
router.put('/:id',
  token({ required: true }),
  body({ name, description }),
  update)

/**
 * @api {delete} /campaigns/:id Delete campaign
 * @apiName DeleteCampaign
 * @apiGroup Campaign
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Campaign not found.
 * @apiError 401 admin access only.
 */
router.delete('/:id',
  token({ required: true}),
  destroy)

export default router
