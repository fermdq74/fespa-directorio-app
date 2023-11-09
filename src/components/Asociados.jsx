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
  "Gran formato",
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
  "Etiquetas",
  "Papel japonés",
  "Trabajos sobre vidrio",
  "Imanes"
];

const tecnologíaDeImpresión = [
  'Serigrafía',
   'Tampografía',
   'Digital sobre soportes flexibles',
   'Digital sobre rígidos',
   'Digital para aplicaciones especiales',
   'Rótulos luminosos y letras cajeadas',
   'Transfer',
   'Diseño',
   'Offset',
   'Bordado',
   'Flexografía',
   'Termoimpresión',
   'Custom Xperience'
];

const especialidad = [
  "Impresión",
  "Montaje de producción propia",
  "Montaje para terceros",
  "Producción artística",
  "Decoración de flotas",
  "Especialista en carwrapping",
  "Trabajos en altura",
  "Proyectos espectaculares",
  "Diseño gráfico",
  "Diseño 3D",
  "Animación",
  "Consultoría",
  "Braille",
  "Packaging, envases",
  "Ropa deportiva",
  "Merchandising",
  "Display",
  "Bordado Textil",
  "Fabricante Original de iluminación LED eficiente de alta calidad",
  "Señalización de seguridad",
  "Decoración de estadios y eventos deportivos",
  "Impresión sobre aluminio",
  "Branding y Marketing",
  "Trofeos",
  "Creación y Edición de Contenidos Digitales (CGI)",
  "Pegatinas",
  "Fotografía",
  "Vinilado de trenes",
  "Aerografía",
  "Álbumes de fotos"
];


export default function Asociados({produccionSelection, setProduccionSelection, tecnologiaSelection, setTecnologiaSelection, especialidadSelection, setEspecialidadSelection}){

  /*const [produccionSelection, setProduccionSelection] = React.useState([]);
  const [tecnologiaSelection, setTecnologiaSelection] = React.useState([]);
  const [especialidadSelection, setEspecialidadSelection] = React.useState([]);*/

  const [provinciaSelection, setProvinciaSelection] = React.useState([]);
  const [regionSelection, setRegionSelection] = React.useState([]);
  const [provinciaStatus, setProvinciaStatus] = React.useState(false);
  const [regionStatus, setRegionStatus] = React.useState(false);
  const [countrySelection, setCountrySelection] = React.useState([]);
  const [countryStatus, setCountryStatus] = React.useState(false);


  const handleProduccionChange = (event) => {
    setProduccionSelection(event.target.value);
    if((provinciaStatus == false) && (regionStatus == false) && (countryStatus == false)) {
      addFilterItem([...event.target.value, ...tecnologiaSelection, ...especialidadSelection, 'emptyProvincia', 'emptyRegion', 'emptyCountry']);
    }else if((provinciaStatus == true) && (regionStatus == false) && (countryStatus == false)){
      if(provinciaSelection.length == 0) {
        addFilterItem([...event.target.value, ...tecnologiaSelection, ...especialidadSelection, 'emptyProvincia', 'emptyRegion', 'emptyCountry']);
      }else{
        addFilterItem([...event.target.value, ...tecnologiaSelection, ...especialidadSelection, ...provinciaSelection, 'emptyRegion', 'emptyCountry']);
      }
    }else if((provinciaStatus == false) && (regionStatus == true) && (countryStatus == false)){
      if(regionSelection.length == 0) {
        addFilterItem([...event.target.value, ...tecnologiaSelection, ...especialidadSelection, 'emptyProvincia', 'emptyRegion', 'emptyCountry']);
      }else{
        addFilterItem([...event.target.value, ...tecnologiaSelection, ...especialidadSelection, 'emptyProvincia', ...regionSelection, 'emptyCountry']);
      }
    }else if((provinciaStatus == false) && (regionStatus == false) && (countryStatus == true)){
      if(countrySelection.length == 0) {
        addFilterItem([...event.target.value, ...tecnologiaSelection, ...especialidadSelection, 'emptyProvincia', 'emptyRegion', 'emptyCountry']);
      }else{
        addFilterItem([...event.target.value, ...tecnologiaSelection, ...especialidadSelection, 'emptyProvincia', 'emptyRegion', ...countrySelection]);
      }
    }else if((provinciaStatus == true) && (regionStatus == true) && (countryStatus == false)){
      if((provinciaSelection.length == 0) && (regionSelection.length == 0)) {
        addFilterItem([...event.target.value, ...tecnologiaSelection, ...especialidadSelection, 'emptyProvincia', 'emptyRegion', 'emptyCountry']);
      }else if((provinciaSelection.length > 0) && (regionSelection.length == 0)) {
        addFilterItem([...event.target.value, ...tecnologiaSelection, ...especialidadSelection, ...provinciaSelection, 'emptyRegion', 'emptyCountry']);
      }else if((provinciaSelection.length == 0) && (regionSelection.length > 0)) {
        addFilterItem([...event.target.value, ...tecnologiaSelection, ...especialidadSelection, 'emptyProvincia', ...regionSelection, 'emptyCountry']);
      }else if((provinciaSelection.length > 0) && (regionSelection.length > 0)) {
        addFilterItem([...event.target.value, ...tecnologiaSelection, ...especialidadSelection, ...provinciaSelection, ...regionSelection, 'emptyCountry']);
      }
    }else if((provinciaStatus == true) && (regionStatus == false) && (countryStatus == true)){
      if((provinciaSelection.length == 0) && (countrySelection.length == 0)) {
        addFilterItem([...event.target.value, ...tecnologiaSelection, ...especialidadSelection, 'emptyProvincia', 'emptyRegion', 'emptyCountry']);
      }else if((provinciaSelection.length > 0) && (countrySelection.length == 0)) {
        addFilterItem([...event.target.value, ...tecnologiaSelection, ...especialidadSelection, ...provinciaSelection, 'emptyRegion', 'emptyCountry']);
      }else if((provinciaSelection.length == 0) && (countrySelection.length > 0)) {
        addFilterItem([...event.target.value, ...tecnologiaSelection, ...especialidadSelection, 'emptyProvincia', 'emptyRegion', ...countrySelection]);
      }else if((provinciaSelection.length > 0) && (countrySelection.length > 0)) {
        addFilterItem([...event.target.value, ...tecnologiaSelection, ...especialidadSelection, ...provinciaSelection, 'emptyRegion', ...countrySelection]);
      }
    }else if((provinciaStatus == false) && (regionStatus == true) && (countryStatus == true)){
      if((countrySelection.length == 0) && (regionSelection.length == 0)) {
        addFilterItem([...event.target.value, ...tecnologiaSelection, ...especialidadSelection, 'emptyProvincia', 'emptyRegion', 'emptyCountry']);
      }else if((countrySelection.length > 0) && (regionSelection.length == 0)) {
        addFilterItem([...event.target.value, ...tecnologiaSelection, ...especialidadSelection, 'emptyProvincia', 'emptyRegion', ...countrySelection]);
      }else if((countrySelection.length == 0) && (regionSelection.length > 0)) {
        addFilterItem([...event.target.value, ...tecnologiaSelection, ...especialidadSelection, 'emptyProvincia', ...regionSelection, 'emptyCountry']);
      }else if((countrySelection.length > 0) && (regionSelection.length > 0)) {
        addFilterItem([...event.target.value, ...tecnologiaSelection, ...especialidadSelection, 'emptyProvincia', ...regionSelection, ...countrySelection]);
      }
    }else if((provinciaStatus == true) && (regionStatus == true) && (countryStatus == true)){
      if((regionSelection.length == 0) && (provinciaSelection.length == 0) && (countrySelection.length == 0)) {
        addFilterItem([...event.target.value, ...tecnologiaSelection, ...especialidadSelection, 'emptyProvincia', 'emptyRegion', 'emptyCountry']);
      }else if((regionSelection.length > 0) && (provinciaSelection.length == 0) && (countrySelection.length == 0)){
        addFilterItem([...event.target.value, ...tecnologiaSelection, ...especialidadSelection, 'emptyProvincia', ...regionSelection, 'emptyCountry']);
      }else if((regionSelection.length == 0) && (provinciaSelection.length > 0) && (countrySelection.length == 0)){
        addFilterItem([...event.target.value, ...tecnologiaSelection, ...especialidadSelection, ...provinciaSelection, 'emptyRegion', 'emptyCountry']);
      }else if((regionSelection.length == 0) && (provinciaSelection.length == 0) && (countrySelection.length > 0)){
        addFilterItem([...event.target.value, ...tecnologiaSelection, ...especialidadSelection, 'emptyProvincia', 'emptyRegion', ...countrySelection]);
      }else if((regionSelection.length > 0) && (provinciaSelection.length > 0) && (countrySelection.length == 0)){
        addFilterItem([...event.target.value, ...tecnologiaSelection, ...especialidadSelection, ...provinciaSelection, ...regionSelection, 'emptyCountry']);  
      }else if((regionSelection.length > 0) && (provinciaSelection.length == 0) && (countrySelection.length > 0)){
        addFilterItem([...event.target.value, ...tecnologiaSelection, ...especialidadSelection, ...provinciaSelection, 'emptyRegion', ...countrySelection]);  
      }else if((regionSelection.length == 0) && (provinciaSelection.length > 0) && (countrySelection.length > 0)){
        addFilterItem([...event.target.value, ...tecnologiaSelection, ...especialidadSelection, 'emptyProvincia', ...regionSelection, ...countrySelection]);  
      }else if((regionSelection.length > 0) && (provinciaSelection.length > 0) && (countrySelection.length > 0)) {
        addFilterItem([...event.target.value, ...tecnologiaSelection, ...especialidadSelection, ...provinciaSelection, ...regionSelection, ...countrySelection]);
      }
    }
    //addFilterItem([...event.target.value, ...tecnologiaSelection, ...especialidadSelection, ...provinciaSelection, ...regionSelection]);
    //addFilterItem(event.target.value);
  };

  const handleTecnologiaChange = (event) => {
    setTecnologiaSelection(event.target.value);
    if((provinciaStatus == false) && (regionStatus == false) && (countryStatus == false)) {
      addFilterItem([...produccionSelection, ...event.target.value, ...especialidadSelection, 'emptyProvincia', 'emptyRegion', 'emptyCountry']);
    }else if((provinciaStatus == true) && (regionStatus == false) && (countryStatus == false)){
      if(provinciaSelection.length == 0) {
        addFilterItem([...produccionSelection, ...event.target.value, ...especialidadSelection, 'emptyProvincia', 'emptyRegion', 'emptyCountry']);
      }else{
        addFilterItem([...produccionSelection, ...event.target.value, ...especialidadSelection, ...provinciaSelection, 'emptyRegion', 'emptyCountry']);
      } 
    }else if((provinciaStatus == false) && (regionStatus == true) && (countryStatus == false)){
      if(regionSelection.length == 0) {
        addFilterItem([...produccionSelection, ...event.target.value, ...especialidadSelection, 'emptyProvincia', 'emptyRegion', 'emptyCountry']);
      }else{
        addFilterItem([...produccionSelection, ...event.target.value, ...especialidadSelection, 'emptyProvincia', ...regionSelection, 'emptyCountry']);
      }
    }else if((provinciaStatus == false) && (regionStatus == false) && (countryStatus == true)){
      if(countrySelection.length == 0) {
        addFilterItem([...produccionSelection, ...event.target.value, ...especialidadSelection, 'emptyProvincia', 'emptyRegion', 'emptyCountry']);
      }else{
        addFilterItem([...produccionSelection, ...event.target.value, ...especialidadSelection, 'emptyProvincia', 'emptyRegion', ...countrySelection]);
      }
    }else if((provinciaStatus == true) && (regionStatus == true) && (countryStatus == false)){
      if((provinciaSelection.length == 0) && (regionSelection.length == 0)) {
        addFilterItem([...produccionSelection, ...event.target.value, ...especialidadSelection, 'emptyProvincia', 'emptyRegion', 'emptyCountry']);
      }else if((provinciaSelection.length > 0) && (regionSelection.length == 0)) {
        addFilterItem([...produccionSelection, ...event.target.value, ...especialidadSelection, ...provinciaSelection, 'emptyRegion', 'emptyCountry']);
      }else if((provinciaSelection.length == 0) && (regionSelection.length > 0)) {
        addFilterItem([...produccionSelection, ...event.target.value, ...especialidadSelection, 'emptyProvincia', ...regionSelection, 'emptyCountry']);
      }else if((provinciaSelection.length > 0) && (regionSelection.length > 0)) {
        addFilterItem([...produccionSelection, ...event.target.value, ...especialidadSelection, ...provinciaSelection, ...regionSelection, 'emptyCountry']);
      }
    }else if((provinciaStatus == true) && (regionStatus == false) && (countryStatus == true)){
      if((provinciaSelection.length == 0) && (countrySelection.length == 0)) {
        addFilterItem([...produccionSelection, ...event.target.value, ...especialidadSelection, 'emptyProvincia', 'emptyRegion', 'emptyCountry']);
      }else if((provinciaSelection.length > 0) && (countrySelection.length == 0)) {
        addFilterItem([...produccionSelection, ...event.target.value, ...especialidadSelection, ...provinciaSelection, 'emptyRegion', 'emptyCountry']);
      }else if((provinciaSelection.length == 0) && (countrySelection.length > 0)) {
        addFilterItem([...produccionSelection, ...event.target.value, ...especialidadSelection, 'emptyProvincia', 'emptyRegion', ...countrySelection]);
      }else if((provinciaSelection.length > 0) && (countrySelection.length > 0)) {
        addFilterItem([...produccionSelection, ...event.target.value, ...especialidadSelection, ...provinciaSelection, 'emptyRegion', ...countrySelection]);
      }
    }else if((provinciaStatus == false) && (regionStatus == true) && (countryStatus == true)){
      if((countrySelection.length == 0) && (regionSelection.length == 0)) {
        addFilterItem([...produccionSelection, ...event.target.value, ...especialidadSelection, 'emptyProvincia', 'emptyRegion', 'emptyCountry']);
      }else if((countrySelection.length > 0) && (regionSelection.length == 0)) {
        addFilterItem([...produccionSelection, ...event.target.value, ...especialidadSelection, 'emptyProvincia', 'emptyRegion', ...countrySelection]);
      }else if((countrySelection.length == 0) && (regionSelection.length > 0)) {
        addFilterItem([...produccionSelection, ...event.target.value, ...especialidadSelection, 'emptyProvincia', ...regionSelection, 'emptyCountry']);
      }else if((countrySelection.length > 0) && (regionSelection.length > 0)) {
        addFilterItem([...produccionSelection, ...event.target.value, ...especialidadSelection, 'emptyProvincia', ...regionSelection, ...countrySelection]);
      }
    }else if((provinciaStatus == true) && (regionStatus == true) && (countryStatus == true)){
      if((regionSelection.length == 0) && (provinciaSelection.length == 0) && (countrySelection.length == 0)) {
        addFilterItem([...produccionSelection, ...event.target.value, ...especialidadSelection, 'emptyProvincia', 'emptyRegion', 'emptyCountry']);
      }else if((regionSelection.length > 0) && (provinciaSelection.length == 0) && (countrySelection.length == 0)){
        addFilterItem([...produccionSelection, ...event.target.value, ...especialidadSelection, 'emptyProvincia', ...regionSelection, 'emptyCountry']);
      }else if((regionSelection.length == 0) && (provinciaSelection.length > 0) && (countrySelection.length == 0)){
        addFilterItem([...produccionSelection, ...event.target.value, ...especialidadSelection, ...provinciaSelection, 'emptyRegion', 'emptyCountry']);
      }else if((regionSelection.length == 0) && (provinciaSelection.length == 0) && (countrySelection.length > 0)){
        addFilterItem([...produccionSelection, ...event.target.value, ...especialidadSelection, 'emptyProvincia', 'emptyRegion', ...countrySelection]);
      }else if((regionSelection.length > 0) && (provinciaSelection.length > 0) && (countrySelection.length == 0)){
        addFilterItem([...produccionSelection, ...event.target.value, ...especialidadSelection, ...provinciaSelection, ...regionSelection, 'emptyCountry']);  
      }else if((regionSelection.length > 0) && (provinciaSelection.length == 0) && (countrySelection.length > 0)){
        addFilterItem([...produccionSelection, ...event.target.value, ...especialidadSelection, ...provinciaSelection, 'emptyRegion', ...countrySelection]);  
      }else if((regionSelection.length == 0) && (provinciaSelection.length > 0) && (countrySelection.length > 0)){
        addFilterItem([...produccionSelection, ...event.target.value, ...especialidadSelection, 'emptyProvincia', ...regionSelection, ...countrySelection]);  
      }else if((regionSelection.length > 0) && (provinciaSelection.length > 0) && (countrySelection > 0)) {
        addFilterItem([...produccionSelection, ...event.target.value, ...especialidadSelection, ...provinciaSelection, ...regionSelection, ...countrySelection]);
      }  
    }
    //addFilterItem([...produccionSelection, ...event.target.value, ...especialidadSelection, ...provinciaSelection, ...regionSelection]);
    //addFilterItem(event.target.value);
  };

 const handleEspecialidadChange = (event) => {
    setEspecialidadSelection(event.target.value);
    if((provinciaStatus == false) && (regionStatus == false) && (countryStatus == false)) {
      addFilterItem([...produccionSelection, ...tecnologiaSelection, ...event.target.value, 'emptyProvincia', 'emptyRegion', 'emptyCountry']);
    }else if((provinciaStatus == true) && (regionStatus == false) && (countryStatus == false)){
      if(provinciaSelection.length == 0) {
        addFilterItem([...produccionSelection, ...tecnologiaSelection, ...event.target.value, 'emptyProvincia', 'emptyRegion', 'emptyCountry']);
      }else{
        addFilterItem([...produccionSelection, ...tecnologiaSelection, ...event.target.value, ...provinciaSelection, 'emptyRegion', 'emptyCountry']);
      }
    }else if((provinciaStatus == false) && (regionStatus == true) && (countryStatus == false)){
      if(regionSelection.length == 0) {
        addFilterItem([...produccionSelection, ...tecnologiaSelection, ...event.target.value, 'emptyProvincia', 'emptyRegion', 'emptyCountry']);
      }else{
        addFilterItem([...produccionSelection, ...tecnologiaSelection, ...event.target.value, 'emptyProvincia', ...regionSelection, 'emptyCountry']);
      }
    }else if((provinciaStatus == false) && (regionStatus == false) && (countryStatus == true)){
      if(countrySelection.length == 0) {
        addFilterItem([...produccionSelection, ...tecnologiaSelection, ...event.target.value, 'emptyProvincia', 'emptyRegion', 'emptyCountry']);
      }else{
        addFilterItem([...produccionSelection, ...tecnologiaSelection, ...event.target.value, 'emptyProvincia', 'emptyRegion', ...countrySelection]);
      }
    }else if((provinciaStatus == true) && (regionStatus == true) && (countryStatus == false)){
      if((provinciaSelection.length == 0) && (regionSelection.length == 0)) {
        addFilterItem([...produccionSelection, ...tecnologiaSelection, ...event.target.value, 'emptyProvincia', 'emptyRegion', 'emptyCountry']);
      }else if((provinciaSelection.length > 0) && (regionSelection.length == 0)) {
        addFilterItem([...produccionSelection, ...tecnologiaSelection, ...event.target.value, ...provinciaSelection, 'emptyRegion', 'emptyCountry']);
      }else if((provinciaSelection.length == 0) && (regionSelection.length > 0)) {
        addFilterItem([...produccionSelection, ...tecnologiaSelection, ...event.target.value, 'emptyProvincia', ...regionSelection, 'emptyCountry']);
      }else if((provinciaSelection.length > 0) && (regionSelection.length > 0)) {
        addFilterItem([...produccionSelection, ...tecnologiaSelection, ...event.target.value, ...provinciaSelection, ...regionSelection, 'emptyCountry']);
      }
    }else if((provinciaStatus == true) && (regionStatus == false) && (countryStatus == true)){
      if((provinciaSelection.length == 0) && (countrySelection.length == 0)) {
        addFilterItem([...produccionSelection, ...tecnologiaSelection, ...event.target.value, 'emptyProvincia', 'emptyRegion', 'emptyCountry']);
      }else if((provinciaSelection.length > 0) && (countrySelection.length == 0)) {
        addFilterItem([...produccionSelection, ...tecnologiaSelection, ...event.target.value, ...provinciaSelection, 'emptyRegion', 'emptyCountry']);
      }else if((provinciaSelection.length == 0) && (countrySelection.length > 0)) {
        addFilterItem([...produccionSelection, ...tecnologiaSelection, ...event.target.value, 'emptyProvincia', 'emptyRegion', ...countrySelection]);
      }else if((provinciaSelection.length > 0) && (countrySelection.length > 0)) {
        addFilterItem([...produccionSelection, ...tecnologiaSelection, ...event.target.value, ...provinciaSelection, 'emptyRegion', ...countrySelection]);
      }
    }else if((provinciaStatus == false) && (regionStatus == true) && (countryStatus == true)){
      if((countrySelection.length == 0) && (regionSelection.length == 0)) {
        addFilterItem([...produccionSelection, ...tecnologiaSelection, ...event.target.value, 'emptyProvincia', 'emptyRegion', 'emptyCountry']);
      }else if((countrySelection.length > 0) && (regionSelection.length == 0)) {
        addFilterItem([...produccionSelection, ...tecnologiaSelection, ...event.target.value, 'emptyProvincia', 'emptyRegion', ...countrySelection]);
      }else if((countrySelection.length == 0) && (regionSelection.length > 0)) {
        addFilterItem([...produccionSelection, ...tecnologiaSelection, ...event.target.value, 'emptyProvincia', ...regionSelection, 'emptyCountry']);
      }else if((countrySelection.length > 0) && (regionSelection.length > 0)) {
        addFilterItem([...produccionSelection, ...tecnologiaSelection, ...event.target.value, 'emptyProvincia', ...regionSelection, ...countrySelection]);
      }
    }else if((provinciaStatus == true) && (regionStatus == true) && (countryStatus == true)){
      if((regionSelection.length == 0) && (provinciaSelection.length == 0) && (countrySelection.length == 0)) {
        addFilterItem([...produccionSelection, ...tecnologiaSelection, ...event.target.value, 'emptyProvincia', 'emptyRegion', 'emptyCountry']);  
      }else if((regionSelection.length > 0) && (provinciaSelection.length == 0) && (countrySelection.length == 0)){
        addFilterItem([...produccionSelection, ...tecnologiaSelection, ...event.target.value, 'emptyProvincia', ...regionSelection, 'emptyCountry']);
      }else if((regionSelection.length == 0) && (provinciaSelection.length > 0) && (countrySelection.length == 0)){
        addFilterItem([...produccionSelection, ...tecnologiaSelection, ...event.target.value, ...provinciaSelection, 'emptyRegion', 'emptyCountry']);
      }else if((regionSelection.length == 0) && (provinciaSelection.length == 0) && (countrySelection.length > 0)){
        addFilterItem([...produccionSelection, ...tecnologiaSelection, ...event.target.value, 'emptyProvincia', 'emptyRegion', ...countrySelection]);  
      }else if((regionSelection.length > 0) && (provinciaSelection.length > 0) && (countrySelection.length == 0)){
        addFilterItem([...produccionSelection, ...tecnologiaSelection, ...event.target.value, ...provinciaSelection, ...regionSelection, 'emptyCountry']);  
      }else if((regionSelection.length > 0) && (provinciaSelection.length == 0) && (countrySelection.length > 0)){
        addFilterItem([...produccionSelection, ...tecnologiaSelection, ...event.target.value, ...provinciaSelection, 'emptyRegion', ...countrySelection]);  
      }else if((regionSelection.length == 0) && (provinciaSelection.length > 0) && (countrySelection.length > 0)){
        addFilterItem([...produccionSelection, ...tecnologiaSelection, ...event.target.value, 'emptyProvincia', ...regionSelection, ...countrySelection]);  
      }else if((regionSelection.length > 0) && (provinciaSelection.length > 0)) {
        addFilterItem([...produccionSelection, ...tecnologiaSelection, ...event.target.value, ...provinciaSelection, ...regionSelection, ...countrySelection]);
      }  
    }
    //addFilterItem([...produccionSelection, ...tecnologiaSelection, ...event.target.value, ...provinciaSelection, ...regionSelection]);
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
      <Localidad filter1={produccionSelection} filter2={tecnologiaSelection} filter3={especialidadSelection} provinciaSelection={provinciaSelection} setProvinciaSelection={setProvinciaSelection} regionSelection={regionSelection} setRegionSelection={setRegionSelection} countrySelection={countrySelection} setCountrySelection={setCountrySelection} provinciaStatus={provinciaStatus} setProvinciaStatus={setProvinciaStatus} regionStatus={regionStatus} setRegionStatus={setRegionStatus} countryStatus={countryStatus} setCountryStatus={setCountryStatus} />
      </div>
      </>
    );
  }
