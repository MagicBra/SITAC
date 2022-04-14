import mongoose, { Schema } from 'mongoose'
import idValidator from 'mongoose-id-validator'

import Flight from '../flight'

const pkgSchema = new Schema({
  author: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true
  },
  numero: {
    type: String
  },
  package_leader: {
    type: String
  },
  is_flying: {
    type: Boolean
  },
  mission_nature: {
    type: String
  },
  mission_cible: {
    type: String
  },
  mission_description: {
    type: String
  },
  mission_TOT: {
    type: String
  },
  mission_time_margin: {
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

pkgSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      author: this.author ? this.author.view(false) : {"name": "Deleted user"},
      numero: this.numero,
      package_leader: this.package_leader,
      is_flying: this.is_flying,
      mission_nature: this.mission_nature,
      mission_cible: this.mission_cible,
      mission_description: this.mission_description,
      mission_TOT: this.mission_TOT,
      mission_time_margin: this.mission_time_margin,
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

pkgSchema.pre('remove', function(next) {
  Flight.find({ 'pkg': this.id }, deleteMongooseArray)

  next();
});


function deleteMongooseArray(err, array) {
  for (var i = 0; i < array.length; i++) {
    array[i].remove();
  }
}

pkgSchema.plugin(idValidator)

const model = mongoose.model('Pkg', pkgSchema)

export const schema = model.schema
export default model
