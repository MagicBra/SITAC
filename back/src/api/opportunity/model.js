import mongoose, { Schema } from 'mongoose'

const opportunitySchema = new Schema({
  author: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  is_VEH: {
    type: Boolean,
    required: true
  },
  is_SAM: {
    type: Boolean,
    required: true
  },
  is_CSAR: {
    type: Boolean,
    required: true
  },
  is_UCAS: {
    type: Boolean,
    required: true
  },
  priority: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  coord_DMS: {
    type: String,
    required: true
  },
  alt: {
    type: Number,
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

opportunitySchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      author: this.author.view(full),
      name: this.name,
      description: this.description,
      is_VEH: this.is_VEH,
      is_SAM: this.is_SAM,
      is_CSAR: this.is_CSAR,
      is_UCAS: this.is_UCAS,
      priority: this.priority,
      age: this.age,
      coord_DMS: this.coord_DMS,
      alt: this.alt,
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

const model = mongoose.model('Opportunity', opportunitySchema)

export const schema = model.schema
export default model
