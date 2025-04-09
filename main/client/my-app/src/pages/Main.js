import React from 'react';
import {observer} from "mobx-react-lite";
import OpenLayersMap from '../components/Map';
import { useNavigate } from 'react-router-dom';
import '../styles/NavBar.css';

const Main = observer(() => {
    const navigate = useNavigate();

    return (
        <div style={{padding: 0, margin: 0, width: "100%", overflowX: "hidden"}}>
            <div style={{color: "#fff", height: "90vh", background: "#000", padding: "20px", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column"}}>
                <h1 style={{color: "#fff", background: "#000"}}>t2 - оператор мобильной связи <span style={{color: "#FF3495", fontFamily: "Hard"}}>№1 в России</span></h1>
                <h4 style={{fontFamily: "Light"}}>Просто и наглядно покажем, почему</h4>
            </div>
            
            <OpenLayersMap/>

            <div style={{color: "#fff", height: "90vh", background: "#000", padding: "20px", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column"}}>
                <h1 style={{color: "#fff", background: "#000"}}>Подробнее <span style={{color: "#FF3495", fontFamily: "Hard"}}>о нас</span></h1>
                
                <div style={{display: "flex", flexDirection: "row", gap: "10px"}}>
                    <button className="submit-button" onClick={function () {navigate("/about")}}>
                        Больше информации
                    </button>
                    <button className="submit-button" onClick={function () {navigate("/tariffs")}}>
                        Тарифы
                    </button>
                </div>
                
            </div>
        </div>
    );
});

export default Main;