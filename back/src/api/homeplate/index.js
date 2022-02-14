import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Homeplate, { schema } from './model'

const router = new Router()
const { name, description, campaign } = schema.tree

/**
 * @api {post} /homeplates Create homeplate
 * @apiName CreateHomeplate
 * @apiGroup Homeplate
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam name Homeplate's name.
 * @apiParam description Homeplate's description.
 * @apiParam campaign Homeplate's campaign.
 * @apiSuccess {Object} homeplate Homeplate's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Homeplate not found.
 * @apiError 401 user access only.
 */
router.post('/',
  token({ required: true }),
  body({ name, description, campaign }),
  create)

/**
 * @api {get} /homeplates Retrieve homeplates
 * @apiName RetrieveHomeplates
 * @apiGroup Homeplate
 * @apiUse listParams
 * @apiSuccess {Object[]} homeplates List of homeplates.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  index)

/**
 * @api {get} /homeplates/:id Retrieve homeplate
 * @apiName RetrieveHomeplate
 * @apiGroup Homeplate
 * @apiSuccess {Object} homeplate Homeplate's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Homeplate not found.
 */
router.get('/:id',
  show)

/**
 * @api {put} /homeplates/:id Update homeplate
 * @apiName UpdateHomeplate
 * @apiGroup Homeplate
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam name Homeplate's name.
 * @apiParam description Homeplate's description.
 * @apiParam campaign Homeplate's campaign.
 * @apiSuccess {Object} homeplate Homeplate's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Homeplate not found.
 * @apiError 401 user access only.
 */
router.put('/:id',
  token({ required: true }),
  body({ name, description, campaign }),
  update)

/**
 * @api {delete} /homeplates/:id Delete homeplate
 * @apiName DeleteHomeplate
 * @apiGroup Homeplate
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Homeplate not found.
 * @apiError 401 user access only.
 */
router.delete('/:id',
  token({ required: true }),
  destroy)

export default router
