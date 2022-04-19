import mongoose, { Schema } from 'mongoose'
import mongooseKeywords from 'mongoose-keywords'

import { Pak } from '../pak'
import { Opportunity } from '../opportunity'
import { Homeplate } from '../homeplate'
import { Pkg } from '../pkg'

const campaignSchema = new Schema({
  author: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true,
    default: null
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

campaignSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      author: this.author ? this.author.view(false) : {"name": "Deleted user"},
      name: this.name,
      description: this.description,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

campaignSchema.pre('remove', function(next) {
  Pak.find({ 'campaign': this.id }, deleteMongooseArray)
  Opportunity.find({ 'campaign': this.id }, deleteMongooseArray)
  Homeplate.find({ 'campaign': this.id }, deleteMongooseArray)
  Pkg.find({ 'campaign': this.id }, deleteMongooseArray)

  next();
});


function deleteMongooseArray(err, array) {
  for (var i = 0; i < array.length; i++) {
    array[i].remove();
  }
}

campaignSchema.plugin(mongooseKeywords, { paths: ['name'] })

const model = mongoose.model('Campaign', campaignSchema)

export const schema = model.schema
export default model
