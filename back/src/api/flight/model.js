import mongoose, { Schema } from 'mongoose'
import idValidator from 'mongoose-id-validator'

const flightSchema = new Schema({
  author: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true
  },
  iff_m1: {
    type: String
  },
  iff_m3: {
    type: String
  },
  cypher_canal: {
    type: String
  },
  pkg: {
    type: Schema.ObjectId, // prend un id de mongoDB
    ref: 'Pkg', // /!\ Mettre une majuscule au début (comme ça dans la base)
    required: true
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

flightSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      author: this.author ? this.author.view(false) : {"name": "Deleted user"},
      iff_m1: this.iff_m1,
      iff_m3: this.iff_m3,
      cypher_canal: this.cypher_canal,
      pkg: this.pkg,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

flightSchema.plugin(idValidator)

const model = mongoose.model('Flight', flightSchema)

export const schema = model.schema
export default model
