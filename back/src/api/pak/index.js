import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Pak, { schema } from './model'

const router = new Router()
const { name, campaign } = schema.tree

/**
 * @api {post} /paks Create pak
 * @apiName CreatePak
 * @apiGroup Pak
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam name Pak's name.
 * @apiParam campaign Pak's campaign.
 * @apiSuccess {Object} pak Pak's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Pak not found.
 * @apiError 401 user access only.
 */
router.post('/',
  token({ required: true }),
  body({ name, campaign }),
  create)

/**
 * @api {get} /paks Retrieve paks
 * @apiName RetrievePaks
 * @apiGroup Pak
 * @apiUse listParams
 * @apiSuccess {Object[]} paks List of paks.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
query({
  campaign : {
    type: String
  }
}),
  index)

/**
 * @api {get} /paks/:id Retrieve pak
 * @apiName RetrievePak
 * @apiGroup Pak
 * @apiSuccess {Object} pak Pak's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Pak not found.
 */
router.get('/:id',
  show)

/**
 * @api {put} /paks/:id Update pak
 * @apiName UpdatePak
 * @apiGroup Pak
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam name Pak's name.
 * @apiParam campaign Pak's campaign.
 * @apiSuccess {Object} pak Pak's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Pak not found.
 * @apiError 401 user access only.
 */
router.put('/:id',
  token({ required: true }),
  body({ name, campaign }),
  update)

/**
 * @api {delete} /paks/:id Delete pak
 * @apiName DeletePak
 * @apiGroup Pak
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Pak not found.
 * @apiError 401 user access only.
 */
router.delete('/:id',
  token({ required: true }),
  destroy)

export default router
