import mongoose, { Schema } from 'mongoose'

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
      author: this.author.view(full),
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

const model = mongoose.model('Pak', pakSchema)

export const schema = model.schema
export default model
