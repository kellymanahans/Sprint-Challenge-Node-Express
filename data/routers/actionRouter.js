const express = require("express");
const router = express.Router();

const actions = require("../helpers/actionModel.js");

router.post("/", (req, res) => {
    const {project_id, description, notes, completed } = req.body;
    if(!project_id, !description || !completed || !notes){
    }
    else if (description.length > 128){
        res.status(401).json({message: "description must ne less then 128 characters"})
    }
    actions
        .insert({project_id, description, notes, completed})
        .then(response => {
            res.status(201).json(response)
        })
        .catch(err => {
            res.status(500).json({message: "error adding action"})
        })
})

router.get("/", (req, res) => {
    actions
        .get()
        .then(action => {
            res.status(200).json(action);
        })
        .catch (err => {
            res.status(500).json({message:"project not found"});
        })
})

router.get("/:id", (req, res) => {
    const {id} = req.params;
    actions
        .get(id)
        .then(action => {
            if(action){
                res.json(action);
            }
            else {
                res.status(404).json({message: "action does not exist"})
            }
        })
        .catch (err => {
            res.status(500).json({message: "action could not be retrieved"})
        })
})

router.delete("/:id", (req, res) => {
    const {id} = req.params;
    actions
        .remove(id)
        .then(action => {
            if(action){
                res.json({message: "success"});
            }
            else {
                res.status(404).json({message: "action was not removed"})
            }
        })
        .catch (err => {
            res.status(500).json({message: "action could not be retrieved"})
        })
})

router.put("/:id", (req, res) => {
    const {id} = req.params;
    const {project_id} = req.params;
    const {description, notes, completed } = req.body;
    if (project_id, description, notes, completed){
        actions
        .update(id, {project_id, description, notes, completed})
        .then(action => {
            if (action[0]) {
                action.get(id)
                .then(action => {
                    res.json(action);
                });
            }
            else {
                res.json({ message: "Success" });
            }
        })
        .catch( err => {
            res
            .status(500)
            .json({errorMessage : 'action could not be retrieved'});
        });
}});

module.exports = router;