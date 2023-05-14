import Auth from '../models/auth.js';
import generarJWT from '../helpers/generarJWT.js';

const registrar = async (req, res) => {
  const { email } = req.body;
  try {
    // USUARIOS DUPLICADOS
    const existeUsuario = await Auth.findOne({ email });
    if (existeUsuario) {
      const error = new Error('Usuario ya esta registrado.');
      return res.status(400).json({
        susecces: false,
        msg: error.message,
      });
    }
    const auth = new Auth(req.body);
    const authSave = await auth.save();
    return res.status(200).json({
      susecces: true,
      authSave,
    });
  } catch (error) {
    console.log(`ERROR: ${error}`);
    return res.status(500).json({
      susecces: false,
      msg: 'Ha ocurrido un error.',
    });
  }
};

const autenticar = async (req, res) => {
  const { email, password } = req.body;
  try {
    // COMPROBAR SI EL USUARIO EXISTE.
    const usuario = await Auth.findOne({ email });
    if (!usuario) {
      const error = new Error('El usuario no existe.');
      return res.status(403).json({
        susecces: false,
        msg: error.message,
      });
    }
    // COMPROBAR SI EL USUARIO ESTA CONFIRMADO.
    if (!usuario.confirmado) {
      const error = new Error('Tu cuenta no esta confirmada.');
      return res.status(403).json({
        susecces: false,
        msg: error.message,
      });
    }
    // REVISAR PASSWORD
    if (await usuario.comprobarPassword(password)) {
      // AUTENTICAR
      return res.status(200).json({
        susecces: true,
        _id: usuario._id,
        nombre: usuario.nombre,
        email: usuario.email,
        token: generarJWT(usuario.id),
      });
    } else {
      const error = new Error('El password es incorrecto.');
      return res.status(403).json({
        susecces: false,
        msg: error.message,
      });
    }
  } catch (error) {
    console.log(`ERROR: ${error}`);
    return res.status(500).json({
      susecces: false,
      msg: 'Ha ocurrido un error.',
    });
  }
};
const perfil = (req, res) => {
  const { usuario } = req;
  return res.status(200).json({
    susecces: true,
    usuario,
  });
};
const actualizarPerfil = async (req, res) => {
  try {
    const usuario = await Auth.findById(req.params.id);
    if (!usuario) {
      const error = new Error('Usuario no encontrado.');
      return res.status(400).json({
        susecces: false,
        msg: error.message,
      });
    }
    const { email } = req.body;
    if (usuario.email !== req.body.email) {
      const existeEmail = await Auth.findOne({ email });
      if (existeEmail) {
        const error = new Error('El email ya esta en uso.');
        return res.status(400).json({
          susecces: false,
          msg: error.message,
        });
      }
    }
    usuario.nombre = req.body.nombre;
    usuario.email = req.body.email;
    usuario.telefono = req.body.telefono;
    usuario.web = req.body.web;
    const usuarioActulaizado = await usuario.save();
    return res.status(200).json({
      susecces: true,
      usuarioActulaizado,
    });
  } catch (error) {
    console.log(`ERROR: ${error}`);
    return res.status(500).json({
      susecces: false,
      msg: 'Ha ocurrido un error.',
    });
  }
};

// EXPORT FUNCTIONS
export { registrar, perfil, autenticar, actualizarPerfil };
