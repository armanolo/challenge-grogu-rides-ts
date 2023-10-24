const getInstanceResponseApi = ():ResponseApi => {
	return {response:false, status: 500}
}

const parseErrorResponse = (error: any) => {
	let response = getInstanceResponseApi()
	response.code = error.code
	response.message = error.message
	if(error.response){
		response.status = error.response.status
		if (error.response.data){
			response.response = error.response.data.error
		}else{
			response.response = error.response
		}
	}else{
		response.response = error.message
	}

	return response
}
//code: "ERR_BAD_REQUEST"
//code: "ERR_NETWORK"


export { getInstanceResponseApi, parseErrorResponse }

