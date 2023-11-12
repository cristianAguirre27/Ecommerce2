const db = require('../db.js')

const createItems = async(req,res) =>{
    try {
        await db.collection('products').doc().create({name:req.body.name, price:req.body.price})
        return res.status(204).json()
    } catch (error) {
        return res.status(500).send(error)
    }
}

const updateItems = async(req,res) => {
    try {
        const doc = db.collection('products').doc(req.params.id);
        await doc.update({
            name:req.body.name,
            price:req.body.price
        })
        return res.status(200).json()
    } catch (error) {
        return res.status(500).json()
    }
}

const showItems = async(req,res) => {
    try {
        const prods = db.collection('products');
        const snapshot = await prods.get();
        const docs = snapshot.docs;

        const response = docs.map((doc)=>({
            id:doc.id,
            name:doc.data().name,
            price:doc.data().price
        }))

        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json()
    }
}

const showOneItem = async(req,res) => {
    try {
        const doc = db.collection('products').doc(req.params.id);
        const item = await doc.get();
        const response = item.data();
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).send(error);
    }
}

const deleteItem = async(req,res) => {
    try {
        const doc = db.collection("products").doc(req.params.id);
        await doc.delete();
        return res.status(200).json();
    } catch (error) {
        return res.status(500).json();
    }
}

module.exports = {
    createItems,
    updateItems,
    showItems,
    showOneItem,
    deleteItem
}