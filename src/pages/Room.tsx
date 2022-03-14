import Logo from '../assets/images/WebTalk3.png'
import { useParams} from 'react-router-dom'
import { Button } from '../components/Button'
import { RoomCode } from '../components/RoomCode'
import '../styles/room.scss'
import { FormEvent, useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { database } from '../services/firebase'

export type Myparams ={
  id: string;
}

export function Room(){
  const {user} = useAuth()
  const params = useParams<Myparams>() as Myparams;
  const roomID = params.id
  const [newQuestion, setNewQuestion] = useState('')

  async function handleSendQuestion(event: FormEvent) {
    event.preventDefault();

    if (newQuestion.trim() === '') {
      return;
    }
    if (!user) {
      throw new Error('Login Necessário')
    }
    
    const question = {
      content: newQuestion,
      author: {
        name: user.name,
        avatar: user.avatar,
      },
      isHighligthed: false,
      isAnswered: false,
    }

    await database.ref(`rooms/${roomID}/questions`).push(question);

    setNewQuestion('')
  }
  
  return(
    <div id="page-room">
      <header>
        <div className="content">
          <img src={Logo} alt = 'logo'/>
          <RoomCode code={roomID}/>
        </div>
      </header>

      <main>
        <div className="room-title">
          <h1>Sala React</h1>
          <span>4 perguntas</span>
        </div>
        <form onSubmit={handleSendQuestion}>
          <textarea
            placeholder='O que você quer perguntar?'
            onChange={event => setNewQuestion(event.target.value)}
            value = {newQuestion}
          />
          <div className="form-footer">
            { user ? (
              <div className='user-info'>
                <img src={user.avatar} alt={user.name} />
                <span> {user.name} </span>
              </div>
            ) : (
              <span>Para enviar uma pergunta, <button>faças seu login</button>.</span>
            )}
            <Button type='submit' disabled={!user}>Enviar pergunta</Button>
          </div>
        </form>

      </main>
    </div>
  )
}