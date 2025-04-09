import { Feature, Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { Point } from 'ol/geom';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useState } from 'react';
import Style from 'ol/style/Style';
import Fill from 'ol/style/Fill';
import Circle from 'ol/style/Circle';

let mapInitialized = false;
let map;
let featureOverlay;
let currentFeatureOverlay;
let historicOverlay;

function initmap() {
    if (mapInitialized) return;

    mapInitialized = true;

    map = new Map({
        target: 'map',
        layers: [
            new TileLayer({
                source: new OSM(),
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
            center: fromLonLat([0, 0]),
            zoom: 14,
            maxZoom: 14,
            minZoom: 14,
        })
    });

    featureOverlay = new VectorLayer({
        source: new VectorSource(),
        map: map,
        style: new Style({
            image: new Circle({
                radius: 7,
                fill: new Fill({color: '#f00'})
            }),
        }),
    });

    currentFeatureOverlay = new VectorLayer({
        source: new VectorSource(),
        map: map,
        style: new Style({
            image: new Circle({
                radius: 7,
                fill: new Fill({color: '#f0f'})
            }),
        }),
    });

    historicOverlay = new VectorLayer({
        source: new VectorSource(),
        map: map,
        style: new Style({
            image: new Circle({
                radius: 7,
                fill: new Fill({color: '#ff0'})
            }),
        }),
    });

    for (var feature of features) {
        const f = new Feature(
            new Point(fromLonLat([feature.longitude, feature.latitude]), )
        );
        featureOverlay.getSource().addFeature(f);
    }

    for (var feature of historic_features) {
        const f = new Feature(
            new Point(fromLonLat([feature.longitude, feature.latitude]), )
        );
        historicOverlay.getSource().addFeature(f);
    }
    
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            function(position) {
                const userCoords = [position.coords.longitude, position.coords.latitude];

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

        navigator.geolocation.watchPosition(function (pos) {
            const f = new Feature(
                new Point(fromLonLat([pos.coords.longitude, pos.coords.latitude]), )
            );
            currentFeatureOverlay.getSource().clear();
            currentFeatureOverlay.getSource().addFeature(f);

            let {latitude: c_lat, longitude: c_lon} = pos.coords;
            c_lat *= 10000;
            c_lon *= 10000;

            let min = 1000000;
            let minValue = null;

            for (let feature of historic_features) {
                let {latitude: f_lat, longitude: f_lon} = feature;

                f_lat *= 10000;
                f_lon *= 10000;

                const dist = Math.sqrt(Math.pow(f_lat - c_lat, 2) + Math.pow(f_lon - c_lon, 2));


                console.log(dist);
                if (dist < 5200 && dist < min) {
                    min = dist;
                    minValue = feature;
                }
            }

            setMapInfo(minValue);

        }, () => {})
    } else {
        console.error('Геолокация не поддерживается вашим браузером');
    }
}


const features = [
    {
        latitude: 56.31062617703685,
        longitude: 43.97765155370878
    },
    {
        latitude: 56.30642676720137,
        longitude: 43.98217257733877
    },
    {
        latitude: 56.3042816689065,
        longitude: 43.983909761146414
    }
];


const historic_features = [
    {
        latitude: 56.333621,
        longitude: 43.971271,
        title: "Кафедральный собор во имя Святого Благоверного Князя Александра Невского",
        text: "С 2015 года качество связи здесь возросло на 150%"
    },
    {
        latitude: 56.328299,
        longitude: 43.961199,
        title: "Нижегородская ярмарка",
        text: "За 4 года пондняли качество связи в этом месте на 60%"
    },
    {
        latitude: 56.328437, 
        longitude: 44.003111,
        title: "Нижегородский кремль",
        text: "Поднялись с 2G до 4G в этом месте за 3 года"
    },
    {
        latitude: 56.31544267789599,
        longitude: 44.009416868864875,
        title: "Парк имени Кулибина",
        text: "Качество связи здесь на 10% лучше, чем у других операторов"
    }
];


const MapDescriptionArgs = ({mapInfo}) => {
    [mapInfo, setMapInfo] = useState(null);

    const tst = {width: "15px", height: "15px", padding: 0, margin: 0, borderRadius: "10px", boxShadow: "0 0 2px black"}
    const dv = {display: "flex", alignItems: "center", gap: "5px"};


    return (
        <Col style={{width: "100%", marginTop: "50px"}}>
            {mapInfo ? (<div>
                <h1>{mapInfo.title}</h1>
                <p>{mapInfo.text}</p>
            </div>) : null}

            <hr/>

            <div style={dv}>
                <div style={{...tst, background: "#f00"}}></div>
                - вышки T2
            </div>

            <hr/>

            <div style={dv}>
                <div style={{...tst, background: "#f0f"}}></div>
                - Вы тут
            </div>
            
            <hr/>

            <div style={dv}>
                <div style={{...tst, background: "#ff0"}}></div>
                - исторические точки
            </div>
        </Col>
    );
}

let mapInfo, setMapInfo;
function OpenLayersMap() {
    const [initialized, setInitialized] = useState(false);

    if (!initialized) {
        setTimeout(initmap, 70);
        setInitialized(true);
    }

    return (
        <Row style={{boxShadow: "0 1px 10px gray"}}>
            <div id="map" style={{ width: '50vw', height: '80vh' }}/>
            <MapDescriptionArgs mapInfo={mapInfo} />
        </Row>
    );
}

export default OpenLayersMap;