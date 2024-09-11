import { errorResponse } from "../config/errorResponse.js";
import { addNewServiceModel, deleteServiceModel, fetchAllServiceModel, fetchSingleServiceModel, updateServiceModel } from "../model/model.js";


export const fetchServiceController = async (req, res) => {
    try {
        console.log("Request Body Received in fetchServiceController",req.body);
        let result = await fetchAllServiceModel(req.body);
        console.log("Result--->", result)
        if(result.success){
            res.status(200).send({
                success:true,
                message:result.message,
                data:result.data
            })
        }
        else{
            res.status(200).send({
                success:false,
                message:result.message,
                error:result.error
            })
        }
    } catch (error) {
        console.log("error occured in fetchServiceController--->", error)
        res.status(200).send({
            success:false,
            message:"Something Went Wrong... Please try again",
            error:errorResponse(1,error.message,error)
        })
    }
    
}
export const fetchSingleServiceController = async (req, res) => {
    try {
        let data = {};
        data.service_id = req.params.id
        console.log("Request Body Received in fetchSingleServiceController",data);
        let result = await fetchSingleServiceModel(data);
        console.log("Result--->", result)
        if(result.success){
            res.status(200).send({
                success:true,
                message:result.message,
                data:result.data
            })
        }
        else{
            res.status(200).send({
                success:false,
                message:result.message,
                error:result.error
            })
        }
    } catch (error) {
        console.log("error occured in fetchSingleServiceController--->", error)
        res.status(200).send({
            success:false,
            message:"Something Went Wrong... Please try again",
            error:errorResponse(1,error.message,error)
        })
    }
    
}

export const addNewServiceController = async(req,res)=>{
    try {
        console.log("Request body received in addNewServiceController --->",req.body);
        let response = await addNewServiceModel(req.body);
        
        console.log("Add Service Response--->",response);
        if(response.success){
            console.log(`Service Added Successfully`)
            res.status(200).send({
                success:true,
                message:response.message,
                data:response.data
            })
        }
        else{
            console.log("Some DB Error occured in addNewServiceController--->",response)
            if(response.error.additionalDetails.errors[0]){
                res.status(200).send({
                    success:false,
                    message:response.error.additionalDetails.errors[0].message,
                    error:[]
                })
            }
            else{
                res.status(200).send({
                    success:false,
                    message:response.message,
                    error:response.error
                })
            }
        }
        
    } catch (error) {
        console.log("Error occured in addNewServiceController--->",error)
        res.status(200).send({
            success:false,
            message:"Something Went Wrong... Please try again",
            error:errorResponse(1,error.message,error)
        })
    }
}

export const updateServiceController = async(req,res)=>{
    try {
        console.log("Request body received in updateServiceController --->",req.body);
        let service_id = req.params.id;
        req.body.service_id = service_id;
        let response = await updateServiceModel(req.body);
        
        console.log("Update Service Response--->",response);
        if(response.success){
            console.log(`Service Updated Successfully`)
            res.status(200).send({
                success:true,
                message:response.message,
                data:response.data
            })
        }
        else{
            console.log("Some Error occured in updateServiceController--->",response)
            res.status(200).send({
                success:false,
                message:response.message,
                error:response.error
            })
        }
        
    } catch (error) {
        console.log("Error occured in updateServiceController--->",error)
        res.status(200).send({
            success:false,
            message:"Something Went Wrong... Please try again",
            error:errorResponse(1,error.message,error)
        })
    }
}
export const deleteServiceController = async(req,res)=>{
    try {
        let data = {}
        data.service_id = req.params.id;
        console.log("Request body received in deleteServiceController --->",data);
        let response = await deleteServiceModel(data);
        
        console.log("Delete Service Response--->",response);
        if(response.success){
            console.log(`Service Deleted Successfully`)
            res.status(200).send({
                success:true,
                message:response.message,
                data:response.data
            })
        }
        else{
            console.log("Some Error occured in deleteServiceController--->",response)
            res.status(200).send({
                success:false,
                message:response.message,
                error:response.error
            })
        }
        
    } catch (error) {
        console.log("Error occured in deleteServiceController--->",error)
        res.status(200).send({
            success:false,
            message:"Something Went Wrong... Please try again",
            error:errorResponse(1,error.message,error)
        })
    }
}