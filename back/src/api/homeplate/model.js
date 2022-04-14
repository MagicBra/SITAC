import mongoose, { Schema } from 'mongoose'
import idValidator from 'mongoose-id-validator'

import Escadron from '../escadron'

const homeplateSchema = new Schema({
  author: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String
  },
  description: {
    type: String
  },
  campaign: {
    type: Schema.ObjectId, // prend un id de mongoDB
    ref: 'Campaign', // /!\ Mettre une majuscule au début (comme ça dans la base)
    required: true
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

homeplateSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      author: this.author ? this.author.view(false) : {"name": "Deleted user"},
      name: this.name,
      description: this.description,
      campaign: this.campaign,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

homeplateSchema.pre('remove', function(next) {
  Escadron.find({ 'homeplate': this.id }, deleteMongooseArray)
  next();
});


function deleteMongooseArray(err, array) {
  for (var i = 0; i < array.length; i++) {
    array[i].remove();
  }
}

homeplateSchema.plugin(idValidator)
const model = mongoose.model('Homeplate', homeplateSchema)

export const schema = model.schema
export default model
