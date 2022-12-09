import { Schema, model, models } from 'mongoose'

const userSchema = new Schema(
  {
    email: {
      type: String,
      maxlength: [40, 'Username max length must be at least 40 characters']
    },
    password: {
      type: String
    },
    username: {
      type: String,
      trim: true
    },
    role: {
      type: String,
      trim: true
    },
    fechaDeSalida: {
      type: String,
      trim: true
    },
    active: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
)

userSchema.set('toJSON', {
  transform: (document, returnObject) => {
    returnObject.id = returnObject._id
    delete returnObject._id
    delete returnObject.passwordHash
  }
})

export default models.User || model('User', userSchema)
