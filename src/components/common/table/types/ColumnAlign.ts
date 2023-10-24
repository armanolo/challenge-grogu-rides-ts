import { EnumColumAlignment } from "../constants/EnumColumAlignment";

export const getTextAlignment = (value:EnumColumAlignment): String => {
	switch(value){
		case EnumColumAlignment.LEFT:
			return "left";
		case EnumColumAlignment.CENTER:
			return "center";
		case EnumColumAlignment.RIGHT:
			return "right";
		default:
			return "left"
	}
}