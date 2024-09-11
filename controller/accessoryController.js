import { errorResponse } from "../config/errorResponse.js";
import { addNewAccessoryModel, deleteAccessoryModel, fetchAllAccessoryModel, fetchSingleAccessoryModel, updateAccessoryModel } from "../model/model.js";


export const fetchAccessoryController = async (req, res) => {
    try {
        console.log("Request Body Received in fetchAccessoryController",req.body);
        let result = await fetchAllAccessoryModel(req.body);
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
        console.log("error occured in fetchAccessoryController--->", error)
        res.status(200).send({
            success:false,
            message:"Something Went Wrong... Please try again",
            error:errorResponse(1,error.message,error)
        })
    }
    
}
export const fetchSingleAccessoryController = async (req, res) => {
    try {
        let data = {};
        data.accessory_id = req.params.id
        console.log("Request Body Received in fetchSingleAccessoryController",data);
        let result = await fetchSingleAccessoryModel(data);
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
        console.log("error occured in fetchSingleAccessoryController--->", error)
        res.status(200).send({
            success:false,
            message:"Something Went Wrong... Please try again",
            error:errorResponse(1,error.message,error)
        })
    }
    
}

export const addNewAccessoryController = async(req,res)=>{
    try {
        console.log("Request body received in addNewAccessoryController --->",req.body);
        let response = await addNewAccessoryModel(req.body);
        
        console.log("Add Accessory Response--->",response);
        if(response.success){
            console.log(`Accessory Added Successfully`)
            res.status(200).send({
                success:true,
                message:response.message,
                data:response.data
            })
        }
        else{
            console.log("Some DB Error occured in addNewAccessoryController--->",response)
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
        console.log("Error occured in addNewAccessoryController--->",error)
        res.status(200).send({
            success:false,
            message:"Something Went Wrong... Please try again",
            error:errorResponse(1,error.message,error)
        })
    }
}

export const updateAccessoryController = async(req,res)=>{
    try {
        console.log("Request body received in updateAccessoryController --->",req.body);
        let accessory_id = req.params.id;
        req.body.accessory_id = accessory_id;
        let response = await updateAccessoryModel(req.body);
        
        console.log("Update Accessory Response--->",response);
        if(response.success){
            console.log(`Accessory Updated Successfully`)
            res.status(200).send({
                success:true,
                message:response.message,
                data:response.data
            })
        }
        else{
            console.log("Some Error occured in updateAccessoryController--->",response)
            res.status(200).send({
                success:false,
                message:response.message,
                error:response.error
            })
        }
        
    } catch (error) {
        console.log("Error occured in updateAccessoryController--->",error)
        res.status(200).send({
            success:false,
            message:"Something Went Wrong... Please try again",
            error:errorResponse(1,error.message,error)
        })
    }
}
export const deleteAccessoryController = async(req,res)=>{
    try {
        let data = {}
        data.accessory_id = req.params.id;
        console.log("Request body received in deleteAccessoryController --->",data);
        let response = await deleteAccessoryModel(data);
        
        console.log("Delete Accessory Response--->",response);
        if(response.success){
            console.log(`Accessory Deleted Successfully`)
            res.status(200).send({
                success:true,
                message:response.message,
                data:response.data
            })
        }
        else{
            console.log("Some Error occured in deleteAccessoryController--->",response)
            res.status(200).send({
                success:false,
                message:response.message,
                error:response.error
            })
        }
        
    } catch (error) {
        console.log("Error occured in deleteAccessoryController--->",error)
        res.status(200).send({
            success:false,
            message:"Something Went Wrong... Please try again",
            error:errorResponse(1,error.message,error)
        })
    }
}