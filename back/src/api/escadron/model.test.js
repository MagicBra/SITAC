import { Escadron } from '.'
import { User } from '../user'

let user, escadron

beforeEach(async () => {
  user = await User.create({ email: 'a@a.com', password: '123456' })
  escadron = await Escadron.create({ author: user, name: 'test', desc: 'test', is_plane: 'test', is_heli: 'test', is_2D: 'test', total_planes: 'test', planes_available: 'test', planes_repair: 'test', planes_destroyed: 'test', combat_level: 'test', missions_types: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = escadron.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(escadron.id)
    expect(typeof view.author).toBe('object')
    expect(view.author.id).toBe(user.id)
    expect(view.name).toBe(escadron.name)
    expect(view.desc).toBe(escadron.desc)
    expect(view.is_plane).toBe(escadron.is_plane)
    expect(view.is_heli).toBe(escadron.is_heli)
    expect(view.is_2D).toBe(escadron.is_2D)
    expect(view.total_planes).toBe(escadron.total_planes)
    expect(view.planes_available).toBe(escadron.planes_available)
    expect(view.planes_repair).toBe(escadron.planes_repair)
    expect(view.planes_destroyed).toBe(escadron.planes_destroyed)
    expect(view.combat_level).toBe(escadron.combat_level)
    expect(view.missions_types).toBe(escadron.missions_types)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = escadron.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(escadron.id)
    expect(typeof view.author).toBe('object')
    expect(view.author.id).toBe(user.id)
    expect(view.name).toBe(escadron.name)
    expect(view.desc).toBe(escadron.desc)
    expect(view.is_plane).toBe(escadron.is_plane)
    expect(view.is_heli).toBe(escadron.is_heli)
    expect(view.is_2D).toBe(escadron.is_2D)
    expect(view.total_planes).toBe(escadron.total_planes)
    expect(view.planes_available).toBe(escadron.planes_available)
    expect(view.planes_repair).toBe(escadron.planes_repair)
    expect(view.planes_destroyed).toBe(escadron.planes_destroyed)
    expect(view.combat_level).toBe(escadron.combat_level)
    expect(view.missions_types).toBe(escadron.missions_types)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
