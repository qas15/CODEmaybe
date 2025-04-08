import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj';
import { useEffect } from 'react';

function OpenLayersMap() {
  useEffect(() => {
    new Map({
      target: 'map',
      layers: [
        new TileLayer({
          source: new OSM()
        })
      ],
      view: new View({
        center: fromLonLat([-0.09, 51.505]),
        zoom: 13
      })
    });
  }, []);

  return <div id="map" style={{ width: '100%', height: '400px' }} />;
}

export default OpenLayersMap;