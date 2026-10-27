/**
 * @file script.js
 * @description Lógica de HangIt - Sprint 2.
 * Implementa la navegación de 4 vistas (Categorías, Detalle, Juego, Resumen),
 * las Historias de Usuario HU-06, HU-07, HU-08 y HU-17,
 * y la corrección de BUG-01, BUG-02 y BUG-03 preservando los criterios del Sprint 1.
 */

import { REACTIVOS } from './data.js';

// Estado global de la aplicación
let indiceReactivo = 0;
let intentosRestantes = 7;
/** @type {string[]} */
let letrasUsadas = [];
/** @type {Set<string>} */
let letrasReveladas = new Set();
let reactivoCerrado = false;

/** @type {Array<{id: number, reactivo: {id: number, oracion: string, verbo: string}, acertado: boolean}>} */
const sesionResultados = [];

// Elementos del DOM - Pantallas / Vistas
const pantallaCategorias = document.getElementById('pantalla-categorias');
const pantallaDetalleCategoria = document.getElementById('pantalla-detalle-categoria');
const pantallaJuego = document.getElementById('pantalla-juego');
const pantallaResumen = document.getElementById('pantalla-resumen');

// Elementos de navegación
const tarjetaCategoria = document.getElementById('tarjeta-categoria-presente-continuo');
const botonRetroceso = document.getElementById('boton-retroceso');
const botonJugar = document.getElementById('boton-jugar');
const botonVolverMenu = document.getElementById('boton-volver-menu');

// Elementos del juego (Sprint 1)
const etiquetaRonda = document.getElementById('etiqueta-ronda');
const etiquetaReactivo = document.getElementById('etiqueta-reactivo');
const franjaIntentos = document.getElementById('franja-intentos');
const textoOracion = document.getElementById('texto-oracion');
const etiquetaLetrasUsadas = document.getElementById('etiqueta-letras-usadas');
const cajaLetra = /** @type {HTMLInputElement} */ (document.getElementById('caja-letra'));
const botonComprobar = /** @type {HTMLButtonElement} */ (document.getElementById('boton-comprobar'));
const areaAvisos = document.getElementById('area-avisos');
const botonSiguiente = /** @type {HTMLButtonElement} */ (document.getElementById('boton-siguiente'));

// Elementos de la pantalla de resumen (HU-17)
const textoResumenTotal = document.getElementById('texto-resumen-total');
const textoResumenExito = document.getElementById('texto-resumen-exito');
const contenedorFallados = document.getElementById('contenedor-fallados');
const listaReactivosFallados = document.getElementById('lista-reactivos-fallados');

/**
 * Gestiona el intercambio de vistas ocultando todas y mostrando la solicitada.
 * @param {HTMLElement | null} vistaVisible - Elemento de la vista a mostrar.
 */
function mostrarVista(vistaVisible) {
  const vistas = [pantallaCategorias, pantallaDetalleCategoria, pantallaJuego, pantallaResumen];
  vistas.forEach(vista => {
    if (vista) {
      vista.classList.add('oculto');
    }
  });
  if (vistaVisible) {
    vistaVisible.classList.remove('oculto');
  }
}

/**
 * Genera la representación visual del verbo oculto con guiones bajos o letras reveladas.
 * @param {string} verbo - Verbo objetivo en mayúsculas.
 * @returns {string} Verbo formateado con guiones y letras separados por espacio.
 */
function obtenerTextoVerbo(verbo) {
  return verbo
    .split('')
    .map(caracter => (letrasReveladas.has(caracter) ? caracter : '_'))
    .join(' ');
}

/**
 * Actualiza la tarjeta central con la oración correspondiente y sus guiones/letras.
 */
function actualizarOracion() {
  const reactivoActual = REACTIVOS[indiceReactivo];
  const representacionVerbo = obtenerTextoVerbo(reactivoActual.verbo);
  if (textoOracion) {
    textoOracion.textContent = reactivoActual.oracion.replace('{verb}', representacionVerbo);
  }
}

/**
 * Actualiza el texto de la franja del contador de intentos restantes.
 */
function actualizarContadorIntentos() {
  if (franjaIntentos) {
    franjaIntentos.textContent = `Intentos restantes: ${intentosRestantes} de 7`;
  }
}

/**
 * Actualiza la etiqueta de letras usadas con el formato requerido.
 */
function actualizarLetrasUsadas() {
  if (etiquetaLetrasUsadas) {
    if (letrasUsadas.length === 0) {
      etiquetaLetrasUsadas.textContent = "Letras usadas: -";
    } else {
      etiquetaLetrasUsadas.textContent = `Letras usadas: ${letrasUsadas.join(', ')}`;
    }
  }
}

/**
 * Muestra un mensaje en el área de avisos con el color y tipografía especificados.
 * @param {string} mensaje - Texto del aviso a mostrar.
 * @param {'vacio' | 'neutro' | 'rojo' | 'verde'} tipo - Tipo de aviso para aplicar estilos.
 */
function mostrarAviso(mensaje, tipo) {
  if (!areaAvisos) return;
  areaAvisos.textContent = mensaje;
  areaAvisos.className = 'area-avisos';

  if (tipo === 'verde') {
    areaAvisos.classList.add('aviso-verde');
  } else if (tipo === 'rojo') {
    areaAvisos.classList.add('aviso-rojo');
  } else if (tipo === 'neutro') {
    areaAvisos.classList.add('aviso-neutro');
  } else {
    areaAvisos.classList.add('aviso-vacio');
  }
}

/**
 * Deshabilita la caja de texto y el botón Comprobar al terminar un reactivo.
 */
function deshabilitarControles() {
  if (cajaLetra) {
    cajaLetra.disabled = true;
  }
  if (botonComprobar) {
    botonComprobar.disabled = true;
  }
}

/**
 * Muestra el botón de avanzar al siguiente reactivo (solo para reactivos 1 al 4).
 */
function mostrarBotonSiguiente() {
  if (botonSiguiente && indiceReactivo < REACTIVOS.length - 1) {
    botonSiguiente.classList.remove('oculto');
  }
}

/**
 * Construye y despliega la pantalla de resumen de la ronda (HU-17).
 */
function mostrarPantallaResumen() {
  mostrarVista(pantallaResumen);

  const fallados = sesionResultados.filter(item => !item.acertado);
  const cantidadFallados = fallados.length;

  // CA 17.3: Línea de total de reactivos fallados
  if (textoResumenTotal) {
    textoResumenTotal.textContent = `Fallaste ${cantidadFallados} de 5 reactivos`;
  }

  if (cantidadFallados > 0) {
    // CA 17.4: Mostrar lista de oraciones completas con verbo en mayúscula entre paréntesis
    if (textoResumenExito) {
      textoResumenExito.classList.add('oculto');
    }
    if (contenedorFallados) {
      contenedorFallados.classList.remove('oculto');
    }
    if (listaReactivosFallados) {
      listaReactivosFallados.innerHTML = '';
      fallados.forEach(item => {
        const li = document.createElement('li');
        li.className = 'item-fallado';
        const oracionCompleta = item.reactivo.oracion.replace('{verb}', item.reactivo.verbo.toLowerCase());
        li.textContent = `${oracionCompleta} (${item.reactivo.verbo})`;
        listaReactivosFallados.appendChild(li);
      });
    }
  } else {
    // CA 17.5: Si no hubo fallos, mostrar '¡Completaste todos los reactivos!' sin lista
    if (textoResumenExito) {
      textoResumenExito.classList.remove('oculto');
    }
    if (contenedorFallados) {
      contenedorFallados.classList.add('oculto');
    }
    if (listaReactivosFallados) {
      listaReactivosFallados.innerHTML = '';
    }
  }
}

/**
 * Procesa la letra ingresada siguiendo estrictamente el orden de evaluación de la Regla 11,
 * incorporando BUG-02 (validación ñ), BUG-03 (foco persistente) y BUG-01 (cierre de ronda en reactivo 5).
 */
function procesarJugada() {
  if (reactivoCerrado) return;

  const valor = cajaLetra ? cajaLetra.value : '';

  // Regla 11 - Caso (1): Caja vacía
  if (!valor || valor.trim() === '') {
    mostrarAviso("Ingresa una letra", "neutro");
    // BUG-03: Devolver el foco a la caja de texto
    if (cajaLetra) cajaLetra.focus();
    return;
  }

  // BUG-02: Caso específico de la letra ñ / Ñ (no pertenece al alfabeto en inglés)
  if (valor === 'ñ' || valor === 'Ñ') {
    mostrarAviso("Ingresa solo letras del abecedario en inglés", "neutro");
    if (cajaLetra) {
      cajaLetra.value = '';
      // BUG-03: Devolver el foco
      cajaLetra.focus();
    }
    return;
  }

  // Regla 11 - Caso (2): Carácter no alfabético fuera de A-Z (números, símbolos, acentos)
  if (!/^[A-Za-z]$/.test(valor)) {
    mostrarAviso("Ingresa solo letras", "neutro");
    if (cajaLetra) {
      cajaLetra.value = '';
      // BUG-03: Devolver el foco
      cajaLetra.focus();
    }
    return;
  }

  const letra = valor.toUpperCase();

  // Regla 11 - Caso (3): Letra ya intentada presente en el listado de letras usadas
  if (letrasUsadas.includes(letra)) {
    mostrarAviso("Ya intentaste esa letra", "neutro");
    if (cajaLetra) {
      cajaLetra.value = '';
      // BUG-03: Devolver el foco
      cajaLetra.focus();
    }
    return;
  }

  const reactivoActual = REACTIVOS[indiceReactivo];
  const verboActual = reactivoActual.verbo.toUpperCase();

  // Regla 11 - Caso (4): Letra correcta que pertenece al verbo oculto
  if (verboActual.includes(letra)) {
    letrasReveladas.add(letra);
    letrasUsadas.push(letra);
    actualizarLetrasUsadas();
    actualizarOracion();
    if (cajaLetra) {
      cajaLetra.value = '';
    }

    const todasReveladas = verboActual.split('').every(caracter => letrasReveladas.has(caracter));

    if (todasReveladas) {
      reactivoCerrado = true;
      sesionResultados.push({ id: reactivoActual.id, reactivo: reactivoActual, acertado: true });
      deshabilitarControles();

      // BUG-01 / CA 8.5: Al cerrar el quinto reactivo, avanzar automáticamente a resumen
      if (indiceReactivo === REACTIVOS.length - 1) {
        mostrarPantallaResumen();
      } else {
        mostrarAviso("¡Reactivo completado correctamente!", "verde");
        mostrarBotonSiguiente();
      }
    } else {
      mostrarAviso("¡Letra correcta!", "verde");
      // BUG-03: Mantener foco entre jugadas sucesivas si el reactivo no ha cerrado
      if (cajaLetra) cajaLetra.focus();
    }
    return;
  }

  // Regla 11 - Caso (5): Letra incorrecta que no pertenece al verbo oculto
  intentosRestantes--;
  letrasUsadas.push(letra);
  actualizarLetrasUsadas();
  actualizarContadorIntentos();
  if (cajaLetra) {
    cajaLetra.value = '';
  }

  if (intentosRestantes === 0) {
    reactivoCerrado = true;
    sesionResultados.push({ id: reactivoActual.id, reactivo: reactivoActual, acertado: false });
    deshabilitarControles();

    // BUG-01 / CA 8.5: Al cerrar el quinto reactivo, avanzar automáticamente a resumen
    if (indiceReactivo === REACTIVOS.length - 1) {
      mostrarPantallaResumen();
    } else {
      mostrarAviso("Se agotaron tus intentos. Fallaste este reactivo", "rojo");
      mostrarBotonSiguiente();
    }
  } else {
    mostrarAviso("Letra incorrecta", "rojo");
    // BUG-03: Mantener foco entre jugadas sucesivas
    if (cajaLetra) cajaLetra.focus();
  }
}

/**
 * Carga e inicializa el reactivo indicado en pantalla.
 * @param {number} indice - Índice del reactivo (0 a 4).
 */
function cargarReactivo(indice) {
  reactivoCerrado = false;
  intentosRestantes = 7;
  letrasUsadas = [];
  letrasReveladas.clear();

  if (etiquetaRonda) {
    etiquetaRonda.textContent = "Ronda 1";
  }
  if (etiquetaReactivo) {
    etiquetaReactivo.textContent = `Reactivo ${indice + 1} de 5`;
  }

  actualizarContadorIntentos();
  actualizarLetrasUsadas();
  actualizarOracion();
  mostrarAviso("", "vacio");

  // CA 5.7: Caja inicia vacía y sin foco (sin teclado desplegado)
  if (cajaLetra) {
    cajaLetra.disabled = false;
    cajaLetra.value = '';
  }
  if (botonComprobar) {
    botonComprobar.disabled = false;
  }
  if (botonSiguiente) {
    botonSiguiente.classList.add('oculto');
  }
}

/**
 * Inicializa la ronda desde el reactivo 1 y muestra la pantalla de juego (CA 8.2).
 */
function iniciarRonda() {
  indiceReactivo = 0;
  sesionResultados.length = 0;
  mostrarVista(pantallaJuego);
  cargarReactivo(0);
}

/**
 * Maneja el avance al siguiente reactivo (reactivos 1 a 4).
 */
function avanzarReactivo() {
  if (indiceReactivo < REACTIVOS.length - 1) {
    indiceReactivo++;
    cargarReactivo(indiceReactivo);
  }
}

// Configuración de escuchadores de eventos
if (tarjetaCategoria) {
  tarjetaCategoria.addEventListener('click', () => {
    mostrarVista(pantallaDetalleCategoria);
  });
}

if (botonRetroceso) {
  botonRetroceso.addEventListener('click', () => {
    mostrarVista(pantallaCategorias);
  });
}

if (botonJugar) {
  botonJugar.addEventListener('click', iniciarRonda);
}

if (botonVolverMenu) {
  botonVolverMenu.addEventListener('click', () => {
    mostrarVista(pantallaCategorias);
  });
}

if (botonComprobar) {
  botonComprobar.addEventListener('click', procesarJugada);
}

if (botonSiguiente) {
  botonSiguiente.addEventListener('click', avanzarReactivo);
}

// Regla 10: La tecla de confirmación (Enter/Listo) no procesa jugada; cierra el teclado
if (cajaLetra) {
  cajaLetra.addEventListener('keydown', (evento) => {
    if (evento.key === 'Enter') {
      evento.preventDefault();
      cajaLetra.blur();
    }
  });
}

// Inicialización de la aplicación al cargar el DOM (CA 6.1: Menú de categorías como punto de entrada)
document.addEventListener('DOMContentLoaded', () => {
  mostrarVista(pantallaCategorias);
});
