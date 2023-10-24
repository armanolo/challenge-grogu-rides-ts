
import { useEffect, useState } from "react"
import { AxiosResponse } from "axios"
import { getAxios } from "../../utils/get-axios"

export const useAxios = (config: InterfaceAxios) => {
	const [response, setResponse] = useState(null)
	const [error, setError] = useState(null)
	const [loading, setLoading] = useState(true)

	let {method, url, body, header} = config
	const fetchAction = async () => {
		if ( method !== undefined && !url !== undefined) {
			try{
				const response:AxiosResponse = await getAxios().request({
					data: body,
					method,
					url,
					headers:header})
				setResponse(response.data);
			} catch (error: any) {
				setError(error);
			} finally {
				setLoading(false);
			}
		}
	}
	useEffect(() => {
		fetchAction()
	},[method, url, body, header])

	return {response, error, loading}
}