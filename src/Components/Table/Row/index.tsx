import { FC } from "react"
import { CellValue } from "../../../Types";
import Cell from './Cell';

interface Props {
    cells: Array<CellValue>
}
const Row: FC<Props> = ({
    cells
  }) => {
      const getCells = () => {
          return cells.map((c, i) => <Cell value={c.value} key={`Cell: ${i}`} />)
      }
    return (
        <div className='Row'>
            {getCells()}
        </div>
    )
}

export default Row;