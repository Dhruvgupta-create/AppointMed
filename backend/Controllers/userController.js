import User from "../models/UserSchema.js";
import Booking from "../models/BookingSchema.js"
import Doctors   from "../models/DoctorSchema.js"

export const updateUser = async (req, res) => {
  const id = req.params.id;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Successfully updated",
      data: updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update!",
      data: updateUser,
    });
  }
};

export const deleteUser = async (req, res) => {
  const id = req.params.id;

  try {
    await User.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Successfully deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete!",
      data: updateUser,
    });
  }
};

export const getSingleUser = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await User.findById(id).select("-password"); // Query the user by ID

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "No User Found!",
      });
    }

    res.status(200).json({
      success: true,
      message: "User Found",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve user!",
      data: error,
    });
  }
};

export const getAllUser = async (req, res) => {
  try {
    const users = await User.find().select("-password");

    res.status(200).json({
      success: true,
      message: "Users Found",
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve users!",
      data: error.message, // Corrected error handling
    });
  }
};


export const getUserProfile =async(req,res)=>{
  const userId=req.userId;

  try {

    const user=await User.getElementById(userId);

    if(!user){
      return res.status(404).json({success:false,message:'user not found'})
    }

    const {password, ...rest}=user._doc;
    res.status(200).json({success:true,message:'profile info is getting',data:{...rest}});
    
  } catch (err) {
    res.status(500).json({success:false,message:'something went wrong cannot get'});
  }
}

export const getMyAppointments= async(req,res) =>{
  try {
    
    //step1: retrive  appointments from booking for specific user
    const bookings=await  Booking.find({user:req.userId});

    //step 2: extract doctors ids from appointment bookings
    const doctorIds=bookings.map(el => el.doctor.Id);

    //step 3: retrive doctors from doctor id
    const doctors= await Doctors.find({_id : {$in:doctorIds}}).select('-password');

     res.status(200).json({success:true,message:'Appointments are getting',data:doctors})

  } catch (err) { 
    res.status(500).json({success:false,message:'something went wrong cannot get'});
    
  }
}