import { getAxios } from '../../utils/get-axios';
import { getInstanceResponseApi, parseErrorResponse } from './ApiCommon';
const RENT_PATH = '/rent';

const RentService = async (rentObject: RentToOrder):Promise<ResponseApi> => {
    try{
        let responseBody: ResponseApi = getInstanceResponseApi()
        const response = await getAxios().post(`${RENT_PATH}`, rentObject);
        responseBody.status = response.status;
        responseBody.isOk = response.status === 200
        responseBody.response = response.data
        return responseBody;
    }catch(error:any){
        return parseErrorResponse(error)
    }
}

const GetRentsService = async ():Promise<ResponseApi> => {
    try{
        let responseBody: ResponseApi = getInstanceResponseApi()
        const response = await getAxios().get(`${RENT_PATH}`);
        responseBody.status = response.status;
        responseBody.isOk = response.status === 200
        responseBody.response = response.data
        return responseBody
    }catch(error:any){
        return parseErrorResponse(error)
    }
}

const DropOffRentsService = async (idRent:string):Promise<ResponseApi> => {
    try{
        let responseBody: ResponseApi = {response:false, status: 500};
        const response = await getAxios().post(`${RENT_PATH}/${idRent}/drop-off`);
        responseBody.status = response.status;
        responseBody.isOk = response.status === 200
        responseBody.response = response.data
        return responseBody
    }catch(error:any){
        return parseErrorResponse(error)
    }
}

export {RentService, GetRentsService, DropOffRentsService};