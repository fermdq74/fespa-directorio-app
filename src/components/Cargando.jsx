import { Ring } from '@uiball/loaders'

export default function Cargando(){
    return(
          <div
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '80vh',
    }}
  >
    <Ring 
      size={50}
      lineWeight={5}
      speed={2} 
      color="#666666e3" 
    />
  </div>
    )
}