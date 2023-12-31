export const JIRA_TIMESTAMP_FORMAT = 'YYYY-MM-DDTHH:mm:ss.000-0500'
export const JIRA_QUICK_LOGGER_MODES = [
  {
    code: 'MAN',
    name: 'Manual',
    description: 'Debes dar click en el botón de registrar día para realizar el registro automático en JIRA. Sólo se registrá el día actual'
  },
  {
    code: 'AUT',
    name: 'Automático',
    description: 'Al cargar la tarea, una ventana te reguntará si deseas realizar el registro automático en JIRA. Sólo se registrará el día actual'
  }
]

export const EVENT_COLORS = [
  { id: 1, background: '#a4bdfc' },
  { id: 2, background: '#7ae7bf' },
  { id: 3, background: '#dbadff' },
  { id: 4, background: '#ff887c' },
  { id: 5, background: '#fbd75b' },
  { id: 6, background: '#ffb878' },
  { id: 7, background: '#46d6db' },
  { id: 8, background: '#e1e1e1' },
  { id: 9, background: '#5484ed' },
  { id: 10, background: '#51b749' },
  { id: 11, background: '#dc2127' }
]
