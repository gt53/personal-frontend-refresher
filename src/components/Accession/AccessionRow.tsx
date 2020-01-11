import React from 'react';
import Accession from '../../data-models/accession';
import { State } from '../../common/types';
import './AccessionRow.css';

interface Props {
  accession: Accession;
};

class AccessionRow extends React.Component<Props, State> {
  render() {
    const { accession } = this.props;

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
