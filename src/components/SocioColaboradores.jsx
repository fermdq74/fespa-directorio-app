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
import FilterContext from '../context/FilterContext';
import { useContext } from 'react';

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

const distribuidor = [
  'Maquinaria de corte',
   'Maquinaria de impresión digital gran formato',
   'Maquinaria de impresión digital pequeño formato',
   'Maquinaria impresión digital textil',
   'Maquinaria impresión serigráfica',
   'Maquinaria impresión serigrafía industrial',
   'Materiales para etiquetas y envases',
   'Producto Textil',
   'Banderas',
   'Formación',
   'Preimpresión',
   'Prensas de impresión digitales y convencionales',
   'Lonas',
   'Software, RIP',
   'Web-to-print',
   'Materiales de impresión digital',
   'Materiales de rotulación',
   'Materiales de wrapping',
   'Consumibles para impresión',
   'Contenidos de vídeo',
   'Creación y Diseño',
   'Decoración textil',
   'Diseño Retail',
   'Maquinaria de impresión de etiquetas',
   'Maquinaria de escaners',
   'Maquinaria Impresión 3D',
   'Software ERP',
   'Laminadoras, barnices, recubrimiento',
   'Tintas para impresión digital',
   'Tintas para serigrafía',
];

const fabricante = [
  'Maquinaria de corte',
  'Maquinaria de impresión digital gran formato',
  'Maquinaria de impresión digital pequeño formato',
  'Maquinaria impresión digital textil',
  'Maquinaria impresión serigráfica',
  'Maquinaria impresión serigrafía industrial',
  'Materiales para etiquetas y envases',
  'Producto Textil',
  'Banderas',
  'Formación',
  'Preimpresión',
  'Prensas de impresión digitales y convencionales',
  'Lonas',
  'Software, RIP',
  'Web-to-print',
  'Materiales de impresión digital',
  'Materiales de rotulación',
  'Materiales de wrapping',
  'Consumibles para impresión',
  'Contenidos de vídeo',
  'Creación y Diseño',
  'Decoración textil',
  'Diseño Retail',
  'Maquinaria de impresión de etiquetas',
  'Maquinaria de escaners',
  'Maquinaria Impresión 3D',
  'Software ERP',
  'Laminadoras, barnices, recubrimiento',
  'Tintas para impresión digital',
  'Tintas para serigrafía',
]

const tecnologíaDeImpresiónColab = [
  'Serigrafía',
   'Tampografía',
   'Digital sobre soportes flexibles',
   'Digital sobre rígidos',
   'Digital para aplicaciones especiales',
   'Rótulos luminosos y letras cajeadas',
   'Transfer',
   'Diseño'
];


export default function SocioColaboradores(distribuidorSelection, setDistribuidorSelection, fabricanteSelection, setFabricanteSelection,tecnologiaColabSelection, setTecnologiaColabSelection){

  /*const [distribuidorSelection, setDistribuidorSelection] = React.useState([]);
  const [fabricanteSelection, setFabricanteSelection] = React.useState([]);
  const [tecnologiaColabSelection, setTecnologiaColabSelection] = React.useState([]);*/

  const [provinciaSelection, setProvinciaSelection] = React.useState([]);
  const [regionSelection, setRegionSelection] = React.useState([]);
  const [provinciaStatus, setProvinciaStatus] = React.useState(false);
  const [regionStatus, setRegionStatus] = React.useState(false);


  const handleDistribuidorChange = (event) => {
    setDistribuidorSelection(event.target.value);
    if((provinciaStatus == false) && (regionStatus == false)) {
      addFilterItem([...event.target.value, ...fabricanteSelection, ...tecnologiaColabSelection, 'emptyProvincia', 'emptyRegion']);
    }else if((provinciaStatus == true) && (regionStatus == false)){
      if(provinciaSelection.length == 0) {
        addFilterItem([...event.target.value, ...fabricanteSelection, ...tecnologiaColabSelection, 'emptyProvincia', 'emptyRegion']);
      }else{
        addFilterItem([...event.target.value, ...fabricanteSelection, ...tecnologiaColabSelection, ...provinciaSelection, 'emptyRegion']);
      }
    }else if((provinciaStatus == false) && (regionStatus == true)){
      if(regionSelection.length == 0) {
        addFilterItem([...event.target.value, ...fabricanteSelection, ...tecnologiaColabSelection, 'emptyProvincia', 'emptyRegion']);
      }else{
        addFilterItem([...event.target.value, ...fabricanteSelection, ...tecnologiaColabSelection, 'emptyProvincia', ...regionSelection]);
      }
    }else if((provinciaStatus == true) && (regionStatus == true)){
      if((regionSelection.length == 0) && (provinciaSelection.length == 0)) {
        addFilterItem([...event.target.value, ...fabricanteSelection, ...tecnologiaColabSelection, 'emptyProvincia', 'emptyRegion']);
      }else if((regionSelection.length > 0) && (provinciaSelection.length == 0)){
        addFilterItem([...event.target.value, ...fabricanteSelection, ...tecnologiaColabSelection, 'emptyProvincia', ...regionSelection]);
      }else if((regionSelection.length == 0) && (provinciaSelection.length > 0)){
        addFilterItem([...event.target.value, ...fabricanteSelection, ...tecnologiaColabSelection, ...provinciaSelection, 'emptyRegion']);
      }else if((regionSelection.length > 0) && (provinciaSelection.length > 0)) {
        addFilterItem([...event.target.value, ...fabricanteSelection, ...tecnologiaColabSelection, ...provinciaSelection, ...regionSelection]);
      }
    }

    //addFilterItem(event.target.value);
  };

  const handleFabricanteChange = (event) => {
    setFabricanteSelection(event.target.value);
    if((provinciaStatus == false) && (regionStatus == false)) {
      addFilterItem([...distribuidorSelection, ...event.target.value, ...tecnologiaColabSelection, 'emptyProvincia', 'emptyRegion']);
    }else if((provinciaStatus == true) && (regionStatus == false)){
      if(provinciaSelection.length == 0) {
        addFilterItem([...distribuidorSelection, ...event.target.value, ...tecnologiaColabSelection, 'emptyProvincia', 'emptyRegion']);
      }else{
        addFilterItem([...distribuidorSelection, ...event.target.value, ...tecnologiaColabSelection, ...provinciaSelection, 'emptyRegion']);
      }
    }else if((provinciaStatus == false) && (regionStatus == true)){
      if(regionSelection.length == 0) {
        addFilterItem([...distribuidorSelection, ...event.target.value, ...tecnologiaColabSelection, 'emptyProvincia', 'emptyRegion']);
      }else{
        addFilterItem([...distribuidorSelection, ...event.target.value, ...tecnologiaColabSelection, 'emptyProvincia', ...regionSelection]);
      }
    }else if((provinciaStatus == true) && (regionStatus == true)){
      if((regionSelection.length == 0) && (provinciaSelection.length == 0)) {
        addFilterItem([...distribuidorSelection, ...event.target.value, ...tecnologiaColabSelection, 'emptyProvincia', 'emptyRegion']);
      }else if((regionSelection.length > 0) && (provinciaSelection.length == 0)){
        addFilterItem([...distribuidorSelection, ...event.target.value, ...tecnologiaColabSelection, 'emptyProvincia', ...regionSelection]);
      }else if((regionSelection.length == 0) && (provinciaSelection.length > 0)){
        addFilterItem([...distribuidorSelection, ...event.target.value, ...tecnologiaColabSelection, ...provinciaSelection, 'emptyRegion']);
      }else if((regionSelection.length > 0) && (provinciaSelection.length > 0)) {
        addFilterItem([...distribuidorSelection, ...event.target.value, ...tecnologiaColabSelection, ...provinciaSelection, ...regionSelection]);
      }
    }

    //addFilterItem(event.target.value);
  };

  const handleTecnologiaColabChange = (event) => {
    setTecnologiaColabSelection(event.target.value);
    if((provinciaStatus == false) && (regionStatus == false)) {
      addFilterItem([...distribuidorSelection, ...fabricanteSelection,...event.target.value, 'emptyProvincia', 'emptyRegion']);
    }else if((provinciaStatus == true) && (regionStatus == false)){
      if(provinciaSelection.length == 0) {
        addFilterItem([...distribuidorSelection, ...fabricanteSelection,...event.target.value, 'emptyProvincia', 'emptyRegion']);
      }else{
        addFilterItem([...distribuidorSelection, ...fabricanteSelection,...event.target.value, ...provinciaSelection, 'emptyRegion']);
      }
    }else if((provinciaStatus == false) && (regionStatus == true)){
      if(regionSelection.length == 0) {
        addFilterItem([...distribuidorSelection, ...fabricanteSelection,...event.target.value, 'emptyProvincia', 'emptyRegion']);
      }else{
        addFilterItem([...distribuidorSelection, ...fabricanteSelection,...event.target.value, 'emptyProvincia', ...regionSelection]);
      }
    }else if((provinciaStatus == true) && (regionStatus == true)){
      if((regionSelection.length == 0) && (provinciaSelection.length == 0)) {
        addFilterItem([...distribuidorSelection, ...fabricanteSelection,...event.target.value, 'emptyProvincia', 'emptyRegion']);
      }else if((regionSelection.length > 0) && (provinciaSelection.length == 0)){
        addFilterItem([...distribuidorSelection, ...fabricanteSelection,...event.target.value, 'emptyProvincia', ...regionSelection]);
      }else if((regionSelection.length == 0) && (provinciaSelection.length > 0)){
        addFilterItem([...distribuidorSelection, ...fabricanteSelection,...event.target.value, ...provinciaSelection, 'emptyRegion']);
      }else if((regionSelection.length > 0) && (provinciaSelection.length > 0)) {
        addFilterItem([...distribuidorSelection, ...fabricanteSelection,...event.target.value, ...provinciaSelection, ...regionSelection]);
      }
    }

    //addFilterItem(event.target.value);
  };

  const { addFilterItem } = useContext(FilterContext);

  return (
    <>
      <div id="socio-colab">
        <h2 className="sector-actividad">SOCIO COLABORADORES</h2>
        <div>
          <FormControl sx={{ m: 1, width: 300 }}>
            <InputLabel id="demo-multiple-checkbox-label">
              DISTRIBUIDOR DE:{" "}
            </InputLabel>
            <Select
              labelId="demo-multiple-checkbox-label"
              id="demo-multiple-checkbox"
              multiple
              value={distribuidorSelection}
              onChange={handleDistribuidorChange}
              input={
                <OutlinedInput
                  label="  const handleRegionChange = (event) => {
              setRegionSelection(event.target.value);
            };
          "
                />
              }
              renderValue={(selected) => selected.join(", ")}
              MenuProps={MenuProps}
            >
              {distribuidor.map((name) => (
                <MenuItem key={name} value={name}>
                  <Checkbox
                    checked={distribuidorSelection.indexOf(name) > -1}
                  />
                  <ListItemText primary={name} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <div>
          <FormControl sx={{ m: 1, width: 300 }}>
            <InputLabel id="demo-multiple-checkbox-label">
              FABRICANTE DE:{" "}
            </InputLabel>
            <Select
              labelId="demo-multiple-checkbox-label"
              id="demo-multiple-checkbox"
              multiple
              value={fabricanteSelection}
              onChange={handleFabricanteChange}
              input={<OutlinedInput label="FABRICANTE DE:" />}
              renderValue={(selected) => selected.join(", ")}
              MenuProps={MenuProps}
            >
              {fabricante.map((name) => (
                <MenuItem key={name} value={name}>
                  <Checkbox checked={fabricanteSelection.indexOf(name) > -1} />
                  <ListItemText primary={name} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <div>
          <FormControl sx={{ m: 1, width: 300 }}>
            <InputLabel id="demo-multiple-checkbox-label">
              TECNOLOGÍA DE IMPRESIÓN
            </InputLabel>
            <Select
              labelId="demo-multiple-checkbox-label"
              id="demo-multiple-checkbox"
              multiple
              value={tecnologiaColabSelection}
              onChange={handleTecnologiaColabChange}
              input={<OutlinedInput label="TECNOLOGÍA DE IMPRESIÓN" />}
              renderValue={(selected) => selected.join(", ")}
              MenuProps={MenuProps}
            >
              {tecnologíaDeImpresiónColab.map((name) => (
                <MenuItem key={name} value={name}>
                  <Checkbox
                    checked={tecnologiaColabSelection.indexOf(name) > -1}
                  />
                  <ListItemText primary={name} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </div>

      <div id="localidad">
        <Localidad filter1={distribuidorSelection} filter2={fabricanteSelection} filter3={tecnologiaColabSelection} provinciaSelection={provinciaSelection} setProvinciaSelection={setProvinciaSelection} regionSelection={regionSelection} setRegionSelection={setRegionSelection} provinciaStatus={provinciaStatus} setProvinciaStatus={setProvinciaStatus} regionStatus={regionStatus} setRegionStatus={setRegionStatus} />
      </div>
    </>
  );



}

