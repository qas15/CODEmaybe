import React from 'react';
import { FaDatabase, FaPhoneAlt, FaWifi, FaInfinity, FaCalendarCheck, FaTrain,
    FaGlobeEurope, FaShieldAlt, FaLock, FaHandHoldingUsd, FaSlidersH,
    FaGift, FaShareAlt, FaExchangeAlt, FaStore, FaSnowflake } from 'react-icons/fa';
import '../styles/Tariff.css';

const Tariff = () => {
    const mainFeatures = [
        {
            icon: <FaDatabase className="feature-icon" />,
            title: "30 ГБ",
            description: "+30 ГБ к тарифу"
        },
        {
            icon: <FaPhoneAlt className="feature-icon" />,
            title: "600 минут",
            description: "на номера России и безлимит на номера t2 России"
        },
        {
            icon: <FaWifi className="feature-icon" />,
            title: "Домашний интернет",
            description: "от 100 Мбит/с"
        }
    ];

    const advantages = [
        {
            icon: <FaInfinity className="advantage-icon" />,
            title: "БЕЗЛИМИТНЫЙ ТРАФИК",
            description: "Telegram, WhatsApp, TikTok, ВКонтакте, Одноклассники, VK Мессенджер, Rutube, VK Видео, VK Клипы, VK Музыка"
        },
        {
            icon: <FaCalendarCheck className="advantage-icon" />,
            title: "ВЕЧНЫЕ МИНУТЫ И ГБ",
            description: "Оставшиеся минуты и ГБ не сгорают"
        },
        {
            icon: <FaTrain className="advantage-icon" />,
            title: "В ПОЕЗДКАХ ПО РОССИИ",
            description: "Пользуйтесь минутами и ГБ в поездках как дома"
        },
        {
            icon: <FaGlobeEurope className="advantage-icon" />,
            title: "РАСХОДЫ ЗА ГРАНИЦЕЙ",
            description: "Исходящие звонки из популярных стран на номера t2 России включены в тариф"
        },
        {
            icon: <FaShieldAlt className="advantage-icon" />,
            title: "СВЯЗЬ БЕЗ МИНУСОВ",
            description: "Если закончились деньги на счете – пользуйтесь бесплатно самыми необходимыми сервисами"
        },
        {
            icon: <FaLock className="advantage-icon" />,
            title: "ПРОДУКТЫ БЕЗОПАСНОСТИ",
            description: "Блокировка мошенников, антиспам и другие продукты безопасности в вашем тарифе"
        },
        {
            icon: <FaHandHoldingUsd className="advantage-icon" />,
            title: "ЧЕСТНЫЕ ТАРИФЫ",
            description: "Пользуйтесь минутами и ГБ в тарифе даже при отрицательном балансе"
        },
        {
            icon: <FaSlidersH className="advantage-icon" />,
            title: "УПРАВЛЯЙТЕ ТАРИФОМ",
            description: "Гибкие настройки под ваши потребности"
        }
    ];

    const specialOffers = [
        {
            icon: <FaGift className="offer-icon" />,
            title: "МЕСЯЦ БЕСПЛАТНОГО ДОМАШНЕГО ИНТЕРНЕТА",
            description: "На любой скорости – при первом подключении"
        },
        {
            icon: <FaShareAlt className="offer-icon" />,
            title: "ДЕЛИТЕСЬ ГИГАБАЙТАМИ",
            description: "Делитесь интернет-трафиком с другими абонентами t2 по всей стране"
        },
        {
            icon: <FaExchangeAlt className="offer-icon" />,
            title: "МЕНЯЙТЕ МИНУТЫ И ГБ",
            description: "На скидки и сервисы"
        },
        {
            icon: <FaStore className="offer-icon" />,
            title: "МАРКЕТ t2",
            description: "Продавайте и покупайте ГБ, минуты и SMS"
        }
    ];

    return (
        <div className="tariff-page">
            {/* Hero Section */}
            <header className="tariff-header">
                <div className="container">
                    <h1>МОЙ ОНЛАЙН+</h1>
                    <div className="tariff-badge">ХИТ</div>
                </div>
            </header>

            {/* Main Tariff Card */}
            <main className="tariff-main">
                <section className="tariff-card">
                    <div className="container">
                        <div className="tariff-features">
                            {mainFeatures.map((feature, index) => (
                                <div className="feature" key={index}>
                                    {feature.icon}
                                    <h3>{feature.title}</h3>
                                    <p>{feature.description}</p>
                                </div>
                            ))}
                        </div>

                        <div className="tariff-actions">
                            <div className="price">800 ₽/мес</div>
                            <button className="buy-button">Купить</button>
                            <div className="price-freeze">
                                <FaSnowflake className="freeze-icon" />
                                <span>ЗАМОРОЗИЛИ ЦЕНУ ДО КОНЦА 2026 ГОДА</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Advantages Section */}
                <section className="advantages">
                    <div className="container">
                        <h2>ПРЕИМУЩЕСТВА ТАРИФА</h2>
                        <div className="advantages-grid">
                            {advantages.map((advantage, index) => (
                                <div className="advantage" key={index}>
                                    {advantage.icon}
                                    <h3>{advantage.title}</h3>
                                    <p>{advantage.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Special Offers Section */}
                <section className="special-offers">
                    <div className="container">
                        <h2>СПЕЦИАЛЬНЫЕ ПРЕДЛОЖЕНИЯ</h2>
                        <div className="offers-grid">
                            {specialOffers.map((offer, index) => (
                                <div className="offer" key={index}>
                                    {offer.icon}
                                    <h3>{offer.title}</h3>
                                    <p>{offer.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="tariff-footer">
                <div className="container">
                    <p>© 2025 Tele2. Все права защищены.</p>
                    <div className="footer-links">
                        <a href="#">Пользовательское соглашение</a>
                        <a href="#">Политика конфиденциальности</a>
                        <a href="#">Контакты</a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Tariff;