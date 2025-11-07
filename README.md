# LEVEL-UP GAMER

Tienda online de productos gaming desarrollada con React y Bootstrap para la evaluación parcial 2 de Desarrollo FullStack II.

## Descripción del Proyecto

Level-Up Gamer es una aplicación web que permite a los usuarios navegar por un catálogo de productos gaming, agregar productos al carrito de compras, registrarse como usuarios y gestionar su perfil. El proyecto incluye validaciones para usuarios mayores de 18 años y descuentos automáticos del 20% para correos institucionales de DuocUC.

## Características Principales

- Catálogo de productos con filtros por categoría y búsqueda
- Carrito de compras con actualización de cantidades
- Sistema de registro y login de usuarios
- Validación de edad (mayores de 18 años)
- Descuento automático del 20% para correos @duocuc.cl
- Código de referido único por usuario
- Diseño responsivo adaptado a diferentes dispositivos
- Interfaz minimalista con animaciones suaves

## Tecnologías Utilizadas

- React 18
- React Router DOM
- Bootstrap 5
- React-Bootstrap
- CSS3 con diseño responsivo
- Jest y React Testing Library para pruebas

## Requisitos Previos

- Node.js (versión 14 o superior)
- npm (versión 6 o superior)

## Instalación y Ejecución

1. Clonar el repositorio:
   git clone [URL-del-repositorio]
   cd levelup-gamer-frontend

2. Instalar dependencias:

- npm install

3. Ejecutar el proyecto en modo desarrollo:

- npm start

4. Abrir en el navegador:

- http://localhost:3000

## Componentes Testeados

- ProductCard: Validación de renderizado y funcionalidad del carrito
- FilterBar: Funcionalidad de búsqueda y filtrado
- ProductReview: Sistema de reseñas y calificaciones
- RegisterForm: Validaciones de registro de usuario
- Validators: Funciones de validación de email, edad y contraseñas

## Funcionalidades Implementadas

### Registro de Usuarios

- Validación de email
- Verificación de edad (mayores de 18 años)
- Validación de contraseñas coincidentes
- Generación automática de código de referido

### Gestión del Carrito

- Agregar productos con cantidades personalizadas
- Actualizar cantidades desde el carrito
- Eliminar productos individuales
- Vaciar carrito completo
- Cálculo automático de subtotales y totales
- Aplicación de descuentos según tipo de usuario

### Catálogo de Productos

- Visualización de productos por categorías
- Búsqueda por nombre o descripción
- Filtrado por categoría específica
- Información detallada de cada producto

## Validaciones Implementadas

- Email válido (formato correcto)
- Edad mínima de 18 años
- Contraseña mínima de 6 caracteres
- Confirmación de contraseña
- Detección automática de correos @duocuc.cl para descuentos

## Autor

Desarrollado como proyecto académico para DSY1104 - Desarrollo FullStack II

## Notas Adicionales

Este proyecto fue creado con Create React App y sigue las mejores prácticas de desarrollo frontend moderno. El diseño minimalista utiliza una paleta de colores profesional con fuentes Inter y Poppins para una mejor experiencia de usuario.
