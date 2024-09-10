import { errorResponse } from "../config/errorResponse.js";
import { addNewSpareModel, deleteSpareModel, fetchAllSpareModel, fetchSingleSpareModel, updateSpareModel } from "../model/model.js";


export const fetchSpareController = async (req, res) => {
    try {
        console.log("Request Body Received in fetchSpareController",req.body);
        let result = await fetchAllSpareModel(req.body);
        console.log("Result--->", result)
        if(result.success){
            res.status(200).send({
                success:true,
                message:result.message,
                // totalVendor:result.totalVendor,
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
        console.log("error occured in fetchSpareController--->", error)
        res.status(200).send({
            success:false,
            message:"Something Went Wrong... Please try again",
            error:errorResponse(1,error.message,error)
        })
    }
    
}
export const fetchSingleSpareController = async (req, res) => {
    try {
        let data = {};
        data.spare_id = req.params.id
        console.log("Request Body Received in fetchSingleSpareController",data);
        let result = await fetchSingleSpareModel(data);
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
        console.log("error occured in fetchSingleSpareController--->", error)
        res.status(200).send({
            success:false,
            message:"Something Went Wrong... Please try again",
            error:errorResponse(1,error.message,error)
        })
    }
    
}

export const addNewSpareController = async(req,res)=>{
    try {
        console.log("Request body received in addNewSpareController --->",req.body);
        let response = await addNewSpareModel(req.body);
        
        console.log("Add Spare Response--->",response);
        if(response.success){
            console.log(`Spare Added Successfully`)
            res.status(200).send({
                success:true,
                message:response.message,
                data:response.data
            })
        }
        else{
            console.log("Some DB Error occured in addNewSpareController--->",response)
            res.status(200).send({
                success:false,
                message:response.message,
                error:response.error
            })
        }
        
    } catch (error) {
        console.log("Error occured in addNewSpareController--->",error)
        res.status(200).send({
            success:false,
            message:"Something Went Wrong... Please try again",
            error:errorResponse(1,error.message,error)
        })
    }
}

export const updateSpareController = async(req,res)=>{
    try {
        console.log("Request body received in updateSpareController --->",req.body);
        let spare_id = req.params.id;
        req.body.spare_id = spare_id;
        let response = await updateSpareModel(req.body);
        
        console.log("Update Spare Response--->",response);
        if(response.success){
            console.log(`Spare Updated Successfully`)
            res.status(200).send({
                success:true,
                message:response.message,
                data:response.data
            })
        }
        else{
            console.log("Some Error occured in updateSpareController--->",response)
            res.status(200).send({
                success:false,
                message:response.message,
                error:response.error
            })
        }
        
    } catch (error) {
        console.log("Error occured in updateSpareController--->",error)
        res.status(200).send({
            success:false,
            message:"Something Went Wrong... Please try again",
            error:errorResponse(1,error.message,error)
        })
    }
}
export const deleteSpareController = async(req,res)=>{
    try {
        let data = {}
        data.spare_id = req.params.id;
        console.log("Request body received in deleteSpareController --->",data);
        let response = await deleteSpareModel(data);
        
        console.log("Delete Spare Response--->",response);
        if(response.success){
            console.log(`Spare Deleted Successfully`)
            res.status(200).send({
                success:true,
                message:response.message,
                data:response.data
            })
        }
        else{
            console.log("Some Error occured in deleteSpareController--->",response)
            res.status(200).send({
                success:false,
                message:response.message,
                error:response.error
            })
        }
        
    } catch (error) {
        console.log("Error occured in deleteSpareController--->",error)
        res.status(200).send({
            success:false,
            message:"Something Went Wrong... Please try again",
            error:errorResponse(1,error.message,error)
        })
    }
}