import { Opportunity } from '.'
import { User } from '../user'

let user, opportunity

beforeEach(async () => {
  user = await User.create({ email: 'a@a.com', password: '123456' })
  opportunity = await Opportunity.create({ author: user, name: 'test', description: 'test', is_VEH: 'test', is_SAM: 'test', is_CSAR: 'test', is_UCAS: 'test', priority: 'test', age: 'test', coord_DMS: 'test', alt: 'test', campaign: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = opportunity.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(opportunity.id)
    expect(typeof view.author).toBe('object')
    expect(view.author.id).toBe(user.id)
    expect(view.name).toBe(opportunity.name)
    expect(view.description).toBe(opportunity.description)
    expect(view.is_VEH).toBe(opportunity.is_VEH)
    expect(view.is_SAM).toBe(opportunity.is_SAM)
    expect(view.is_CSAR).toBe(opportunity.is_CSAR)
    expect(view.is_UCAS).toBe(opportunity.is_UCAS)
    expect(view.priority).toBe(opportunity.priority)
    expect(view.age).toBe(opportunity.age)
    expect(view.coord_DMS).toBe(opportunity.coord_DMS)
    expect(view.alt).toBe(opportunity.alt)
    expect(view.campaign).toBe(opportunity.campaign)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = opportunity.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(opportunity.id)
    expect(typeof view.author).toBe('object')
    expect(view.author.id).toBe(user.id)
    expect(view.name).toBe(opportunity.name)
    expect(view.description).toBe(opportunity.description)
    expect(view.is_VEH).toBe(opportunity.is_VEH)
    expect(view.is_SAM).toBe(opportunity.is_SAM)
    expect(view.is_CSAR).toBe(opportunity.is_CSAR)
    expect(view.is_UCAS).toBe(opportunity.is_UCAS)
    expect(view.priority).toBe(opportunity.priority)
    expect(view.age).toBe(opportunity.age)
    expect(view.coord_DMS).toBe(opportunity.coord_DMS)
    expect(view.alt).toBe(opportunity.alt)
    expect(view.campaign).toBe(opportunity.campaign)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
