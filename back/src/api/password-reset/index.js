import { Router } from 'express'
import { middleware as body } from 'bodymen'
import { master, token } from '../../services/passport'
import { create, show, update, createAdmin } from './controller'
import { schema } from '../user'
export PasswordReset, { schema } from './model'

const router = new Router()
const { email, password } = schema.tree

/**
 * @api {post} /password-resets Send email
 * @apiName SendPasswordReset
 * @apiGroup PasswordReset
 * @apiPermission master
 * @apiParam {String} email Email address to receive the password reset token.
 * @apiParam {String} link Link to redirect user.
 * @apiSuccess (Success 202) 202 Accepted.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
/*router.post('/',
  master(),
  body({ email, link: { type: String, required: true } }),
  create)*/

/**
 * @api {post} /password-resets Get token
 * @apiName SendPasswordReset
 * @apiGroup PasswordReset
 * @apiPermission admin
 * @apiParam {String} email Email address to receive the password reset token.
 * @apiParam {String} link Link to redirect user.
 * @apiSuccess {Object} user User's data (ans the token).
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
  router.post('/admin',
  token({ required: true, roles: ['admin'] }),
  body({ email }),
  createAdmin)

/**
 * @api {get} /password-resets/:token Verify token
 * @apiName VerifyPasswordReset
 * @apiGroup PasswordReset
 * @apiSuccess {String} token Password reset token.
 * @apiSuccess {Object} user User's data.
 * @apiError 404 Token has expired or doesn't exist.
 */
router.get('/:token',
  show)

/**
 * @api {put} /password-resets/:token Submit password
 * @apiName SubmitPasswordReset
 * @apiGroup PasswordReset
 * @apiParam {String{6..}} password User's new password.
 * @apiSuccess {Object} user User's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Token has expired or doesn't exist.
 */
router.put('/:token',
  body({ password }),
  update)

export default router
