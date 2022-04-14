import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Flight, { schema } from './model'

const router = new Router()
const { iff_m1, iff_m3, cypher_canal, pkg } = schema.tree

/**
 * @api {post} /flights Create flight
 * @apiName CreateFlight
 * @apiGroup Flight
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam iff_m1 Flight's iff_m1.
 * @apiParam iff_m3 Flight's iff_m3.
 * @apiParam cypher_canal Flight's cypher_canal.
 * @apiParam pkg Flight's pkg.
 * @apiSuccess {Object} flight Flight's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Flight not found.
 * @apiError 401 user access only.
 */
router.post('/',
  token({ required: true }),
  body({ iff_m1, iff_m3, cypher_canal, pkg }),
  create)

/**
 * @api {get} /flights Retrieve flights
 * @apiName RetrieveFlights
 * @apiGroup Flight
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of flights.
 * @apiSuccess {Object[]} rows List of flights.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  index)

/**
 * @api {get} /flights/:id Retrieve flight
 * @apiName RetrieveFlight
 * @apiGroup Flight
 * @apiSuccess {Object} flight Flight's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Flight not found.
 */
router.get('/:id',
  show)

/**
 * @api {put} /flights/:id Update flight
 * @apiName UpdateFlight
 * @apiGroup Flight
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam iff_m1 Flight's iff_m1.
 * @apiParam iff_m3 Flight's iff_m3.
 * @apiParam cypher_canal Flight's cypher_canal.
 * @apiParam pkg Flight's pkg.
 * @apiSuccess {Object} flight Flight's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Flight not found.
 * @apiError 401 user access only.
 */
router.put('/:id',
  token({ required: true }),
  body({ iff_m1, iff_m3, cypher_canal, pkg }),
  update)

/**
 * @api {delete} /flights/:id Delete flight
 * @apiName DeleteFlight
 * @apiGroup Flight
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Flight not found.
 * @apiError 401 user access only.
 */
router.delete('/:id',
  token({ required: true }),
  destroy)

export default router
