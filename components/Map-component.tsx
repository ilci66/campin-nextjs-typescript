import { NextComponentType } from 'next';
import React, { useRef, useState, useEffect } from 'react';


const MapComponent:NextComponentType = () => {

  const ref = React.useRef<HTMLDivElement>(null);
  // const [map, setMap] = React.useState<google.maps.Map>();
  const [map, setMap] = React.useState();


  React.useEffect(() => {
    if (ref.current && !map) {
      setMap(new window.google.maps.Map(ref.current, {}));
    }
  }, [ref, map]);

  return <div ref={ref} />
}

export default MapComponent;