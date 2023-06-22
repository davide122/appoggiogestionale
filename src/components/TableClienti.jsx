import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Detail from './Detail';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import Modal from 'react-bootstrap/Modal';
import { Row } from 'react-bootstrap';

const Tableclienti = () => {
  const [responseText, setResponseText] = useState([]);
  const [show, setShow] = useState(false);


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [formState, setFormState] = useState({
    cognomeContatto: '',
    dataInserimento: '',
    dataUltimoContatto: '',
    email: '',
    emailContatto: '',
    fatturatoAnnuale: '',
    nomeContatto: '',
    partitaIva: '',
    pec: '',
    ragioneSociale: '',
    telefono: '',
    telefonoContatto: '',
    tipoCliente: '',
    indirizzoSedeLegale: {
      via: '',
      civico: '',
      localita: '',
      cap: '',
      comune: {
        id: '',
        nome: '',
        provincia: {
          id: '',
          sigla: '',
          nome: '',
        },
      },
    },
    indirizzoSedeOperativa: {
      via: '',
      civico: '',
      localita: '',
      cap: '',
      comune: {
        id: '',
        nome: '',
        provincia: {
          id: '',
          sigla: '',
          nome: '',
        },
      },
    },
    listafatture: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
if(formState.id){
   Modify();
}else{
     ADD();

}

  }
const ADD  = async()=>{
    try {
        const response = await fetch(`http://localhost:8080/api/cliente`, {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formState),
        });
  
        if (response.ok) {
         
          const data = await response.json();
          fetchData()
          console.log(data)
        } else {
          console.log("Si è verificato un errore nella richiesta");
          alert("Qualcosa è andato storto");
        }
      } catch (error) {
        console.log("Si è verificato un errore generico", error);
        alert(error);
      }
    };


  const Modify = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/cliente/${formState.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formState),
      });

      if (response.ok) {
       
        const data = await response.json();
        fetchData()
        console.log(data)
      } else {
        console.log("Si è verificato un errore nella richiesta");
        alert("Qualcosa è andato storto");
      }
    } catch (error) {
      console.log("Si è verificato un errore generico", error);
      alert(error);
    }
  };









  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/cliente/all", {
        method: "GET",
      });

      if (response.ok) {
        const data = await response.json();
        setResponseText(data);
      } else {
        console.log("Si è verificato un errore nella richiesta");
        alert("Qualcosa è andato storto");
      }
    } catch (error) {
      console.log("Si è verificato un errore generico", error);
      alert(error);
    }
  };

  useEffect(() => {
    fetchData();

  }, []);

  const removeItem = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/api/cliente/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        // Rimuovi l'elemento dalla lista
        const updatedArr = responseText.filter((item) => item.id !== id);
        setResponseText(updatedArr);
        console.log("Elemento rimosso con successo");
      } else {
        console.log("Si è verificato un errore nella richiesta");
        alert("Qualcosa è andato storto");
      }
    } catch (error) {
      console.log("Si è verificato un errore generico", error);
      alert(error);
    }
  };

  const showDetails = (item) => {
    if(item==null) {
        setFormState({
            cognomeContatto: '',
            dataInserimento: '',
            dataUltimoContatto: '',
            email: '',
            emailContatto: '',
            fatturatoAnnuale: '',
            nomeContatto: '',
            partitaIva: '',
            pec: '',
            ragioneSociale: '',
            telefono: '',
            telefonoContatto: '',
            tipoCliente: '',
            indirizzoSedeLegale: {
              via: '',
              civico: '',
              localita: '',
              cap: '',
              comune: {
                id: '',
                nome: '',
                provincia: {
                  id: '',
                  sigla: '',
                  nome: '',
                },
              },
            },
            indirizzoSedeOperativa: {
              via: '',
              civico: '',
              localita: '',
              cap: '',
              comune: {
                id: '',
                nome: '',
                provincia: {
                  id: '',
                  sigla: '',
                  nome: '',
                },
              },
            },
            listafatture: [],
          });
handleShow();
    }else{
         setFormState(item);
    console.log(item);
    handleShow();
    }
   
}
  return (
    <>
      <Table className='table'>
        <thead className=''>
          <tr>
            <th>ID</th>
            <th>Cognome Contatto</th>
            <th>Partita IVA</th>
            <th>Tipo Cliente</th>
            <th>Fatturato Annuale</th>
            <th>Data Ultimo Contatto</th>
            <th>Azioni <button className='btn' onClick={()=>{showDetails(null)}}>➕</button></th>
           
          </tr>
        </thead>
        <tbody>
           
          {responseText? (
      
          responseText?.map((row) => (
            
            <tr key={row.id}>
              <td>{row.id}</td>
              <td>{row.cognomeContatto}</td>
              <td>{row.partitaIva}</td>
              <td>{row.tipoCliente}</td>
              <td>{row.fatturatoAnnuale}$</td>
              <td>{row.dataUltimoContatto}</td>
              <td>
                <button className='btn' onClick={() => removeItem(row.id)}>
                  ❌
                </button>{" "}
            <button className='btn' onClick={() =>row.id? showDetails(row) : alert("non c'è un id")}>
                  🕵️
                </button>
              </td>
            </tr>
          )
          )):fetchData()};
          
        </tbody>
      </Table>

      
     <>
      
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>{formState && (
        
        <div className="details-section">
         <h1>Dettagli cliente</h1>
       
         <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="cognomeContatto">Cognome Contatto</label>
        <input
          type="text"
          className="form-control"
          id="cognomeContatto"
          name="cognomeContatto"
          value={formState.cognomeContatto}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="dataInserimento">Data Inserimento</label>
        <input
          type="text"
          className="form-control"
          id="dataInserimento"
          name="dataInserimento"
          value={formState.dataInserimento}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="dataUltimoContatto">Data Ultimo Contatto</label>
        <input
          type="text"
          className="form-control"
          id="dataUltimoContatto"
          name="dataUltimoContatto"
          value={formState.dataUltimoContatto}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="text"
          className="form-control"
          id="email"
          name="email"
          value={formState.email}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="emailContatto">Email Contatto</label>
        <input
          type="text"
          className="form-control"
          id="emailContatto"
          name="emailContatto"
          value={formState.emailContatto}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="fatturatoAnnuale">Fatturato Annuale</label>
        <input
          type="number"
          className="form-control"
          id="fatturatoAnnuale"
          name="fatturatoAnnuale"
          value={formState.fatturatoAnnuale}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="nomeContatto">Nome Contatto</label>
        <input
          type="text"
          className="form-control"
          id="nomeContatto"
          name="nomeContatto"
          value={formState.nomeContatto}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="partitaIva">Partita IVA</label>
        <input
          type="text"
          className="form-control"
          id="partitaIva"
          name="partitaIva"
          value={formState.partitaIva}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="pec">PEC</label>
        <input
          type="text"
          className="form-control"
          id="pec"
          name="pec"
          value={formState.pec}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="ragioneSociale">Ragione Sociale</label>
        <input
          type="text"
          className="form-control"
          id="ragioneSociale"
          name="ragioneSociale"
          value={formState.ragioneSociale}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="telefono">Telefono</label>
        <input
          type="text"
          className="form-control"
          id="telefono"
          name="telefono"
          value={formState.telefono}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="telefonoContatto">Telefono Contatto</label>
        <input
          type="text"
          className="form-control"
          id="telefonoContatto"
          name="telefonoContatto"
          value={formState.telefonoContatto}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="tipoCliente">Tipo Cliente</label>
        <input
          type="text"
          className="form-control"
          id="tipoCliente"
          name="tipoCliente"
          value={formState.tipoCliente}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="indirizzoSedeLegale.via">Via Sede Legale</label>
        <input
          type="text"
          className="form-control"
          id="indirizzoSedeLegale.via"
          name="indirizzoSedeLegale.via"
          value={formState.indirizzoSedeLegale.via}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="indirizzoSedeLegale.civico">Civico Sede Legale</label>
        <input
          type="text"
          className="form-control"
          id="indirizzoSedeLegale.civico"
          name="indirizzoSedeLegale.civico"
          value={formState.indirizzoSedeLegale.civico}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="indirizzoSedeLegale.localita">Località Sede Legale</label>
        <input
          type="text"
          className="form-control"
          id="indirizzoSedeLegale.localita"
          name="indirizzoSedeLegale.localita"
          value={formState.indirizzoSedeLegale.localita}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="indirizzoSedeLegale.cap">CAP Sede Legale</label>
        <input
          type="text"
          className="form-control"
          id="indirizzoSedeLegale.cap"
          name="indirizzoSedeLegale.cap"
          value={formState.indirizzoSedeLegale.cap}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="indirizzoSedeLegale.comune.id" >ID Comune Sede Legale</label>
        <input
          type="text"
          disabled
        readOnly
          className="form-control"
          id="indirizzoSedeLegale.comune.id"
          name="indirizzoSedeLegale.comune.id"
          value={formState.indirizzoSedeLegale.comune.id}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="indirizzoSedeLegale.comune.nome">Nome Comune Sede Legale</label>
        <input
          type="text"
          className="form-control"
          id="indirizzoSedeLegale.comune.nome"
          name="indirizzoSedeLegale.comune.nome"
          value={formState.indirizzoSedeLegale.comune.nome}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="indirizzoSedeLegale.comune.provincia.id">ID Provincia Comune Sede Legale</label>
        <input
          type="text"
          className="form-control"
          id="indirizzoSedeLegale.comune.provincia.id"
          disabled
        readOnly
          name="indirizzoSedeLegale.comune.provincia.id"
          value={formState.indirizzoSedeLegale.comune.provincia ? formState.indirizzoSedeLegale.comune.provincia.id : null }
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="indirizzoSedeLegale.comune.provincia.sigla">Sigla Provincia Comune Sede Legale</label>
        <input
          type="text"
          className="form-control"
          id="indirizzoSedeLegale.comune.provincia.sigla"
          name="indirizzoSedeLegale.comune.provincia.sigla"
          value={formState.indirizzoSedeLegale.comune.provincia ? formState.indirizzoSedeLegale.comune.provincia.sigla : null }
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="indirizzoSedeLegale.comune.provincia.nome">Nome Provincia Comune Sede Legale</label>
        <input
          type="text"
          className="form-control"
          id="indirizzoSedeLegale.comune.provincia.nome"
          name="indirizzoSedeLegale.comune.provincia.nome"
          value={formState.indirizzoSedeLegale.comune.provincia ? formState.indirizzoSedeLegale.comune.provincia.nome : null }
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="indirizzoSedeOperativa.via">Via Sede Operativa</label>
        <input
          type="text"
          className="form-control"
          id="indirizzoSedeOperativa.via"
          name="indirizzoSedeOperativa.via"
          value={formState.indirizzoSedeOperativa.via}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="indirizzoSedeOperativa.civico">Civico Sede Operativa</label>
        <input
          type="text"
          className="form-control"
          id="indirizzoSedeOperativa.civico"
          name="indirizzoSedeOperativa.civico"
          value={formState.indirizzoSedeOperativa.civico}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="indirizzoSedeOperativa.localita">Località Sede Operativa</label>
        <input
          type="text"
          className="form-control"
          id="indirizzoSedeOperativa.localita"
          name="indirizzoSedeOperativa.localita"
          value={formState.indirizzoSedeOperativa.localita}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="indirizzoSedeOperativa.cap">CAP Sede Operativa</label>
        <input
          type="text"
          className="form-control"
          id="indirizzoSedeOperativa.cap"
          name="indirizzoSedeOperativa.cap"
          value={formState.indirizzoSedeOperativa.cap}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="indirizzoSedeOperativa.comune.id">ID Comune Sede Operativa</label>
        <input
          type="text"
          className="form-control"
          disabled
        readOnly
          id="indirizzoSedeOperativa.comune.id"
          name="indirizzoSedeOperativa.comune.id"
          value={formState.indirizzoSedeOperativa.comune.id}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="indirizzoSedeOperativa.comune.nome">Nome Comune Sede Operativa</label>
        <input
          type="text"
          className="form-control"
          id="indirizzoSedeOperativa.comune.nome"
          name="indirizzoSedeOperativa.comune.nome"
          value={formState.indirizzoSedeOperativa.comune.nome}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="indirizzoSedeOperativa.comune.provincia.id">ID Provincia Comune Sede Operativa</label>
        <input
          type="text"
          className="form-control"
          disabled
        readOnly
          id="indirizzoSedeOperativa.comune.provincia.id"
          name="indirizzoSedeOperativa.comune.provincia.id"
          value={formState.indirizzoSedeOperativa.comune.provincia ? formState.indirizzoSedeOperativa.comune.provincia.id : null }
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="indirizzoSedeOperativa.comune.provincia.sigla">Sigla Provincia Comune Sede Operativa</label>
        <input
          type="text"
          className="form-control"
          id="indirizzoSedeOperativa.comune.provincia.sigla"
          name="indirizzoSedeOperativa.comune.provincia.sigla"
          value={formState.indirizzoSedeOperativa.comune.provincia ? formState.indirizzoSedeOperativa.comune.provincia.sigla :null}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="indirizzoSedeOperativa.comune.provincia.nome">Nome Provincia Comune Sede Operativa</label>
        <input
          type="text"
          className="form-control"
          id="indirizzoSedeOperativa.comune.provincia.nome"
          name="indirizzoSedeOperativa.comune.provincia.nome"
          value={formState.indirizzoSedeOperativa.comune.provincia ? formState.indirizzoSedeOperativa.comune.provincia.nome :null }
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="listafatture">Lista Fatture</label>
        <input
          type="text"
          className="form-control"
          id="listafatture"
          name="listafatture"
          value={formState.listafatture}
          onChange={handleChange}
        />
      </div>

     
    </form>
         
        </div>

      )}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary"  onClick={()=>{handleSubmit();handleClose();}}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
    </>
  );
};

export default Tableclienti;
