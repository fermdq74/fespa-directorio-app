import './Filtrado.css';
import Asociados from './Asociados';
import SocioColaboradores from './SocioColaboradores';



export default function Filtrado() {

  return (
    <>
      <div id='asociados'>
        <Asociados/>
      </div>

      <div id='socio-colaboradores'>
        <SocioColaboradores/>
      </div>

    </>
  );
}
