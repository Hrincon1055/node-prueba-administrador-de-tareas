import mongoose from 'mongoose';
const tareasSchema = mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
    },
    descripcion: {
      type: String,
      required: true,
    },
    usuario: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Auth',
    },
  },
  {
    timestamps: true,
  }
);

const Tarea = mongoose.model('Tarea', tareasSchema);
export default Tarea;
