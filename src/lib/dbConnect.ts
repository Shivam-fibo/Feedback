
import mongoose from 'mongoose'


type ConnectionObject = {
    isConneted ? : number
}

const connetion : ConnectionObject = {}


export async function dbConnect () : Promise<void> {

    // first check ki databse conneted hai kya?

     if(connetion.isConneted)
     {
        console.log("Database is already conneted")
        return
     }

     try {
       const db =  await mongoose.connect(process.env.MONGODB_URI || '')
       console.log(db.connections)
       console.log(db)
       connetion.isConneted = db.connections[0].readyState

       console.log("DB conneted success");
     } catch (error) {

        console.log("Database connetinon is faild", error)
        process.exit(1)
     }
}