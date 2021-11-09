import { connectToDatabase } from '../../lib/connection'
import type { NextApiRequest, NextApiResponse } from 'next'
const MarkerModel = require('../../models/marker');
import { getSession } from 'next-auth/client';

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
      // just to make it a little bit more secure
      const isAuth = await getSession({ req });
      if(!isAuth){ res.status(401).json({ error: "Unauthenticated User"}); return; }

      console.log("this is the info ==> ",req.body)
      let newMarker = new MarkerModel({ lat, lng, type, description, addedBy, createdAt: new Date().getTime()});

      let savedData = await newMarker.save();

      console.log(new Date());

      console.log("savedData ==>", savedData);

      res.status(200).json({message: "yeah!!"})
      break;
    case 'GET':

      console.log("get request made");

      const allMarkers = await MarkerModel.find({});
      console.log(allMarkers)
      if(!allMarkers) { res.status(401).json({ error: "There are no markers here pal!"}); return;}
      res.status(200).json({ data: allMarkers });
      break;
    default:
      console.log("default code")
  }
};