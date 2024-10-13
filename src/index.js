import app from "./app.js";
//Uso de llaves por el uso de export 
import {connectDB} from "./db.js";

connectDB();
app.listen(4000)
console.log('Server en puerto', 4000)
