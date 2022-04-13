import { Dmpi } from '.'
import { User } from '../user'

let user, dmpi

beforeEach(async () => {
  user = await User.create({ email: 'a@a.com', password: '123456' })
  dmpi = await Dmpi.create({ author: user, name: 'test', description: 'test', value: 'test', type: 'test', coord_DMS: 'test', alt: 'test', image_link: 'test', activity: 'test', moa: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = dmpi.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(dmpi.id)
    expect(typeof view.author).toBe('object')
    expect(view.author.id).toBe(user.id)
    expect(view.name).toBe(dmpi.name)
    expect(view.description).toBe(dmpi.description)
    expect(view.value).toBe(dmpi.value)
    expect(view.type).toBe(dmpi.type)
    expect(view.coord_DMS).toBe(dmpi.coord_DMS)
    expect(view.alt).toBe(dmpi.alt)
    expect(view.image_link).toBe(dmpi.image_link)
    expect(view.activity).toBe(dmpi.activity)
    expect(view.moa).toBe(dmpi.moa)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = dmpi.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(dmpi.id)
    expect(typeof view.author).toBe('object')
    expect(view.author.id).toBe(user.id)
    expect(view.name).toBe(dmpi.name)
    expect(view.description).toBe(dmpi.description)
    expect(view.value).toBe(dmpi.value)
    expect(view.type).toBe(dmpi.type)
    expect(view.coord_DMS).toBe(dmpi.coord_DMS)
    expect(view.alt).toBe(dmpi.alt)
    expect(view.image_link).toBe(dmpi.image_link)
    expect(view.activity).toBe(dmpi.activity)
    expect(view.moa).toBe(dmpi.moa)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
