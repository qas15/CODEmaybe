import React, {useEffect} from 'react';
import { FaDatabase, FaPhoneAlt, FaWifi, FaInfinity, FaCalendarCheck,
    FaGlobeEurope, FaShieldAlt, FaExchangeAlt,
    FaSnowflake, FaBolt, FaLeaf, FaTachometerAlt } from 'react-icons/fa';
import '../styles/Tariff.css';

const Tariff = () => {
    const tariffs = [
        {
            name: "ЗЕЛЁНЫЙ",
            badge: "НОВИНКА",
            price: "500 ₽/мес",
            features: [
                { icon: <FaDatabase />, title: "15 ГБ", desc: "+10 ГБ к тарифу" },
                { icon: <FaPhoneAlt />, title: "300 минут", desc: "На номера России" },
                { icon: <FaLeaf />, title: "Экологичный", desc: "Часть прибыли идет на экопроекты" }
            ],
            isPopular: false
        },
        {
            name: "МОЙ ОНЛАЙН+",
            badge: "ХИТ",
            price: "800 ₽/мес",
            features: [
                { icon: <FaDatabase />, title: "30 ГБ", desc: "+30 ГБ к тарифу" },
                { icon: <FaPhoneAlt />, title: "600 минут", desc: "На номера России" },
                { icon: <FaWifi />, title: "Домашний интернет", desc: "От 100 Мбит/с" }
            ],
            isPopular: true
        },
        {
            name: "ТУРБО",
            badge: "ТОП",
            price: "1200 ₽/мес",
            features: [
                { icon: <FaBolt />, title: "50 ГБ", desc: "Высокоскоростной интернет" },
                { icon: <FaTachometerAlt />, title: "Безлимит", desc: "На соцсети и мессенджеры" },
                { icon: <FaPhoneAlt />, title: "1000 минут", desc: "На все номера России" }
            ],
            isPopular: false
        },
        {
            name: "ПРЕМИУМ",
            badge: "VIP",
            price: "2000 ₽/мес",
            features: [
                { icon: <FaInfinity />, title: "Безлимит", desc: "Максимальная скорость" },
                { icon: <FaGlobeEurope />, title: "Роуминг", desc: "Включено 10 ГБ в Европе" },
                { icon: <FaPhoneAlt />, title: "Безлимит", desc: "Минут на все номера" }
            ],
            isPopular: false
        },
        {
            name: "МИНИМАЛ",
            badge: "ЭКОНОМ",
            price: "300 ₽/мес",
            features: [
                { icon: <FaDatabase />, title: "5 ГБ", desc: "Базовый пакет интернета" },
                { icon: <FaPhoneAlt />, title: "100 минут", desc: "На номера России" },
                { icon: <FaLeaf />, title: "Без излишеств", desc: "Только самое необходимое" }
            ],
            isPopular: false
        },
        {
            name: "ИГРОВОЙ",
            badge: "GAMER",
            price: "1500 ₽/мес",
            features: [
                { icon: <FaBolt />, title: "50 ГБ", desc: "Ультраскоростной интернет" },
                { icon: <FaTachometerAlt />, title: "Low Ping", desc: "Оптимизация для игр" },
                { icon: <FaShieldAlt />, title: "Защита от DDoS", desc: "Для стримеров и геймеров" }
            ],
            isPopular: false
        }
    ];

    const advantages = [
        {
            icon: <FaInfinity className="advantage-icon" />,
            title: "БЕЗЛИМИТНЫЙ ТРАФИК",
            description: "Соцсети, мессенджеры и музыка без ограничений"
        },
        {
            icon: <FaCalendarCheck className="advantage-icon" />,
            title: "ВЕЧНЫЕ ГИГАБАЙТЫ",
            description: "Неиспользованный трафик переносится на следующий месяц"
        },
        {
            icon: <FaShieldAlt className="advantage-icon" />,
            title: "ЗАЩИТА ОТ МОШЕННИКОВ",
            description: "Встроенная система безопасности в каждом тарифе"
        },
        {
            icon: <FaExchangeAlt className="advantage-icon" />,
            title: "ОБМЕН ТРАФИКА",
            description: "Меняйте минуты на гигабайты и обратно"
        }
    ];
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        });

        // Анимируем только карточки преимуществ
        document.querySelectorAll('.advantage-card').forEach(card => {
            observer.observe(card);
        });

        return () => observer.disconnect();
    }, []);
    return (
        <div className="tariff-page">
            {/* Hero Section */}
            <header className="tariff-hero">
                <div className="container">
                    <h1>ВЫБЕРИТЕ СВОЙ ТАРИФ</h1>
                    <p>Подберите идеальное решение для ваших потребностей</p>
                </div>
            </header>

            {/* Tariffs Grid */}
            <section className="tariffs-section">
                <div className="container">
                    <div className="tariffs-grid">
                        {tariffs.map((tariff, index) => (
                            <div className={`tariff-card ${tariff.isPopular ? '' : ''}`} key={index}>
                                {tariff.badge && <div className="tariff-badge">{tariff.badge}</div>}
                                <h2>{tariff.name}</h2>
                                <div className="price">{tariff.price}</div>

                                <div className="features">
                                    {tariff.features.map((feature, i) => (
                                        <div className="feature" key={i}>
                                            <div className="feature-icon">{feature.icon}</div>
                                            <div className="feature-text">
                                                <h3>{feature.title}</h3>
                                                <p>{feature.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* <button className="buy-button">
                                    {tariff.isPopular ? 'ПОДКЛЮЧИТЬ' : 'ВЫБРАТЬ'}
                                </button> */}

                                {tariff.isPopular && (
                                    <div className="price-freeze">
                                        <FaSnowflake className="freeze-icon" />
                                        <span>ЦЕНА ЗАМОРОЖЕНА ДО 2026 ГОДА</span>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Advantages Section */}
            <section className="advantages-section">
                <div className="container">
                    <h2>ПРЕИМУЩЕСТВА t2</h2>
                    <div className="advantages-grid">
                        {advantages.map((advantage, index) => (
                            <div className="advantage-card" key={index}>
                                <div className="advantage-icon">{advantage.icon}</div>
                                <h3>{advantage.title}</h3>
                                <p>{advantage.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta-section">
                <div className="container">
                    <h2>НЕ НАШЛИ ПОДХОДЯЩИЙ ТАРИФ?</h2>
                    <p>Наши консультанты помогут подобрать оптимальное решение специально для вас</p>
                </div>
            </section>
        </div>
    );
};

export default Tariff;