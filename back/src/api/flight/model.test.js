import { Flight } from '.'
import { User } from '../user'

let user, flight

beforeEach(async () => {
  user = await User.create({ email: 'a@a.com', password: '123456' })
  flight = await Flight.create({ author: user, iff_m1: 'test', iff_m3: 'test', cypher_canal: 'test', pkg: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = flight.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(flight.id)
    expect(typeof view.author).toBe('object')
    expect(view.author.id).toBe(user.id)
    expect(view.iff_m1).toBe(flight.iff_m1)
    expect(view.iff_m3).toBe(flight.iff_m3)
    expect(view.cypher_canal).toBe(flight.cypher_canal)
    expect(view.pkg).toBe(flight.pkg)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = flight.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(flight.id)
    expect(typeof view.author).toBe('object')
    expect(view.author.id).toBe(user.id)
    expect(view.iff_m1).toBe(flight.iff_m1)
    expect(view.iff_m3).toBe(flight.iff_m3)
    expect(view.cypher_canal).toBe(flight.cypher_canal)
    expect(view.pkg).toBe(flight.pkg)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
