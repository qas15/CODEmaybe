import { Feature, Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';

const map = new Map({
    target: 'map',
    layers: [
        new TileLayer({
            source: new OSM()
        }),
        new TileLayer({
            source: new OSM({
                url: "http://localhost:5000/maps?g=3&z={z}&x={x}&y={y}"
            })
        }),
        new TileLayer({
            source: new OSM({
                url: "http://localhost:5000/maps?g=2&z={z}&x={x}&y={y}"
            })
        }),
        new TileLayer({
            source: new OSM({
                url: "http://localhost:5000/maps?g=1&z={z}&x={x}&y={y}"
            })
        })
    ],
    
    view: new View({
        // center: fromLonLat([long, lat]),
        center: fromLonLat([0, 0]),
        zoom: 14,
        maxZoom: 14,
        minZoom: 14,
    })
});

let featureOverlay = new VectorLayer({
    source: new VectorSource(),
    map: map,
});

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
        function(position) {
            const userCoords = [position.coords.longitude, position.coords.latitude];

            console.log(userCoords);
            
            // Устанавливаем центр карты на пользователя
            map.getView().setCenter(fromLonLat(userCoords));
            map.getView().setZoom(14); // Увеличиваем масштаб
            map.getView().setMaxZoom(14);
            map.getView().setMinZoom(14);
        },
        function(error) {
            console.error('Ошибка геолокации:', error.message);
            // Можно добавить fallback-логику (например, запрос города или IP-геолокацию)
        }
    );
} else {
    console.error('Геолокация не поддерживается вашим браузером');
}

function OpenLayersMap() {
    return <div id="map" style={{ width: '100%', height: '400px' }} />;
}

export default OpenLayersMap;