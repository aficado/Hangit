# HangIt - MVP Sprint 2 (Prototipo Web Autónomo)

Aplicación móvil tipo videojuego educativo para evaluar el dominio de la conjugación verbal en inglés, mediante la mecánica del ahorcado con retroalimentación exclusivamente textual.

---

## 1. Descripción del Incremento (Sprint 2)

En este Sprint 2 se ha extendido el producto incorporando:
- **Punto de entrada con Menú de Categorías (HU-06)**: Muestra como única categoría disponible "Presente continuo" (las categorías "Pasado simple" y "Pasado continuo" se encuentran definidas en los datos pero no se renderizan, reservadas para releases posteriores).
- **Pantalla de Detalle de Categoría (HU-07 & HU-08)**: Muestra "Ronda 1 de 3", botón de retroceso hacia el menú de categorías y botón "Jugar" para iniciar la ronda.
- **Nuevos Reactivos (Presente Continuo - Ronda 1)**: 5 reactivos precargados (RUNNING, COOKING, READING, LISTENING, STUDYING) evaluados con la mecánica del Sprint 1.
- **Pantalla de Resumen de Ronda (HU-17)**: Reemplazo automático al finalizar el 5to reactivo. Despliega "Fallaste N de 5 reactivos" y, si hubo fallos, la lista de oraciones completadas con el verbo correcto en mayúsculas entre paréntesis; si no hubo fallos, muestra "¡Completaste todos los reactivos!". Incluye botón "Volver al menú".
- **Corrección de Bugs del Sprint 1**:
  - **BUG-01**: Al terminar el reactivo 5 (por acierto o fallo), se avanza automáticamente a la pantalla de resumen sin mostrar el botón "Siguiente reactivo" ni requerir pulsaciones extras (CA 8.5).
  - **BUG-02**: Al ingresar la letra "ñ" o "Ñ", se muestra el mensaje específico "Ingresa solo letras del abecedario en inglés" (conservando fondo gris #F3F4F6 y texto gris #374151).
  - **BUG-03**: Al pulsar "Comprobar", la caja de texto recupera el foco inmediatamente (`cajaLetra.focus()`) para que el teclado nativo permanezca abierto entre jugadas sucesivas dentro del mismo reactivo.

---

## 2. Estructura de Archivos

```
/
├── index.html                   # 4 pantallas semánticas (Categorías, Detalle, Juego, Resumen)
├── styles.css                   # Estilos visuales bajo la paleta cerrada de 15 colores
├── script.js                    # Lógica de juego, ruteo de vistas y corrección de bugs
├── data.js                      # Modelo de 3 categorías y reactivos de Presente continuo
├── metadata.json                # Metadatos para Google AI Studio
├── package.json                 # Configuración del entorno
├── README.md                    # Documentación del proyecto
└── docs/
    └── changelog/
        └── sprint2.md           # Registro de cambios detallado respecto al Sprint 1
```

---

## 3. Instrucciones de Ejecución

### En Google AI Studio
El prototipo está configurado para ejecutarse en el puerto 3000. Al cargar la vista previa, se desplegará de inmediato el menú de categorías como punto de entrada.

### En Entorno Local
1. Asegurarse de tener Node.js (v18 o superior) instalado.
2. Instalar dependencias si es necesario:
   ```bash
   npm install
   ```
3. Iniciar el servidor de desarrollo:
   ```bash
   npm run dev
   ```
4. Abrir `http://localhost:3000` en el navegador.
5. Para simular el entorno móvil, activar las herramientas de desarrollador (`F12`), seleccionar el modo dispositivo móvil (`Ctrl + Shift + M`) y elegir un tamaño como iPhone o Pixel.

---

## 4. Guía de Pruebas Paso a Paso

1. **Menú de Categorías**:
   - Al cargar la página, se visualiza la barra "Categorías" y la tarjeta "Presente continuo".
   - Las categorías "Pasado simple" y "Pasado continuo" no aparecen visibles.
2. **Detalle de Categoría**:
   - Tocar la tarjeta "Presente continuo" → Abre la pantalla de detalle con "Presente continuo" en la barra superior, botón "←" a la izquierda, la tarjeta "Ronda 1 de 3" y el botón "Jugar".
   - Pulsar "←" → Devuelve al menú de categorías sin alterar nada.
3. **Inicio de Ronda y Juego**:
   - Desde el detalle, pulsar "Jugar" → Se despliega la pantalla de juego con el primer reactivo: "She is _ _ _ _ _ _ _ in the park right now.", 7 intentos, letras usadas: "-" y botón "Comprobar".
4. **Prueba de BUG-02 (Letra ñ)**:
   - Ingresar "ñ" o "Ñ" y pulsar "Comprobar" → Muestra el aviso "Ingresa solo letras del abecedario en inglés", fondo gris, intentos intactos (7 de 7).
5. **Prueba de BUG-03 (Foco del teclado)**:
   - Al pulsar "Comprobar" con una letra correcta, incorrecta o repetida, la caja de texto retiene el cursor y foco para continuar escribiendo sin tocarla de nuevo.
6. **Avance entre reactivos 1 al 4**:
   - Al completar o fallar los reactivos 1 a 4, aparece el botón "Siguiente reactivo" para avanzar.
7. **Prueba de BUG-01 y Pantalla de Resumen**:
   - En el reactivo 5 ("We are {verb} for the test tomorrow."), al acertar o fallar el último intento, el sistema avanza automáticamente a la pantalla de resumen sin mostrar el botón "Siguiente reactivo".
   - Si hubo fallos, se muestra "Fallaste N de 5 reactivos" y la lista de oraciones falladas con el verbo correcto en mayúsculas entre paréntesis: e.g. "She is running in the park right now. (RUNNING)".
   - Si no hubo fallos, se muestra "Fallaste 0 de 5 reactivos" y "¡Completaste todos los reactivos!".
   - Pulsar "Volver al menú" → Regresa al menú de categorías en su estado inicial.
