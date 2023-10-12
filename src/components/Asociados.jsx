import * as React from 'react';
import './Filtrado.css';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import Localidad from './Localidad';
import { useContext } from 'react';
import FilterContext from '../context/FilterContext';


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const producción = [
  "Publicidad exterior vallas y autobuses",
  "Lonas recubrimiento fachadas",
  "PLV en cartón",
  "PLV otros materiales",
  "Eventos",
  "Rótulos luminosos y letras cajeadas",
  "Productos gráficos de pequeños ",
  "Formato",
  "Serigrafía artística",
  "Banderas",
  "Textil decoración",
  "Camisetas",
  "Sublimación textil",
  "Otros textiles",
  "Impresión sobre soportes rígidos",
  "Trabajos sobre cerámica",
  "Trabajos sobre metal",
  "Señalética",
  "Producción 3D",
  "Reclamo publicitario",
  "Formación",
];

const tecnologíaDeImpresión = [
  'Serigrafía',
   'Tampografía',
   'Digital sobre soportes flexibles',
   'Digital sobre rígidos',
   'Digital para aplicaciones especiales',
   'Rótulos luminosos y letras cajeadas',
   'Transfer',
   'Diseño'
];

const especialidad = [
  "Impresión",
  "Instalación de producción propia",
  "Instalación para terceros",
  "Producción artística",
  "Decoración de flotas",
  "Especialista en carwrapping",
  "Trabajos en altura",
  "Proyectos espectaculares",
  "Diseño gráfico",
  "Diseño 3D",
  "Animación",
  "Consultoría",
];


export default function Asociados(){

  const [produccionSelection, setProduccionSelection] = React.useState([]);
  const [tecnologiaSelection, setTecnologiaSelection] = React.useState([]);
  const [especialidadSelection, setEspecialidadSelection] = React.useState([]);

  const [provinciaSelection, setProvinciaSelection] = React.useState([]);
  const [regionSelection, setRegionSelection] = React.useState([]);


  const handleProduccionChange = (event) => {
    setProduccionSelection(event.target.value);
    addFilterItem([...event.target.value, ...tecnologiaSelection, ...especialidadSelection, ...provinciaSelection, ...regionSelection]);
    //addFilterItem(event.target.value);
  };

  const handleTecnologiaChange = (event) => {
    setTecnologiaSelection(event.target.value);
    addFilterItem([...produccionSelection, ...event.target.value, ...especialidadSelection, ...provinciaSelection, ...regionSelection]);
    //addFilterItem(event.target.value);
  };

 const handleEspecialidadChange = (event) => {
    setEspecialidadSelection(event.target.value);
    addFilterItem([...produccionSelection, ...tecnologiaSelection, ...event.target.value, ...provinciaSelection, ...regionSelection]);
    //addFilterItem(event.target.value);
  };

  const { addFilterItem } = useContext(FilterContext);

    return (
        <>
      <div id="asoc">
        <h2 className="sector-actividad">ASOCIADOS</h2>
             <div>
        <FormControl sx={{ m: 1, width: 300 }}>
          <InputLabel id="demo-multiple-checkbox-label" >PRODUCCIÓN</InputLabel>
          <Select
            labelId="demo-multiple-checkbox-label"
            id="demo-multiple-checkbox"
            multiple
            value={produccionSelection}
            onChange={handleProduccionChange}
            input={<OutlinedInput label="PRODUCCIÓN" />}
            renderValue={(selected) => selected.join(', ')}
            MenuProps={MenuProps}
          >
            {producción.map((name) => (
              <MenuItem key={name} value={name}>
                <Checkbox checked={produccionSelection.indexOf(name) > -1} />
                <ListItemText primary={name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      <div>
        <FormControl sx={{ m: 1, width: 300 }}>
          <InputLabel id="demo-multiple-checkbox-label">TECNOLOGÍA DE IMPRESIÓN</InputLabel>
          <Select
            labelId="demo-multiple-checkbox-label"
            id="demo-multiple-checkbox"
            multiple
            value={tecnologiaSelection}
            onChange={handleTecnologiaChange}
            input={<OutlinedInput label="TECNOLOGÍA DE IMPRESIÓN" />}
            renderValue={(selected) => selected.join(', ')}
            MenuProps={MenuProps}
          >
            {tecnologíaDeImpresión.map((name) => (
              <MenuItem key={name} value={name}>
                <Checkbox checked={tecnologiaSelection.indexOf(name) > -1} />
                <ListItemText primary={name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      <div>
        <FormControl sx={{ m: 1, width: 300 }}>
          <InputLabel id="demo-multiple-checkbox-label">ESPECIALIDAD</InputLabel>
          <Select
            labelId="demo-multiple-checkbox-label"
            id="demo-multiple-checkbox"
            multiple
            value={especialidadSelection}
            onChange={handleEspecialidadChange}
            input={<OutlinedInput label="ESPECIALIDAD" />}
            renderValue={(selected) => selected.join(', ')}
            MenuProps={MenuProps}
          >
            {especialidad.map((name) => (
              <MenuItem key={name} value={name}>
                <Checkbox checked={especialidadSelection.indexOf(name) > -1} />
                <ListItemText primary={name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      </div>

      <div id="localidad">
      <Localidad filter1={produccionSelection} filter2={tecnologiaSelection} filter3={especialidadSelection} provinciaSelection={provinciaSelection} setProvinciaSelection={setProvinciaSelection} regionSelection={regionSelection} setRegionSelection={setRegionSelection} />
      </div>
      </>
    );
  }
