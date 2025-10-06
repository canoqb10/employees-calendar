# Employees Calendar

Un sistema de gestión de horarios para empleados desarrollado con Symfony 7 y Vue.js.
Permite visualizar y administrar los horarios de trabajo de los empleados de manera interactiva utilizando un calendario.

## Autor

- Nombre: Jose Alberto Cano Govea
- Email: juliojacg@hotmail.com

## Descripción
Esta aplicación permite:
- Visualizar una lista de empleados
- Ver y gestionar el calendario individual de cada empleado
- Crear, modificar y eliminar eventos en el calendario
- Guardar los horarios en una base de datos PostgreSQL
- Interfaz interactiva con arrastrar y soltar (drag & drop)
- Vista semanal con intervalos de 30 minutos

## Tecnologías

- Symfony 7.3
- Vue.js
- FullCalendar
- Moment.js
- Bootstrap
- Axios
- PostgreSQL
- Docker
- Docker compose
- Nginx
- PHP

## Estructura del Proyecto
```
employees-calendar/
├── bin/                    # Ejecutables de Symfony
├── config/                 # Configuración de Symfony
│   ├── packages/          # Configuración de paquetes
│   └── routes/            # Definición de rutas
├── db/                    # Scripts SQL y migraciones
├── docker/                # Configuración de Docker
│   ├── nginx/            # Configuración de Nginx
│   └── php/              # Configuración de PHP
├── public/               # Archivos públicos
│   ├── css/             # Hojas de estilo
│   └── vue/             # Componentes Vue.js
├── src/                  # Código fuente PHP
│   ├── Controller/      # Controladores
│   ├── Entity/          # Entidades
│   ├── Repository/      # Repositorios
│   └── Service/         # Servicios
└── templates/           # Plantillas Twig
```

## Requisitos Previos
- Docker
- Docker Compose
- Make (opcional, para usar comandos simplificados)

## Instalación

1. Clonar el repositorio:
```bash
git clone git@github.com:canoqb10/employees-calendar.git
cd employees-calendar
```

3. Construir e instalar dependencias
```bash
  make build
```

4. Levantar los contenedores Docker
```bash
  make run
```

4. Instalar el proyecto en los contenedores
```bash
  make prepare
```

5. Crear la base de datos y cargar los datos iniciales:
  - Copiar el script y ejecutarlo en tu servidor de bd

```bash
   db/employes_calendar_model.sql
```
  Datos de conexión

```bash
  POSTGRES_DB: employees_calendar
  POSTGRES_USER: admin
  POSTGRES_PASSWORD: admin
```


## Acceso a la Aplicación

- Aplicación web: http://localhost:8080
- Base de datos:
  - Host: localhost
  - Puerto: 5432
  - Usuario: admin
  - Base de datos: employees_calendar
  - Password: admin

## Características Principales

### Calendario
- Vista semanal por defecto
- Horario de trabajo de 6:00 AM a 12:00 AM
- Intervalos de 30 minutos
- Creación de eventos por selección de tiempo
- Edición de eventos por arrastre
- Eliminación de eventos
- Guardado automático

### Gestión de Empleados
- Listado de empleados
- Vista individual de calendario por empleado
- Registro de horas trabajadas

