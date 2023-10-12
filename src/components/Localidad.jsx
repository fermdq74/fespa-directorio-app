import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import * as React from "react";
import FilterContext from '../context/FilterContext';
import { useContext } from "react";
import './Localidad.css';


const region = [
  "Andalucía",
  "Aragón",
  "Asturias",
  "Baleares",
  "Biskaia",
  "Canarias",
  "Cantabria",
  "Castilla-La Mancha",
  "Castilla y León",
  "Cataluña",
  "Comunidad Valenciana",
  "Extremadura",
  "Galicia",
  "Gipuzkoa",
  "Madrid",
  "Murcia",
  "Navarra",
  "País Vasco",
  "Salamanca",
  "La Rioja",
  "Lugo"
].sort();

const provincia = [
  "Madrid",
  "Almería",
  "Cádiz",
  "Córdoba",
  "Granada",
  "Huelva",
  "Jaén",
  "Málaga",
  "Sevilla",
  "Huesca",
  "Teruel",
  "Zaragoza",
  "Oviedo",
  "Palma de Mallorca",
  "Santa Cruz de Tenerife",
  "Las Palmas de Gran Canaria",
  "Santander",
  "Albacete",
  "Ciudad Real",
  "Cuenca",
  "Guadalajara",
  "Toledo",
  "Ávila",
  "Burgos",
  "León",
  "Salamanca",
  "Segovia",
  "Soria",
  "Valladolid",
  "Zamora",
  "Barcelona",
  "Gerona",
  "Lérida",
  "Tarragona",
  "Alicante",
  "Castellón de la Plana",
  "Valencia",
  "La Coruña",
  "Lugo Orense",
  "Pontevedra",
  "Pamplona",
  "Bilbao",
  "San Sebastián",
  "Vitoria",
  "Logroño",
].sort();

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

export default function Localidad({filter1, filter2, filter3, provinciaSelection, setProvinciaSelection, regionSelection, setRegionSelection}) {
  /*
  const [provinciaSelection, setProvinciaSelection] = React.useState([]);
  const [regionSelection, setRegionSelection] = React.useState([]);
  */

  const handleProvinciaChange = (event) => {
    setProvinciaSelection(event.target.value);
    addFilterItem([...filter1, ...filter2, ...filter3, ...event.target.value, ...regionSelection]);
    //addFilterItem(event.target.value);

  };

   const handleRegionChange = (event) => {
     setRegionSelection(event.target.value);
     addFilterItem([...filter1, ...filter2, ...filter3, ...provinciaSelection, ...event.target.value]);
     //addFilterItem(event.target.value);
   };

  const { addFilterItem } = useContext(FilterContext);

  return (
    <div>
      <div id="localidad">
        <h2 className="localidad">UBICACIÓN</h2>

        <div>
          <FormControl sx={{ m: 1, width: 300 }}>
            <InputLabel id="demo-multiple-checkbox-label">COMUNIDAD AUTÓNOMA</InputLabel>
            <Select
              labelId="demo-multiple-checkbox-label"
              id="demo-multiple-checkbox"
              multiple
              value={regionSelection}
              onChange={handleRegionChange}
              input={<OutlinedInput label="REGIÓN" />}
              renderValue={(selected) => selected.join(", ")}
              MenuProps={MenuProps}
            >
              {region.map((name) => (
                <MenuItem key={name} value={name}>
                  <Checkbox checked={regionSelection.indexOf(name) > -1} />
                  <ListItemText primary={name} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <div>
          <FormControl sx={{ m: 1, width: 300 }}>
            <InputLabel id="demo-multiple-checkbox-label">PROVINCIA</InputLabel>
            <Select
              labelId="demo-multiple-checkbox-label"
              id="demo-multiple-checkbox"
              multiple
              value={provinciaSelection}
              onChange={handleProvinciaChange}
              input={<OutlinedInput label="PROVINCIA" />}
              renderValue={(selected) => selected.join(", ")}
              MenuProps={MenuProps}
            >
              {provincia.map((name) => (
                <MenuItem key={name} value={name}>
                  <Checkbox checked={provinciaSelection.indexOf(name) > -1} />
                  <ListItemText primary={name} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </div>
    </div>
  );


  var expanded = false;

  function showCheckboxes() {
    var checkboxes = document.getElementById("checkboxes");
    if (!expanded) {
      checkboxes.style.display = "block";
      expanded = true;
    } else {
      checkboxes.style.display = "none";
      expanded = false;
    }
  }

  document.addEventListener("click", function (event) {
    var checkboxes = document.getElementById("checkboxes");
    var selectBox = document.querySelector(".selectBox");
    
    if (!selectBox.contains(event.target) && !checkboxes.contains(event.target)) {
      checkboxes.style.display = "none";
      expanded = false;
    }
  });

  

  function showCheckboxess() {
    var checkboxess = document.getElementById("checkboxess");
    if (!expanded) {
      checkboxess.style.display = "block";
      expanded = true;
    } else {
      checkboxess.style.display = "none";
      expanded = false;
    }
  }


function showSelectedItems() {
  const checkboxes = document.querySelectorAll('#checkboxes input[type="checkbox"]');
  const filters = [];

  checkboxes.forEach(checkbox => {
    if (checkbox.checked) {
      const filterValue = checkbox.getAttribute('id');
      filters.push(filterValue);
    }
  });

  const filter = filters.length > 0 ? filters.join(', ') : '*';
  iso.arrange({ filter });
}

const checkboxes = document.querySelectorAll('#checkboxes input[type="checkbox"]');
checkboxes.forEach(checkbox => {
  checkbox.addEventListener('change', showSelectedItems);
});


  
}
