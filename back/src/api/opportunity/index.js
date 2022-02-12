import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Opportunity, { schema } from './model'

const router = new Router()
const { name, description, is_VEH, is_SAM, is_CSAR, is_UCAS, priority, age, coord_DMS, alt, campaign } = schema.tree

/**
 * @api {post} /opportunities Create opportunity
 * @apiName CreateOpportunity
 * @apiGroup Opportunity
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam name Opportunity's name.
 * @apiParam description Opportunity's description.
 * @apiParam is_VEH Opportunity's is_VEH.
 * @apiParam is_SAM Opportunity's is_SAM.
 * @apiParam is_CSAR Opportunity's is_CSAR.
 * @apiParam is_UCAS Opportunity's is_UCAS.
 * @apiParam priority Opportunity's priority.
 * @apiParam age Opportunity's age.
 * @apiParam coord_DMS Opportunity's coord_DMS.
 * @apiParam alt Opportunity's alt.
 * @apiParam campaign Opportunity's campaign.
 * @apiSuccess {Object} opportunity Opportunity's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Opportunity not found.
 * @apiError 401 user access only.
 */
router.post('/',
  token({ required: true }),
  body({ name, description, is_VEH, is_SAM, is_CSAR, is_UCAS, priority, age, coord_DMS, alt, campaign }),
  create)

/**
 * @api {get} /opportunities Retrieve opportunities
 * @apiName RetrieveOpportunities
 * @apiGroup Opportunity
 * @apiUse listParams
 * @apiSuccess {Object[]} opportunities List of opportunities.
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
 * @api {get} /opportunities/:id Retrieve opportunity
 * @apiName RetrieveOpportunity
 * @apiGroup Opportunity
 * @apiSuccess {Object} opportunity Opportunity's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Opportunity not found.
 */
router.get('/:id',
  show)

/**
 * @api {put} /opportunities/:id Update opportunity
 * @apiName UpdateOpportunity
 * @apiGroup Opportunity
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam name Opportunity's name.
 * @apiParam description Opportunity's description.
 * @apiParam is_VEH Opportunity's is_VEH.
 * @apiParam is_SAM Opportunity's is_SAM.
 * @apiParam is_CSAR Opportunity's is_CSAR.
 * @apiParam is_UCAS Opportunity's is_UCAS.
 * @apiParam priority Opportunity's priority.
 * @apiParam age Opportunity's age.
 * @apiParam coord_DMS Opportunity's coord_DMS.
 * @apiParam alt Opportunity's alt.
 * @apiParam campaign Opportunity's campaign.
 * @apiSuccess {Object} opportunity Opportunity's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Opportunity not found.
 * @apiError 401 user access only.
 */
router.put('/:id',
  token({ required: true }),
  body({ name, description, is_VEH, is_SAM, is_CSAR, is_UCAS, priority, age, coord_DMS, alt, campaign }),
  update)

/**
 * @api {delete} /opportunities/:id Delete opportunity
 * @apiName DeleteOpportunity
 * @apiGroup Opportunity
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Opportunity not found.
 * @apiError 401 user access only.
 */
router.delete('/:id',
  token({ required: true }),
  destroy)

export default router
