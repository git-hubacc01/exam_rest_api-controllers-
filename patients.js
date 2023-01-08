import Ward from "../models/Ward.js"

export const getPatients = async (req, res) => {
    try { 
        const ward = await Ward.findById(req.params.wardId) 
        const { room, address } = req.query

        if (room) {
            ward.patients = ward.patients.filter((item) => item.room == room)
        }
        if (address) {
            ward.patients = ward.patients.filter((item) => item. address == address)
        }

        if (ward.patients.length !== 0) 
            res.status(200).json(ward.patients)
        else
            res.status(284).send()
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

export const getPatient = async (req, res) => {
    try {
        const {wardId, id } = req.params
        const ward = await Ward.findById(wardId)  
        const patient = ward.patients.id(id)  
        if (patient)   
            res.status(200).json(patient)  
        else  
            res.status(404).json({ error: 'resource not found' }) 
    } catch (err) { 
        res.status(500).json({ error: err.message }) 
    }
}

export const addPatient = async (req, res) => {
    try {
        const newPatient = req.body   
        const ward = await Ward.findById(req.params.wardId)   
        ward.patients.push(newPatient)   
        await ward.save()   
        const idNewPatient = ward.patients[ward.patients.length-1]._id 
        res.status(201).json({ id: idNewPatient })  
    } catch (err) {   
        res.status(500).json({ error: err.message })   
    }    
}    
   
export const deletePatient = async (req, res) => {
    try {   
        const {wardId, id } = req.params 
        const ward = await Ward.findById(wardId) 
        ward.patients.id(id).remove();  
        await ward.save() 
        res.status(204).send()   
    } catch (err) {  
        console.log(err)  
        res.status(404).json({ error: err.message })  
    }   
}

export const updatePatient = async (req, res) => {
    try { 
        const {wardId, id } = req.params   
        const ward = await Ward.findById(wardId)  
     
        const {code, patientName, address, age, bloodType, medicalHistory } = req.body 
        ward.patients.id(id).code = code  
        ward.patients.id(id).patientName = patientName
        ward.patients.id(id).address = address 
        ward.patients.id(id).age = age 
        ward.patients.id(id).bloodType = bloodType  
        ward.patients.id(id).bloodType = bloodType 
       
        await ward.save() 
        res.status(204).send() 
    } catch (err) { 
        console.log(err)  
        res.status(404).json({ error: err.message })  
    }   
}
    
 