import mongoose, { Schema } from 'mongoose'
import idValidator from 'mongoose-id-validator'

import { Dmpi } from '../dmpi'

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
      author: this.author ? this.author.view(false) : {"name": "Deleted user"},
      name: this.name,
      side: this.side,
      pak: this.pak.view(full),
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

moaSchema.pre('remove', function(next) {
  Dmpi.find({ 'moa': this.id }, deleteMongooseArray)
  next();
});


function deleteMongooseArray(err, array) {
  for (var i = 0; i < array.length; i++) {
    array[i].remove();
  }
}

moaSchema.plugin(idValidator)

const model = mongoose.model('Moa', moaSchema)

export const schema = model.schema
export default model
