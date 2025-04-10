import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaTelegram, FaTimes, FaRobot, FaChevronRight } from 'react-icons/fa';
import ReactMarkdown from 'react-markdown';
const ChatBot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);
    const token = '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'
    // Начальное сообщение при открытии чата
    useEffect(() => {
        if (isOpen && messages.length === 0) {
            setMessages([{
                text: 'Здравствуйте! Я виртуальный помощник t2. Чем могу помочь?',
                isUser: false,
                buttons: ['Новости 2025', 'Тарифы']
            }]);
        }
    }, [isOpen]);

    // Прокрутка к последнему сообщению
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const sendMessage = async (message) => {
        // Добавляем сообщение пользователя
        if (message !== 'start') {
            setMessages(prev => [...prev, { text: message, isUser: true }]);
            setInputValue('');
        }

        setIsLoading(true);

        try {
            let response;
            if (message === 'Новости 2025') {
                // Специальный запрос для новостей
                response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        model: 'nvidia/llama-3.3-nemotron-super-49b-v1:free',
                        messages: [
                            { role: 'user', content: 'Ты консультант t2. Кратко расскажи про новости 2025 (100-120 слов): тарифы, акции, события. Без "не знаю". Примеры: "Новый тариф X". Ссылка: t2.ru. Напиши подряд текстом с абзацами но не как схемой и на русском языке.' },
                        ],
                    }),
                });

                const data = await response.json();
                const botResponse = data.choices[0].message.content;

                setMessages(prev => [...prev, {
                    text: botResponse,
                    isUser: false,
                    buttons: ['Другие новости', 'Тарифы']
                }]);
            } else {
                // Обычный запрос для других сообщений
                response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        model: 'nvidia/llama-3.3-nemotron-super-49b-v1:free',
                        messages: [
                            { role: 'system', content: 'Ты консультант t2. Отвечай кратко и по делу. Если вопрос не связан с t2, вежливо скажи, что не можешь помочь.' },
                            { role: 'user', content: message },
                        ],
                    }),
                });

                const data = await response.json();
                const botResponse = data.choices[0].message.content;

                setMessages(prev => [...prev, {
                    text: botResponse,
                    isUser: false,
                    buttons: ['Новости 2025', 'Тарифы']
                }]);
            }
        } catch (error) {
            console.error('Ошибка:', error);
            setMessages(prev => [...prev, {
                text: 'Извините, произошла ошибка. Пожалуйста, попробуйте позже.',
                isUser: false
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleButtonClick = (buttonText) => {
        sendMessage(buttonText);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (inputValue.trim() && !isLoading) {
            sendMessage(inputValue);
        }
    };

    return (
        <>
            {!isOpen && (
                <BotButton
                    onClick={() => setIsOpen(true)}
                    initial={{ scale: 1 }}
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                >
                    <FaRobot size={24} />
                    <span>Помощь t2</span>
                </BotButton>
            )}

            {isOpen && (
                <ChatContainer
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                >
                    <ChatHeader>
                        <div>
                            <FaRobot size={20} />
                            <h3>Виртуальный помощник t2</h3>
                        </div>
                        <CloseButton onClick={() => setIsOpen(false)}>
                            <FaTimes size={18} />
                        </CloseButton>
                    </ChatHeader>

                    <ChatMessages>
                        {messages.map((msg, index) => (
                            <Message key={index} isUser={msg.isUser}>
                                <MessageContent isUser={msg.isUser}>
                                    {msg.isUser ? (
                                        msg.text.split('\n').map((line, i) => (
                                            <React.Fragment key={i}>
                                                {line}
                                                <br />
                                            </React.Fragment>
                                        ))
                                    ) : (
                                        <ReactMarkdown>
                                            {msg.text}
                                        </ReactMarkdown>
                                    )}
                                </MessageContent>
                                {msg.buttons && !msg.isUser && (
                                    <ButtonsContainer>
                                        {msg.buttons.map((btn, i) => (
                                            <Button
                                                key={i}
                                                onClick={() => handleButtonClick(btn)}
                                                whileHover={{ scale: 1.03 }}
                                                whileTap={{ scale: 0.98 }}
                                                disabled={isLoading}
                                            >
                                                {btn} <FaChevronRight size={12} />
                                            </Button>
                                        ))}
                                    </ButtonsContainer>
                                )}
                            </Message>
                        ))}
                        {isLoading && (
                            <Message isUser={false}>
                                <MessageContent isUser={false}>
                                    <LoadingDots>...</LoadingDots>
                                </MessageContent>
                            </Message>
                        )}
                        <div ref={messagesEndRef} />
                    </ChatMessages>

                    <ChatInput onSubmit={handleSubmit}>
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder="Введите ваш вопрос..."
                            disabled={isLoading}
                        />
                        <SendButton type="submit" disabled={isLoading || !inputValue.trim()}>
                            <FaTelegram size={20} />
                        </SendButton>
                    </ChatInput>
                </ChatContainer>
            )}
        </>
    );
};
// Стилизованные компоненты
const BotButton = styled(motion.button)`
  position: fixed;
  bottom: 30px;
  right: 30px;
  background: linear-gradient(135deg, #00a8ff);
  color: white;
  border: none;
  border-radius: 30px;
  padding: 15px 25px;
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25);
  }
`;

const ChatContainer = styled(motion.div)`
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 350px;
  height: 500px;
  background: white;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  z-index: 1000;
`;

const ChatHeader = styled.div`
  background: linear-gradient(135deg, #00a8ff);
  color: white;
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  div {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  h3 {
    margin: 0;
    font-size: 16px;
  }
`;

const CloseButton = styled.button`
  background: transparent;
  border: none;
  color: white;
  cursor: pointer;
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const LoadingDots = styled.span`
  &::after {
    display: inline-block;
    animation: ellipsis 1.5s infinite;  // Бесконечная анимация
    content: ".";  // Начальное состояние
    width: 1em;
    text-align: left;
  }
  @keyframes ellipsis {
    0% { content: '.'; }    // Одна точка
    33% { content: '..'; }  // Две точки
    66% { content: '...'; } // Три точки
  }
`;

const ChatMessages = styled.div`
  flex: 1;
  padding: 15px;
  overflow-y: auto;
  background: #FFFFFF;
`;

const Message = styled.div`
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
  align-items: ${({ isUser }) => isUser ? 'flex-end' : 'flex-start'};
`;

const MessageContent = styled.div`
  max-width: 80%;
  padding: 10px 15px;
  border-radius: ${({ isUser }) =>
    isUser ? '15px 15px 0 15px' : '15px 15px 15px 0'};
  background: ${({ isUser }) =>
    isUser ? 'linear-gradient(135deg, #00a8ff)' : '#e5e5ea'};
  color: ${({ isUser }) => isUser ? 'white' : '#333'};
  font-size: 14px;
  line-height: 1.5;
  word-break: break-word;
`;

const ButtonsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 10px;
  width: 100%;
`;

const Button = styled(motion.button)`
  background: linear-gradient(135deg, #00a8ff);
  color: white;
  border: none;
  border-radius: 20px;
  padding: 8px 15px;
  font-size: 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  transition: all 0.2s ease;
`;

const ChatInput = styled.form`
  display: flex;
  padding: 10px;
  border-top: 1px solid #eee;
  background: white;

  input {
    flex: 1;
    padding: 12px 15px;
    border: 1px solid #ddd;
    border-radius: 25px;
    outline: none;
    font-size: 14px;

    &:focus {
      border-color: #00a8ff;
    }
  }
`;

const SendButton = styled.button`
  background: linear-gradient(135deg, #00a8ff);
  color: white;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  margin-left: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    transform: scale(1.1);
  };`
export default ChatBot;
