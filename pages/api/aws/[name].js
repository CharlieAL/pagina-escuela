import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3'
import fs from 'fs'

const AWS_BUCKET_NAME = process.env.AWS_BUCKET_NAME
const AWC_BUCKET_REGION = process.env.AWC_BUCKET_REGION
const AWS_PUBLIC_KEY = process.env.AWS_PUBLIC_KEY
const AWS_SECRET_KEY = process.env.AWS_SECRET_KEY

const client = new S3Client({
  region: AWC_BUCKET_REGION,
  credentials: {
    accessKeyId: AWS_PUBLIC_KEY,
    secretAccessKey: AWS_SECRET_KEY
  }
})

export default async function handler(req, res) {
  const { name } = req.query
  try {
    const command = new GetObjectCommand({
      Bucket: AWS_BUCKET_NAME,
      Key: name
    })
    const result = await client.send(command)
    result.Body.pipe(fs.createWriteStream(`./public/${name}`))

    return res.status(201).json('succefully')
  } catch (error) {
    return res.status(500).json(error)
  }
}
