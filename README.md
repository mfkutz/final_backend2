`-Passport, JWT, Mongoose... ✅`
`-Reorganizar su proyecto aplicando los conceptos de arquitectura vistos (MVC, DAO, DTO, etc) ✅`
`-MANEJO DE ROLES Y PERMISOS`
`-Admin, Puede crear, actualizar y eliminar productos. ✅`
`-User, Puede crear el cart, agregar productos al cart, y finalizar la compra ✅`
`-SISTEMA DE TICKES:`
`-Crear el modelo y/o servicio ✅`
`-Endpoint nuevo en cart -> /api/cart/:id/purchase ✅`
`-Obtener el carrito y el usuario ✅`
`-Checkear que haya stock de cada producto dentro del carrito ✅`
`-Descontar el stock o tirar error en caso de que el stock no alcance ✅`
`-Si sale todo bien, finalizar la compra, generando un ticket con los datos del modelo ✅`
`-Opcional: Enviar un email con el ticket o detalles de la compra ✅`
`-Implementar envio de emails en cualquier seccion de su api ✅`
`-El user tiene que tener lso carritos relacionados ✅`

##Dependencies

-bcrypt "^5.1.1" - Library for hashing and comparing passwords securely using the bcrypt algorithm.
-cookie-parser "^1.4.6" - Middleware for parsing cookies in incoming requests.
-dotenv "^16.4.5" - Loads environment variables from a .env file into process.env.
-express "^4.19.2" - Web framework for Node.js.
-joi "^17.13.3" - Schema description and data validation library for JavaScript.
-jsonwebtoken "^9.0.2" - Implementation of JSON Web Tokens (JWT) for secure information exchange.
-mongoose "^8.5.4" - MongoDB object modeling tool designed to work in an asynchronous environment.
-mongoose-paginate-v2 "^1.8.3" - Pagination plugin for Mongoose models.
-morgan "^1.10.0" - HTTP request logger middleware for Node.js.
-nodemailer "^6.9.14" - Module for sending emails from Node.js applications.
-passport "^0.7.0" - Authentication middleware for Node.js, supporting various strategies.
-passport-jwt "^4.0.1" - Passport strategy for authenticating with JSON Web Tokens (JWT).
-passport-local "^1.0.0" - Passport strategy for local authentication using username and password.
-uuid "^10.0.0" - Library for generating universally unique identifiers (UUIDs).

##Development Dependencies
-nodemon "^3.1.4" - Tool that automatically restarts the server when file changes are detected.
