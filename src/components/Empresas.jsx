import { useEffect, useState, useContext } from "react";
import { Container } from "react-bootstrap";
import Empresa from "./Empresa";
import Paginado from "./Paginado";
import Buscador from "./Buscador";
import "./Empresas.css";
//import { data } from '../data/api';
import { Route, Routes } from "react-router-dom";
import Asociados from "./Asociados";
import SocioColaboradores from "./SocioColaboradores";
import Cargando from "./Cargando";
import { useLocation } from "react-router-dom";
import FilterContext from '../context/FilterContext';

//Tests json
import AsocJson from "./asocjson.json";
import ColabJson from "./colabjson.json";

export default function Empresas() {
  const [empresas, setEmpresas] = useState([]);
  const [pagina, setPagina] = useState(1);
  const [filtro, setFiltro] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const empresasPorPagina = 20;

  const { filterItem } = useContext(FilterContext);
  const textoFiltradoItem = filterItem.join(', ');

  //constant with all companies obtained from the API
  let [allCompanies, setAllCompanies] = useState([]);

 useEffect(() => {

  if (textoFiltradoItem.trim() === '') {
    if (location.pathname === "/socio-colaboradores") {

      /*
      fetch(
        `https://us-central1-fespa-directorio.cloudfunctions.net/getColaboradores`
      )
        .then((response) => response.json())
        .then((result) => {
          if (Array.isArray(result)) {
            setEmpresas(result);
          }
        })
        .finally(() => setIsLoading(false));
        */

        let Colab = ColabJson;
        setAllCompanies(Colab);
        setEmpresas(Colab);
        setIsLoading(false);
    } else if (
      location.pathname === "/asociados" ||
      location.pathname === "/"
    ) {


      /*
      fetch(
        `https://us-central1-fespa-directorio.cloudfunctions.net/getAsociados`
      )
        .then((response) => response.json())
        .then((result) => {
          if (result && result.results && Array.isArray(result.results)) {
            setEmpresas(result.results);
          }
        })
        .finally(() => setIsLoading(false));
        */

        let Asoc = AsocJson.results;
        setAllCompanies(Asoc);
        setEmpresas(Asoc);
        setIsLoading(false);
    }
  }
}, [textoFiltradoItem, location.pathname, empresas]);

  const filtrarEmpresas = (listaEmpresas) => {
    return listaEmpresas.filter(
      (empresa) =>
      (empresa.Name && empresa.Name.toLowerCase().includes(filtro.toLowerCase())) ||
      (empresa.Region && empresa.Region.toLowerCase().includes(filtro.toLowerCase())) ||
      (empresa.Provincia && empresa.Provincia.toLowerCase().includes(filtro.toLowerCase())) ||
      (empresa.Produccion && empresa.Produccion.some((produccion) => produccion.toLowerCase().includes(filtro.toLowerCase()))) ||
      (empresa.Tecnologia && empresa.Tecnologia.some((tecnologia) => tecnologia.toLowerCase().includes(filtro.toLowerCase()))) ||
      (empresa.Especialidad && empresa.Especialidad.some((especialidad) => especialidad.toLowerCase().includes(filtro.toLowerCase()))) ||
      (empresa.Distribuidor && empresa.Distribuidor.some((distribuidor) => distribuidor.toLowerCase().includes(filtro.toLowerCase()))) ||
      (empresa.Fabricante && empresa.Fabricante.some((fabricante) => fabricante.toLowerCase().includes(filtro.toLowerCase())))
    )
  };
  
  useEffect(() => {

    const terminosDeBusqueda = textoFiltradoItem.toLowerCase().split(',');
    
    //const empresasFiltradasPorTexto = empresas;
    const empresasFiltradasPorTexto = [];
    let filterMatch;
    
    allCompanies.forEach((empresa) => {
      filterMatch = false;
      
      terminosDeBusqueda.forEach((termino) => {

        if(filterMatch == false) {
          if(empresa.Produccion) {
            empresa.Produccion.forEach((produccion) => {
              if(produccion.toLowerCase() == termino.trim()) {
                filterMatch = true;
              }
            });
          }
        }
        if(filterMatch == false) {
          if(empresa.Tecnologia) {
            empresa.Tecnologia.forEach((tecnologia) => {
              if(tecnologia.toLowerCase() == termino.trim()) {
                filterMatch = true;
              }
            });
          }
        }
        if(filterMatch == false) {
          if(empresa.Especialidad) {
            empresa.Especialidad.forEach((especialidad) => {
              if(especialidad.toLowerCase() == termino.trim()) {
                filterMatch = true;
              }
            });
          }
        }
        if(filterMatch == false) {
          if(empresa.Region) {
            if(empresa.Region.toLowerCase() == termino.trim()) {
              filterMatch = true;
            }
          }
        }
        if(filterMatch == false) {
          if(empresa.Provincia) {
            if(empresa.Provincia.toLowerCase() == termino.trim()) {
              filterMatch = true;
            }
          }
        }
        if(filterMatch == false) {
          if(empresa.Fabricante) {
            empresa.Fabricante.forEach((fabricante) => {
              if(fabricante.toLowerCase() == termino.trim()) {
                filterMatch = true;
              }
            });
          }
        }
        if(filterMatch == false) {
          if(empresa.Distribuidor) {
            empresa.Distribuidor.forEach((distribuidor) => {
              if(distribuidor.toLowerCase() == termino.trim()) {
                filterMatch = true;
              }
            });
          }
        }
        

      });
      
      if(filterMatch == true) {
        empresasFiltradasPorTexto.push(empresa);
      }
    });

    /*const empresasFiltradasPorTexto = empresas.filter((empresa) =>
      (empresa.Produccion &&
        terminosDeBusqueda.some((termino) => 
          empresa.Produccion.some((produccion) =>
            produccion.toLowerCase().includes(termino.trim())
          )
        )
      ) ||
      (empresa.Tecnologia &&
        terminosDeBusqueda.some((termino) =>
          empresa.Tecnologia.some((tecnologia) =>
            tecnologia.toLowerCase().includes(termino.trim())
          )
        )) ||
      (empresa.Especialidad &&
        terminosDeBusqueda.some((termino) =>
          empresa.Especialidad.some((especialidad) =>
            especialidad.toLowerCase().includes(termino.trim())
          )
        )) ||
      (empresa.Region &&
        terminosDeBusqueda.some((termino) =>
          empresa.Region.toLowerCase().includes(termino.trim())
        )) ||
      (empresa.Provincia &&
        terminosDeBusqueda.some((termino) =>
          empresa.Provincia.toLowerCase().includes(termino.trim())
        )) ||
        (empresa.Fabricante && terminosDeBusqueda.some((termino) =>
        empresa.Fabricante.some((fabricante) =>
          fabricante.toLowerCase().includes(termino.trim())
        )
      )) ||
      (empresa.Distribuidor && terminosDeBusqueda.some((termino) =>
        empresa.Distribuidor.some((distribuidor) =>
          distribuidor.toLowerCase().includes(termino.trim())
        )
      ))
    );*/
  
    const empresasFiltradas = filtrarEmpresas(empresasFiltradasPorTexto);
    setEmpresas(empresasFiltradas);
    
    setPagina(1);
  }, [textoFiltradoItem]);
  

  const handlePaginaChange = (pageNumber) => {
    setPagina(pageNumber);
  };

  useEffect(() => {
    setPagina(1);
  }, [filtro]);

  const empresasFiltradas = filtrarEmpresas(empresas);
  const totalEmpresas = empresasFiltradas.length;
  const totalPaginas = Math.ceil(totalEmpresas / empresasPorPagina);
  const indiceInicial = (pagina - 1) * empresasPorPagina;
  const indiceFinal = Math.min(
    indiceInicial + empresasPorPagina,
    totalEmpresas
  );
  const empresasPaginadas = empresasFiltradas.slice(indiceInicial, indiceFinal);


  if (isLoading) {
    return <Cargando />;
  }

  return (
    <Container className="contenedor">
      <Buscador filtro={filtro} setFiltro={setFiltro} />

      <div className="main">
        <div className="filtrado">
          <Routes>
            <Route path="/" element={<Asociados />} />
            <Route path="/asociados" element={<Asociados />} />
            <Route
              path="/socio-colaboradores"
              element={<SocioColaboradores />}
            />
          </Routes>
        </div>
        <div className="cont-empresas">
          {empresasPaginadas.length > 0 ? (
            <div className="row">
              {empresasPaginadas.map((empresa) => (
                <div className="col-md-6" key={empresa.Name}>
                  <Empresa empresa={empresa} />
                </div>
              ))}
            </div>
          ) : (
            <p className="no-encontrado">No se han encontrado resultados.</p>
          )}
          {totalEmpresas > 0 && (
            <Paginado
              pagina={pagina}
              totalPaginas={totalPaginas}
              onPageChange={handlePaginaChange}
            />
          )}
        </div>
      </div>
    </Container>
  );
}
