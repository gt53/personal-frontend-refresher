import React from 'react';
import AccessionRow from './AccessionRow';
import './AccessionTable.css';

class AccessionTable extends React.Component {
  render() {
    const rows = [];

    this.props.accessions.forEach((accession) => {
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