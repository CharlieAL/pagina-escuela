export default function taskHandler(req, res) {
  const { method, body } = req
  const tasks = [
    {
      id: 1234,
      nombre: 'Roberto Martinez Delgado Perez',
      nombreTask: 'Programacion y Seguimiento',
      emailPara: 'profe1@lacal.com',
      diaEntrega: 1670031250,
      status: 'revisado',
      area: 'Profesor',
      descripcion: 'subir en archivo exel bla bla',
      comentarios: [
        {
          id: 3123,
          nombre: 'Roberto Martinez Delgado Perez',
          mensaje: 'Ey que rollo'
        },
        {
          id: 414312,
          nombre: 'Admin',
          mensaje: 'Ey'
        }
      ]
    },
    {
      id: 5142,
      nombre: 'Roberto Martinez Delgado Perez',
      nombreTask: 'Listas de Asistencia',
      emailPara: 'profe2@lacal.com',
      diaEntrega: 1670031250,
      status: 'pendiente',
      area: 'Profesor',
      descripcion: 'subir en archivo exel bla bla',
      comentarios: [
        {
          id: 3123,
          nombre: 'Roberto Martinez Delgado Perez',
          mensaje: 'Ey que rollo'
        },
        {
          id: 414312,
          nombre: 'Admin',
          mensaje: 'Ey'
        }
      ]
    },
    {
      id: 12354312344,
      nombre: 'Roberto Martinez Delgado Perez',
      nombreTask: 'Programacion y Seguimiento',
      emailPara: 'profe412@lacal.com',
      diaEntrega: 1670031250,
      status: 'devuelto',
      area: 'Profesor',
      descripcion: 'subir en archivo exel bla bla',
      comentarios: [
        {
          id: 312513412343,
          nombre: 'Roberto Martinez Delgado Perez',
          mensaje: 'Ey que rollo'
        },
        {
          id: 4143524314112,
          nombre: 'Admin',
          mensaje: 'Ey'
        }
      ]
    }
  ]
  if (method === 'GET') {
    return res.status(200).json(tasks)
  }
}
