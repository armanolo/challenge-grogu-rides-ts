import { getAxios } from '../../utils/get-axios';
import { getInstanceResponseApi, parseErrorResponse } from './ApiCommon';
const USER_PATH = '/user';

const CreateUserService = async (userObject: UserToCreate):Promise<ResponseApi> => {
    try{
        let responseBody: ResponseApi = getInstanceResponseApi()
        const response = await getAxios().post(`${USER_PATH}`, userObject);
        responseBody.status = response.status;
        responseBody.isOk = response.status === 201
        responseBody.response = response.data
        return responseBody
    }catch(error:any){
        return parseErrorResponse(error)
    }
}


const GetUsersService = async (id: string): Promise<ResponseApi> => {
    try{
        let responseBody: ResponseApi = getInstanceResponseApi()
        const response = await getAxios().get(`${USER_PATH}/${id}`);
        responseBody.status = response.status;
        responseBody.isOk = response.status == 200;
        responseBody.response = response.data
        return responseBody
    }catch(error: any){
        return parseErrorResponse(error)
    }
}

export {CreateUserService, GetUsersService};


