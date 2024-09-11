import { errorResponse } from "../config/errorResponse.js";
import { addNewDealerModel, deleteDealerModel, fetchAllDealerModel, fetchSingleDealerModel, updateDealerModel } from "../model/model.js";


export const fetchDealerController = async (req, res) => {
    try {
        console.log("Request Body Received in fetchDealerController",req.body);
        let result = await fetchAllDealerModel(req.body);
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
        console.log("error occured in fetchDealerController--->", error)
        res.status(200).send({
            success:false,
            message:"Something Went Wrong... Please try again",
            error:errorResponse(1,error.message,error)
        })
    }
    
}
export const fetchSingleDealerController = async (req, res) => {
    try {
        let data = {};
        data.dealer_id = req.params.id
        console.log("Request Body Received in fetchSingleDealerController",data);
        let result = await fetchSingleDealerModel(data);
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
        console.log("error occured in fetchSingleDealerController--->", error)
        res.status(200).send({
            success:false,
            message:"Something Went Wrong... Please try again",
            error:errorResponse(1,error.message,error)
        })
    }
    
}

export const addNewDealerController = async(req,res)=>{
    try {
        console.log("Request body received in addNewDealerController --->",req.body);
        let response = await addNewDealerModel(req.body);
        
        console.log("Add Dealer Response--->",response);
        if(response.success){
            console.log(`Dealer Added Successfully`)
            res.status(200).send({
                success:true,
                message:response.message,
                data:response.data
            })
        }
        else{
            console.log("Some DB Error occured in addNewDealerController--->",response)
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
        console.log("Error occured in addNewDealerController--->",error)
        res.status(200).send({
            success:false,
            message:"Something Went Wrong... Please try again",
            error:errorResponse(1,error.message,error)
        })
    }
}

export const updateDealerController = async(req,res)=>{
    try {
        console.log("Request body received in updateDealerController --->",req.body);
        let dealer_id = req.params.id;
        req.body.dealer_id = dealer_id;
        let response = await updateDealerModel(req.body);
        
        console.log("Update Dealer Response--->",response);
        if(response.success){
            console.log(`Dealer Updated Successfully`)
            res.status(200).send({
                success:true,
                message:response.message,
                data:response.data
            })
        }
        else{
            console.log("Some Error occured in updateDealerController--->",response)
            res.status(200).send({
                success:false,
                message:response.message,
                error:response.error
            })
        }
        
    } catch (error) {
        console.log("Error occured in updateDealerController--->",error)
        res.status(200).send({
            success:false,
            message:"Something Went Wrong... Please try again",
            error:errorResponse(1,error.message,error)
        })
    }
}
export const deleteDealerController = async(req,res)=>{
    try {
        let data = {}
        data.dealer_id = req.params.id;
        console.log("Request body received in deleteDealerController --->",data);
        let response = await deleteDealerModel(data);
        
        console.log("Delete Dealer Response--->",response);
        if(response.success){
            console.log(`Dealer Deleted Successfully`)
            res.status(200).send({
                success:true,
                message:response.message,
                data:response.data
            })
        }
        else{
            console.log("Some Error occured in deleteDealerController--->",response)
            res.status(200).send({
                success:false,
                message:response.message,
                error:response.error
            })
        }
        
    } catch (error) {
        console.log("Error occured in deleteDealerController--->",error)
        res.status(200).send({
            success:false,
            message:"Something Went Wrong... Please try again",
            error:errorResponse(1,error.message,error)
        })
    }
}