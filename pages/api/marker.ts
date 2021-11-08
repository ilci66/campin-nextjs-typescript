import type { NextApiRequest, NextApiResponse } from 'next'
const MarkerModel = require('../../models/marker')

// gonna continue later
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
){
  const { method } = req;
  switch(method){
    case 'Post':
      console.log("this is the info ==> ",req.body)
      res.status(200).json({message: "yeah!!"})
    break;
  }
}