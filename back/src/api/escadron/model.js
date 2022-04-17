import mongoose, { Schema } from 'mongoose'
import idValidator from 'mongoose-id-validator'

const escadronSchema = new Schema({
  author: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String
  },
  desc: {
    type: String
  },
  is_plane: {
    type: Boolean
  },
  is_heli: {
    type: Boolean
  },
  is_2D: {
    type: Boolean
  },
  total_planes: {
    type: String
  },
  planes_available: {
    type: Number
  },
  planes_repair: {
    type: Number
  },
  planes_destroyed: {
    type: Number
  },
  combat_level: {
    type: String
  },
  missions_types: {
    type: String
  },
  homeplate: {
    type: Schema.ObjectId,
    ref: 'Homeplate', // /!\ Mettre une majuscule au début (comme ça dans la base)
    required: true
  },
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

escadronSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      author: this.author ? this.author.view(false) : {"name": "Deleted user"},
      name: this.name,
      desc: this.desc,
      is_plane: this.is_plane,
      is_heli: this.is_heli,
      is_2D: this.is_2D,
      total_planes: this.total_planes,
      planes_available: this.planes_available,
      planes_repair: this.planes_repair,
      planes_destroyed: this.planes_destroyed,
      combat_level: this.combat_level,
      missions_types: this.missions_types,
      homeplate: this.homeplate,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

escadronSchema.plugin(idValidator)

const model = mongoose.model('Escadron', escadronSchema)

export const schema = model.schema
export default model
