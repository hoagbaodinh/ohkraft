import { useEffect, useRef, useState } from 'react';
import manIMG from '../../assets/man-ava.png';
import { motion, AnimatePresence } from 'framer-motion';
import openSocket from 'socket.io-client';
import { useRouteLoaderData } from 'react-router-dom';
import ChatMes from '../LiveChat/ChatMes';
import axios from 'axios';
import { getFromStorage, saveToStorage } from '../../util/local-storage';

const socket = openSocket(process.env.REACT_APP_API);
const LiveChat = () => {
  // State
  const [isShowingChat, setIsShowingChat] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [session, setSession] = useState(null);
  const user = useRouteLoaderData('root');

  const scrollRef = useRef();
  const http = process.env.REACT_APP_API;

  // Lang nghe socket messages

  socket.on('getMessage', (data) => {
    setArrivalMessage({
      isConsultant: data.isConsultant,
      text: data.text,
      createdAt: Date.now(),
    });
  });

  // Them message vao log
  useEffect(() => {
    arrivalMessage &&
      arrivalMessage.isConsultant &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, session]);

  // Neu dang co session thi fetch du lieu session trong db
  useEffect(() => {
    const getMessages = async () => {
      try {
        const { data } = await axios.get(`${http}/api/message/${session._id}`);

        data.length !== 0 && setMessages(data);
      } catch (error) {
        if (error.response) {
          window.alert('Something went wrong');
          return;
        }
      }
    };

    session && getMessages();
  }, [session, http]);

  //**************************FUNCTION********************************

  // Khi click vao bieu tuong message
  const clickHandler = async (e) => {
    const roomId = getFromStorage('roomId');
    if (!isShowingChat) {
      // Neu nguoi dung chua dang nhap
      if (!user) {
        // Neu chua co room Id
        if (!roomId) {
          try {
            // Tao session moi
            const { data } = await axios.post(`${http}/api/session/create`, {
              userId: undefined,
            });

            socket.emit('addUser', {
              userId: data.members.userId,
              role: 'client',
            });
            socket.emit('sessionsChange');

            saveToStorage('roomId', data._id);

            // Tao tin nhan loi chao
            await axios.post(`${http}/api/message/create`, {
              isConsultant: true,
              text: 'Chào bạn',
              sessionId: data._id,
            });

            setSession(data);
          } catch (err) {
            if (err.response) {
              window.alert('Something went wrong!');
              return;
            }
          }
        }

        // Neu da co roomId
        else {
          const { data } = await axios.get(
            `${http}/api/session/get-session/${roomId}`
          );
          socket.emit('addUser', {
            userId: data.members.userId,
            role: 'client',
          });
          setSession(data);
        }
      }
      // Neu nguoi dung da dang nhap
      else {
        try {
          socket.emit('addUser', { userId: user?._id, role: 'client' });
          // fetch session hien co theo userID
          const res = await axios.get(
            `${http}/api/session/session/${user?._id}`
          );

          // Neu session khong ton tai
          if (!res.data) {
            // Neu roomId khong ton tai
            if (!roomId) {
              try {
                // Tao session moi
                const { data } = await axios.post(
                  `${http}/api/session/create`,
                  {
                    userId: user?._id || undefined,
                  }
                );

                socket.emit('sessionsChange');
                saveToStorage('roomId', data._id);
                // Tao tin nhan loi chao
                await axios.post(`${http}/api/message/create`, {
                  isConsultant: true,
                  text: 'Chào bạn',
                  sessionId: data._id,
                });

                setSession(data);
              } catch (err) {
                if (err.response) {
                  window.alert('Something went wrong!');
                  return;
                }
              }
            }
            // Neu ton tai roomId
            else {
              // Update session voi userId moi dang nhap
              try {
                const { data } = await axios.put(
                  `${http}/api/session/update-session/${roomId}`,
                  { userId: user?._id }
                );
                socket.emit('sessionsChange');
                setSession(data);
              } catch (err) {
                if (err.response) {
                  window.alert('Something went wrong!');
                  return;
                }
              }
            }
          }
          // Neu session ton tai
          else {
            saveToStorage('roomId', res.data._id);
            setSession(res.data);
          }
        } catch (err) {
          if (err.response) {
            window.alert('Something went wrong!');
            return;
          }
        }
      }
      setIsShowingChat(true);
    } else {
      setIsShowingChat(false);
    }
  };

  // Gui tin nhan
  const sendMsg = async (e) => {
    e.preventDefault();
    // Neu nguoi dung nhap vao "/end" thi ket thuc phien tro chuyen
    if (newMessage === '/end') {
      setNewMessage('');
      if (window.confirm('Are you sure you want to end this conversation?')) {
        try {
          await axios.delete(`${http}/api/session/${session._id}`);
          setSession(null);
          setMessages([]);
          setIsShowingChat(false);
          localStorage.removeItem('roomId');
          socket.emit('sessionsChange');
          return socket.disconnect();
        } catch (error) {
          if (error.response) {
            window.alert('Something went wrong');
            return;
          }
        }
      } else {
        return;
      }
    }
    const message = {
      isConsultant: false,
      text: newMessage,
      sessionId: session._id,
    };

    socket.emit('sendMessage', {
      receiverId: session.members.consultantId,
      sessionId: session._id,
      text: newMessage,
      from: 'client',
    });

    try {
      const { data } = await axios.post(`${http}/api/message/create`, message);

      setMessages((prevState) => {
        return [...prevState, data];
      });
      setNewMessage('');
    } catch (error) {
      if (error.response) {
        window.alert('Something went wrong');
        return;
      }
    }
  };

  useEffect(() => {
    scrollRef?.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <>
      <div className="liveChat" onClick={clickHandler}>
        <i className="fa-brands fa-facebook-messenger"></i>
      </div>
      <AnimatePresence>
        {isShowingChat && (
          <motion.div
            variants={{
              hidden: { opacity: 0, right: -100 },
              visible: { opacity: 1, right: 100 },
            }}
            initial="hidden"
            animate="visible"
            exit="hidden"
            open
            className="liveChatBox"
          >
            <div className="liveChatBoxTop">
              <h5> Customer Support</h5>
              <span> Let's Chat App</span>
            </div>

            <div className="liveChatContent">
              {messages.length !== 0 &&
                messages?.map((m, i) => (
                  <div ref={scrollRef} key={i}>
                    <ChatMes message={m} owner={!m?.isConsultant} />
                  </div>
                ))}
            </div>

            <div className="liveChatBoxBottom">
              <img src={manIMG} alt="user ava" />
              <input
                type="text"
                placeholder="Enter Message!"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />
              <button onClick={sendMsg}>
                <i className="fa-solid fa-paper-plane sendMessage"></i>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default LiveChat;
