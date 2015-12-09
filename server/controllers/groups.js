var express = require("express"),
    router = express.Router(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    Group = require("../models/group");

router.get("/", function(req, res) {
    Group.find({})
        .sort("order")
        .exec(function(err, groups) {
            if (err) throw err;
            return res.json(groups);
        });
});
router.post("/", function(req, res) {
  
    var group = new Group({ 
        name: req.body.name,
    });

    group.save(function(err) {
        if (err) throw err;
        return res.json({ success: true });
    });
});
router.get("/:id", function(req, res) {
    Group.findById(req.params.id, function(err, group) {
        if (err) throw err;
        return res.json(group);
    });
});
router.put("/:id", function(req, res) {

    Group.findByIdAndUpdate({_id: req.params.id}, {name: req.body.name}, function(err, group) {
      if (err) return handleError(err);
      return res.json(group);
    });
});
router.delete("/:id", function(req, res) {
    Group.findByIdAndRemove({_id: req.params.id}, function(err) {
        if (err) throw err;
        return res.json({success: true, message: "group deleted successfully"});
    });
});

module.exports = router