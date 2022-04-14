import { Router } from 'express'
import user from './user'
import auth from './auth'
import passwordReset from './password-reset'
import campaign from './campaign'
import pak from './pak'
import opportunity from './opportunity'
import homeplate from './homeplate'
import moa from './moa'
import dmpi from './dmpi'
import escadron from './escadron'
import pkg from './pkg'
import flight from './flight'

const router = new Router()

/**
 * @apiDefine master Master access only
 * You must pass `access_token` parameter or a Bearer Token authorization header
 * to access this endpoint.
 */
/**
 * @apiDefine admin Admin access only
 * You must pass `access_token` parameter or a Bearer Token authorization header
 * to access this endpoint.
 */
/**
 * @apiDefine user User access only
 * You must pass `access_token` parameter or a Bearer Token authorization header
 * to access this endpoint.
 */
/**
 * @apiDefine listParams
 * @apiParam {String} [q] Query to search.
 * @apiParam {Number{1..30}} [page=1] Page number.
 * @apiParam {Number{1..100}} [limit=30] Amount of returned items.
 * @apiParam {String[]} [sort=-createdAt] Order of returned items.
 * @apiParam {String[]} [fields] Fields to be returned.
 */
router.use('/users', user)
router.use('/auth', auth)
router.use('/password-resets', passwordReset)
router.use('/campaigns', campaign)
router.use('/paks', pak)
router.use('/opportunities', opportunity)
router.use('/homeplates', homeplate)
router.use('/moas', moa)
router.use('/dmpis', dmpi)
router.use('/escadrons', escadron)
router.use('/pkgs', pkg)
router.use('/flights', flight)

export default router
