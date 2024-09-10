import { Op, Sequelize } from "sequelize";
import { errorResponse } from "../config/errorResponse.js";
import Vendor from "../schema/vendorSchema.js";
import Spare from "../schema/spareSchema.js";







// Vendor model
export const fetchAllVendorModel = async (fields) => {
    console.log("Data received in fetchAllVendorModel --->", fields);

    try {
        const result = await Vendor.findAll();
        let allVendor = []
        let totalVendorCount = await Vendor.count();
        if (result.length > 0) {
            result.forEach(res=>{
                if(res.dataValues.address){
                    res.dataValues.address = JSON.parse(res.dataValues.address);
                }
                allVendor.push(res.dataValues)
            })
            return ({
                success: true,
                message: "Vendor Fetch successfully",
                totalVendor:totalVendorCount,
                data: allVendor
            })
        }
        else {
            return ({
                success: false,
                message: "Fail ! No Record Found",
                error: result
            })
        }
    } catch (error) {
        console.log("error occured in fetchAllVendor Model--->", error)
        return ({
            success: false,
            message: "Something Went Wrong... Please try again",
            error: errorResponse(1, error.message, error)
        })
    }
}

export const fetchSingleVendorModel = async (fields) => {
    console.log("Data received in fetchSingleVendorModel --->", fields);
    try {
        let result = await Vendor.findOne({ where: { vendor_id:fields.vendor_id } });
        console.log("Fetch Single product result--->",result);
        if (result) {
            if(result.address){
                result.address = JSON.parse(result.address)
            }
            return ({
                success: true,
                message: "Vendor Details fetch Successfully",
                data: result.dataValues
            })
        }
        else {
            return ({
                success: false,
                message: "Fail ! No Record Found",
                error: result
            })
        }


    } catch (error) {
        console.log("error occured in fetchSingleVendorModel--->", error)
        return ({
            success: false,
            message: "Something Went Wrong... Please try again",
            error: errorResponse(1, error.message, error)
        })
    }
}

export const addNewVendorModel = async (fields) => {
    console.log("Data received in fetchAllVendorModel --->", fields);

    try {
        fields.address = JSON.stringify(fields.address)
        let result = await Vendor.create(fields);
        console.log("create Vendor result--->",result)
        if(result.uniqno == 1){
            if(result.dataValues.address){
                result.dataValues.address = JSON.parse(result.dataValues.address)
            }
            return ({
                success: true,
                message: "A New Vendor has been created Successfully",
                data: result.dataValues
            })
        }
        else{
            return ({
                success: false,
                message: "Something Went Wrong...Please try again",
                error: errorResponse(1, 'Unable to Add Vendor Details', result)
            })
        }
        

    } catch (error) {
        console.log("error occured in addNewVendor Model--->", error)
        return ({
            success: false,
            message: "Something Went Wrong... Please try again",
            error: errorResponse(1, error.message, error)
        })
    }
}

export const totalVendorCountModel = async(fields)=>{
    console.log("Data received in totalVendorCountModel --->", fields);

    try {
        let result = await Vendor.count();
        //   console.log("Searching result--->",result)
        return ({
            success: true,
            message: "Total Count of Vendor ",
            data: result
        })
    } catch (error) {
        console.log("error occured in totalVendorCountModel--->", error)
        return ({
            success: false,
            message: "Something Went Wrong... Please try again",
            error: errorResponse(1, error.message, error)
        })
    }
}


export const updateVendorModel = async (fields) => {
    console.log("Data received in updateVendorModel --->", fields);

    try {
        let existingVendor = await Vendor.findOne({ where: { vendor_id:fields.vendor_id } });;
        if(existingVendor){
            console.log("existingVendor Result--->",existingVendor.dataValues)
            let updateObj = {};
            updateObj.name = fields.name ? fields.name : existingVendor.name
            updateObj.address = fields.address ? JSON.stringify(fields.address) : existingVendor.address
            updateObj.email = fields.email ? fields.email : existingVendor.email
            updateObj.phone_no = fields.phone_no ? fields.phone_no : existingVendor.phone_no
            let updateRes = await existingVendor.update(updateObj);
            if(updateRes.dataValues.address){
                updateRes.dataValues.address = JSON.parse(updateRes.dataValues.address)
            } 
            return ({
                success: true,
                message: "Vendor updated Successfully",
                data: updateRes.dataValues
            })
        }
        else {
            return ({
                success: false,
                message: "Fail !! No Vendor Found",
                error: errorResponse(1, 'Unable to Update Vendor Details', existingVendor)
            })
        }
        

    } catch (error) {
        console.log("error occured in updateVendorModel--->", error)
        return ({
            success: false,
            message: "Something Went Wrong... Please try again",
            error: errorResponse(1, error.message, error)
        })
    }
}

export const deleteVendorModel = async (fields) => {
    try {
        // check the Vendor is exist or not
        let id = fields.vendor_id;
        const result = await Vendor.findOne({where:{vendor_id:id}});
        console.log("Vendor Result--->",result)
        if(result){
            let deleteRes = await result.destroy();
            return ({
                success: true,
                message: "Vendor Deleted Successfully",
                data: []
            })
        }
        else {
            return ({
                success: false,
                message: "Fail !! No Vendor Found",
                error: errorResponse(1, 'Unable to Delete Vendor Details', result)
            })
        }

    } catch (error) {
        console.log("error occured in deleteVendorModel--->", error)
        return ({
            success: false,
            message: "Something Went Wrong... Please try again",
            error: errorResponse(1, error.message, error)
        })
    }
}

// Spare Model
export const fetchAllSpareModel = async (fields) => {
    console.log("Data received in fetchAllSpareModel --->", fields);

    try {
        const result = await Spare.findAll();
        let allSpare = []
        if (result.length > 0) {
            result.forEach(res=>{
                // if(res.dataValues.address){
                //     res.dataValues.address = JSON.parse(res.dataValues.address);
                // }
                allSpare.push(res.dataValues)
            })
            return ({
                success: true,
                message: "Spare Fetch successfully",
                data: allSpare
            })
        }
        else {
            return ({
                success: false,
                message: "Fail ! No Record Found",
                error: result
            })
        }
    } catch (error) {
        console.log("error occured in fetchAllSpare Model--->", error)
        return ({
            success: false,
            message: "Something Went Wrong... Please try again",
            error: errorResponse(1, error.message, error)
        })
    }
}

export const fetchSingleSpareModel = async (fields) => {
    console.log("Data received in fetchSingleSpareModel --->", fields);
    try {
        let result = await Spare.findOne({ where: { spare_id:fields.spare_id } });
        console.log("Fetch Single Spare result--->",result);
        if (result) {
            // if(result.address){
            //     result.address = JSON.parse(result.address)
            // }
            return ({
                success: true,
                message: "Spare Details fetch Successfully",
                data: result.dataValues
            })
        }
        else {
            return ({
                success: false,
                message: "Fail ! No Record Found",
                error: result
            })
        }


    } catch (error) {
        console.log("error occured in fetchSingleSpareModel--->", error)
        return ({
            success: false,
            message: "Something Went Wrong... Please try again",
            error: errorResponse(1, error.message, error)
        })
    }
}

export const addNewSpareModel = async (fields) => {
    console.log("Data received in fetchAllSpareModel --->", fields);

    try {
        let result = await Spare.create(fields);
        console.log("create Spare result--->",result)
        if(result.uniqno == 1){
            return ({
                success: true,
                message: "A New Spare has been Added Successfully",
                data: result.dataValues
            })
        }
        else{
            return ({
                success: false,
                message: "Something Went Wrong...Please try again",
                error: errorResponse(1, 'Unable to Add Spare Details', result)
            })
        }
        

    } catch (error) {
        console.log("error occured in addNewSpare Model--->", error)
        return ({
            success: false,
            message: "Something Went Wrong... Please try again",
            error: errorResponse(1, error.message, error)
        })
    }
}

export const updateSpareModel = async (fields) => {
    console.log("Data received in updateSpareModel --->", fields);

    try {
        let existingSpare = await Spare.findOne({ where: { spare_id:fields.spare_id } });
        if(existingSpare){
            console.log("existingSpare Result--->",existingSpare.dataValues)
            let updateObj = {};
            updateObj.vendor_id = fields.vendor_id ? fields.vendor_id : existingSpare.vendor_id
            updateObj.name = fields.name ? fields.name : existingSpare.name
            updateObj.description = fields.description ? fields.description : existingSpare.description
            updateObj.part_number = fields.part_number ? fields.part_number : existingSpare.part_number
            updateObj.unit_cost = fields.unit_cost ? fields.unit_cost : existingSpare.unit_cost
            updateObj.lead_time = fields.lead_time ? fields.lead_time : existingSpare.lead_time
            let updateRes = await existingSpare.update(updateObj);
            
            return ({
                success: true,
                message: "Spare updated Successfully",
                data: updateRes.dataValues
            })
        }
        else {
            return ({
                success: false,
                message: "Fail !! No Spare Found",
                error: errorResponse(1, 'Unable to Update Spare Details', existingSpare)
            })
        }
        

    } catch (error) {
        console.log("error occured in updateSpareModel--->", error)
        return ({
            success: false,
            message: "Something Went Wrong... Please try again",
            error: errorResponse(1, error.message, error)
        })
    }
}

export const deleteSpareModel = async (fields) => {
    try {
        // check the Spare is exist or not
        let id = fields.spare_id;
        const result = await Spare.findOne({where:{spare_id:id}});
        console.log("Spare Result--->",result)
        if(result){
            let deleteRes = await result.destroy();
            return ({
                success: true,
                message: "Spare Deleted Successfully",
                data: []
            })
        }
        else {
            return ({
                success: false,
                message: "Fail !! No Spare Found",
                error: errorResponse(1, 'Unable to Delete Spare Details', result)
            })
        }

    } catch (error) {
        console.log("error occured in deleteVendorModel--->", error)
        return ({
            success: false,
            message: "Something Went Wrong... Please try again",
            error: errorResponse(1, error.message, error)
        })
    }
}

