import React, {useEffect, useState} from 'react';
import {
    FaHandshake,
    FaStore,
    FaUsers,
    FaChartLine,
    FaBuilding,
    FaGlobe,
    FaFileAlt,
    FaShoppingCart,
    FaTimes, FaCheck, FaRubleSign
} from 'react-icons/fa';
import '../styles/Partners.css';
const FranchiseModal = ({ isOpen, onClose }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [contentVisible, setContentVisible] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setIsVisible(true);
            setTimeout(() => setContentVisible(true), 100);
        } else {
            setContentVisible(false);
            const timer = setTimeout(() => setIsVisible(false), 300);
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    if (!isVisible) return null;

    return (
        <div className={`modal-overlay ${isOpen ? 'open' : ''}`}>
            <div
                className={`modal-content ${contentVisible ? 'content-visible' : ''}`}
                onClick={(e) => e.stopPropagation()}
            >
                <button className="modal-close-btn" onClick={onClose}>
                    <FaTimes />
                </button>
                <h3 className="modal-title">Франчайзинг от Tele2</h3>
                <div className="modal-body">
                    <p className="modal-intro">
                        <strong>Tele2</strong> предлагает <span className="highlight">уникальные условия</span> для партнеров
                    </p>

                    <div className="benefits-grid">
                        <div className="benefit-card">
                            <div className="benefit-icon">
                                <FaCheck />
                            </div>
                            <h4>Выгода</h4>
                            <ul>
                                <li>Обучение персонала</li>
                                <li>поддержка</li>
                            </ul>
                        </div>

                        <div className="benefit-card">
                            <div className="benefit-icon">
                                <FaRubleSign />
                            </div>
                            <h4>Инвестиции</h4>
                            <p className="highlight-number">от 1,5 млн ₽</p>
                            <p>начальные вложения</p>
                        </div>

                        <div className="benefit-card">
                            <div className="benefit-icon">
                                <FaChartLine />
                            </div>
                            <h4>Окупаемость</h4>
                            <p className="highlight-number">12-18 месяцев</p>
                            <p>средний срок</p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};
const Partners = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    return (
        <div className="partners-page">
            {/* Hero Section */}
            <section className="partners-hero">
                <div className="container">
                    <h1>ПАРТНЕРСТВО С TELE2</h1>
                    <p>Развивайте бизнес вместе с лидером телекоммуникационного рынка</p>
                </div>
            </section>

            {/* Procurement Block */}
            <section className="procurement-block">
                <div className="container">
                    <div className="section-header">
                        <FaShoppingCart className="section-icon" />
                        <h2>ПОТЕНЦИАЛЬНЫМ ПОСТАВЩИКАМ</h2>
                    </div>
                    <div className="content-grid">
                        <div className="content-card">
                            <h3>Процесс закупок</h3>
                            <p>Мы проводим закупки в соответствии с Положением о закупках товаров, работ, услуг ГК Т2 Мобайл.</p>
                            <p>Чтобы узнать, какие закупки мы планируем в 2025, вы можете посмотреть план закупок.</p>
                        </div>
                        <div className="content-card accent">
                            <h3 style={{color: 'white'}}>Площадки для закупок</h3>
                            <ul>
                                <li>Свыше 5 млн рублей (без НДС) - ЕЭТП «Росэлторг»</li>
                                <li>До 5 млн рублей - ЭТП ГПБ Клик и Bidzaar</li>
                            </ul>
                        </div>
                        <div className="content-card dark">
                            <h3 className='exstraMain'>Наши принципы</h3>
                            <p>Мы ценим открытость и честность. В своей работе мы строго следуем Антикоррупционной политике и ожидаем того же от партнеров.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Franchising Block */}
            <section className="franchising-block">
                <div className="container">
                    <div className="section-header">
                        <FaStore className="section-icon" />
                        <h2>ФРАНЧАЙЗИНГ</h2>
                    </div>
                    <div className="two-columns">
                        <div className="left-col">
                            <h3>Преимущества</h3>
                            <p>Розничная сеть Tele2 развивается по принципу франчайзинга и насчитывает более 3000 точек по всей России.</p>
                            <p>Мы предлагаем готовое бизнес-решение "под ключ" - от стратегии до оформления салона.</p>
                            <button
                                className="btn-primary"
                                onClick={() => setIsModalOpen(true)}
                            >
                                Подробнее о франчайзинге
                            </button>

                            <FranchiseModal
                                isOpen={isModalOpen}
                                onClose={() => setIsModalOpen(false)}
                            />
                        </div>
                        <div className="right-col">
                            <div className="stats-grid">
                                <div className="stat-item">
                                    <div className="stat-number">3000+</div>
                                    <div className="stat-label">салонов</div>
                                </div>
                                <div className="stat-item">
                                    <div className="stat-number">85</div>
                                    <div className="stat-label">регионов</div>
                                </div>
                                <div className="stat-item">
                                    <div className="stat-number">24/7</div>
                                    <div className="stat-label">поддержка</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Partners Programs */}
            <section className="programs-block">
                <div className="container">
                    <div className="section-header">
                        <FaHandshake className="section-icon" />
                        <h2>ПАРТНЕРСКИЕ ПРОГРАММЫ</h2>
                    </div>
                    <div className="programs-grid">
                        <div className="program-card">
                            <div className="program-icon"><FaUsers /></div>
                            <h3>Агентам и дилерам</h3>
                            <p>Привлекайте клиентов и получайте комиссионное вознаграждение без специальных знаний в сфере связи.</p>
                        </div>
                        <div className="program-card accent">
                            <div className="program-icon"><FaBuilding /></div>
                            <h3 style={{color: 'white'}}>Арендодателям</h3>
                            <p>Предлагайте площадки для установки оборудования на взаимовыгодных условиях.</p>
                        </div>
                        <div className="program-card dark">
                            <div className="program-icon"><FaGlobe /></div>
                            <h3 className='exstraMain'>Интернет-бизнесам</h3>
                            <p>Зарабатывайте, размещая партнерские ссылки Tele2 на своих ресурсах.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Other Opportunities */}
            <section className="opportunities-block">
                <div className="container">
                    <div className="section-header">
                        <FaChartLine className="section-icon" />
                        <h2>ДРУГИЕ ВОЗМОЖНОСТИ</h2>
                    </div>
                    <div className="opportunities-list">
                        <div className="opportunity-item">
                            <div className="opp-icon"><FaFileAlt /></div>
                            <div className="opp-content">
                                <h3>Электронный документооборот</h3>
                                <p>Подключение к ЭДО для обмена бухгалтерскими документами между юридическими лицами.</p>
                            </div>
                        </div>
                        <div className="opportunity-item">
                            <div className="opp-icon"><FaShoppingCart /></div>
                            <div className="opp-content">
                                <h3>Продажа непрофильных активов</h3>
                                <p>ООО «Т2 Мобайл» осуществляет продажу непрофильных активов на выгодных условиях.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="partners-cta">
                <div className="container">
                    <h2>ГОТОВЫ СТАТЬ ПАРТНЕРОМ TELE2?</h2>
                    <p>Оставьте заявку, и наш менеджер свяжется с вами для обсуждения условий сотрудничества</p>
                    <button className="btn-large">ОТПРАВИТЬ ЗАЯВКУ</button>
                </div>
            </section>
        </div>
    );
};

export default Partners;