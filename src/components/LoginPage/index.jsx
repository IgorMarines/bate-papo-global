import React, { useState } from 'react';
import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { app } from '../../services/Firebase';
import * as S from './styles';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleErrorMessage = (errorCode) => {
        switch (errorCode) {
            case 'auth/invalid-email':
                return 'Endereço de e-mail inválido.';
            case 'auth/user-not-found':
                return 'Usuário não encontrado. Verifique o endereço de e-mail.';
            case 'auth/wrong-password':
                return 'Senha incorreta. Por favor, tente novamente.';
            default:
                return 'Ocorreu um erro inesperado durante o login.';
        }
    };

    const handleLogin = async () => {
        const auth = getAuth(app);
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, senha);
            Swal.fire({
                title: 'Logado com sucesso!',
                text: error,
                icon: 'success',
                confirmButtonText: 'Ok'
            });
            const user = userCredential.user;
            navigate('/chat');
        } catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error(errorCode, errorMessage);
            setError('Ocorreu um erro inesperado...');
            console.log(error);
            Swal.fire({
                title: 'Error!',
                text: errorMessage,
                icon: 'error',
                confirmButtonText: 'Ok'
            });
        }
    };

    const handleLoginGoogle = async () => {
        const auth = getAuth(app);
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
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
            if (email !== '') {
                await sendPasswordResetEmail(auth, email);
            } else {
                Swal.fire({
                    title: 'Ops...',
                    text: 'Digite um e-mail para recuperação de senha',
                    icon: 'warning'
                });
            }
        } catch (error) {
            const errorMessage = error.message;
            alert(errorMessage);
        }
    };

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
                <p style={{ background: '#bbbb', cursor: 'pointer' }} onClick={handleForgotPassword}>Esqueci minha senha</p>
                {error && <p>{handleErrorMessage(error)}</p>}
            </S.Container>
        </S.Body>
    );
}

export default LoginPage;
