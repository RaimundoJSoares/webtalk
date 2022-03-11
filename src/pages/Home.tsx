import IlustrationIMG from '../assets/images/illustration.svg'
import logoIMG from '../assets/images/WebTalk.png'
import googleIcon from '../assets/images/google-icon.svg'
import '../styles/auth.scss'
import { Button } from '../components/Button'

export function Home() {
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
          <button className="create-room">
            <img src={googleIcon}  alt='google icon'/>
            Crie sua sala com o Google
          </button>
          <div className="separator"> ou entre em uma sala </div>
          <form>
            <input
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