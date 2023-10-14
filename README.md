# Parcial-1-Aplicaciones-Hibridas

Sistema backend de gestion de productos, categorias, comentarios y usuarios con autenticacion con JWT

## Tecnologías

- Node.js
- Express.js
- MongoDB
- JSON Web Tokens (JWT)
- Mongoose

Mateo Garcia Bermudez

## Uso

ejemplos de peticiones

usuarios : {
"nombre": "Nombre del Usuario",
"email": "correo@ejemplo.com",
"password": "contraseña_secreta"
}

productos: {
"nombre": "Nombre del Producto",
"price": 25.99,
"category": "ID_de_la_Categoria"
}

comentarios: {
"contenido": "Este es un comentario de ejemplo",
"producto": "ID_del_Producto",
"usuario": "ID_del_Usuario"
}

categorias: {
"nombre": "Nombre de la Categoría",
"descripcion": "Descripción de la Categoría",
"idCategoria": 123
}

## solicitar token

Una vez te hayas creado un usuario, haciendo una peticion POST a la ruta "/api/autenticacion" enviando un JSON con email y password

Ejemplo: {
"email": "ejemplo@gmail.com",
"password": "messi"
}
