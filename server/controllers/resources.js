var express = require("express"),
    router = express.Router({mergeParams: true}),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    Resource = require("../models/resource"),
    Module = require("../models/module");

router.get("/", function(req, res) {
    Resource
        .find({"_module": req.params.moduleId})
        .exec(function(error, resources) {
            if (error) throw error
            return res.json(resources);
        });
});

router.get("/:resourceId", function(req, res) {
    Resource
        .findOne({"_id": req.params.resourceId})
        .exec(function(error, resources) {
            if (error) throw error
            return res.json(resources);
        });
});

router.delete('/:resourceId', function(req, res) {
    Resource
        .findByIdAndRemove({_id: req.params.resourceId})
        .exec(function(error) {
            if (error) throw error
            Module.findOneAndUpdate({_id: req.params.moduleId}, {$pull: {_resources: req.params.resourceId}}, function(error) {
                if (error) throw error
            });
            return res.json({success: true, message: "Resource is deleted successfully"});
        });
});

router.post("/", function(req, res) {
    var resource = new Resource({ 
        name: req.body.name,
        type: req.body.type,
        url: req.body.url,
        _module: req.body.moduleId
    });

    resource.save(function(error, resource) {
        if (error) throw error
        Module.findOneAndUpdate({_id: req.body.moduleId}, {$push: {_resources: resource.id}}, function(error) {
            if (error) throw error
        });
        return res.json({success: true, message: "Resource is created successfully"});
    });
});

router.put('/:resourceId', function(req, res) {
    Resource
        .findByIdAndUpdate({_id: req.params.resourceId}, req.body, function(error, resource) {
            if (error) throw error
            return res.json(resource);
        });
});

module.exports = router