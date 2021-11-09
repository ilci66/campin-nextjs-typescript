import { connectToDatabase } from '../../lib/connection'
import type { NextApiRequest, NextApiResponse } from 'next'
const MarkerModel = require('../../models/marker')

// gonna continue later
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
){
  console.log("it comes here");

  const { method } = req;

  const { lat, lng, type, description, addedBy } = req.body;

  const connected = await connectToDatabase();

  if(!connected) { console.log("not connected yo!"); return; };

  switch(method){
    case 'POST':
      console.log("this is the info ==> ",req.body)
      let newMarker = new MarkerModel({ lat, lng, type, description, addedBy, createdAt: new Date().getTime()});

      let savedData = await newMarker.save();
      
      console.log(new Date());

      console.log("savedData ==>", savedData);

      res.status(200).json({message: "yeah!!"})
    break;
  }
};