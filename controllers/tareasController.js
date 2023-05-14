import Tarea from '../models/tarea.js';
const agregarTarea = async (req, res) => {
  try {
    const tarea = new Tarea(req.body);
    tarea.usuario = req.usuario._id;
    const tareaSave = await tarea.save();
    return res.status(200).json({
      susecces: true,
      tareaSave,
    });
  } catch (error) {
    console.log(`ERROR: ${error}`);
    return res.status(500).json({
      susecces: false,
      msg: 'Ha ocurrido un error.',
    });
  }
};
const obtenerTareas = async (req, res) => {
  try {
    const tareas = await Tarea.find().where('usuario').equals(req.usuario);
    return res.status(200).json({
      susecces: true,
      tareas,
    });
  } catch (error) {
    console.log(`ERROR: ${error}`);
    return res.status(500).json({
      susecces: false,
      msg: 'Ha ocurrido un error.',
    });
  }
};
const obtenerTarea = async (req, res) => {
  const { id } = req.params;
  try {
    const tarea = await Tarea.findById(id);
    if (!tarea) {
      return res.status(404).json({
        susecces: false,
        msg: 'Tarea no encontrado.',
      });
    }
    if (tarea.usuario._id.toString() !== req.usuario._id.toString()) {
      return res.status(401).json({
        susecces: false,
        msg: 'Accion no valida.',
      });
    }
    return res.status(200).json({
      susecces: true,
      tarea,
    });
  } catch (error) {
    console.log(`ERROR: ${error}`);
    return res.status(500).json({
      susecces: false,
      msg: 'Ha ocurrido un error.',
    });
  }
};
const actualizarTarea = async (req, res) => {
  const { id } = req.params;
  try {
    const tarea = await Tarea.findById(id);
    if (!tarea) {
      return res.status(404).json({
        susecces: false,
        msg: 'Tarea no encontrado.',
      });
    }
    if (tarea.usuario._id.toString() !== req.usuario._id.toString()) {
      return res.status(401).json({
        susecces: false,
        msg: 'Accion no valida.',
      });
    }
    tarea.nombre = req.body.nombre || tarea.nombre;
    tarea.descripcion = req.body.descripcion || tarea.descripcion;
    const tareaUpdate = await tarea.save();
    return res.status(200).json({
      susecces: true,
      tareaUpdate,
    });
  } catch (error) {
    console.log(`ERROR: ${error}`);
    return res.status(500).json({
      susecces: false,
      msg: 'Ha ocurrido un error.',
    });
  }
};
const eliminarTarea = async (req, res) => {
  const { id } = req.params;
  try {
    const tarea = await Tarea.findById(id);
    if (!tarea) {
      return res.status(404).json({
        susecces: false,
        msg: 'Tarea no encontrado.',
      });
    }
    if (tarea.usuario._id.toString() !== req.usuario._id.toString()) {
      return res.status(401).json({
        susecces: false,
        msg: 'Accion no valida.',
      });
    }
    await tarea.deleteOne();
    return res.status(200).json({
      susecces: true,
      msg: 'tarea eliminada correctamente.',
    });
  } catch (error) {
    console.log(`ERROR: ${error}`);
    return res.status(500).json({
      susecces: false,
      msg: 'Ha ocurrido un error.',
    });
  }
};
export {
  agregarTarea,
  obtenerTareas,
  obtenerTarea,
  actualizarTarea,
  eliminarTarea,
};
