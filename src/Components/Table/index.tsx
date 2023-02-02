import { FC } from 'react';
import './index.scss';
import { CellValue, Column } from '../../Types';
import Row from './Row';

interface Props {
  columns: Array<Column>;
  rows: Array<Array<CellValue>>;
}

const Table: FC<Props> = ({ columns, rows }) => {
  const getHeader = () => {
    return columns.map((c) => (
      <div className='Column' key={c.id}>
        {c.title}
      </div>
    ));
  };

  const getRows = () => {
    return rows.map((r, i) => <Row cells={r} key={`Row:${i}`} />);
  };

  return (
    <div className='Table' data-testid='Table'>
      <div className='Header'>{getHeader()}</div>
      <div className='Body' data-testid='TableBody'>
        {getRows()}
      </div>
    </div>
  );
};

export default Table;
