import mongoose, { Schema } from 'mongoose'

const dmpiSchema = new Schema({
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
  value: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  coord_DMS: {
    type: String,
    required: true
  },
  alt: {
    type: String,
    required: true
  },
  image_link: {
    type: String,
    required: true
  },
  activity: {
    type: String,
    required: true
  },
  moa: {
    type: Schema.ObjectId,
    ref: 'Moa',
    required: true
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

dmpiSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      author: this.author.view(full),
      name: this.name,
      description: this.description,
      value: this.value,
      type: this.type,
      coord_DMS: this.coord_DMS,
      alt: this.alt,
      image_link: this.image_link,
      activity: this.activity,
      moa: this.moa,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Dmpi', dmpiSchema)

export const schema = model.schema
export default model
