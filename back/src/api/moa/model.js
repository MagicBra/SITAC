import mongoose, { Schema } from 'mongoose'
import idValidator from 'mongoose-id-validator'

const moaSchema = new Schema({
  author: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  side: {
    type: String,
    required: true
  },
  pak: {
    type: Schema.ObjectId, // prend un id de mongoDB
    ref: 'Pak', // /!\ Mettre une majuscule au début (comme ça dans la base)
    required: true
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

moaSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      author: this.author.view(full),
      name: this.name,
      side: this.side,
      pak: this.pak,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

moaSchema.plugin(idValidator)

const model = mongoose.model('Moa', moaSchema)

export const schema = model.schema
export default model
