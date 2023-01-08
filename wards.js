import Ward from '../models/Ward.js'

export const getWards = async (req, res) => {
    try {
        const wards = await Ward
            .find({ doctorId: req.params.doctorId })
            .populate('doctorId')
            .select('version doctorSpecialist doctorId')
        if (ward.length !== 0) 
            res.status(200).json(wards)
        else
            res.status(204).send()
    } catch (err) { 
        res.status(500).json({ error: err.message })
    }
}

export const getWard = async (req, res) => {
    try { 
        const {id} = req.params   
        const ward = await Ward.findById(id)  
            .populate('doctorId')  
            .select('version doctorSpecialist doctorId')    
        if (ward)   
            res.status(200).json(ward)   
        else   
            res.status(404).json({ error: 'resource not found' })   
    } catch (err) { 
        res.status(500).json({ error: err.message })  
    }  
 }

 export const addWard = async (req, res) => {
    try {
        const {version, doctorSpecialist } = req.body 
        const doctorId = req.params.doctorId 
        const newWard = await Ward.create({ 
            version,
            doctorSpecialist,   
            doctorId  
        })  
        const savedWard = await newWard.save() 
        res.status(201).json({ id: savedWard._id }) 
    } catch (err) {
        res.status(500).json({ error: err.message }) 
    }
}
  
export const deleteWard = async (req, res) => {
    try { 
        await Ward.deleteOne({ 
            doctorId: req.params.doctorId,
            _id: req.params.id
        })
        res.status(204).send() 
    } catch (err) { 
        res.status(404).json({ error: err.message })  
    } 
}

export const updateWard = async (req, res) => {
    try {
        const filter = {
            doctorId: req.params.doctorid, 
            _id: req.params.id
    }
        const {version, doctorSpecialist } = req.body 
        const update = { 
            version: version, 
            doctorSpecialist: doctorSpecialist 
        }

        await Ward.findOneAndUpdate(filter, update) 
        res.status(204).send() 
    } catch (err) { 
        console.log(err)  
        res.status(404).json({ error: err.message })   
    }
}  
