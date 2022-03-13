import Logo from '../assets/images/WebTalk3.png'
import { Button } from '../components/Button'
import '../styles/room.scss'

export function Room(){
  return(
    <div id="page-room">
      <header>
        <div className="content">
          <img src={Logo} alt = 'logo'/>
          <div>codigo</div>
        </div>
      </header>

      <main>
        <div className="room-title">
          <h1>Sala React</h1>
          <span>4 perguntas</span>
        </div>
        <form>
          <textarea
            placeholder='O que você quer perguntar?'
          />
          <div className="form-footer">
            <span>Para enviar uma pergunta, <button>faças seu login</button>.</span>
            <Button type='submit'>Enviar pergunta</Button>
          </div>
        </form>

      </main>
    </div>
  )
}