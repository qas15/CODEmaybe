import { Feature, Map, Overlay, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { Point } from 'ol/geom';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useRef, useState } from 'react';
import Style from 'ol/style/Style';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { blue, green, red, yellow } from '@mui/material/colors';
import Icon from 'ol/style/Icon';
import "../styles/Map.css"

import Kafedr from '../static/Kafedr.jpg';
import KulibinsPark from "../static/KulibinsPark.jpg";
import Kremlin from "../static/Nizegorodskiy_Kremlin.jpg";
import Yarmorka from "../static/NizhegorodksayaYarmorka.jpg";


let tooltipElement;
let mapInitialized = false;
let map;
let featureOverlay;
let currentFeatureOverlay;
let historicOverlay;
let tooltipOverlay;
let glayers;

function initmap() {
    if (mapInitialized) return;

    mapInitialized = true;

    glayers = [
        new TileLayer({
            source: new OSM({
                attributions: "",
                url: "http://localhost:5000/maps?g=1&z={z}&x={x}&y={y}"
            })
        }),
        new TileLayer({
            source: new OSM({
                attributions: "",
                url: "http://localhost:5000/maps?g=2&z={z}&x={x}&y={y}"
            })
        }),
        new TileLayer({
            source: new OSM({
                attributions: "",
                url: "http://localhost:5000/maps?g=3&z={z}&x={x}&y={y}"
            })
        }),
        new TileLayer({
            source: new OSM({
                attributions: "",
                url: "http://localhost:5000/maps?g=4&z={z}&x={x}&y={y}"
            })
        }),
    ]

    map = new Map({
        target: 'map',
        layers: [
            new TileLayer({
                source: new OSM({
                    attributions: ""
                }),
            }),
            ...glayers,
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
            image: new Icon({
                opacity: 1,
                src: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="red"><path d="M12 2a7.008 7.008 0 0 0-7 7c0 5.353 6.036 11.45 6.293 11.707l.707.707.707-.707C12.964 20.45 19 14.353 19 9a7.008 7.008 0 0 0-7-7zm0 16.533C10.471 16.825 7 12.553 7 9a5 5 0 0 1 10 0c0 3.546-3.473 7.823-5 9.533z"/><path d="M12 6a3 3 0 1 0 3 3 3 3 0 0 0-3-3zm0 4a1 1 0 1 1 1-1 1 1 0 0 1-1 1z"/></svg>`,
                scale: 1,
            })
        }),
    });

    currentFeatureOverlay = new VectorLayer({
        source: new VectorSource(),
        map: map,
        style: new Style({
            image: new Icon({
                opacity: 1,
                src: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="purple"><path d="M12 2a7.008 7.008 0 0 0-7 7c0 5.353 6.036 11.45 6.293 11.707l.707.707.707-.707C12.964 20.45 19 14.353 19 9a7.008 7.008 0 0 0-7-7zm0 16.533C10.471 16.825 7 12.553 7 9a5 5 0 0 1 10 0c0 3.546-3.473 7.823-5 9.533z"/><path d="M12 6a3 3 0 1 0 3 3 3 3 0 0 0-3-3zm0 4a1 1 0 1 1 1-1 1 1 0 0 1-1 1z"/></svg>`,
                scale: 1,
            })
        }),
    });

    historicOverlay = new VectorLayer({
        source: new VectorSource(),
        map: map,
        style: new Style({
            image: new Icon({
                opacity: 1,
                src: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="cyan"><path d="M12 2a7.008 7.008 0 0 0-7 7c0 5.353 6.036 11.45 6.293 11.707l.707.707.707-.707C12.964 20.45 19 14.353 19 9a7.008 7.008 0 0 0-7-7zm0 16.533C10.471 16.825 7 12.553 7 9a5 5 0 0 1 10 0c0 3.546-3.473 7.823-5 9.533z"/><path d="M12 6a3 3 0 1 0 3 3 3 3 0 0 0-3-3zm0 4a1 1 0 1 1 1-1 1 1 0 0 1-1 1z"/></svg>`,
                scale: 1,
            })
        }),
    });

    for (var feature of features) {
        const f = new Feature({
            geometry: new Point(fromLonLat([feature.longitude, feature.latitude])),
            title: "Вышка T2",
        });
        featureOverlay.getSource().addFeature(f);
    }

    for (let feature of historic_features) {
        const f = new Feature(
            {
                geometry: new Point(fromLonLat([feature.longitude, feature.latitude])),
                ...feature,
            }
        );
        historicOverlay.getSource().addFeature(f);
    }

    tooltipOverlay = new Overlay({
        element: tooltipElement.current,
        offset: [10, 0],
        positioning: 'center-left'
    });
    map.addOverlay(tooltipOverlay);

    // setModeOverlay = new Overlay({
    //     element: setModeElement.current,
    //     positioning: 'top-left',
    // });
    // map.addOverlay(setModeOverlay);

    let hoveredFeature = null;
    map.on('pointermove', (e) => {
        const feature = map.forEachFeatureAtPixel(e.pixel, (f) => f);

        if (feature !== hoveredFeature) {
            tooltipOverlay.setPosition(undefined);
            tooltipElement.current.style.display = 'none';
        }

        if (feature) {
            const geomerty = feature.get("geometry");
            const coord = geomerty.getCoordinates();
            tooltipOverlay.setPosition(coord);

            const props = feature.getProperties();
            tooltipElement.current.innerHTML = `<div style="">${props.title}</div>`

            tooltipElement.current.style.display = 'block';
        }

        hoveredFeature = feature;
    });

    map.on('pointermove', function(e) {
        const pixel = map.getEventPixel(e.originalEvent);
        const hit = map.hasFeatureAtPixel(pixel);
        
        try {
            map.getTarget().style.cursor = hit ? 'pointer' : '';
        } catch (e) {}
    });
    
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
            }
        );

        navigator.geolocation.watchPosition(function (pos) {
            const f = new Feature(
                {
                    geometry: new Point(fromLonLat([pos.coords.longitude, pos.coords.latitude])),
                    title: "Вы - тут",
                }
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
        src: Kafedr,
        desc: "Этот величественный храм, построенный в 1881 году, является одним из самых высоких православных соборов России (87 метров). Его архитектура сочетает византийский и русский стили. Расположенный на Стрелке Волги и Оки, собор украшен золотыми куполами и богатыми мозаиками. Здесь хранится частица мощей Александра Невского. Особенно впечатляет внутреннее убранство с росписями и резным иконостасом.",
        text: [`С 2015 года качество связи здесь возросло на`, <span style={{color: "#00BFFF", fontWeight: "bold", margin: "5px"}}>20%</span>]
    },
    {
        latitude: 56.328299,
        longitude: 43.961199,
        title: "Нижегородская ярмарка",
        src: Yarmorka,
        desc: "Исторический торговый комплекс, построенный в 1817 году, был крупнейшей ярмаркой Российской империи. Главный дом в стиле классицизма с ротондой - архитектурная доминанта. Сегодня здесь проводят международные выставки, форумы и культурные мероприятия. Сохранились старинные павильоны и Спасский собор. Ярмарка - символ купеческого духа и экономического расцвета Нижнего Новгорода.",
        text: [`За 4 года подняли качество связи в этом месте на`, <span style={{color: "#00BFFF", fontWeight: "bold", margin: "5px"}}>60%</span>]
    },
    {
        latitude: 56.328437, 
        longitude: 44.003111,
        title: "Нижегородский кремль",
        src: Kremlin,
        desc: "Крепость XVI века с 13 башнями и километровой стеной - сердце города. Здесь находилось древнее городище, сейчас - административные здания и музеи. Дмитриевская башня - главный вход с часами. Со стен открывается лучший вид на Стрелку. В кремле стоит памятник Минину и Пожарскому (копия московского). Особенно красива подсветка вечером.",
        text: [`Поднялись с 2G до 4G в этом месте за`,  <span style={{color: "#00BFFF", fontWeight: "bold", margin: "5px"}}>3 года</span>]
    },
    {
        latitude: 56.31544267789599,
        longitude: 44.009416868864875,
        title: "Парк имени Кулибина",
        src: KulibinsPark,
        desc: "Парк в центральной части Нижнего Новгорода. Создан на территории бывшего Петропавловского кладбища в 1940 году. Назван в честь российского механика-самоучки Ивана Петровича Кулибина, родившегося в Подновье и похороненного на Петропавловском кладбище в 1818 году",
        text: [`Качество связи здесь на`, <span style={{color: "#00BFFF", fontWeight: "bold", margin: "5px"}}>10%</span>, `лучше, чем у других операторов`]
    }
];


const MapDescriptionArgs = ({mapInfo}) => {
    [mapInfo, setMapInfo] = useState(null);

    return (<Col style={{display: 'flex', flexDirection: "column", justifyContent: "start"}}>
        {
            mapInfo ? (<div>
                <h3 style={{padding: 0, margin: 0, color: "#fff"}}>Вы рядом с:</h3>
                <h1 style={{padding: 0, margin: 0, marginTop: "6px", marginBottom: "10px", color: "#FF3495"}}>{mapInfo.title}</h1>
                <p style={{padding: 0, margin: 0, color: "#fff"}}>{mapInfo.text}</p>
                <br/>
                <img src={mapInfo.src} alt="" style={{maxWidth: "70%"}} className="img1" />
                <br/>
                <br/>
                <p style={{padding: 0, margin: 0, color: "#aaa", maxWidth: "70%"}}>{mapInfo.desc}</p>
            </div>) : (<div>
                <h1 style={{padding: 0, margin: 0, marginTop: "6px", marginBottom: "10px", color: "#FF3495", width: "50%"}}>Подойдите к одной из голубых точек</h1>
                <p style={{padding: 0, margin: 0, color: "#fff"}}>Мы расскажем вам, как менялась связь T2 в этом месте</p>
            </div>)
        }
        </Col>
    );
}

const updateMapLayers = () => {
    glayers[0].setVisible(checked1G);
    glayers[1].setVisible(checked2G);
    glayers[2].setVisible(checked3G);
    glayers[3].setVisible(checked4G);

    console.log("Updated visibility")
    console.log({
        checked1G,
        checked2G,
        checked3G,
        checked4G
    })
}

let checked1G = true, setChecked1G = function (val) {checked1G = val.target.checked; updateMapLayers()};
let checked2G = true, setChecked2G = function (val) {checked2G = val.target.checked; updateMapLayers()};
let checked3G = true, setChecked3G = function (val) {checked3G = val.target.checked; updateMapLayers()};
let checked4G = true, setChecked4G = function (val) {checked4G = val.target.checked; updateMapLayers()};
let mapInfo, setMapInfo;
function OpenLayersMap() {

    const [initialized, setInitialized] = useState(false);
    tooltipElement = useRef();

    if (!initialized) {
        setTimeout(initmap, 70);
        setInitialized(true);
    }

    return (
        <Row style={{ background: "black" }}>
            <div id="map" style={{ width: '60vw', height: '80vh' }}/>
            <div ref={tooltipElement} style={{
                position: 'absolute',
                backgroundColor: 'white',
                padding: '5px',
                borderRadius: '4px',
                fontSize: '12px',
                display: 'none',
                width: "max-content",
                maxWidth: "200px",
            }}></div>
            <div style={{
                zIndex: 200,
                position: 'absolute',
                backgroundColor: 'white',
                padding: '5px',
                border: '1px solid #ccc',
                borderRadius: '4px',
                fontSize: '12px',
                display: 'block',
                width: "150px",
                height: "auto",
                left: "10px",
                marginTop: "10px",
            }}>
                <p style={{color: '#000000'}}>Режим отображения:</p>

                <FormGroup>
                    <FormControlLabel onChange={setChecked1G} control={<Checkbox defaultChecked size='small' sx={{
                        color: red[800],
                        '&.Mui-checked': {
                            color: red[600],
                            fontFamily: 'Light',
                        }
                    }}/>} label="1G"/>
                    <FormControlLabel onChange={setChecked2G} control={<Checkbox defaultChecked size='small' sx={{
                        color: green[800],
                        fontFamily: 'Light',
                        '&.Mui-checked': {
                            color: green[600],
                        }
                    }}/>} label="2G"/>
                    <FormControlLabel onChange={setChecked3G} control={<Checkbox defaultChecked size='small' sx={{
                        color: blue[800],
                        fontFamily: 'Light',
                        '&.Mui-checked': {
                            color: blue[600],
                        }
                    }}/>} label="3G"/>
                    <FormControlLabel onChange={setChecked4G} control={<Checkbox defaultChecked size='small' sx={{
                        color: yellow[800],
                        fontFamily: 'Light',
                        '&.Mui-checked': {
                            color: yellow[600],
                        }
                    }}/>} label="4G"/>
                </FormGroup>
            </div>

            <MapDescriptionArgs mapInfo={mapInfo}/>
        </Row>
    );
}

export default OpenLayersMap;