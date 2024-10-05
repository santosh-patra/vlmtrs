import { errorResponse } from "../config/errorResponse.js";
import { addNewServiceModel, deleteServiceModel, fetchAllServiceModel, fetchSingleimageModel, fetchSingleServiceModel, updateServiceModel } from "../model/model.js";
import fs from 'fs';


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
        let s_id = req.params.id;
        let image = '';
        let service_id = '';
        if (s_id.includes('+')) {
            service_id = s_id.split('+')[0]
            image = s_id.split('+')[1]
        }
        else {
            service_id = s_id
        }
        data.service_id = service_id;
        data.image = image;
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
export const fetchSingleimageController = async (req, res) => {
    try {
        let data = {};
        data.filename = req.params.f_name;
        console.log("Request Body Received in fetchSingleimageController",data);
        let result = await fetchSingleimageModel(data);
        // console.log("Result--->", result)
        if(result.success){
            res.set('Content-Type', result.data.mimeType);
            res.send(result.data.data);
        }
        else{
            res.status(200).send({
                success:false,
                message:result.message,
                error:result.error
            })
        }
    } catch (error) {
        console.log("error occured in fetchSingleimageController--->", error)
        res.status(200).send({
            success:false,
            message:"Something Went Wrong... Please try again",
            error:errorResponse(1,error.message,error)
        })
    }
    
}

export const addNewServiceController = async(req,res)=>{
    try {
        // console.log("Document --->",req.files);
        console.log("Request body received in addNewServiceController --->",req.fields);
        req.body = {...req.fields}
        console.log("Request Body---->",req.body)
        if(req.files && req.files.doc){
            const imageData = fs.readFileSync(req.files.doc.path);
            req.body.filename = `${Date.now()}+${req.files.doc.name}`,
            req.body.data = imageData,
            req.body.mimeType = req.files.doc.type
        }
        // console.log("Request Body after Document---->",req.body)

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
        // console.log("Request body received in updateServiceController --->",req.body);
        console.log("Request body received in updateServiceController --->",req.fields);
        req.body = {...req.fields}
        console.log("Request Body---->",req.body)
        if(req.files && req.files.doc){
            const imageData = fs.readFileSync(req.files.doc.path);
            req.body.filename = `${Date.now()}+${req.files.doc.name}`,
            req.body.data = imageData,
            req.body.mimeType = req.files.doc.type
            // pass all file details to Model
            req.body.files = req.files
        }
        // if(req.fields.parts){
        //     req.body.parts = JSON.stringify(req.fields.parts)
        // }
        console.log("Request Body after Document---->",req.body)
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