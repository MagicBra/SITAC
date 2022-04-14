import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Pkg, { schema } from './model'

const router = new Router()
const { numero, package_leader, is_flying, mission_nature, mission_cible, mission_description, mission_TOT, mission_time_margin, campaign } = schema.tree

/**
 * @api {post} /pkgs Create pkg
 * @apiName CreatePkg
 * @apiGroup Pkg
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam numero Pkg's numero.
 * @apiParam package_leader Pkg's package_leader.
 * @apiParam is_flying Pkg's is_flying.
 * @apiParam mission_nature Pkg's mission_nature.
 * @apiParam mission_cible Pkg's mission_cible.
 * @apiParam mission_description Pkg's mission_description.
 * @apiParam mission_TOT Pkg's mission_TOT.
 * @apiParam mission_time_margin Pkg's mission_time_margin.
 * @apiParam campaign Pkg's campaign.
 * @apiSuccess {Object} pkg Pkg's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Pkg not found.
 * @apiError 401 user access only.
 */
router.post('/',
  token({ required: true }),
  body({ numero, package_leader, is_flying, mission_nature, mission_cible, mission_description, mission_TOT, mission_time_margin, campaign }),
  create)

/**
 * @api {get} /pkgs Retrieve pkgs
 * @apiName RetrievePkgs
 * @apiGroup Pkg
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of pkgs.
 * @apiSuccess {Object[]} rows List of pkgs.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  index)

/**
 * @api {get} /pkgs/:id Retrieve pkg
 * @apiName RetrievePkg
 * @apiGroup Pkg
 * @apiSuccess {Object} pkg Pkg's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Pkg not found.
 */
router.get('/:id',
  show)

/**
 * @api {put} /pkgs/:id Update pkg
 * @apiName UpdatePkg
 * @apiGroup Pkg
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam numero Pkg's numero.
 * @apiParam package_leader Pkg's package_leader.
 * @apiParam is_flying Pkg's is_flying.
 * @apiParam mission_nature Pkg's mission_nature.
 * @apiParam mission_cible Pkg's mission_cible.
 * @apiParam mission_description Pkg's mission_description.
 * @apiParam mission_TOT Pkg's mission_TOT.
 * @apiParam mission_time_margin Pkg's mission_time_margin.
 * @apiParam campaign Pkg's campaign.
 * @apiSuccess {Object} pkg Pkg's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Pkg not found.
 * @apiError 401 user access only.
 */
router.put('/:id',
  token({ required: true }),
  body({ numero, package_leader, is_flying, mission_nature, mission_cible, mission_description, mission_TOT, mission_time_margin, campaign }),
  update)

/**
 * @api {delete} /pkgs/:id Delete pkg
 * @apiName DeletePkg
 * @apiGroup Pkg
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Pkg not found.
 * @apiError 401 user access only.
 */
router.delete('/:id',
  token({ required: true }),
  destroy)

export default router
