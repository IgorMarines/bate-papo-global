import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";

import CadPage from './components/CadPage'
import LoginPage from "./components/LoginPage";
import Chat from "./components/Chat";

import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { app } from './services/Firebase';

const auth = getAuth(app);

onAuthStateChanged(auth, (user) => {
  if (user) {
    // O usuário está logado, você pode redirecioná-lo para a página desejada, por exemplo, a página de chat.
    router.navigate('/chat');
  } else {
    // O usuário não está logado, mantenha-o na tela de login.
    router.navigate('/login');
  }
});

const router = createBrowserRouter([
  {
    path: "/cadastro",
    element: <CadPage/>,
  },
  {
    path: "/login",
    element: <LoginPage/>,
  },
  {
    path: "/chat",
    element: <Chat/>,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);