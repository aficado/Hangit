/**
 * @file data.js
 * @description Estructura de datos desacoplada para HangIt - Sprint 2.
 * Define las 3 categorías con 3 rondas cada una, y los reactivos precargados
 * de la categoría activa "Presente continuo" (Ronda 1).
 */

export const CATEGORIAS = [
  {
    id: "presente-continuo",
    nombre: "Presente continuo",
    desbloqueada: true,
    rondas: [
      {
        numero: 1,
        reactivos: [
          {
            id: 1,
            oracion: "She is {verb} in the park right now.",
            verbo: "RUNNING"
          },
          {
            id: 2,
            oracion: "They are {verb} dinner together tonight.",
            verbo: "COOKING"
          },
          {
            id: 3,
            oracion: "I am {verb} a new book this week.",
            verbo: "READING"
          },
          {
            id: 4,
            oracion: "He is {verb} to music in his room.",
            verbo: "LISTENING"
          },
          {
            id: 5,
            oracion: "We are {verb} for the test tomorrow.",
            verbo: "STUDYING"
          }
        ]
      },
      {
        numero: 2,
        reactivos: []
      },
      {
        numero: 3,
        reactivos: []
      }
    ]
  },
  {
    id: "pasado-simple",
    nombre: "Pasado simple",
    desbloqueada: false,
    rondas: [
      { numero: 1, reactivos: [] },
      { numero: 2, reactivos: [] },
      { numero: 3, reactivos: [] }
    ]
  },
  {
    id: "pasado-continuo",
    nombre: "Pasado continuo",
    desbloqueada: false,
    rondas: [
      { numero: 1, reactivos: [] },
      { numero: 2, reactivos: [] },
      { numero: 3, reactivos: [] }
    ]
  }
];

// Reactivos de la ronda jugable activa (Ronda 1 de Presente continuo)
export const REACTIVOS = CATEGORIAS[0].rondas[0].reactivos;
