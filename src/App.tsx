//import {Button} from './components/Button'
import { Home } from './pages/Home';
import { NewRoom } from './pages/NewRoom';
import { BrowserRouter, Routes, Route} from 'react-router-dom'

import {createContext, useState} from 'react'
import { auth, firebase } from './services/firebase';

type User = {
  name: string;
  id: string;
  avatar: string;
}

type AuthContextType = {
  user: User | undefined;
  signInWithGoogle: () => Promise<void>;
}

export const AuthContext = createContext({} as AuthContextType);

function App() {
  const [user, setUser] = useState<User>()

  async function signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();

    const result = await auth.signInWithPopup(provider)
 
     if (result.user) {
       const {displayName, photoURL, uid } = result.user

       if(!displayName || !photoURL) {
       throw new Error('Está faltando informações da conta do Google ')
     }
     setUser({
       id: uid,
       name : displayName,
       avatar: photoURL
     })
     }
  
  }
  
  return (
    <BrowserRouter>
    <AuthContext.Provider value={{user, signInWithGoogle}}>
     <Routes>
        <Route path="/"  element={<Home/>} />
        <Route path="/rooms/new" element={<NewRoom/>} />
     </Routes>
   </AuthContext.Provider>
    </BrowserRouter>
  );
}

export default App;