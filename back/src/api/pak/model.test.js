import { Pak } from '.'
import { User } from '../user'

let user, pak

beforeEach(async () => {
  user = await User.create({ email: 'a@a.com', password: '123456' })
  pak = await Pak.create({ author: user, name: 'test', campaign: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = pak.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(pak.id)
    expect(typeof view.author).toBe('object')
    expect(view.author.id).toBe(user.id)
    expect(view.name).toBe(pak.name)
    expect(view.campaign).toBe(pak.campaign)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = pak.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(pak.id)
    expect(typeof view.author).toBe('object')
    expect(view.author.id).toBe(user.id)
    expect(view.name).toBe(pak.name)
    expect(view.campaign).toBe(pak.campaign)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
