# Registro de Cambios - Sprint 2 (docs/changelog/sprint2.md)

Fecha: 2026-10-26  
Proyecto: HangIt (MVP - Incremento Sprint 2)  
Responsable: Ingeniero de Software Senior y Arquitecto de Soluciones  

---

## 1. Resumen de Modificaciones por Archivo

| Archivo | Línea / Función afectada | Descripción del cambio | Motivo (HU o Bug) | Fecha |
|---|---|---|---|---|
| `data.js` | Exportación `CATEGORIAS` | Se implementó el modelo de datos para las 3 categorías ("Presente continuo", "Pasado simple", "Pasado continuo"), con 3 rondas por categoría. | Regla 2, Regla 3, HU-06 | 2026-10-26 |
| `data.js` | Exportación `REACTIVOS` | Se reemplazaron los 5 reactivos de prueba del Sprint 1 (verbos en pasado) por los 5 reactivos de "Presente continuo" (RUNNING, COOKING, READING, LISTENING, STUDYING). | Regla 5, CA 8.4 | 2026-10-26 |
| `index.html` | Contenedor principal `#app` | Se encapsularon las pantallas en 4 vistas semánticas: `#pantalla-categorias`, `#pantalla-detalle-categoria`, `#pantalla-juego` y `#pantalla-resumen`. | HU-06, HU-07, HU-08, HU-17 | 2026-10-26 |
| `index.html` | Header y vistas nuevas | Se agregaron las barras superiores centradas para Categorías y Resumen, el botón de retroceso (`#boton-retroceso`) y los botones de acción (`#boton-jugar`, `#boton-volver-menu`). | CA 6.2, CA 7.2, CA 7.3, CA 8.1, CA 17.2, CA 17.6 | 2026-10-26 |
| `styles.css` | Clases de estructura y vistas | Se añadieron las clases `.pantalla-vista`, `.barra-superior-centrada`, `.boton-retroceso`, `.tarjeta-categoria`, `.tarjeta-ronda`, `.boton-primario`, `.tarjeta-resumen-total`, `.texto-resumen-exito`, `.contenedor-fallados` y `.item-fallado`. | HU-06, HU-07, HU-08, HU-17 | 2026-10-26 |
| `styles.css` | Clases de juego existentes | Sin cambios. Se preservaron íntegramente las posiciones, dimensiones, estados deshabilitados y estilos del Sprint 1 bajo la paleta cerrada de 15 colores. | No regresión (Sprint 1) | 2026-10-26 |
| `script.js` | `DOMContentLoaded` | Se cambió el punto de inicio para mostrar el menú de categorías (`pantallaCategorias`) en lugar de iniciar directamente la pantalla de juego. | HU-06 (CA 6.1) | 2026-10-26 |
| `script.js` | Función `mostrarVista()` | Se creó función controladora para transicionar entre las 4 pantallas del sistema ocultando las inactivas. | HU-06, HU-07, HU-08, HU-17 | 2026-10-26 |
| `script.js` | Función `iniciarRonda()` | Se implementó el inicio formal de la ronda desde el botón "Jugar" de la pantalla de detalle. | HU-08 (CA 8.2) | 2026-10-26 |
| `script.js` | Función `procesarJugada()` | **BUG-02**: Se insertó validación específica para 'ñ' o 'Ñ' con el mensaje literal "Ingresa solo letras del abecedario en inglés". | BUG-02, CA 14.6 ampliado | 2026-10-26 |
| `script.js` | Función `procesarJugada()` | **BUG-03**: Se agregó `cajaLetra.focus()` tras cada intento no terminal o validación para mantener el foco activo y el teclado nativo visible. | BUG-03 | 2026-10-26 |
| `script.js` | Función `procesarJugada()` | **BUG-01 / CA 8.5**: En el reactivo 5 (último de la ronda), al cerrarse por acierto o fallo se invoca inmediatamente `mostrarPantallaResumen()`, suprimiendo el botón "Siguiente reactivo". | BUG-01, CA 8.5, reemplazo de CA 15.9 | 2026-10-26 |
| `script.js` | Función `mostrarPantallaResumen()` | Se implementó la construcción de la pantalla de resumen con conteo exacto de fallos y lista de oraciones falladas con verbo en mayúscula entre paréntesis. | HU-17 (CA 17.1 a CA 17.8) | 2026-10-26 |
| `metadata.json` | Todo el archivo | **Sin cambios**. Se mantiene la configuración establecida en el Sprint 1. | N/A | 2026-10-26 |
| `package.json` | Todo el archivo | **Sin cambios**. No se introdujeron dependencias nuevas ni se modificaron scripts. | N/A | 2026-10-26 |
| `tsconfig.json` | Todo el archivo | **Sin cambios**. | N/A | 2026-10-26 |
| `vite.config.ts` | Todo el archivo | **Sin cambios**. | N/A | 2026-10-26 |

---

## 2. Validación de Criterios de No Regresión
- Se verificó que los 43 criterios de aceptación del Sprint 1 se mantengan completamente operativos, con las únicas excepciones contempladas en los requerimientos del Sprint 2:
  - CA 15.9 reemplazado por CA 8.5 / BUG-01 (avance directo a resumen en reactivo 5).
  - CA 14.6 ampliado por BUG-02 (mensaje específico para 'ñ'/'Ñ').
  - CA 5.7 armonizado con BUG-03 (foco mantenido entre jugadas, mientras que en la carga inicial la caja permanece sin foco).
- Se confirmó que no se agregaron colores fuera de los 15 permitidos.
- Se verificó que no se implementaron características excluidas de releases futuros (sin gráficos de progreso, sin desbloqueo de rondas 2/3, sin renderizar categorías bloqueadas, sin ahorcado dibujado).
