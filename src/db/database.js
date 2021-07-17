import mongoose from 'mongoose';

function connection() {
    mongoose.connect("mongodb://localhost:27017/taskify-db", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connexion réussie");
}).catch(() => {
    console.log("Connexion échouée");    
})
}

export default connection