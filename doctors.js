import Doctor from "../models/Doctor.js"

export const getDoctors = async (req, res) => {
    try {
        const doctors = await Doctor.find()
        if (doctors.length !== 0) 
            res.status(200).json(doctors)
        else
            res.status(284).send()
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

export const getDoctor = async (req, res) => {
    try {
        const {id} = req.params
        const doctor = await Doctor.findById(id)
        if (doctor)
            res.status(200).json(doctor)
        else
            res.status(404).json({ error: 'resource not found' })
    } catch (err) {
            res.status(500).json({ error: err.message })
    }
}

export const addDoctor = async (req, res) => {
    try {
        const { code, fullName, doctorSpecialist, specialization } = req.body
        const newDoctor = await Doctor.create({  
            code,
            fullName, 
            doctorSpecialist,  
            specialization 
        }) 
        const savedDoctor = await newDoctor.save() 
        res.status(201).json({ id: savedDoctor._id })  
    } catch (err) { 
        res.status(500).json({ error: err.message })  
    } 
 }

export const deleteDoctor = async (req, res) => {
    try { 
        await Doctor.deleteOne({ _id: req.params.id })    
        res.status(204).send()   
    } catch (err) {  
        console.log(err)   
        res.status(404).json({ error: err.message })
    }
}  

export const updateDoctor = async (req, res) => {
    try {
        const filter = { _id: req.params.id} 
        const { code, fullName, doctorSpecialist } = req.body 
        const update = {  
            code: code,  
            fullName: fullName, 
            doctorSpecialist: doctorSpecialist 
    }

        await Doctor.findOneAndUpdate(filter, update)
        res.status(204).send()
    } catch (err) {
        console.log(err)
        res.status(404).json({ error: err.message })
    } 
}