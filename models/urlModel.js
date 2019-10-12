import mongoose, {Schema} from "mongoose";

const urlSchema = new Schema({    
    url:{ type: String,  maxlength: 2048, required: true },
    title:{ type: String,  maxlength: 255 },
    short_url:{ type: String,  maxlength: 50, required: true, unique: true },
    seq: { type:Number, default: 1 },
    date: { type:Date, default: Date.now },
});

const urlModel = mongoose.model("url", urlSchema);

export default urlModel;