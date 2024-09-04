import { errorResponse } from "../config/errorResponse.js";
import { addNewVendorModel, deleteVendorModel, fetchAllVendorModel, fetchSingleVendorModel, totalVendorCountModel, updateVendorModel } from "../model/model.js";


export const fetchVendorController = async (req, res) => {
    try {
        console.log("Request Body Received in fetchVendorController",req.body);
        let result = await fetchAllVendorModel(req.body);
        console.log("Result--->", result)
        if(result.success){
            res.status(200).send({
                success:true,
                message:result.message,
                totalVendor:result.totalVendor,
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
        console.log("error occured in fetchVendorController--->", error)
        res.status(200).send({
            success:false,
            message:"Something Went Wrong... Please try again",
            error:errorResponse(1,error.message,error)
        })
    }
    
}
export const fetchSingleVendorController = async (req, res) => {
    try {
        let data = {};
        data.vendor_id = req.params.id
        console.log("Request Body Received in fetchSingleVendorController",data);
        let result = await fetchSingleVendorModel(data);
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
        console.log("error occured in fetchSingleVendorController--->", error)
        res.status(200).send({
            success:false,
            message:"Something Went Wrong... Please try again",
            error:errorResponse(1,error.message,error)
        })
    }
    
}

export const addNewVendorController = async(req,res)=>{
    try {
        console.log("Request body received in addNewVendorController --->",req.body);
        let response = await addNewVendorModel(req.body);
        
        console.log("Add Vendor Response--->",response);
        if(response.success){
            console.log(`Vendor Added Successfully`)
            res.status(200).send({
                success:true,
                message:response.message,
                data:response.data
            })
        }
        else{
            console.log("Some DB Error occured in addNewVendorController--->",response)
            res.status(200).send({
                success:false,
                message:response.message,
                error:response.error
            })
        }
        
    } catch (error) {
        console.log("Error occured in addNewVendorController--->",error)
        res.status(200).send({
            success:false,
            message:"Something Went Wrong... Please try again",
            error:errorResponse(1,error.message,error)
        })
    }
}

export const totalVendorCountController = async(req,res)=>{
    try {
        console.log("Request body received in totalVendorCountController --->",req.body);
        let response = await totalVendorCountModel(req.body);
        
        console.log("Total Vendor Response--->",response);
        if(response.success){
            console.log(`Fetching total Vendor`)
            res.status(200).send({
                success:true,
                message:response.message,
                data:response.data
            })
        }
        else{
            console.log("Some Error occured in totalVendorCountController--->",response)
            res.status(200).send({
                success:false,
                message:response.message,
                error:response.error
            })
        }
        
    } catch (error) {
        console.log("Error occured in searchVendorController--->",error)
        res.status(200).send({
            success:false,
            message:"Something Went Wrong... Please try again",
            error:errorResponse(1,error.message,error)
        })
    }
}

export const updateVendorController = async(req,res)=>{
    try {
        console.log("Request body received in updateVendorController --->",req.body);
        let vendor_id = req.params.id;
        req.body.vendor_id = vendor_id;
        let response = await updateVendorModel(req.body);
        
        console.log("Update Vendor Response--->",response);
        if(response.success){
            console.log(`Vendor Updated Successfully`)
            res.status(200).send({
                success:true,
                message:response.message,
                data:response.data
            })
        }
        else{
            console.log("Some Error occured in updateVendorController--->",response)
            res.status(200).send({
                success:false,
                message:response.message,
                error:response.error
            })
        }
        
    } catch (error) {
        console.log("Error occured in updateVendorController--->",error)
        res.status(200).send({
            success:false,
            message:"Something Went Wrong... Please try again",
            error:errorResponse(1,error.message,error)
        })
    }
}
export const deleteVendorController = async(req,res)=>{
    try {
        let data = {}
        data.vendor_id = req.params.id;
        console.log("Request body received in deleteVendorController --->",data);
        let response = await deleteVendorModel(data);
        
        console.log("Delete Vendor Response--->",response);
        if(response.success){
            console.log(`Vendor Deleted Successfully`)
            res.status(200).send({
                success:true,
                message:response.message,
                data:response.data
            })
        }
        else{
            console.log("Some Error occured in deleteVendorController--->",response)
            res.status(200).send({
                success:false,
                message:response.message,
                error:response.error
            })
        }
        
    } catch (error) {
        console.log("Error occured in deleteVendorController--->",error)
        res.status(200).send({
            success:false,
            message:"Something Went Wrong... Please try again",
            error:errorResponse(1,error.message,error)
        })
    }
}