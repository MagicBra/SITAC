import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Dmpi, { schema } from './model'

const router = new Router()
const { name, description, value, type, coord_DMS, alt, image_link, activity, moa } = schema.tree

/**
 * @api {post} /dmpis Create dmpi
 * @apiName CreateDmpi
 * @apiGroup Dmpi
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam name Dmpi's name.
 * @apiParam description Dmpi's description.
 * @apiParam value Dmpi's value.
 * @apiParam type Dmpi's type.
 * @apiParam coord_DMS Dmpi's coord_DMS.
 * @apiParam alt Dmpi's alt.
 * @apiParam image_link Dmpi's image_link.
 * @apiParam activity Dmpi's activity.
 * @apiParam moa Dmpi's moa.
 * @apiSuccess {Object} dmpi Dmpi's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Dmpi not found.
 * @apiError 401 user access only.
 */
router.post('/',
  token({ required: true }),
  body({ name, description, value, type, coord_DMS, alt, image_link, activity, moa }),
  create)

/**
 * @api {get} /dmpis Retrieve dmpis
 * @apiName RetrieveDmpis
 * @apiGroup Dmpi
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of dmpis.
 * @apiSuccess {Object[]} rows List of dmpis.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  index)

/**
 * @api {get} /dmpis/:id Retrieve dmpi
 * @apiName RetrieveDmpi
 * @apiGroup Dmpi
 * @apiSuccess {Object} dmpi Dmpi's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Dmpi not found.
 */
router.get('/:id',
  show)

/**
 * @api {put} /dmpis/:id Update dmpi
 * @apiName UpdateDmpi
 * @apiGroup Dmpi
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam name Dmpi's name.
 * @apiParam description Dmpi's description.
 * @apiParam value Dmpi's value.
 * @apiParam type Dmpi's type.
 * @apiParam coord_DMS Dmpi's coord_DMS.
 * @apiParam alt Dmpi's alt.
 * @apiParam image_link Dmpi's image_link.
 * @apiParam activity Dmpi's activity.
 * @apiParam moa Dmpi's moa.
 * @apiSuccess {Object} dmpi Dmpi's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Dmpi not found.
 * @apiError 401 user access only.
 */
router.put('/:id',
  token({ required: true }),
  body({ name, description, value, type, coord_DMS, alt, image_link, activity, moa }),
  update)

/**
 * @api {delete} /dmpis/:id Delete dmpi
 * @apiName DeleteDmpi
 * @apiGroup Dmpi
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Dmpi not found.
 * @apiError 401 user access only.
 */
router.delete('/:id',
  token({ required: true }),
  destroy)

export default router
