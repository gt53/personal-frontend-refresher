import React from 'react';
import './App.css';
import AccessionTable from 'components/Accession/AccessionTable';

function App() {
  return (
    <div className="App">
      <AccessionTable
        accessions={accessions}
      />
    </div>
  );
}

// TODO: Remove this placeholder data
const accessions = [
  {id: 'GLDS-163', title: 'Rodent Research-3-CASIS: Mouse kidney transcriptomic proteomic and epigenomic data', url: 'https://genelab-data.ndc.nasa.gov/genelab/accession/GLDS-163/', imageUrl:'https://genelab-data.ndc.nasa.gov/genelab/img/GLDS163__study_image.png', date: '2018-05-16', organism: 'Mus musculus',},
  {id: 'GLDS-72', title: 'Space environmental factor impacts upon murine colon microbiota and mucosal homeostasis', url: 'https://genelab-data.ndc.nasa.gov/genelab/accession/GLDS-72', imageUrl:'https://genelab-data.ndc.nasa.gov/genelab/img/GLDS72__study_image.png', date: '2015-11-30', organism: 'Microbiota',},
];

export default App;
