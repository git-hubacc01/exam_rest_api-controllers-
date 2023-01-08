import User from '../models/User.js'
import bcrypt from 'bcrypt'

export const getUsers = async (req, res) => {
    try {
        const users = await User.find()
        if (users.length !== 0)
            res.status(200).json(users)
        else
            res.status(204).send()
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

export const getUser = async (req, res) => {
    try {
        const { id } = req.params
        const user = await User.findById(id)
        if (user)
            res.status(200).json(user)
        else
            res.status(404).json({ error: 'resource not found' })
    } catch (err) {
        res.status(404).json({ error: err.message })
    }
}

export const deleteUser = async (req, res) => {
    try {
        await User.deleteOne({ _id: req.params.id })
        res.status(204).send()   
    } catch (err) {
        console.log(err)
        res.status(484).json({ error: err.message })
    }  
}

export const updateUser = async (req, res) => { 
    try {
        const filter = { _id: req.params.id }
        const { firstName, lastName, email, password } = req.body
        const salt = await bcrypt.genSalt() 
        const encryptedPassword = await bcrypt.hash (password, salt)
     
        const update = {
            firstName,
            lastName,
            email,
            password: encryptedPassword
        }
    
        await User.findOneAndUpdate(filter, update)
        res.status(204).send()    
    } catch (err) {
        console.log(err)
        res.status(404).json({ error: err.message })
    }   
}