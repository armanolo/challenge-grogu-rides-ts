import { getAxios } from '../../utils/get-axios';
import { getInstanceResponseApi, parseErrorResponse } from './ApiCommon';
const VEHICLES_PATH = '/vehicles';

const CreateVehiclesService = async (vehicleList: object[]):Promise<ResponseApi> => {
    try{
        let responseBody: ResponseApi = getInstanceResponseApi()
        const response = await getAxios().post(`${VEHICLES_PATH}`, vehicleList);
        responseBody.status = response.status;
        responseBody.isOk = response.status === 200
        return responseBody;
    }catch(error:any){
        return parseErrorResponse(error)
    }
}


const GetVehiclesService = async ():Promise<ResponseApi> => {
    try{
        let responseBody: ResponseApi = {response:false, status: 500};
        const response = await getAxios().get(`${VEHICLES_PATH}`);
        responseBody.status = response.status;
        responseBody.isOk = response.status === 200
        responseBody.response = response.data
        return responseBody
    }catch(error:any){
        return parseErrorResponse(error)
    }
}

export {CreateVehiclesService, GetVehiclesService};