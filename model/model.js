import { Op, Sequelize } from "sequelize";
import { errorResponse } from "../config/errorResponse.js";
import Vendor from "../schema/vendorSchema.js";
import Spare from "../schema/spareSchema.js";
import Accessory from "../schema/accessorySchema.js";
import Vehicle from "../schema/vehicleSchema.js";
import Service from "../schema/serviceSchema.js";
import Dealer from "../schema/dealerSchema.js";







// Vendor model
export const fetchAllVendorModel = async (fields) => {
    console.log("Data received in fetchAllVendorModel --->", fields);

    try {
        const result = await Vendor.findAll();
        let allVendor = []
        let totalVendorCount = await Vendor.count();
        if (result.length > 0) {
            result.forEach(res => {
                if (res.dataValues.address) {
                    res.dataValues.address = JSON.parse(res.dataValues.address);
                }
                allVendor.push(res.dataValues)
            })
            return ({
                success: true,
                message: "Vendor Fetch successfully",
                totalVendor: totalVendorCount,
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
        let result = await Vendor.findOne({ where: { vendor_id: fields.vendor_id } });
        console.log("Fetch Single product result--->", result);
        if (result) {
            if (result.address) {
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
        console.log("create Vendor result--->", result)
        if (result.uniqno == 1) {
            if (result.dataValues.address) {
                result.dataValues.address = JSON.parse(result.dataValues.address)
            }
            return ({
                success: true,
                message: "A New Vendor has been created Successfully",
                data: result.dataValues
            })
        }
        else {
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

export const totalVendorCountModel = async (fields) => {
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
        let existingVendor = await Vendor.findOne({ where: { vendor_id: fields.vendor_id } });;
        if (existingVendor) {
            console.log("existingVendor Result--->", existingVendor.dataValues)
            let updateObj = {};
            updateObj.name = fields.name ? fields.name : existingVendor.name
            updateObj.address = fields.address ? JSON.stringify(fields.address) : existingVendor.address
            updateObj.email = fields.email ? fields.email : existingVendor.email
            updateObj.phone_no = fields.phone_no ? fields.phone_no : existingVendor.phone_no
            let updateRes = await existingVendor.update(updateObj);
            if (updateRes.dataValues.address) {
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
        const result = await Vendor.findOne({ where: { vendor_id: id } });
        console.log("Vendor Result--->", result)
        if (result) {
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
            result.forEach(res => {
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
        let result = await Spare.findOne({ where: { spare_id: fields.spare_id } });
        console.log("Fetch Single Spare result--->", result);
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
        console.log("create Spare result--->", result)
        if (result.uniqno == 1) {
            return ({
                success: true,
                message: "A New Spare has been Added Successfully",
                data: result.dataValues
            })
        }
        else {
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
        let existingSpare = await Spare.findOne({ where: { spare_id: fields.spare_id } });
        if (existingSpare) {
            console.log("existingSpare Result--->", existingSpare.dataValues)
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
        const result = await Spare.findOne({ where: { spare_id: id } });
        console.log("Spare Result--->", result)
        if (result) {
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
        console.log("error occured in deleteSpareModel--->", error)
        return ({
            success: false,
            message: "Something Went Wrong... Please try again",
            error: errorResponse(1, error.message, error)
        })
    }
}

// Accessory Model

export const fetchAllAccessoryModel = async (fields) => {
    console.log("Data received in fetchAllAccessoryModel --->", fields);

    try {
        const result = await Accessory.findAll();
        let allAccessory = []
        if (result.length > 0) {
            result.forEach(res => {
                allAccessory.push(res.dataValues)
            })
            return ({
                success: true,
                message: "Accessory Fetch successfully",
                data: allAccessory
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
        console.log("error occured in fetchAllAccessory Model--->", error)
        return ({
            success: false,
            message: "Something Went Wrong... Please try again",
            error: errorResponse(1, error.message, error)
        })
    }
}

export const fetchSingleAccessoryModel = async (fields) => {
    console.log("Data received in fetchSingleAccessoryModel --->", fields);
    try {
        let result = await Accessory.findOne({ where: { accessory_id: fields.accessory_id } });
        console.log("Fetch Single Accessory result--->", result);
        if (result) {
            // if(result.address){
            //     result.address = JSON.parse(result.address)
            // }
            return ({
                success: true,
                message: "Accessory Details fetch Successfully",
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
        console.log("error occured in fetchSingleAccessoryModel--->", error)
        return ({
            success: false,
            message: "Something Went Wrong... Please try again",
            error: errorResponse(1, error.message, error)
        })
    }
}

export const addNewAccessoryModel = async (fields) => {
    console.log("Data received in fetchAllAccessoryModel --->", fields);

    try {
        let result = await Accessory.create(fields);
        console.log("create Accessory result--->", result)
        if (result.uniqno == 1) {
            return ({
                success: true,
                message: "A New Accessory has been Added Successfully",
                data: result.dataValues
            })
        }
        else {
            return ({
                success: false,
                message: "Something Went Wrong...Please try again",
                error: errorResponse(1, 'Unable to Add Accessory Details', result)
            })
        }


    } catch (error) {
        console.log("error occured in addNewAccessory Model--->", error)
        return ({
            success: false,
            message: "Something Went Wrong... Please try again",
            error: errorResponse(1, error.message, error)
        })
    }
}

export const updateAccessoryModel = async (fields) => {
    console.log("Data received in updateAccessoryModel --->", fields);

    try {
        let existingAccessory = await Accessory.findOne({ where: { accessory_id: fields.accessory_id } });
        if (existingAccessory) {
            console.log("existingAccessory Result--->", existingAccessory.dataValues)
            let updateObj = {};
            updateObj.vendor_id = fields.vendor_id ? fields.vendor_id : existingAccessory.vendor_id
            updateObj.name = fields.name ? fields.name : existingAccessory.name
            updateObj.description = fields.description ? fields.description : existingAccessory.description
            updateObj.unit_cost = fields.unit_cost ? fields.unit_cost : existingAccessory.unit_cost
            updateObj.lead_time = fields.lead_time ? fields.lead_time : existingAccessory.lead_time
            let updateRes = await existingAccessory.update(updateObj);

            return ({
                success: true,
                message: "Accessory updated Successfully",
                data: updateRes.dataValues
            })
        }
        else {
            return ({
                success: false,
                message: "Fail !! No Accessory Found",
                error: errorResponse(1, 'Unable to Update Accessory Details', existingAccessory)
            })
        }


    } catch (error) {
        console.log("error occured in updateAccessoryModel--->", error)
        return ({
            success: false,
            message: "Something Went Wrong... Please try again",
            error: errorResponse(1, error.message, error)
        })
    }
}

export const deleteAccessoryModel = async (fields) => {
    try {
        // check the Accessory is exist or not
        let id = fields.accessory_id;
        const result = await Accessory.findOne({ where: { accessory_id: id } });
        console.log("Accessory Result--->", result)
        if (result) {
            let deleteRes = await result.destroy();
            console.log("Delete Accessory REsponse--->",deleteRes)
            return ({
                success: true,
                message: "Accessory Deleted Successfully",
                data: []
            })
        }
        else {
            return ({
                success: false,
                message: "Fail !! No Accessory Found",
                error: errorResponse(1, 'Unable to Delete Accessory Details', result)
            })
        }

    } catch (error) {
        console.log("error occured in deleteAccessoryModel--->", error)
        return ({
            success: false,
            message: "Something Went Wrong... Please try again",
            error: errorResponse(1, error.message, error)
        })
    }
}

// Vehicle Model
export const fetchAllVehicleModel = async (fields) => {
    console.log("Data received in fetchAllVehicleModel --->", fields);

    try {
        const result = await Vehicle.findAll();
        let allVehicle = []
        if (result.length > 0) {
            result.forEach(res => {
                allVehicle.push(res.dataValues)
            })
            return ({
                success: true,
                message: "Vehicle Fetch successfully",
                data: allVehicle
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
        console.log("error occured in fetchAllVehicle Model--->", error)
        return ({
            success: false,
            message: "Something Went Wrong... Please try again",
            error: errorResponse(1, error.message, error)
        })
    }
}

export const fetchSingleVehicleModel = async (fields) => {
    console.log("Data received in fetchSingleVehicleModel --->", fields);
    try {
        let result = await Vehicle.findOne({ where: { vehicle_id: fields.vehicle_id } });
        console.log("Fetch Single Vehicle result--->", result);
        if (result) {
            // if(result.address){
            //     result.address = JSON.parse(result.address)
            // }
            return ({
                success: true,
                message: "Vehicle Details fetch Successfully",
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
        console.log("error occured in fetchSingleVehicleModel--->", error)
        return ({
            success: false,
            message: "Something Went Wrong... Please try again",
            error: errorResponse(1, error.message, error)
        })
    }
}

export const addNewVehicleModel = async (fields) => {
    console.log("Data received in fetchAllVehicleModel --->", fields);

    try {
        let result = await Vehicle.create(fields);
        console.log("create Vehicle result--->", result)
        if (result.uniqno == 1) {
            return ({
                success: true,
                message: "A New Vehicle has been Added Successfully",
                data: result.dataValues
            })
        }
        else {
            return ({
                success: false,
                message: "Something Went Wrong...Please try again",
                error: errorResponse(1, 'Unable to Add Vehicle Details', result)
            })
        }


    } catch (error) {
        console.log("error occured in addNewVehicle Model--->", error)
        return ({
            success: false,
            message: "Something Went Wrong... Please try again",
            error: errorResponse(1, error.message, error)
        })
    }
}

export const updateVehicleModel = async (fields) => {
    console.log("Data received in updateVehicleModel --->", fields);

    try {
        let existingVehicle = await Vehicle.findOne({ where: { vehicle_id: fields.vehicle_id } });
        if (existingVehicle) {
            console.log("existingVehicle Result--->", existingVehicle.dataValues)
            let updateObj = {};
            updateObj.dealer_id = fields.dealer_id ? fields.dealer_id : existingVehicle.dealer_id
            updateObj.vin = fields.vin ? fields.vin : existingVehicle.vin
            updateObj.chassis_no = fields.chassis_no ? fields.chassis_no : existingVehicle.chassis_no
            updateObj.motor_no = fields.motor_no ? fields.motor_no : existingVehicle.motor_no
            updateObj.battery_no = fields.battery_no ? fields.battery_no : existingVehicle.battery_no
            updateObj.color_code = fields.color_code ? fields.color_code : existingVehicle.color_code
            updateObj.mfg_date = fields.mfg_date ? fields.mfg_date : existingVehicle.mfg_date
            updateObj.model_name = fields.model_name ? fields.model_name : existingVehicle.model_name
            updateObj.barcode = fields.barcode ? fields.barcode : existingVehicle.barcode
            updateObj.batch_no = fields.batch_no ? fields.batch_no : existingVehicle.batch_no
            let updateRes = await existingVehicle.update(updateObj);

            return ({
                success: true,
                message: "Vehicle updated Successfully",
                data: updateRes.dataValues
            })
        }
        else {
            return ({
                success: false,
                message: "Fail !! No Vehicle Found",
                error: errorResponse(1, 'Unable to Update Vehicle Details', existingVehicle)
            })
        }


    } catch (error) {
        console.log("error occured in updateVehicleModel--->", error)
        return ({
            success: false,
            message: "Something Went Wrong... Please try again",
            error: errorResponse(1, error.message, error)
        })
    }
}

export const deleteVehicleModel = async (fields) => {
    try {
        // check the Vehicle is exist or not
        let id = fields.vehicle_id;
        const result = await Vehicle.findOne({ where: { vehicle_id: id } });
        console.log("Vehicle Result--->", result)
        if (result) {
            let deleteRes = await result.destroy();
            console.log("Delete Vehicle REsponse--->",deleteRes)
            return ({
                success: true,
                message: "Vehicle Deleted Successfully",
                data: []
            })
        }
        else {
            return ({
                success: false,
                message: "Fail !! No Vehicle Found",
                error: errorResponse(1, 'Unable to Delete Vehicle Details', result)
            })
        }

    } catch (error) {
        console.log("error occured in deleteVehicleModel--->", error)
        return ({
            success: false,
            message: "Something Went Wrong... Please try again",
            error: errorResponse(1, error.message, error)
        })
    }
}

// Service Model

export const fetchAllServiceModel = async (fields) => {
    console.log("Data received in fetchAllServiceModel --->", fields);

    try {
        const result = await Service.findAll();
        let allService = []
        if (result.length > 0) {
            result.forEach(res => {
                allService.push(res.dataValues)
            })
            return ({
                success: true,
                message: "Service Fetch successfully",
                data: allService
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
        console.log("error occured in fetchAllService Model--->", error)
        return ({
            success: false,
            message: "Something Went Wrong... Please try again",
            error: errorResponse(1, error.message, error)
        })
    }
}

export const fetchSingleServiceModel = async (fields) => {
    console.log("Data received in fetchSingleServiceModel --->", fields);
    try {
        let result = await Service.findOne({ where: { service_id: fields.service_id } });
        console.log("Fetch Single Service result--->", result);
        if (result) {
            // if(result.address){
            //     result.address = JSON.parse(result.address)
            // }
            return ({
                success: true,
                message: "Service Details fetch Successfully",
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
        console.log("error occured in fetchSingleServiceModel--->", error)
        return ({
            success: false,
            message: "Something Went Wrong... Please try again",
            error: errorResponse(1, error.message, error)
        })
    }
}

export const addNewServiceModel = async (fields) => {
    console.log("Data received in fetchAllServiceModel --->", fields);

    try {
        let result = await Service.create(fields);
        console.log("create Service result--->", result)
        if (result.uniqno == 1) {
            return ({
                success: true,
                message: "A New Service has been Added Successfully",
                data: result.dataValues
            })
        }
        else {
            return ({
                success: false,
                message: "Something Went Wrong...Please try again",
                error: errorResponse(1, 'Unable to Add Service Details', result)
            })
        }


    } catch (error) {
        console.log("error occured in addNewService Model--->", error)
        return ({
            success: false,
            message: "Something Went Wrong... Please try again",
            error: errorResponse(1, error.message, error)
        })
    }
}

export const updateServiceModel = async (fields) => {
    console.log("Data received in updateServiceModel --->", fields);

    try {
        let existingService = await Service.findOne({ where: { service_id: fields.service_id } });
        if (existingService) {
            console.log("existingService Result--->", existingService.dataValues)
            let updateObj = {};
            updateObj.dealer_id = fields.dealer_id ? fields.dealer_id : existingService.dealer_id
            updateObj.vehicle_id = fields.vehicle_id ? fields.vehicle_id : existingService.vehicle_id
            updateObj.service_date = fields.service_date ? fields.service_date : existingService.service_date
            updateObj.description = fields.description ? fields.description : existingService.description
            updateObj.cost = fields.cost ? fields.cost : existingService.cost
            let updateRes = await existingService.update(updateObj);

            return ({
                success: true,
                message: "Service updated Successfully",
                data: updateRes.dataValues
            })
        }
        else {
            return ({
                success: false,
                message: "Fail !! No Service Found",
                error: errorResponse(1, 'Unable to Update Service Details', existingService)
            })
        }


    } catch (error) {
        console.log("error occured in updateServiceModel--->", error)
        return ({
            success: false,
            message: "Something Went Wrong... Please try again",
            error: errorResponse(1, error.message, error)
        })
    }
}

export const deleteServiceModel = async (fields) => {
    try {
        // check the Service is exist or not
        let id = fields.service_id;
        const result = await Service.findOne({ where: { service_id: id } });
        console.log("Service Result--->", result)
        if (result) {
            let deleteRes = await result.destroy();
            console.log("Delete Service REsponse--->",deleteRes)
            return ({
                success: true,
                message: "Service Deleted Successfully",
                data: []
            })
        }
        else {
            return ({
                success: false,
                message: "Fail !! No Service Found",
                error: errorResponse(1, 'Unable to Delete Service Details', result)
            })
        }

    } catch (error) {
        console.log("error occured in deleteServiceModel--->", error)
        return ({
            success: false,
            message: "Something Went Wrong... Please try again",
            error: errorResponse(1, error.message, error)
        })
    }
}

// Dealer Model

export const fetchAllDealerModel = async (fields) => {
    console.log("Data received in fetchAllDealerModel --->", fields);

    try {
        const result = await Dealer.findAll();
        let allDealer = []
        if (result.length > 0) {
            result.forEach(res => {
                allDealer.push(res.dataValues)
            })
            return ({
                success: true,
                message: "Dealer Fetch successfully",
                data: allDealer
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
        console.log("error occured in fetchAllDealer Model--->", error)
        return ({
            success: false,
            message: "Something Went Wrong... Please try again",
            error: errorResponse(1, error.message, error)
        })
    }
}

export const fetchSingleDealerModel = async (fields) => {
    console.log("Data received in fetchSingleDealerModel --->", fields);
    try {
        let result = await Dealer.findOne({ where: { dealer_id: fields.dealer_id } });
        console.log("Fetch Single Dealer result--->", result);
        if (result) {
            // if(result.address){
            //     result.address = JSON.parse(result.address)
            // }
            return ({
                success: true,
                message: "Dealer Details fetch Successfully",
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
        console.log("error occured in fetchSingleDealerModel--->", error)
        return ({
            success: false,
            message: "Something Went Wrong... Please try again",
            error: errorResponse(1, error.message, error)
        })
    }
}

export const addNewDealerModel = async (fields) => {
    console.log("Data received in fetchAllDealerModel --->", fields);

    try {
        let result = await Dealer.create(fields);
        console.log("create Dealer result--->", result)
        if (result.uniqno == 1) {
            return ({
                success: true,
                message: "A New Dealer has been Added Successfully",
                data: result.dataValues
            })
        }
        else {
            return ({
                success: false,
                message: "Something Went Wrong...Please try again",
                error: errorResponse(1, 'Unable to Add Dealer Details', result)
            })
        }


    } catch (error) {
        console.log("error occured in addNewDealer Model--->", error)
        return ({
            success: false,
            message: "Something Went Wrong... Please try again",
            error: errorResponse(1, error.message, error)
        })
    }
}

export const updateDealerModel = async (fields) => {
    console.log("Data received in updateDealerModel --->", fields);

    try {
        let existingDealer = await Dealer.findOne({ where: { dealer_id: fields.dealer_id } });
        if (existingDealer) {
            console.log("existingDealer Result--->", existingDealer.dataValues)
            let updateObj = {};
            updateObj.name = fields.name ? fields.name : existingDealer.name
            updateObj.location = fields.location ? fields.location : existingDealer.location
            updateObj.email = fields.email ? fields.email : existingDealer.email
            updateObj.phone_number = fields.phone_number ? fields.phone_number : existingDealer.phone_number
            let updateRes = await existingDealer.update(updateObj);

            return ({
                success: true,
                message: "Dealer updated Successfully",
                data: updateRes.dataValues
            })
        }
        else {
            return ({
                success: false,
                message: "Fail !! No Dealer Found",
                error: errorResponse(1, 'Unable to Update Dealer Details', existingDealer)
            })
        }


    } catch (error) {
        console.log("error occured in updateDealerModel--->", error)
        return ({
            success: false,
            message: "Something Went Wrong... Please try again",
            error: errorResponse(1, error.message, error)
        })
    }
}

export const deleteDealerModel = async (fields) => {
    try {
        // check the Dealer is exist or not
        let id = fields.dealer_id;
        const result = await Dealer.findOne({ where: { dealer_id: id } });
        console.log("Dealer Result--->", result)
        if (result) {
            let deleteRes = await result.destroy();
            console.log("Delete Dealer REsponse--->",deleteRes)
            return ({
                success: true,
                message: "Dealer Deleted Successfully",
                data: []
            })
        }
        else {
            return ({
                success: false,
                message: "Fail !! No Dealer Found",
                error: errorResponse(1, 'Unable to Delete Dealer Details', result)
            })
        }

    } catch (error) {
        console.log("error occured in deleteDealerModel--->", error)
        return ({
            success: false,
            message: "Something Went Wrong... Please try again",
            error: errorResponse(1, error.message, error)
        })
    }
}
