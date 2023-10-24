import RowCell from "./RowCell";
import { TableColumnConfigProps } from "./types/TableColumnProps";

type TableRowsProps = {
	dataList: Array<Object>
	config: Dictionary<TableColumnConfigProps>
}

const buildCell = (data:any, configColum:Dictionary<TableColumnConfigProps>  ) => {
	return Object.keys(configColum).map( 
		(configData, configIndex) => 
		{ 
			return <RowCell key={configIndex} data={data[configData]} configColum={configColum[configData]}/>
		}
	)
}

const TableRows = ( {dataList, config }:TableRowsProps ) => {
	const renderedRows = dataList.map( 
		(data, index) => 
		{ 
			if (data){
				return	(<tr key={index}>{buildCell(data, config)}</tr>)
			} else{
				return	(<tr></tr>)
			}
		}
	)
	
	return (
		<tbody>
			{renderedRows}
		</tbody>
	)
}


export default TableRows;