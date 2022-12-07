import { Schema, model, models } from 'mongoose'

const taskSchema = new Schema(
  {
    nombreTask: {
      type: String,
      trim: true
    },
    emailPara: {
      type: String
    },
    diaEntrega: {
      type: String,
      trim: true
    },
    status: {
      type: String,
      default: ''
    },
    area: {
      type: String
    },
    fileName: {
      type: String,
      default: ''
    },
    descripcion: {
      type: String
    },
    comentarios: [
      {
        nombre: { type: String },
        mensaje: { type: String }
      }
    ]
  },
  {
    versionKey: false
  }
)

taskSchema.set('toJSON', {
  transform: (document, returnObject) => {
    returnObject.id = returnObject._id
    delete returnObject._id
  }
})

export default models.Task || model('Task', taskSchema)
