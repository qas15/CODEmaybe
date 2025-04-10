import React, {useEffect, useState, useRef} from 'react';
import {
    FaUsers,
    FaChartLine,
    FaBuilding,
    FaGlobe,
    FaFileAlt,
    FaShoppingCart,
    FaTimes, FaCheck, FaRubleSign, FaStore, FaHandshake
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
                <h3 className="modal-title">Франчайзинг от t2</h3>
                <div className="modal-body">
                    <p className="modal-intro">
                        <strong>t2</strong> предлагает <span className="highlight">уникальные условия</span> для партнеров
                    </p>

                    <div className="benefits-grid">
                        <div className="benefit-card">
                            <div className="benefit-icon">
                                <FaCheck />
                            </div>
                            <h4>Выгода</h4>
                            <p>Обучение персонала</p>
                            <p>поддержка</p>
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

const AnimatedSection = ({ children, delay = 0 }) => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            {
                root: null,
                rootMargin: '0px',
                threshold: 0.1
            }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, []);

    return (
        <div
            ref={ref}
            className={`section-animate ${isVisible ? 'visible' : ''}`}
            style={{ '--delay': `${delay}ms` }}
        >
            {children}
        </div>
    );
};

const Partners = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="partners-page">
            {/* Hero Section */}
            <AnimatedSection>
                <section className="partners-hero">
                    <div className="container">
                        <h1>ПАРТНЕРСТВО С t2</h1>
                        <p>Развивайте бизнес вместе с лидером телекоммуникационного рынка</p>
                    </div>
                </section>
            </AnimatedSection>

            {/* Procurement Block */}
            <AnimatedSection delay={100}>
                <section className="procurement-block">
                    <div className="container">
                        <div className="section-header">
                            <FaShoppingCart className="section-icon" />
                            <h2 className='white'>ПОТЕНЦИАЛЬНЫМ ПОСТАВЩИКАМ</h2>
                        </div>
                        <div className="content-grid">
                            <div className="content-card">
                                <h5>Процесс закупок</h5>
                                <p>Мы проводим закупки в соответствии с Положением о закупках товаров, работ, услуг ГК Т2 Мобайл.</p>
                                <p>Чтобы узнать, какие закупки мы планируем в 2025, вы можете посмотреть план закупок.</p>
                            </div>
                            <div className="content-card accent">
                                <h3 style={{textShadow: 'none'}}>Площадки для закупок</h3>
                                <p>Свыше 5 млн рублей (без НДС) - ЕЭТП «Росэлторг»</p>
                                <p>До 5 млн рублей - ЭТП ГПБ Клик и Bidzaar</p>
                            </div>
                            <div className="content-card dark">
                                <h3 className='exstraMain'>Наши принципы</h3>
                                <p>Мы ценим открытость и честность. В своей работе мы строго следуем Антикоррупционной политике и ожидаем того же от партнеров.</p>
                            </div>
                        </div>
                    </div>
                </section>
            </AnimatedSection>

            {/* Franchising Block */}
            <AnimatedSection delay={200}>
                <section className="franchising-block">
                    <div className="container">
                        <div className="section-header">
                            <FaStore className="section-icon" />
                            <h2>ФРАНЧАЙЗИНГ</h2>
                        </div>
                        <div className="two-columns">
                            <div className="left-col">
                                <h3 style={{color: "black"}}>Преимущества</h3>
                                <p>Розничная сеть t2 развивается по принципу франчайзинга и насчитывает более 3000 точек по всей России.</p>
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
            </AnimatedSection>

            {/* Partners Programs */}
            <AnimatedSection delay={300}>
                <section className="programs-block">
                    <div className="container">
                        <div className="section-header">
                            <FaHandshake className="section-icon" />
                            <h2>ПАРТНЕРСКИЕ ПРОГРАММЫ</h2>
                        </div>
                        <div className="programs-grid">
                            <div className="program-card" style={{boxShadow: "0px 0px 5px grey"}}>
                                <div className="program-icon"><FaUsers /></div>
                                <h5>Агентам и дилерам</h5>
                                <p>Привлекайте клиентов и получайте комиссионное вознаграждение без специальных знаний в сфере связи.</p>
                            </div>
                            <div className="program-card accent" style={{boxShadow: "0px 0px 5px grey"}}>
                                <div className="program-icon"><FaBuilding /></div>
                                <h3 style={{color: 'white'}}>Арендодателям</h3>
                                <p>Предлагайте площадки для установки оборудования на взаимовыгодных условиях.</p>
                            </div>
                            <div className="program-card dark" style={{boxShadow: "0px 0px 5px grey"}}>
                                <div className="program-icon"><FaGlobe /></div>
                                <h3 className='exstraMain'>Интернет-бизнесам</h3>
                                <p>Зарабатывайте, размещая партнерские ссылки t2 на своих ресурсах.</p>
                            </div>
                        </div>
                    </div>
                </section>
            </AnimatedSection>

            {/* Other Opportunities */}
            <AnimatedSection delay={400}>
                <section className="opportunities-block">
                    <div className="container">
                        <div className="section-header">
                            <FaChartLine className="section-icon" />
                            <h2>ДРУГИЕ ВОЗМОЖНОСТИ</h2>
                        </div>
                        <div className="opportunities-list">
                            <div className="opportunity-item">
                                <div className="opp-icon"><FaFileAlt color="white"/></div>
                                <div className="opp-content">
                                    <h5 className="white">Электронный документооборот</h5>
                                    <p className="white">Подключение к ЭДО для обмена бухгалтерскими документами между юридическими лицами.</p>
                                </div>
                            </div>
                            <div className="opportunity-item">
                                <div className="opp-icon"><FaShoppingCart color="white" /></div>
                                <div className="opp-content">
                                    <h5 className="white">Продажа непрофильных активов</h5>
                                    <p className="white">ООО «Т2 Мобайл» осуществляет продажу непрофильных активов на выгодных условиях.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </AnimatedSection>

            {/* CTA Section */}
            <AnimatedSection delay={500}>
                <section className="partners-cta">
                    <div className="container">
                        <h2 className="white">ГОТОВЫ СТАТЬ ПАРТНЕРОМ t2?</h2>
                        <p>Оставьте заявку, и наш менеджер свяжется с вами для обсуждения условий сотрудничества</p>
                        <button className="btn-large">ОТПРАВИТЬ ЗАЯВКУ</button>
                    </div>
                </section>
            </AnimatedSection>
        </div>
    );
};

export default Partners;