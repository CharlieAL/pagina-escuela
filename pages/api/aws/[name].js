import Task from 'models/Task'
import { dbConnection } from 'utils/db'
dbConnection()

export default async function handler(req, res) {
  const { name } = req.query
  try {
    // const command = new GetObjectCommand({
    //   Bucket: AWS_BUCKET_NAME,
    //   Key: name
    // })
    // const result = await client.send(command)
    // console.log(result)
    // result.Body.pipe(fs.createWriteStream(`./public/${name}`))
    const url = await Task.findOne({ filename: name })
    console.log(url)
    return res.status(201).json('succefully')
  } catch (error) {
    return res.status(500).json(error)
  }
}
