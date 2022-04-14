import { Pkg } from '.'
import { User } from '../user'

let user, pkg

beforeEach(async () => {
  user = await User.create({ email: 'a@a.com', password: '123456' })
  pkg = await Pkg.create({ author: user, numero: 'test', package_leader: 'test', is_flying: 'test', mission_nature: 'test', mission_cible: 'test', mission_description: 'test', mission_TOT: 'test', mission_time_margin: 'test', campaign: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = pkg.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(pkg.id)
    expect(typeof view.author).toBe('object')
    expect(view.author.id).toBe(user.id)
    expect(view.numero).toBe(pkg.numero)
    expect(view.package_leader).toBe(pkg.package_leader)
    expect(view.is_flying).toBe(pkg.is_flying)
    expect(view.mission_nature).toBe(pkg.mission_nature)
    expect(view.mission_cible).toBe(pkg.mission_cible)
    expect(view.mission_description).toBe(pkg.mission_description)
    expect(view.mission_TOT).toBe(pkg.mission_TOT)
    expect(view.mission_time_margin).toBe(pkg.mission_time_margin)
    expect(view.campaign).toBe(pkg.campaign)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = pkg.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(pkg.id)
    expect(typeof view.author).toBe('object')
    expect(view.author.id).toBe(user.id)
    expect(view.numero).toBe(pkg.numero)
    expect(view.package_leader).toBe(pkg.package_leader)
    expect(view.is_flying).toBe(pkg.is_flying)
    expect(view.mission_nature).toBe(pkg.mission_nature)
    expect(view.mission_cible).toBe(pkg.mission_cible)
    expect(view.mission_description).toBe(pkg.mission_description)
    expect(view.mission_TOT).toBe(pkg.mission_TOT)
    expect(view.mission_time_margin).toBe(pkg.mission_time_margin)
    expect(view.campaign).toBe(pkg.campaign)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
