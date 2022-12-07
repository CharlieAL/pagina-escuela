import Task from 'models/Task'

export default async function handler(req, res) {
  const { method, body } = req
  if (method !== 'PUT') {
    return res.status(401).json('No existe ese metodo')
  }
  const { status, id } = body
  try {
    const result = await Task.findByIdAndUpdate(id, { status }, { new: true })

    return res.status(201).json(result)
  } catch (error) {
    console.log(error)
    return res.status(500).json('error')
  }
}
