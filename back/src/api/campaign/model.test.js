import { Campaign } from '.'
import { User } from '../user'

let user, campaign

beforeEach(async () => {
  user = await User.create({ email: 'a@a.com', password: '123456' })
  campaign = await Campaign.create({ author: user, name: 'test', description: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = campaign.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(campaign.id)
    expect(typeof view.author).toBe('object')
    expect(view.author.id).toBe(user.id)
    expect(view.name).toBe(campaign.name)
    expect(view.description).toBe(campaign.description)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = campaign.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(campaign.id)
    expect(typeof view.author).toBe('object')
    expect(view.author.id).toBe(user.id)
    expect(view.name).toBe(campaign.name)
    expect(view.description).toBe(campaign.description)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
