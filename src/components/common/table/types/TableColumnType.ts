import { EnumColumTypes } from "../constants/EnumColumTypes";

export type TableColumnType = EnumColumTypes.TEXT | EnumColumTypes.NUMBER 
| EnumColumTypes.IMAGE_B64 | EnumColumTypes.IMAGE_URL | EnumColumTypes.BOOLEAN
| EnumColumTypes.OBJECT

