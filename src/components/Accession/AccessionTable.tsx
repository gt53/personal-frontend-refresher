import React from 'react';
import AccessionRow from './AccessionRow';
import Accession from '../../data-models/accession';
import { State } from '../../common/types';
import './AccessionTable.css';

interface Props {
  accessions: Accession[];
};

class AccessionTable extends React.Component<Props, State> {
  render() {
    const rows: JSX.Element[] = [];

    this.props.accessions.forEach((accession: Accession) => {
      rows.push(
        <AccessionRow
          accession={accession}
          key={accession.id}
        />
      );
    });

    return (
      <table>
        <tbody>{rows}</tbody>
      </table>
    );
  }
}

export default AccessionTable;
