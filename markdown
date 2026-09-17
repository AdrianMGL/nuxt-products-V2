# Prisma en Nuxt

## Configuracion

Este proyecto usa Prisma 7 con PostgreSQL y el adaptador `@prisma/adapter-pg`.

- Esquema: `prisma/schema.prisma`
- Configuracion: `prisma.config.ts`
- Cliente generado: `prisma/generated`
- Migraciones: `prisma/migrations`
- Conexion: variable `DATABASE_URL` en `.env`

El cliente se genera automaticamente despues de instalar dependencias porque
`package.json` contiene este script:

```json
"postinstall": "nuxt prepare && prisma generate"
```

## Flujo normal

Despues de clonar el proyecto o instalar dependencias:

```bash
yarn install
```

Generar manualmente el cliente Prisma:

```bash
yarn prisma generate
```

Cada vez que se modifica `prisma/schema.prisma`, crear y aplicar una migracion
en desarrollo:

```bash
yarn prisma migrate dev --name nombre_del_cambio
```

Por ejemplo:

```bash
yarn prisma migrate dev --name add_profile_fields
```

Este comando crea una carpeta dentro de `prisma/migrations`, aplica el SQL a
la base de datos y actualiza el cliente Prisma.

Comprobar el estado:

```bash
yarn prisma migrate status
```

Arrancar Nuxt:

```bash
yarn dev
```

## Produccion

En produccion no se debe usar `migrate dev`. Se aplican las migraciones que ya
estan guardadas en el repositorio:

```bash
yarn prisma migrate deploy
yarn prisma generate
```

## Crear las tablas por primera vez

Si la base de datos esta vacia y todavia no existe `prisma/migrations`, se
puede crear la migracion inicial con:

```bash
yarn prisma migrate dev --name init
```

Despues:

```bash
yarn prisma migrate status
yarn prisma generate
```

## Si se borra `prisma/migrations`

Las migraciones son el historial de cambios de la base de datos. No conviene
eliminar esa carpeta si la base ya tiene tablas o datos.

### Opcion preferida: recuperar desde Git

Si la migracion estaba versionada:

```bash
git log --all -- prisma/migrations
git restore --source=HEAD -- prisma/migrations
```

Despues comprobar:

```bash
yarn prisma migrate status
```

### Si la base esta vacia

Se puede generar una nueva migracion inicial:

```bash
yarn prisma migrate dev --name init
```

### Si la base ya tiene tablas

No ejecutar una migracion inicial a ciegas, porque puede intentar crear tablas
que ya existen. Primero revisar el estado y recuperar el historial desde Git.

Si el historial se perdio definitivamente, hay que crear un *baseline* de la
base existente siguiendo el procedimiento de Prisma para marcar la migracion
inicial como aplicada. No se deben borrar las tablas para resolver el problema
si contienen datos.

## Seed de datos

El archivo `prisma/seed.ts` crea datos de prueba. Ejecutarlo con:

```bash
yarn prisma db seed
```

El seed necesita que `DATABASE_URL` este definido en `.env` y que las tablas
ya existan.

## Diagnostico rapido

Validar el esquema sin modificar la base:

```bash
yarn prisma validate
```

Regenerar el cliente:

```bash
yarn prisma generate
```

Si la API devuelve `The table public.User does not exist`, Prisma si logro
conectarse a PostgreSQL, pero las migraciones no se han aplicado. En una base
vacia, ejecutar:

```bash
yarn prisma migrate dev --name init
```

Si aparece `No migration found in prisma/migrations`, la carpeta falta o no
contiene migraciones. Recuperarla desde Git es la opcion mas segura cuando la
base ya tiene datos.
