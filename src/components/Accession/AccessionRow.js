import React from 'react';
import './AccessionRow.css';
import * as CONSTANTS from '../../constants';

class AccessionRow extends React.Component {
  render() {
    const accession = this.props.accession._source;
    const { organism } = accession;
    const id = accession.Accession;
    const url = accession['Project Link'] || `${CONSTANTS.GENE_LAB_ROOT_URL}/genelab/accession/${accession['Authoritative Source URL']}`;
    const title = accession['Project Title'] || accession['Study Title'];
    const releaseDate = new Date(parseInt(accession["Study Public Release Date"], 10) * 1000);
    const displayDate = `${releaseDate.getFullYear()}-${releaseDate.getMonth() + 1}-${releaseDate.getDate()}`;
    const thumbnailUrl = `${CONSTANTS.GENE_LAB_ROOT_URL}${accession.thumbnail}`;

    return (
      <tr>
        <td>
          {id}
          <div>
            <img src={thumbnailUrl} alt="Accession organism" style={{width:"80px"}} />
          </div>
        </td>
        <td>
          <a href={url} target="_blank" rel="noopener noreferrer">{title}</a>
          <ul className="metadata">
            <li>
              Accession: {id}
            </li>
            <li>
              Date: {displayDate}
            </li>
            <li>
              Organism: {organism}
            </li>
          </ul>
        </td>
      </tr>
    );
  }
}

export default AccessionRow;
