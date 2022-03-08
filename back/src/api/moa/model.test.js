import { Moa } from '.'
import { User } from '../user'

let user, moa

beforeEach(async () => {
  user = await User.create({ email: 'a@a.com', password: '123456' })
  moa = await Moa.create({ author: user, name: 'test', side: 'test', pak: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = moa.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(moa.id)
    expect(typeof view.author).toBe('object')
    expect(view.author.id).toBe(user.id)
    expect(view.name).toBe(moa.name)
    expect(view.side).toBe(moa.side)
    expect(view.pak).toBe(moa.pak)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = moa.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(moa.id)
    expect(typeof view.author).toBe('object')
    expect(view.author.id).toBe(user.id)
    expect(view.name).toBe(moa.name)
    expect(view.side).toBe(moa.side)
    expect(view.pak).toBe(moa.pak)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
