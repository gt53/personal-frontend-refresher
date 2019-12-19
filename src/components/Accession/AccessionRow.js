import React from 'react';
import './AccessionRow.css';
import * as CONSTANTS from '../../constants';

class AccessionRow extends React.Component {
  render() {
    const { accession } = this.props; // Instance of data-models/accession.js

    return (
      <tr>
        <td>
          {accession.getId()}
          <div>
            <img src={accession.getThumbnailUrl()} alt="Accession organism" style={{width:"80px"}} />
          </div>
        </td>
        <td>
          <a href={accession.getUrl()} target="_blank" rel="noopener noreferrer">{accession.getTitle()}</a>
          <ul className="metadata">
            <li>
              Accession: {accession.getId()}
            </li>
            <li>
              Date: {accession.getDate()}
            </li>
            <li>
              Organism: {accession.getOrganism()}
            </li>
          </ul>
        </td>
      </tr>
    );
  }
}

export default AccessionRow;
