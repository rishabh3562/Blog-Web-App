const mongoose = require("mongoose");
const uri = "mongodb+srv://dubeyrishabh108:ErJ7P93d9W9O93YC@cluster0.dt16gkh.mongodb.net/?retryWrites=true&w=majority";
module.exports = async () => {
    const connectionParams = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    };
    try {
        await mongoose.connect(uri, connectionParams);
        console.log("connected to database successfully");
    } catch (error) {
        console.log("could not connect to database.", error);
    }
};