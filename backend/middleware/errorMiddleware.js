/**
 * La función errorHandler es un middleware que maneja los errores estableciendo el código de estado y
 * devolviendo una respuesta JSON con el mensaje de error y la traza de la pila (si se encuentra en modo
 * de desarrollo).
 * @param err - El parámetro `err` es el objeto de error que se lanzó o se pasó a la función `next` en el
 * middleware o controlador de ruta anterior. Contiene información sobre el error, como el mensaje de error
 * y la traza de la pila.
 * @param req - El parámetro `req` representa el objeto de solicitud HTTP. Contiene información sobre la
 * solicitud entrante, como las cabeceras de la solicitud, el método de la solicitud, la URL de la solicitud,
 * el cuerpo de la solicitud, etc.
 * @param res - El parámetro `res` es el objeto de respuesta en Express.js. Representa la respuesta HTTP que
 * se enviará al cliente.
 * @param next - El parámetro `next` es una función que se utiliza para pasar el control a la siguiente
 * función de middleware en el ciclo de solicitud-respuesta. Se utiliza típicamente cuando hay un error y
 * se desea pasar el error a la siguiente función de middleware de manejo de errores.
 */

const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500

    res.status(statusCode)

    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack
    })
}

module.exports = {
    errorHandler
}