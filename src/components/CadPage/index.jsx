import  { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import {app} from '../../services/Firebase';

import * as S from './styles'
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const CadPage = () => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [error, setError] = useState(null);

    const handleLogin = async () => {
        const auth = getAuth(app);
        createUserWithEmailAndPassword(auth, email, senha)
        .then((userCredential) => {
            Swal.fire({
                title: 'Cadastrado com sucesso!',
                text: error,
                icon: 'sucess',
                confirmButtonText: 'Cool'
              })
            // eslint-disable-next-line no-unused-vars
            const user = userCredential.user;
            
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error(errorCode, errorMessage)
            setError(`${errorCode}: ${errorMessage}`);
        });
    };

    return (
        <S.Body>
            <S.Container>
                <h2>Cadastro</h2>
                <S.Label>Email:</S.Label>
                <S.Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <S.Label>Senha:</S.Label>
                <S.Input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} />
                <S.Button onClick={handleLogin}>Entrar</S.Button>
                <Link to="/login">Já possui uma conta?</Link>
                {error && <p>{error}</p>} {/* Exibe a mensagem de erro se houver um erro */}
            </S.Container>
        </S.Body>
    );
}

export default CadPage;
