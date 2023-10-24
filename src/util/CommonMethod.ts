const shortUuid = (value:any) => {
	return value.substr(value.lastIndexOf("-")+1)
}

export {shortUuid}