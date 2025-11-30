'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaEnvelope, FaPhone, FaLink } from 'react-icons/fa';
// import { BiSend } from 'react-icons/bi';

export default function ContactSection() {
  // const [messages, setMessages] = useState([
  //   { type: 'bot', content: '안녕하세요! 저에 대해 궁금하신 점을 물어보세요.' }
  // ]);
  // const [input, setInput] = useState('');

  const contactInfo = {
    email: "singunu17@gmail.com",
    phone: "+82 10-2933-3532",
    github: "https://github.com/singunu",
    notion: "https://verbose-hoodie-b9b.notion.site/1509a4450304809fab3afaac417ab2ff?pvs=4"
  };

  // const handleSendMessage = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   if (!input.trim()) return;

  //   setMessages([
  //     ...messages,
  //     { type: 'user', content: input },
  //     { type: 'bot', content: '죄송합니다. 현재 AI 채팅 기능은 준비중입니다.' }
  //   ]);
  //   setInput('');
  // };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-blue-50/50 to-cyan-50/50 dark:from-blue-900/20 dark:to-cyan-900/20">
      {/* Decorative Background */}
      <div className="absolute inset-0 -z-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute top-20 left-1/6 w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80
                     bg-rose-400/20 rounded-full mix-blend-multiply filter blur-xl"
          animate={{ 
            scale: [1.1, 1, 1.1],
            x: [0, 40, -20],
            y: [0, 30, -10]
          }}
          transition={{ 
            duration: 8.5,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-1/3 w-56 h-56 sm:w-72 sm:h-72 md:w-96 md:h-96
                     bg-orange-400/20 rounded-full mix-blend-multiply filter blur-xl"
          animate={{ 
            scale: [1, 1.2, 1],
            x: [0, -30, 20],
            y: [0, 40, -20]
          }}
          transition={{ 
            duration: 6.5,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="relative z-10 h-full overflow-y-auto hide-scrollbar px-3 sm:px-4 md:px-6 pt-16 pb-6 sm:pt-20 sm:pb-8 md:pt-20 lg:pt-16 xl:pt-12 md:pb-12">
        <motion.div
          className="max-w-6xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-center mb-6 sm:mb-8 md:mb-10 lg:mb-12 xl:mb-14 text-gray-900 dark:text-white"
          style={{ fontFamily: 'Bai Jamjuree' }}>
            Contact
          </h2>

          <div className="grid justify-center gap-4 sm:gap-6 md:gap-10">
            {/* Contact Info */}
            <motion.div
              className="glassmorphism rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-6"
              initial={{ y: 0, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {[
                { 
                  icon: <FaEnvelope className="w-5 h-5 sm:w-6 sm:h-6" />, 
                  text: contactInfo.email, 
                  href: `mailto:${contactInfo.email}` 
                },
                { 
                  icon: <FaPhone className="w-5 h-5 sm:w-6 sm:h-6" />, 
                  text: contactInfo.phone, 
                  href: `tel:${contactInfo.phone}` 
                },
                { 
                  icon: <FaGithub className="w-5 h-5 sm:w-6 sm:h-6" />, 
                  text: "GitHub", 
                  href: contactInfo.github 
                },
                { 
                  icon: <FaLink className="w-5 h-5 sm:w-6 sm:h-6" />, 
                  text: "Portfolio", 
                  href: contactInfo.notion 
                }
              ].map((contact, index) => (
                <motion.a
                  key={index}
                  href={contact.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 sm:space-x-4 text-sm sm:text-base text-gray-600 dark:text-gray-300 
                             hover:text-blue-500 dark:hover:text-blue-400 
                             transition-colors group"
                  whileHover={{ x: 10 }}
                >
                  {contact.icon}
                  <span className="group-hover:underline truncate">{contact.text}</span>
                </motion.a>
              ))}
            </motion.div>

            {/* Chat Interface */}
            {/* <motion.div
              className="glassmorphism rounded-xl sm:rounded-2xl overflow-hidden flex flex-col w-full"
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div className="p-2 sm:p-3 md:p-4 bg-white/45 dark:bg-blue-900/30">
                <h3 className="text-sm sm:text-base md:text-lg font-semibold text-gray-900 dark:text-white">
                  AI 챗봇 상담
                </h3>
              </div> */}
              
              {/* 채팅 메시지 영역 */}
              {/* <div className="flex-1 p-2 sm:p-3 md:p-4 overflow-y-auto space-y-2 sm:space-y-3 md:space-y-4 
                            max-h-[250px] sm:max-h-[350px] md:max-h-[450px]">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[85%] p-1.5 sm:p-2 md:p-3 rounded-xl text-xs sm:text-sm md:text-base ${
                      message.type === 'user'
                        ? 'bg-white/25 text-gray-900 dark:text-blue-100 dark:bg-blue-500/20'
                        : 'bg-white/25 text-gray-900 dark:text-gray-100 dark:bg-blue-900/30'
                    }`}>
                      {message.content}
                    </div>
                  </div>
                ))}
              </div> */}

              {/* 입력 폼 */}
              {/* <form onSubmit={handleSendMessage} className="border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center p-1.5 sm:p-2 md:p-3 gap-1 sm:gap-2">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="메시지를 입력하세요..."
                    className="flex-1 min-w-0 p-1.5 sm:p-2 text-xs sm:text-sm md:text-base rounded-lg 
                    bg-white/45 dark:bg-blue-900/30
                    text-gray-900 dark:text-white border-none 
                    focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400
                    placeholder:text-gray-500 dark:placeholder:text-gray-400"
                  />
                  <button
                    type="submit"
                    className="flex-shrink-0 p-1.5 sm:p-2 rounded-lg 
                    bg-white/45 dark:bg-blue-400/20 
                    text-blue-700 dark:text-blue-300 
                    hover:bg-white/25 dark:hover:bg-blue-400/30 
                    transition-colors"
                  >
                    <BiSend className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />
                  </button>
                </div>
              </form>
            </motion.div> */}
          </div>
        </motion.div>
      </div>
    </div>
  );
}