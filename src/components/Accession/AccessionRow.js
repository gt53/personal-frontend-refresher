import React from 'react';
import './AccessionRow.css';
import * as CONSTANTS from '../../constants';

class AccessionRow extends React.Component {
  render() {
    const { accession } = this.props; // Instance of data-models/accession.js

    return (
      <tr>
        <td>
          {accession.id}
          <div>
            <img src={accession.thumbnailUrl} alt="Accession organism" style={{width:"80px"}} />
          </div>
        </td>
        <td>
          <a href={accession.url} target="_blank" rel="noopener noreferrer">{accession.title}</a>
          <ul className="metadata">
            <li>
              Accession: {accession.id}
            </li>
            <li>
              Date: {accession.date}
            </li>
            <li>
              Organism: {accession.organism}
            </li>
          </ul>
        </td>
      </tr>
    );
  }
}

export default AccessionRow;
