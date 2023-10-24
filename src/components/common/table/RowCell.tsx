import { EnumColumTypes } from "./constants/EnumColumTypes"
import { getTextAlignment } from "./types/ColumnAlign"
import { TableColumnConfigProps } from "./types/TableColumnProps"

type RowCellProps = {
	data: Object
	configColum: TableColumnConfigProps
}

const RowCell = ({data, configColum}:RowCellProps) => {
	if (configColum == null){
		return (<td></td>)
	} 

	if (configColum.hidden){
		return <></>
	}

	let value
	if(configColum.decorator){
		value = configColum.decorator(data)
	}else{
		if (!data){
			value = ""
		}else{
			switch(configColum.type){
				case EnumColumTypes.NUMBER:
					value = parseInt(data.toString())
					break
				case EnumColumTypes.IMAGE_URL:
					value = <img className="ui avatar image" src={data.toString()}/>
					break
				case EnumColumTypes.IMAGE_B64:
					value = <img src={`data:image/jpeg;base64,${data}`} />
					break
				default:
					value = data.toString().toUpperCase()
			}
		}
	}

	let styles = {}
	if(configColum.align){
		styles = {...styles, textAlign: getTextAlignment(configColum.align)}

	}

	return (<td style={styles}> {value} </td>)
}


export default RowCell;