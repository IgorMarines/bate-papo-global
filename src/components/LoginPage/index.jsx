import  { useState } from 'react';
import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup  } from 'firebase/auth';
import {app} from '../../services/Firebase';
import * as S from './styles'
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'

// eslint-disable-next-line no-unused-vars
import svgGoogle from '../../assets/google-login-svg.svg'

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleLogin = async () => {
        const auth = getAuth(app);
        signInWithEmailAndPassword(auth, email, senha)
        .then((userCredential) => {
            Swal.fire({
                title: 'Cadastrado com sucesso!',
                text: error,
                icon: 'sucess',
                confirmButtonText: 'Cool'
              })
            const user = userCredential.user;
            console.log(user);
            navigate('/chat');
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error(errorCode, errorMessage)
            setError('Deu ruim parça')
            Swal.fire({
                title: 'Error!',
                text: error,
                icon: 'error',
                confirmButtonText: 'Cool'
              })
        });
    };

    // eslint-disable-next-line no-unused-vars
    const handleLoginGoogle = async () => {
        const auth = getAuth(app);
        const provider = new GoogleAuthProvider();
    
        try {
            const result = await signInWithPopup(auth, provider);
            console.log('Resultado do Firebase:', result);
            navigate('/chat');
            
        } catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error('Erro ao autenticar com o Google:', errorCode, errorMessage);
        }
    };
    

    const handleForgotPassword = async () => {
        const auth = getAuth(app);
        try {
            if(email !== ''){
                sendPasswordResetEmail(auth, email);
            }else{
                Swal.fire({
                    title:'Ops...',
                    text:"Digite um e-mail para recuperação de senha",
                    icon:'warning'
                })
            }
        } catch (error) {
            // const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorMessage);
        }
    }

    return (
        <S.Body>
            <S.Container>
                <h2>Login</h2>
                <S.Label>Email:</S.Label>
                <S.Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <S.Label>Senha:</S.Label>
                <S.Input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} />
                <S.Button onClick={handleLogin}>Entrar</S.Button>
                <div>
                    {/* <img style={{ width: 20, cursor: 'pointer', marginTop: 5 }} src={svgGoogle} onClick={handleLoginGoogle}/> */}
                </div>
                <Link to="/cadastro">Não possui uma conta?</Link>
                <p style={{background: '#bbbb', cursor: 'pointer'}} onClick={handleForgotPassword}>Esqueci minha senha</p>
                {error && <p>{error}</p>} {/* Exibe a mensagem de erro se houver um erro */}
            </S.Container>
        </S.Body>
    );
}

export default LoginPage;
