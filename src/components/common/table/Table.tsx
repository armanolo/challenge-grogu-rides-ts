import TableColumns from "./TableColumns";
import TableRows from "./TableRows";
import './mytable.css'
import { TableColumnConfigProps } from "./types/TableColumnProps";

type TableProps = {
	data: Array<Object>, 
	config: Dictionary<TableColumnConfigProps>
}

const Table = ({data, config}: TableProps) =>{
	if(!data || data.length == 0){
		return <></>
	}

	return (
		<table style={{alignSelf: 'center'}} className="table-auto border-spacing-2">
			<TableColumns columns={config} />
			<TableRows dataList={data} config={config}/>
		</table>
	)
} 


export default Table