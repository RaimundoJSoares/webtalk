import IlustrationIMG from "../assets/images/illustration.svg";
import logoIMG from "../assets/images/WebTalk.png";
import "../styles/auth.scss";
import { Button } from "../components/Button";
import { Link, useNavigate } from "react-router-dom";
import { FormEvent, useState } from "react";
import { database } from "../services/firebase";
import { useAuth } from "../hooks/useAuth";

export function NewRoom() {
  const { user} = useAuth()
  const history = useNavigate()
  const [newRoom, setNewRoom] = useState('')

  async function handleCreateRoom(event: FormEvent) {
    event.preventDefault()
    if(newRoom.trim() === '') {
      return
    }

    const roomReference = database.ref('rooms');

    const firebaseRoom = await roomReference.push({
      title: newRoom,
      authorID: user?.id
    })
    history(`/rooms/${firebaseRoom.key}`)
  }

  return (
    <div id="page-auth">
      <aside>
        <img src={IlustrationIMG} alt="Ilustração"></img>
        <strong>Crie Salas de Q&amp;A ao-vivo</strong>
        <p>Tire as dúvidas da sua audiência em tempo-real</p>
      </aside>
      <main>
        <div className="main-content">
          <img src={logoIMG} alt="logo" />
          <h2>Criar uma nova sala</h2>
          <form onSubmit={handleCreateRoom}>
            <input type="text" placeholder="Nome da sala"  
            onChange={event => setNewRoom(event.target.value)}
            value={newRoom}
            />
            <Button type="submit">Criar sala</Button>
          </form>
          <p>
            Quer entrar em uma sala existente? <Link to="/">Clique Aqui</Link>
          </p>
        </div>
      </main>
    </div>
  );
}
