const usuarioController = require('../backend/Controllers/usuarioController');

export default function handler(req, res) {
    const method = req.method;
    if(method === 'GET'){
      return usuarioController.get(req, res);
    }else if(method === 'DELETE'){
      return usuarioController.delete(req, res);
    }else if(method === 'PUT'){
      return usuarioController.put(req, res);
    }else{
      return res.status(404).json({message: "Unknow route." });
    }
}
