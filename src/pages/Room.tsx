import Logo from '../assets/images/WebTalk3.png'
import { useParams} from 'react-router-dom'
import { Button } from '../components/Button'
import { RoomCode } from '../components/RoomCode'
import '../styles/room.scss'
import { FormEvent, useEffect, useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { database } from '../services/firebase'
import { Question } from '../components/Questions'

type QuestionsType = {
  id:string;
  author: {
    name: string;
    avatar: string;

  }
  content: string;
  isAnswered: boolean;
  isHighlighted: boolean;
}

type FirebaseQuestions = Record<string, {
  author: {
    name: string;
    avatar: string;

  }
  content: string;
  isAnswered: boolean;
  isHighlighted: boolean;
}>

export type Myparams ={
  id: string;
}

export function Room(){
  const {user} = useAuth()
  const params = useParams<Myparams>() as Myparams;
  const roomID = params.id
  const [newQuestion, setNewQuestion] = useState('')
  const [ questions, setQuestions] = useState<QuestionsType[]>([])
  const [title, setTitle] = useState('')

  useEffect(() => {
    const Reference = database.ref(`rooms/${roomID}`)

    Reference.on('value', room => {
      const databaseRoom = room.val();
      const firebaseQuestions : FirebaseQuestions = databaseRoom.questions  ?? {};
      const parsedQuestions = Object.entries(firebaseQuestions ).map(([key, value])=> {
        return {
          id: key,
          content: value.content,
          author: value.author,
          isHighlighted : value.isHighlighted,
          isAnswered: value.isAnswered
        }
      })

      setTitle(databaseRoom.title)
      setQuestions(parsedQuestions)
    })
  }, [roomID])

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
          <h1>Sala {title}</h1>
          {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
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

        <div className="question-list">
          {questions.map(question => {
              return(
                <Question 
                key={question.id}
                content={question.content}
                author = { question.author}
                />
              )
            })}
        </div>
      </main>
    </div>
  )
}