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
import { getCompanies } from '../data/companies';

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

  const [companyFilterOne, setCompanyFilterOne] = useState([]);
  const [companyFilterTwo, setCompanyFilterTwo] = useState([]);
  const [companyFilterThree, setCompanyFilterThree] = useState([]);

 useEffect(() => {

  if (textoFiltradoItem.trim() === '') {
    if (location.pathname === "/socio-colaboradores") {

      const fetchData = async () => {

        const data = await getCompanies("getColaboradores")
          .then(res => {
            setAllCompanies(res);
            setEmpresas(res);
          })
          .catch( (err) => {
            console.log(err);
            setProducts(null);
          })
          .finally(() => {
            setIsLoading(false);
          })

      }

      fetchData()
        .catch(console.error);
        
    

        /*let Colab = ColabJson;
        setAllCompanies(Colab);
        setEmpresas(Colab);
        setIsLoading(false);*/
        
    } else if (
      location.pathname === "/asociados" ||
      location.pathname === "/"
    ) {
      
      const fetchData = async () => {

        const data = await getCompanies()
          .then(res => {
            setAllCompanies(res);
            setEmpresas(res);
          })
          .catch( (err) => {
            console.log(err);
            setProducts(null);
          })
          .finally(() => {
            setIsLoading(false);
          })

      }

      fetchData()
        .catch(console.error);
        

        /*let Asoc = AsocJson;
        setAllCompanies(Asoc.results);
        setEmpresas(Asoc.results);
        setIsLoading(false);*/
        
    }
  }
}, [textoFiltradoItem, location.pathname]);

  /*const filtrarEmpresas = (listaEmpresas) => {
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
  };*/
  
  useEffect(() => {

    
    const delay = ms => new Promise(
      resolve => setTimeout(resolve, ms)
    );
    
    async function makeRequest() {

      console.log('before');

      await delay(1000);

      const terminosDeBusqueda = textoFiltradoItem ? textoFiltradoItem.toLowerCase().split(',') : [];
      
      let empresasFiltradasPorTexto = [];
      let filterMatch;
      let locationFilter;

      if((terminosDeBusqueda.length == 0) || ((terminosDeBusqueda.length == 2) && ((terminosDeBusqueda[0].trim() == 'emptyprovincia') && (terminosDeBusqueda[1].trim() == 'emptyregion'))) ) {
        empresasFiltradasPorTexto = allCompanies;
      }else{
        allCompanies.forEach((empresa) => {
          
          filterMatch = false;
          locationFilter = false;

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
            if(locationFilter == false) {
              if(empresa.Region) {
                if(empresa.Region.toLowerCase() == termino.trim()) {
                  locationFilter = true;
                }
              }
            }
            if(locationFilter == false) {
              if(empresa.Provincia) {
                if(empresa.Provincia.toLowerCase() == termino.trim()) {
                  locationFilter = true;
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

          if(textoFiltradoItem.includes('emptyProvincia') && textoFiltradoItem.includes('emptyRegion')) {
            if(filterMatch == true) {
              empresasFiltradasPorTexto.push(empresa);
            }  
          }else{
            if((companyFilterOne.length == 0) && (companyFilterTwo.length == 0) && (companyFilterThree.length == 0)) {
              if(locationFilter == true) {
                empresasFiltradasPorTexto.push(empresa);
              }
            }else{
              if((locationFilter == true) && (filterMatch == true)) {
                empresasFiltradasPorTexto.push(empresa);
              }
            }
          }
          
          
        });
      }
     
      //const empresasFiltradas = filtrarEmpresas(empresasFiltradasPorTexto);

      setEmpresas(empresasFiltradasPorTexto);
    
      setPagina(1);

      console.log('after');
    }

    makeRequest();

  }, [textoFiltradoItem, allCompanies]);
  

  const handlePaginaChange = (pageNumber) => {
    setPagina(pageNumber);
  };

  useEffect(() => {
    setPagina(1);
  }, [filtro]);
  
  //const empresasFiltradas = filtrarEmpresas(empresas);
  const empresasFiltradas = empresas;
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
            <Route path="/" element={<Asociados produccionSelection={companyFilterOne} setProduccionSelection={setCompanyFilterOne} tecnologiaSelection={companyFilterTwo} setTecnologiaSelection={setCompanyFilterTwo} especialidadSelection={companyFilterThree} setEspecialidadSelection={setCompanyFilterThree} />} />
            <Route path="/asociados" element={<Asociados produccionSelection={companyFilterOne} setProduccionSelection={setCompanyFilterOne} tecnologiaSelection={companyFilterTwo} setTecnologiaSelection={setCompanyFilterTwo} especialidadSelection={companyFilterThree} setEspecialidadSelection={setCompanyFilterThree} />} />
            <Route
              path="/socio-colaboradores"
              element={<SocioColaboradores distribuidorSelection={companyFilterOne} setDistribuidorSelection={setCompanyFilterOne} fabricanteSelection={companyFilterTwo} setFabricanteSelection={setCompanyFilterTwo} tecnologiaColabSelection={companyFilterThree} setTecnologiaColabSelection={setCompanyFilterThree} />}
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
