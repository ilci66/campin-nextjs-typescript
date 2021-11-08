import { Schema, model, connect } from 'mongoose';

interface Marker {
  lat: number;
  lng: number;
  type: string;
  description: string;
}

const markerSchema = new Schema<Marker>({
  lat: {type: Number, required: true},
  lng: { type: Number, required: true },
  type: { type: String, required: true },
  description: { type: String, required: true }
});
  

try {
  module.exports = model<Marker>('Marker');
}catch(error){
  module.exports = model<Marker>('Marker', markerSchema); 
}