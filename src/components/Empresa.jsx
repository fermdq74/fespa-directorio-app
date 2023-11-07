import Card from "react-bootstrap/Card";
import "./Empresa.css";
import { useState } from 'react';
import { Modal } from 'react-bootstrap'; 

export default function Empresa({ empresa }) {
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <>
      <Card id="empresa" style={{ maxWidth: '540px' }} onClick={handleOpenModal}>
        
        {empresa.Logo && <Card.Img src={empresa.Logo} alt="..." />}

        <Card.Body className="card-body">
          {empresa.Name && <Card.Title className="card-title">{empresa.Name}</Card.Title>}
          <Card.Text className="card-text">
            {empresa.Region && (
              <><img className="ubicacion" src="/icon/ubicacion.png" alt="ubicacion" />{empresa.Region}.{empresa.Provincia && (<>{empresa.Provincia}</>)}</>
            )}
          </Card.Text>
          <Card.Text className="card-text">
            {empresa.Telefono && (
              <><img className="contacto" src="/icon/contacto.png" alt="contacto" />{empresa.Telefono}</>
            )}
          </Card.Text>
        </Card.Body>
      </Card>

      <Modal size="lg" aria-labelledby="contained-modal-title-vcenter" centered show={showModal} onHide={handleCloseModal}>
        <Modal.Body>
          <Modal.Header closeButton></Modal.Header>
          <div id="modal">
            {empresa.Logo && (
              <div id="modal-img" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Card.Img src={empresa.Logo} alt="..." />
              </div>
            )}
            <div id="modal-info">
              {empresa.Name && <h4>{empresa.Name}</h4>}
              {empresa.Region && (
                <div style={{ display: 'flex' }} id="ubicacion">
                  <img className="ubicacion" src="/icon/ubicacion.png" alt="ubicacion" />
                  <p>{empresa.Direccion}, {empresa.Region}, {empresa.Provincia}</p>
                </div>
              )}
              {empresa.Contacto && (
                <p><span>Contacto:</span> {empresa.Contacto}</p>
              )}
              {empresa.Telefono && (
                <div style={{ display: 'flex' }} id="contacto">
                  <img className="contacto" src="/icon/contacto.png" alt="contacto" />
                  <p>{empresa.Telefono}</p>
                </div>
              )}
              {empresa.Email && (
                <div style={{ display: 'flex' }} id="correo">
                  <img className="correo" id="correo" src="/icon/correo.png" alt="contacto" />
                  <p><a href={'mailto:' + empresa.Email}>{empresa.Email}</a></p>
                </div>
              )}
              {empresa.Produccion && (
                <p><span>Producción:</span> {empresa.Produccion.join(', ')}</p>
              )}
              {empresa.Tecnologia && (
                <p><span>Tecnología:</span> {empresa.Tecnologia.join(', ')}</p>
              )}
              {empresa.Fabricante && (
                <p><span>Fabricante:</span> {empresa.Fabricante.join(', ')}.</p>
              )}
              {empresa.Especialidad && (
                <p><span>Especialidad:</span> {empresa.Especialidad.join(', ')}</p>
              )}
              {empresa.Website && (
                <p><span>Website:</span><a href={empresa.Website} target="_blank"> {empresa.Website}</a></p>
              )}
              {empresa.Pais && (
                <p><span>País:</span> {empresa.Pais.join(', ')}</p>
              )}
            </div>
          </div>
          {empresa.Descripcion && (
            <p className="descripcion"><span>Descripción:</span> {empresa.Descripcion}</p>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
}
