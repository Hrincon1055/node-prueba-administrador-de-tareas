import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
// MIS COPONENTES
import generarId from '../helpers/generarId.js';
const authSchema = mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  telefono: {
    type: String,
    default: null,
    trim: true,
  },
  web: {
    type: String,
    default: null,
    trim: true,
  },
  token: {
    type: String,
    default: generarId(),
  },
  confirmado: {
    type: Boolean,
    default: true,
  },
});
authSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});
authSchema.methods.comprobarPassword = async function (
  passwordFormulario
) {
  return await bcrypt.compare(passwordFormulario, this.password);
};
const Auth = mongoose.model('Auth', authSchema);
export default Auth;
