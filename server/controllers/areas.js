var express = require("express"),
    router = express.Router(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    Area = require("../models/area");

router.post("/", function(req, res) {
  
    var area = new Area({ 
        name: req.body.name,
    });

    area.save(function(err) {
        if (err) throw err;
        return res.json({ success: true });
    });
});
router.delete("/:id", function(req, res) {
    Area.findByIdAndRemove({_id: req.params.id}, function(err) {
        if (err) throw err;
        return res.json({success: true, message: "Area deleted successfully"});
    });
});
router.put("/:id", function(req, res) {

    Area.findByIdAndUpdate({_id: req.params.id}, {name: req.body.name}, function(err, area) {
      if (err) return handleError(err);
      return res.json(area);
    });
});
router.get("/", function(req, res) {
    Area.find({})
        .sort("order")
        .exec(function(err, areas) {
            if (err) throw err;
            return res.json(areas);
        });
});
router.get("/:id", function(req, res) {
    Area.findById(req.params.id, function(err, area) {
        if (err) throw err;
        return res.json(area);
    });
});

module.exports = router