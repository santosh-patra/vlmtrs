import { errorResponse } from "../config/errorResponse.js";
import { addNewVehicleModel, deleteVehicleModel, fetchAllVehicleModel, fetchSingleVehicleModel, updateVehicleModel } from "../model/model.js";


export const fetchVehicleController = async (req, res) => {
    try {
        console.log("Request Body Received in fetchVehicleController",req.body);
        let result = await fetchAllVehicleModel(req.body);
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
        console.log("error occured in fetchVehicleController--->", error)
        res.status(200).send({
            success:false,
            message:"Something Went Wrong... Please try again",
            error:errorResponse(1,error.message,error)
        })
    }
    
}
export const fetchSingleVehicleController = async (req, res) => {
    try {
        let data = {};
        data.vehicle_id = req.params.id
        console.log("Request Body Received in fetchSingleVehicleController",data);
        let result = await fetchSingleVehicleModel(data);
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
        console.log("error occured in fetchSingleVehicleController--->", error)
        res.status(200).send({
            success:false,
            message:"Something Went Wrong... Please try again",
            error:errorResponse(1,error.message,error)
        })
    }
    
}

export const addNewVehicleController = async(req,res)=>{
    try {
        console.log("Request body received in addNewVehicleController --->",req.body);
        let response = await addNewVehicleModel(req.body);
        
        console.log("Add Vehicle Response--->",response);
        if(response.success){
            console.log(`Vehicle Added Successfully`)
            res.status(200).send({
                success:true,
                message:response.message,
                data:response.data
            })
        }
        else{
            console.log("Some DB Error occured in addNewVehicleController--->",response)
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
        console.log("Error occured in addNewVehicleController--->",error)
        res.status(200).send({
            success:false,
            message:"Something Went Wrong... Please try again",
            error:errorResponse(1,error.message,error)
        })
    }
}

export const updateVehicleController = async(req,res)=>{
    try {
        console.log("Request body received in updateVehicleController --->",req.body);
        let vehicle_id = req.params.id;
        req.body.vehicle_id = vehicle_id;
        let response = await updateVehicleModel(req.body);
        
        console.log("Update Vehicle Response--->",response);
        if(response.success){
            console.log(`Vehicle Updated Successfully`)
            res.status(200).send({
                success:true,
                message:response.message,
                data:response.data
            })
        }
        else{
            console.log("Some Error occured in updateVehicleController--->",response)
            res.status(200).send({
                success:false,
                message:response.message,
                error:response.error
            })
        }
        
    } catch (error) {
        console.log("Error occured in updateVehicleController--->",error)
        res.status(200).send({
            success:false,
            message:"Something Went Wrong... Please try again",
            error:errorResponse(1,error.message,error)
        })
    }
}
export const deleteVehicleController = async(req,res)=>{
    try {
        let data = {}
        data.vehicle_id = req.params.id;
        console.log("Request body received in deleteVehicleController --->",data);
        let response = await deleteVehicleModel(data);
        
        console.log("Delete Vehicle Response--->",response);
        if(response.success){
            console.log(`Vehicle Deleted Successfully`)
            res.status(200).send({
                success:true,
                message:response.message,
                data:response.data
            })
        }
        else{
            console.log("Some Error occured in deleteVehicleController--->",response)
            res.status(200).send({
                success:false,
                message:response.message,
                error:response.error
            })
        }
        
    } catch (error) {
        console.log("Error occured in deleteVehicleController--->",error)
        res.status(200).send({
            success:false,
            message:"Something Went Wrong... Please try again",
            error:errorResponse(1,error.message,error)
        })
    }
}