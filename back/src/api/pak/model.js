import mongoose, { Schema } from 'mongoose'
import idValidator from 'mongoose-id-validator'

import { Moa } from '../moa'

const pakSchema = new Schema({
  author: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true
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

pakSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      author: this.author ? this.author.view(false) : {"name": "Deleted user"},
      name: this.name,
      campaign: this.campaign.view(full), // récupérer la vue de campagne
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

pakSchema.pre('remove', function(next) {
  Moa.find({ 'pak': this.id }, deleteMongooseArray)
  next();
});


function deleteMongooseArray(err, array) {
  for (var i = 0; i < array.length; i++) {
    array[i].remove();
  }
}

pakSchema.plugin(idValidator)

const model = mongoose.model('Pak', pakSchema)

export const schema = model.schema
export default model
