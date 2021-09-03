import {FC} from 'react';

interface Props {
  value: string | number;
}
const Cell: FC<Props> = ({value}) => {
  return <div className='Cell'>{`${value}`}</div>;
};

export default Cell;
