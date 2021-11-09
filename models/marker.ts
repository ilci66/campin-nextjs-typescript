import { Schema, model, connect } from 'mongoose';

interface Marker {
  lat: number;
  lng: number;
  type: string;
  description: string;
  addedBy: string;
  createdAt: number;
}

const markerSchema = new Schema<Marker>(
  {
    lat: {type: Number, required: true},
    lng: { type: Number, required: true },
    type: { type: String, required: true },
    description: { type: String, required: true },
    addedBy: { type: String, required: true },
    // createdAt: { type: Number, required: true}
  }, 
  // didn't work for some reason, as I don't need any update date or anything , cancelling it
  {
    timestamps: true
  }
);
  

try {
  module.exports = model<Marker>('Marker');
}catch(error){
  module.exports = model<Marker>('Marker', markerSchema); 
}