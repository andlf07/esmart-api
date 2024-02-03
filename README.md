
# Emsart-api

Este proyecto fue realizado para prueba de desarrollo.

REST API desarrollada con tecnologias como Nodejs, Express, Sequelize, Postgresql

Deploy: https://esmart-api.onrender.com

Diagrama de base de datos Postgresql: https://dbdiagram.io/d/esmart-test-654e7aee7d8bbd6465f32476

Permite las acciones CRUDS a los siguientes paths:

     1. /users
     2. /sensors
     3. /telemetry
     4. /user-rules
     5. /auth/login


## Instalacion

Agregar las variables de entorno:

    DB_NAME=
    DB_DOMAIN=
    DB_PORT=
    DB_USER=
    DB_PASSWORD=
    MODE= development/production

Al clonar el repositorio:

    npm install

Para desarrollo:

    npm run start:dev

Para build:

    npm run build

Para correr el build:

    npm run start:prod

 




## Modelos:
1. User:

        {
            "username": "username"
        }

2. Sensor:

        {
            "topic":  "prueba/test/1", // Topic es unico por sensor
            "user_id":  "d71dc3c1-6014-4137-8cb6-5428bd17857c" //Id del usuario
        }

3. Telemtry:

        {
            "timestamp": 1623024000,
            "topic": "prueba/test/1", //Nombre del topic usado para registrar un sensor
            "temperature": 80.0,
            "humidity": 50.0,
            "flow": 0.0,
            "pressure": 0.0
        }
        
4. User Rules:

        {
            "fact": "Check if Temperature is greaterThan 70 ", // Nombre a dar a la regla
            "operator": "greaterThan", // Operador   "equal","notEqual","lessThan","lessThanInclusive","greaterThan","greaterThanInclusive",
            "value": "70",
            "description": "We will check if the temperature is greaterThan 70 an this is the descripcion of the rule",
            "checkKey":  "temperature", // Key a verificar
            "sensor_id": "b30a90dd-c512-4957-88ad-7ab11fb5b015" // Id del sensor a cual debemos agregarle la regla
        }
