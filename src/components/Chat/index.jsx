import { useEffect, useState, useRef } from 'react';
import * as S from './styles';
import { getAuth, signOut } from 'firebase/auth';
import { getDatabase, ref, onValue, push } from 'firebase/database';
import { app } from '../../services/Firebase';
import Swal from 'sweetalert2';

const Chat = () => {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const messagesContainerRef = useRef(null);
  const auth = getAuth(app);

  useEffect(() => {
    // Rolar o container para o final sempre que chatMessages for atualizado
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [chatMessages]);

  useEffect(() => {
    const db = getDatabase(app);
    const messagesRef = ref(db, 'messages');

    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);

      onValue(messagesRef, (snapshot) => {
        const messages = [];
        snapshot.forEach((childSnapshot) => {
          const message = childSnapshot.val();
          messages.push(message);
        });
        setChatMessages(messages);
      });
    });

    return () => {
      unsubscribe();
    };
  }, [auth]);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        Swal.fire(
          'Deslogado!',
          'Você foi desconectado com sucesso!',
          'success'
        );
      })
      .catch((error) => {
        Swal.fire(
          'Erro ao deslogar!',
          error.message,
          'error'
        );
      });
  };

  const handleSendMessage = () => {
    if (message.trim() !== '') {
      const db = getDatabase(app);
      const messagesRef = ref(db, 'messages');
      // eslint-disable-next-line no-unused-vars
      const newMessageRef = push(messagesRef, {
        user: user.displayName || user.email,
        message: message,
        timestamp: new Date().getTime(),
      });
      setMessage('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <S.Container>
      <S.Header>
        <div></div>
        <S.ImageContainer>
          {user && <S.LogoutButton onClick={handleLogout}>Sair</S.LogoutButton>}
          <S.UserImage src={user && user.photoURL ? user.photoURL : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSdfX8KOUWEGHqmYEX625RAql_k8JdAP1Rog&usqp=CAU'} alt="Foto de Usuário" />
        </S.ImageContainer>
      </S.Header>

      <S.ChatContainer>
        <S.ChatMessages ref={messagesContainerRef}>
          {chatMessages.map((chatMessage, index) => (
            <div key={index} style={{ padding: '5px 0' }}>
              <strong style={{ color: getRandomColor() }}>
                {chatMessage.user}:
              </strong>
              {chatMessage.message}
            </div>
          ))}
        </S.ChatMessages>
        <S.InputContainer>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Digite sua mensagem..."
          />
          <button onClick={handleSendMessage}>Enviar</button>
        </S.InputContainer>
      </S.ChatContainer>
    </S.Container>
  );
};

function getRandomColor() {
  const randomColor = Math.floor(Math.random() * 16777215).toString(16);
  return '#' + '0'.repeat(6 - randomColor.length) + randomColor;
}

export default Chat;
