import mongoose from "mongoose"

const chitSchema = mongoose.Schema({
    message: String,
    name: String,
    timestamp: String,
    received: Boolean,
})

export default mongoose.model('messagecontents', chitSchema);