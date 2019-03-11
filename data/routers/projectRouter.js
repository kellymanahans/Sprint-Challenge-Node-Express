const express = require('express');
const projects = require('../helpers/projectModel.js');
const router = express.Router();

router.post("/", (req, res) => {
    const {name, description, completed } = req.body;
    if(!name || !description || completed){
        res.status(401).json({message: "could not add project"})
    }
    else if (name.length > 128){
        res.status(401).json({message: "name must ne less then 128 characters"})
    }
    projects
        .insert({name, description, completed})
        .then(response => {
            res.status(201).json(response)
        })
        .call(err => {
            res.status(500).json({message: "error adding project"})
        })
})

router.get("/", (req, res) => {
    projects
        .get()
        .then(project => {
            res.status(200).json(project);
        })
        .catch (err => {
            res.status(500).json({message:"project not found"});
        })
})

router.get("/:id", (req, res) => {
    const {id} = req.params;
    projects
        .get(id)
        .then(project => {
            if(project){
                res.json(project);
            }
            else {
                res.status(404).json({message: "project does not exist"})
            }
        })
        .catch (err => {
            res.status(500).json({message: "project could not be retrieved"})
        })
})

router.delete("/:id", (req, res) => {
    const {id} = req.params;
    projects
        .remove(id)
        .then(project => {
            if(project){
                res.json({message: "success"});
            }
            else {
                res.status(404).json({message: "project was not removed"})
            }
        })
        .catch (err => {
            res.status(500).json({message: "project could not be retrieved"})
        })
})

router.put("/:id", (req, res) => {
    const {id} = req.params;
    const newProject = req.body;
        projects
        .update(id, newProject)
        .then(project => {
            if (project) {
                projects.getProjectActions(id)
                .then(project => {
                    res.json(project);
                });
            }
            else {
                res.status(404).json({ message: "The project with the specified ID does not exist." });
            }
        })
        .catch( err => {
            res
            .status(500)
            .json({errorMessage : 'project could not be retrieved'});
        });
});

module.exports = router;