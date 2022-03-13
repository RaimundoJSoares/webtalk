import IlustrationIMG from '../assets/images/illustration.svg'
import logoIMG from '../assets/images/WebTalk.png'

import { Button } from '../components/Button'
//import { auth } from '../services/firebase'
//import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import googleIcon from '../assets/images/google-icon.svg'
import '../styles/auth.scss'
import { useNavigate } from 'react-router-dom'

import { useAuth } from '../hooks/useAuth'
import { FormEvent, useState } from 'react'
import { database } from '../services/firebase'


export function Home() {
  const { user, signInWithGoogle} = useAuth()
  const history = useNavigate()
  const [roomCode, setRoomCode] = useState('')
 
 async function handleCreateNewRoom(){
   if (!user) {
    await signInWithGoogle()
   }
  history('/rooms/new')
 }

 async function handleJoinRoom(event:FormEvent) {
   event.preventDefault();
   
   if(roomCode.trim() === '') {
     return;
   }

   const Reference = await database.ref(`rooms/${roomCode}`).get()

   if(!Reference.exists()) {
     alert('Essa sala não existe');
     return;
   }

   history(`/rooms/${roomCode}`)
 }

  return(
    <div id="page-auth">
      <aside>
        <img src={IlustrationIMG} alt='Ilustração'></img>
        <strong>Crie Salas de Q&amp;A ao-vivo</strong>
        <p>Tire as dúvidas da sua audiência em tempo-real</p>
      </aside>
      <main>
        <div className="main-content">
          <img src={logoIMG} alt='logo'/>
          <button className="create-room" onClick={handleCreateNewRoom}>
            <img src={googleIcon}  alt='google icon'/>
            Crie sua sala com o Google
          </button>
          <div className="separator"> ou entre em uma sala </div>
          <form onSubmit={handleJoinRoom}>
            <input
            onChange={event => setRoomCode(event.target.value)}
            value={roomCode}
             type="text"
             placeholder='Digite o código da sala'
              />
              <Button type='submit' >
                Entrar na sala
              </Button>
          </form>
        </div>
      </main>
    </div>
  )
}