

import mongoose  from "mongoose";

// Creating student schma
const studentSchma = mongoose.Schema({

    name : {
        type : String,
        require : true,
        trim : true
    },
    email : {
        type : String,
        require : true,
        unique : true,
        trim : true
    },
    call : {
        type : String,
        require : true,
        trim : true
    },
    age : {
        type : Number,
        require : true,
    },
    gender : {
        type : String
    },
    username : {
        type : String,
        require : true,
        unique : true,
        trim : true
    },
    password : {
        type : String,
        require : true,
        trim : true
    },
    photo : {
        type : String,
    },
    status : {
        type : Boolean,
        default : true
    },
    trash : {
        type : Boolean,
        default : false
    },
    isAdmin : {
        type : Boolean,
        default : false
    }

},{
    timestamps: true
})




// Exports modal
export default mongoose.model('Students',studentSchma)