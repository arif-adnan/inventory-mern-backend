const OTPSModel = require("../../models/Users/OTPSModel");

const UserResetPassService= async (Request,DataModel) => {
    let email = Request.body['email'];
    let OTPCode = Request.body['OTP'];
    let NewPass =  Request.body['password'];
    let statusUpdate=1;

    try {
        // first process of database
        let OTPUsedCount = await OTPSModel.aggregate([
            {$match: {email: email, otp: OTPCode, status: statusUpdate}}, {$count: "total"}
        ])

        if (OTPUsedCount.length>0) {
            // second process of database
            let PassUpdate = await DataModel.updateOne({email: email},{password: NewPass})
            return {status: "success", data: PassUpdate}
        }
        else {
            return {status: "fail", data: "Invalid Request"}
        }
    }
    catch (error) {
        return {status: "fail", data: error.toString()}
    }
}

module.exports=UserResetPassService;


