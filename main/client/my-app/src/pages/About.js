import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaMobileAlt, FaWifi, FaChartLine, FaUserFriends, FaGlobe, FaBolt } from 'react-icons/fa';
import '../styles/AboutPage.css';
import photo from "../static/t2_Logo_Black_sRGB_Preview.jpg";


const AboutPage = () => {
    const navigate = useNavigate();

    const services = [
        {
            icon: <FaMobileAlt className="service-icon" />,
            title: "Мобильная связь",
            description: "Высококачественная связь по всей России с лучшими тарифами"
        },
        {
            icon: <FaWifi className="service-icon" />,
            title: "Домашний интернет",
            description: "Быстрый и стабильный интернет для вашего дома"
        },
        {
            icon: <FaChartLine className="service-icon" />,
            title: "Цифровые сервисы",
            description: "Уникальные сервисы для комфортной цифровой жизни"
        },
        {
            icon: <FaUserFriends className="service-icon" />,
            title: "Поддержка 24/7",
            description: "Наша служба поддержки всегда готова вам помочь"
        },
        {
            icon: <FaGlobe className="service-icon" />,
            title: "Роуминг",
            description: "Выгодные условия для путешествий по всему миру"
        },
        {
            icon: <FaBolt className="service-icon" />,
            title: "Мгновенные платежи",
            description: "Удобные и безопасные способы оплаты"
        }
    ];

    const stats = [
        { value: "25+", label: "Лет на рынке" },
        { value: "45M", label: "Абонентов" },
        { value: "98%", label: "Покрытие России" },
        { value: "24/7", label: "Поддержка" }
    ];

    return (
        <div className="about-page">
            {/* Hero Section */}
            <header className="about-hero">
                <div className="hero-content">
                    <h1>Tele2 — связь, которая вдохновляет</h1>
                    <p>Мы делаем мобильную связь простой, выгодной и удобной для каждого</p>
                </div>
            </header>

            {/* About Section */}
            <section className="about-section">
                <div className="container">
                    <div className="about-content">
                        <h2>Кто мы такие</h2>
                        <p>
                            Tele2 — один из крупнейших операторов мобильной связи в России.
                            С 2003 года мы меняем правила игры, предлагая клиентам простые
                            и выгодные решения для общения.
                        </p>
                        <p>
                            Наша миссия — делать мобильную связь доступной и удобной.
                            Мы постоянно развиваем сеть, внедряем новые технологии
                            и создаем сервисы, которые действительно нужны людям.
                        </p>
                    </div>
                    <div className="about-image">
                        <img src={photo} alt="poto"/>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="stats-section">
                <div className="container">
                    {stats.map((stat, index) => (
                        <div className="stat-item" key={index}>
                            <h3>{stat.value}</h3>
                            <p>{stat.label}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Services Section */}
            <section className="services-section">
                <div className="container">
                    <h2>Наши услуги</h2>
                    <div className="services-grid">
                        {services.map((service, index) => (
                            <div className="service-card" key={index}>
                                <div className="icon-wrapper">
                                    {service.icon}
                                </div>
                                <h3>{service.title}</h3>
                                <p>{service.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta-section">
                <div className="container">
                    <h2>Готовы стать частью Tele2?</h2>
                    <p>Присоединяйтесь к миллионам довольных клиентов</p>
                </div>
            </section>
        </div>
    );
};

export default AboutPage;