const jwt = require('jsonwebtoken');

// Verificar token
let verificaToken = ( req, res, next ) => {

    // Leer header
    let token = req.get('token');

    jwt.verify(token, process.env.SEED, (err, decoded) => {
        if(err){
            return res.status(401).json({
                ok: false,
                err
            });
        }

        req.usuario = decoded.usuario;
        next();
    });

};

// Verificar el rol de admin
let verificarAdminRole = ( req, res, next ) => {

    let usuario = req.usuario;

    if(usuario.role === 'ADMIN_ROLE') {
        next();
    } else {
        return res.json({
            ok: false,
            err: {
                message: 'El usuario no es administrador'
            }
        });
    }

}

// Verifica el token por el url
let verificaTokenImg = (req, res, next) => {

    let token = req.query.token;

    jwt.verify(token, process.env.SEED, (err, decoded) => {
        if(err){
            return res.status(401).json({
                ok: false,
                err
            });
        }

        req.usuario = decoded.usuario;
        next();
    });

}

module.exports = {
    verificaToken,
    verificarAdminRole,
    verificaTokenImg
};
