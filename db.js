const mongoose = require('mongoose');
const mongoURI = 'mongodb+srv://GoFoodmern:GoFoodmern@cluster0.x8brkvq.mongodb.net/GoFoodmern?retryWrites=true&w=majority';

// Function to establish MongoDB connection
const connectToMongoDB = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

        // Log once connection is established
        console.log("MongoDB connected");

        // Access the "fooddata" collection
        const FoodData = mongoose.connection.db.collection("fooddata");

        // Fetch data from the "fooddata" collection
        const foodData = await FoodData.find({}).toArray();

        // Log the fetched data from "fooddata" collection
        console.log("Fetched data from fooddata collection:", foodData);

        // Access the "foodcategory" collection
        const FoodCategory = mongoose.connection.db.collection("foodcategory");

        // Fetch data from the "foodcategory" collection
        const foodCategoryData = await FoodCategory.find({}).toArray();

        // Log the fetched data from "foodcategory" collection
        console.log("Fetched data from foodcategory collection:", foodCategoryData);

        // Store the fetched data in global variables if needed
        global.FoodData = foodData;
        global.FoodCategoryData = foodCategoryData;

    } catch (err) {
        // Handle connection errors
        console.error("MongoDB connection error:", err);
    }
};

// Export the function to connect to MongoDB
module.exports = connectToMongoDB;
