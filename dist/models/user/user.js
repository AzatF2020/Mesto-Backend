import { Schema, model } from "mongoose";
const userSchema = new Schema({
    name: {
        type: "String",
        required: true,
        min: 2,
        max: 30,
    },
    about: {
        type: "String",
        required: true,
        min: 2,
        max: 300,
    },
    avatar: {
        type: "String",
        required: true,
    }
});
export default model("user", userSchema);
