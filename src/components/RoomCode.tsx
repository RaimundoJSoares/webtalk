import copyIMG from '../assets/images/copy.svg'
import '../styles/roomCode.scss'

type RoomcodeProps = {
  code : string;
}

export function RoomCode( props: RoomcodeProps){
  function copyRoomCodeToClipBoard() {
    navigator.clipboard.writeText(props.code)
  }

  return(
    <button className='room-code' onClick={copyRoomCodeToClipBoard}>
      <div>
        <img src={copyIMG} alt="copy room code" />
      </div>
      <span>sala #{props.code}</span>
    </button>
  )
}