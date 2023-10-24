import { EnumColumAlignment } from "../constants/EnumColumAlignment"
import { TableColumnType } from "./TableColumnType"

export type TableColumnConfigProps = {
	name: string
	type: TableColumnType
	decorator?: Function
	width?: number
	align?: EnumColumAlignment.LEFT | EnumColumAlignment.CENTER | EnumColumAlignment.RIGHT
	hidden?: boolean
}