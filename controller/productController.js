import { errorResponse } from "../config/errorResponse.js";
import connection from "../config/mysqlconfig.js";
import { addNewProductModel, deleteProductModel, fetchAllProductModel, fetchProductImageModel, fetchSingleProductModel, searchProductModel, totalProductCountModel, updateProductModel } from "../model/model.js";

export const getTestController = async (req, res) => {
    try {
        console.log("Get test controller API Hit");
        const { name, price, description, category } = req.body;
        res.status(200).send({
            success: true,
            message: "Data Fetch Successfully",
        })
    } catch (error) {
        console.log("Error occured in testing Controller--->", error);
        res.status(200).send({
            success: false,
            message: "Something Went wrong...Please try again",
            data: error.message
        })
    }
    // finally {
    //     try {
    //         await connection.close();
    //         console.log('Connection closed successfully.');
    //     } catch (err) {
    //         console.error('Error closing the connection: ' + err.stack);
    //     }
    // }
}

export const fetchProductController = async (req, res) => {
    try {
        console.log("Request Body Received in fetchProductController",req.body);
        let result = await fetchAllProductModel(req.body);
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
        console.log("error occured in fetchProductController--->", error)
        res.status(200).send({
            success:false,
            message:"Something Went Wrong... Please try again",
            error:errorResponse(1,error.message,error)
        })
    }
    
}
export const fetchSingleProductController = async (req, res) => {
    try {
        console.log("Request Body Received in fetchSingleProductController",req.body);
        let id = req.params.id;
        req.body.id = id;
        let result = await fetchSingleProductModel(req.body);
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
        console.log("error occured in fetchSingleProductController--->", error)
        res.status(200).send({
            success:false,
            message:"Something Went Wrong... Please try again",
            error:errorResponse(1,error.message,error)
        })
    }
    
}

export const addNewProductController = async(req,res)=>{
    try {
        console.log("Request body received in addNewProductController --->",req.body);
        let response = await addNewProductModel(req.body);
        
        console.log("Add Product Response--->",response);
        if(response.success){
            console.log(`Product Added Successfully`)
            res.status(200).send({
                success:true,
                message:response.message,
                data:response.data
            })
        }
        else{
            console.log("Some DB Error occured in addNewProductController--->",response)
            res.status(200).send({
                success:false,
                message:response.message,
                error:response.error
            })
        }
        
    } catch (error) {
        console.log("Error occured in addNewProductController--->",error)
        res.status(200).send({
            success:false,
            message:"Something Went Wrong... Please try again",
            error:errorResponse(1,error.message,error)
        })
    }
}

export const searchProductController = async(req,res)=>{
    try {
        console.log("Request body received in searchProductController --->",req.body);
        let { keyword } = req.params;
        req.body.keyword = keyword;
        let response = await searchProductModel(req.body);
        
        console.log("Search Product Response--->",response);
        if(response.success){
            console.log(`Searching Successfully`)
            res.status(200).send({
                success:true,
                message:response.message,
                data:response.data
            })
        }
        else{
            console.log("Some Error occured in searchProductController--->",response)
            res.status(200).send({
                success:false,
                message:response.message,
                error:response.error
            })
        }
        
    } catch (error) {
        console.log("Error occured in searchProductController--->",error)
        res.status(200).send({
            success:false,
            message:"Something Went Wrong... Please try again",
            error:errorResponse(1,error.message,error)
        })
    }
}
export const totalProductCountController = async(req,res)=>{
    try {
        console.log("Request body received in totalProductCountController --->",req.body);
        let response = await totalProductCountModel(req.body);
        
        console.log("Total Product Response--->",response);
        if(response.success){
            console.log(`Fetching total product`)
            res.status(200).send({
                success:true,
                message:response.message,
                data:response.data
            })
        }
        else{
            console.log("Some Error occured in totalProductCountController--->",response)
            res.status(200).send({
                success:false,
                message:response.message,
                error:response.error
            })
        }
        
    } catch (error) {
        console.log("Error occured in searchProductController--->",error)
        res.status(200).send({
            success:false,
            message:"Something Went Wrong... Please try again",
            error:errorResponse(1,error.message,error)
        })
    }
}

export const fetchImageController = async (req, res) => {
    try {
        console.log("Request Body Received in fetchImageController",req.body);
        let id = req.params.id;
        req.body.id = id
        let result = await fetchProductImageModel(req.body);
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
        console.log("error occured in fetchImageController--->", error)
        res.status(200).send({
            success:false,
            message:"Something Went Wrong... Please try again",
            error:errorResponse(1,error.message,error)
        })
    }
    
}

export const updateProductController = async(req,res)=>{
    try {
        console.log("Request body received in updateProductController --->",req.body);
        let id = req.params.id;
        req.body.id = id;
        let response = await updateProductModel(req.body);
        
        console.log("Update Product Response--->",response);
        if(response.success){
            console.log(`Product Updated Successfully`)
            res.status(200).send({
                success:true,
                message:response.message,
                data:response.data
            })
        }
        else{
            console.log("Some Error occured in updateProductController--->",response)
            res.status(200).send({
                success:false,
                message:response.message,
                error:response.error
            })
        }
        
    } catch (error) {
        console.log("Error occured in updateProductController--->",error)
        res.status(200).send({
            success:false,
            message:"Something Went Wrong... Please try again",
            error:errorResponse(1,error.message,error)
        })
    }
}
export const deleteProductController = async(req,res)=>{
    try {
        console.log("Request body received in deleteProductController --->",req.body);
        let id = req.params.id;
        req.body.id = id;
        let response = await deleteProductModel(req.body);
        
        console.log("Delete Product Response--->",response);
        if(response.success){
            console.log(`Product Deleted Successfully`)
            res.status(200).send({
                success:true,
                message:response.message,
                data:response.data
            })
        }
        else{
            console.log("Some Error occured in deleteProductController--->",response)
            res.status(200).send({
                success:false,
                message:response.message,
                error:response.error
            })
        }
        
    } catch (error) {
        console.log("Error occured in deleteProductController--->",error)
        res.status(200).send({
            success:false,
            message:"Something Went Wrong... Please try again",
            error:errorResponse(1,error.message,error)
        })
    }
}