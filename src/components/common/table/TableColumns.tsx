import { getTextAlignment } from "./types/ColumnAlign";
import { TableColumnConfigProps } from "./types/TableColumnProps";

type TableColumnsProps = {
	columns: Dictionary<TableColumnConfigProps>
}

const TableColumns = ({columns}:TableColumnsProps ) => {

	const renderedColumns = Object.keys(columns).map( 
		(key, index) => 
		{ 	
			const obj = columns[key]
			if (obj.hidden){
				return <></>
			}
			let styles = {}
			if(obj.width){
				styles = {...styles, width: `${obj.width}px`}
			}
			if(obj.align){
				styles = {...styles, textAlign: getTextAlignment(obj.align)}

			}
			return <th key={index} style={styles}>{obj.name} </th> 
		}
	)

	return (
		<thead>
			<tr className="border-b-2">
				{renderedColumns}	
			</tr>
		</thead>
	)
}

export default TableColumns