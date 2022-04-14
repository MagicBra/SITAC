import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Escadron, { schema } from './model'

const router = new Router()
const { name, desc, is_plane, is_heli, is_2D, total_planes, planes_available, planes_repair, planes_destroyed, combat_level, missions_types, homeplate } = schema.tree

/**
 * @api {post} /escadrons Create escadron
 * @apiName CreateEscadron
 * @apiGroup Escadron
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam name Escadron's name.
 * @apiParam desc Escadron's desc.
 * @apiParam is_plane Escadron's is_plane.
 * @apiParam is_heli Escadron's is_heli.
 * @apiParam is_2D Escadron's is_2D.
 * @apiParam total_planes Escadron's total_planes.
 * @apiParam planes_available Escadron's planes_available.
 * @apiParam planes_repair Escadron's planes_repair.
 * @apiParam planes_destroyed Escadron's planes_destroyed.
 * @apiParam combat_level Escadron's combat_level.
 * @apiParam missions_types Escadron's missions_types.
 * @apiParam homeplate Escadron's homeplate.
 * @apiSuccess {Object} escadron Escadron's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Escadron not found.
 * @apiError 401 user access only.
 */
router.post('/',
  token({ required: true }),
  body({ name, desc, is_plane, is_heli, is_2D, total_planes, planes_available, planes_repair, planes_destroyed, combat_level, missions_types, homeplate }),
  create)

/**
 * @api {get} /escadrons Retrieve escadrons
 * @apiName RetrieveEscadrons
 * @apiGroup Escadron
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of escadrons.
 * @apiSuccess {Object[]} rows List of escadrons.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  index)

/**
 * @api {get} /escadrons/:id Retrieve escadron
 * @apiName RetrieveEscadron
 * @apiGroup Escadron
 * @apiSuccess {Object} escadron Escadron's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Escadron not found.
 */
router.get('/:id',
  show)

/**
 * @api {put} /escadrons/:id Update escadron
 * @apiName UpdateEscadron
 * @apiGroup Escadron
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam name Escadron's name.
 * @apiParam desc Escadron's desc.
 * @apiParam is_plane Escadron's is_plane.
 * @apiParam is_heli Escadron's is_heli.
 * @apiParam is_2D Escadron's is_2D.
 * @apiParam total_planes Escadron's total_planes.
 * @apiParam planes_available Escadron's planes_available.
 * @apiParam planes_repair Escadron's planes_repair.
 * @apiParam planes_destroyed Escadron's planes_destroyed.
 * @apiParam combat_level Escadron's combat_level.
 * @apiParam missions_types Escadron's missions_types.
 * @apiSuccess {Object} escadron Escadron's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Escadron not found.
 * @apiError 401 user access only.
 */
router.put('/:id',
  token({ required: true }),
  body({ name, desc, is_plane, is_heli, is_2D, total_planes, planes_available, planes_repair, planes_destroyed, combat_level, missions_types, homeplate }),
  update)

/**
 * @api {delete} /escadrons/:id Delete escadron
 * @apiName DeleteEscadron
 * @apiGroup Escadron
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Escadron not found.
 * @apiError 401 user access only.
 */
router.delete('/:id',
  token({ required: true }),
  destroy)

export default router
