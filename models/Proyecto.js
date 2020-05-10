const mongoose = require('mongoose');

//schema
const ProyectosSchema= mongoose.Schema({
    nombre:{
        type: String,
        require: true,
        trim: true
    },
    creador:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario'
       
    },
    creacion:{
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Proyecto',ProyectosSchema);