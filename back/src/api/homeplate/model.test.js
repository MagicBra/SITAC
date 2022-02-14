import { Homeplate } from '.'
import { User } from '../user'

let user, homeplate

beforeEach(async () => {
  user = await User.create({ email: 'a@a.com', password: '123456' })
  homeplate = await Homeplate.create({ author: user, name: 'test', description: 'test', campaign: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = homeplate.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(homeplate.id)
    expect(typeof view.author).toBe('object')
    expect(view.author.id).toBe(user.id)
    expect(view.name).toBe(homeplate.name)
    expect(view.description).toBe(homeplate.description)
    expect(view.campaign).toBe(homeplate.campaign)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = homeplate.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(homeplate.id)
    expect(typeof view.author).toBe('object')
    expect(view.author.id).toBe(user.id)
    expect(view.name).toBe(homeplate.name)
    expect(view.description).toBe(homeplate.description)
    expect(view.campaign).toBe(homeplate.campaign)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
