import mongoose, { Schema } from "mongoose";

const appSubscriptionSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
},{timestamps:true})

export const AppSubscription = mongoose.model("AppSubscription",appSubscriptionSchema)