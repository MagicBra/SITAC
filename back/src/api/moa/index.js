import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Moa, { schema } from './model'

const router = new Router()
const { name, side, pak } = schema.tree

/**
 * @api {post} /moas Create moa
 * @apiName CreateMoa
 * @apiGroup Moa
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam name Moa's name.
 * @apiParam side Moa's side.
 * @apiParam pak Moa's pak.
 * @apiSuccess {Object} moa Moa's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Moa not found.
 * @apiError 401 user access only.
 */
router.post('/',
  token({ required: true }),
  body({ name, side, pak }),
  create)

/**
 * @api {get} /moas Retrieve moas
 * @apiName RetrieveMoas
 * @apiGroup Moa
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of moas.
 * @apiSuccess {Object[]} rows List of moas.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  index)

/**
 * @api {get} /moas/:id Retrieve moa
 * @apiName RetrieveMoa
 * @apiGroup Moa
 * @apiSuccess {Object} moa Moa's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Moa not found.
 */
router.get('/:id',
  show)

/**
 * @api {put} /moas/:id Update moa
 * @apiName UpdateMoa
 * @apiGroup Moa
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam name Moa's name.
 * @apiParam side Moa's side.
 * @apiParam pak Moa's pak.
 * @apiSuccess {Object} moa Moa's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Moa not found.
 * @apiError 401 user access only.
 */
router.put('/:id',
  token({ required: true }),
  body({ name, side, pak }),
  update)

/**
 * @api {delete} /moas/:id Delete moa
 * @apiName DeleteMoa
 * @apiGroup Moa
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Moa not found.
 * @apiError 401 user access only.
 */
router.delete('/:id',
  token({ required: true }),
  destroy)

export default router
