import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import fs from 'fs'
import formidable from 'formidable'
import Task from 'models/Task'
import { dbConnection } from 'utils/db'
dbConnection()

const AWS_BUCKET_NAME = process.env.AWS_BUCKET_NAME
const AWC_BUCKET_REGION = process.env.AWC_BUCKET_REGION
const AWS_PUBLIC_KEY = process.env.AWS_PUBLIC_KEY
const AWS_SECRET_KEY = process.env.AWS_PRIVATE_KEY

const client = new S3Client({
  region: AWC_BUCKET_REGION,
  credentials: {
    accessKeyId: AWS_PUBLIC_KEY,
    secretAccessKey: AWS_SECRET_KEY
  }
})

export const config = {
  api: {
    bodyParser: false
  }
}

export default async function handleAws(req, res) {
  const form = formidable()
  const { method, body, query } = req
  const { id } = query
  if (method === 'POST') {
    form.parse(req, async (err, fields, files) => {
      if (!files.demo) {
        res.status(400).json('archivo no subido')
        return
      }
      try {
        const steam = fs.createReadStream(files.demo.filepath)
        const originalFilename = files.demo.originalFilename
        // console.log(steam)
        const input = {
          Bucket: AWS_BUCKET_NAME,
          Key: originalFilename,
          Body: steam
        }
        const url = `https://utnservicioporcarlos.s3.us-west-1.amazonaws.com/${originalFilename}`
        const command = new PutObjectCommand(input)
        // console.log('command', command)
        const response = await client.send(command)
        // console.log('response', response)
        // guardar nombre en bd
        const result = await Task.findByIdAndUpdate(
          id,
          {
            fileName: url,
            status: 'pendiente'
          },
          { new: true }
        )
        return res.status(201).json(response, result)
      } catch (error) {
        return res.status(500).json('error', error)
      }
    })
  }
  return res.status(401)
}
