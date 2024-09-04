export const errorResponse = (errorCode,errorDesc,additionalDetails)=>{
    return{
        errorCode,
        errorDesc,
        additionalDetails
    }
}