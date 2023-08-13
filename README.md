# Entrega Clase 21 Passport y Github Auth

Para correr el proyecto es necesario crear el archivo `.env` y setear las credenciales de Mongo Atlas `DB_USER` y `DB_PASSWORD`.
Además se deben setear las variables de entorno `GITHUB_CLIENT_ID` y `GITHUB_CLIENT_SECRET` con las credenciales de la app de Github.

## Comandos

- `npm start`: Levanta el proyecto en el puerto 8080.
- `npm run dev`: Levanta el proyecto y actualiza el servidor con cada cambio guardado.

## Vistas actualizadas

- [localhost:8080/login](http://localhost:8080/login): Login de usuario, ahora con botón de login con Github.
- [localhost:8080/register](http://localhost:8080/register): Registro de usuario, ahora con botón de registro con Github.

## Vistas existentes

- [localhost:8080/products](http://localhost:8080/products): Listado de productos.
- `localhost:8080/carts/:cartId`: Listado de items del cart seleccionado.

## Endpoints

### Users

- `GET /users/register-github`: Redirecciona a Github para loguearse.
- `POST /users/register`: Crea un usuario nuevo.
- `POST /users/login`: Loguea un usuario existente.
- `GET /users/logout`: Desloguea al usuario logueado.

### Products

- `GET /api/products`: Retorna todos los productos paginados. Recibe parámetros opcionales: `limit`, `page`, `sort`, `category` y `available`
- `GET /api/products/:id`: Retorna el producto por id.
- `POST /api/products`: Crea un producto nuevo. Se debe enviar con archivo de imagen.
- `PUT /api/products/:id`: Edita el producto. Se debe enviar con archivo de imagen.
- `DELETE /api/products/:id`: Elimina el producto enviado.

### Cart

- `GET /api/carts`: Retorna todos los carts.
- `GET /api/carts/:id`: Retorna el cart por id.
- `POST /api/carts`: Crea un cart nuevo.
- `POST /api/carts/product/:productId`: Agrega un producto al cart. Si ya existe, aumenta su cantidad en uno. Valida que tanto el cart como el product existan.
- `DELETE /api/:id/product/:productId`: Elimina el producto seleccionado.
- `PUT /api/:id`: Actualiza los items del cart. Debe recibir en el body un array con este formato:

```
{
  "items": [{
    "product": "64bd3cff240f2bd3d6b69d14",
    "quantity": 2
  }, {
    "product": "64bd408b3c050f9830a8acc9",
    "quantity": 3
  }]
}
```

- `PUT "/:id/product/:productId`: Actualiza la cantidad del producto seleccionado. Por ejemplo:

```
{
  "quantity": 10
}
```

- `DELETE "/id"`: Remover el cart seleccionado.
