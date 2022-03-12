import IlustrationIMG from "../assets/images/illustration.svg";
import logoIMG from "../assets/images/WebTalk.png";
import "../styles/auth.scss";
import { Button } from "../components/Button";
import { Link } from "react-router-dom";
//import { useAuth } from "../hooks/useAuth";

export function NewRoom() {
 //const { user } = useAuth();

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
          <form>
            <input type="text" placeholder="Nome da sala" />
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
