import Task from 'models/Task'

export default async function handler(req, res) {
  const { method, query } = req
  if (method !== 'GET') {
    return res.status(401).json('No tiens Autorizacion')
  }

  const { id } = query
  try {
    const result = await Task.findById(id)
    const { comentarios } = result
    return res.status(201).json(comentarios)
  } catch (error) {
    return res.status(500)
  }
}
