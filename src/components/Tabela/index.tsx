import React from 'react';
import { Cell, Container, HeaderText, Row } from './style';

interface TableProps {
    tableHeader: string[]
    truthTable: object[]
}

export const Table: React.FC<TableProps> = ({ tableHeader, truthTable }) => {

  return (
    <Container>
      <Row >
        {tableHeader.map((header: string, headerIndex: number) => (
          <HeaderText key={headerIndex} >
            {header}
          </HeaderText>
        ))}
      </Row>
      {truthTable.map((row: any, index: number) => (
        <Row key={index}>
          {Object.values(row).map((value: any, key: any) => (
            <Cell key={key} >
              {value ? 'V' : 'F'}
            </Cell>
          ))}
        </Row>
      ))}
    </Container>
  );
};

