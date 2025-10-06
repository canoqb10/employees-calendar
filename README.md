# Employees Calendar

Un sistema de gestión de horarios para empleados desarrollado con Symfony 6 y Vue.js. Permite visualizar y administrar los horarios de trabajo de los empleados de manera interactiva utilizando un calendario.

## Autor
Nombre: Jose Alberto Cano Govea
Email: juliojacg@hotmail.com


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

2. Copiar el archivo de variables de entorno:
```bash
cp .env.example .env
```

3. Construir y levantar los contenedores Docker:
```bash
docker-compose up -d
```

4. Instalar dependencias:
```bash
docker-compose exec php composer install
```

5. Crear la base de datos y cargar los datos iniciales:
```bash
docker-compose exec php bin/console doctrine:database:create
docker-compose exec php bin/console doctrine:schema:update --force
psql -h localhost -U postgres -d employees_calendar -f db/employes_calendar_model.sql
```

## Uso con Make

El proyecto incluye un Makefile para simplificar las operaciones comunes:

```bash
# Iniciar el proyecto
make start

# Detener el proyecto
make stop

# Reiniciar el proyecto
make restart

# Acceder al contenedor PHP
make ssh-php

# Instalar dependencias
make install

# Limpiar caché
make cache-clear
```

## Acceso a la Aplicación

- Aplicación web: http://localhost:8080
- Base de datos:
  - Host: localhost
  - Puerto: 5432
  - Usuario: postgres
  - Base de datos: employees_calendar

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

## Contribuir
1. Fork el proyecto
2. Crea tu rama de características (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## Licencia
Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.
