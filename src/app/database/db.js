import mongoose from 'mongoose'

const config ={
  isConnected: 0,
};

export const connectDb = async ()=>{
  if(config.isConnected){
    return ;
  }
  
    try{
      const {connection} = await mongoose.connect(process.env.MONGO_DB_URL,{dbName : "Work_Manager"})
      console.log("DB Connected");
      console.log("CONNECTION=>",connection.readyState)
      config.isConnected = connection.readyState
      // console.log(connection);
    }
    catch(error){
            console.log("Failed to connect with database");
            console.log("Error",error)
    }
}