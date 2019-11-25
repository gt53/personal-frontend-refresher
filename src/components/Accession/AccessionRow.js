import React from 'react';
import './AccessionRow.css';

class AccessionRow extends React.Component {
  render() {
    const accession = this.props.accession;

    return (
      <tr>
        <td>
          {accession.id}
          <div>
            <img src={accession.imageUrl} alt="Accession organism" style={{width:"80px"}} />
          </div>
        </td>
        <td>
          <a href={accession.url}>{accession.title}</a>
          <ul class="metadata">
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
