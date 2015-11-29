var express = require("express"),
    router = express.Router(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    Menu = require("../models/menu"),
    MenuLink = require("../models/menuLink");

router.get("/", function(req, res) {
    Menu
        .find()
        .populate({
            path: "_menuLinks",
            match: {access: req.authUser.role}
        })
        .exec(function(err, menus) {
            if (err) throw err
            return res.json(menus);
        });
});
router.post("/", function(req, res) {
    var menu = new Menu({
        title: req.body.title
    });
    menu.save(function(err) {
        if (err) throw err
        return res.json({success: true, message: "Menu added successfully"})
    });
})
router.get("/:id", function(req, res) {
    Menu
        .findById(req.params.id)
        .populate({
            path: "_menuLinks",
            match: {access: req.authUser.role}
        })
        .exec(function(err, menu) {
            return res.json(menu);
        });
});
router.put("/:id", function(req, res) {
    Menu
        .findByIdAndUpdate(req.params.id, req.body, function(err) {
            if (err) throw err
            return res.json({success: true, message: "Menu updated successfully"});
        });
});
router.delete("/:id", function(req, res) {
    Menu
        .findByIdAndRemove(req.params.id, function(err) {
            if (err) throw err
            return res.json({success: true, message: "Menu deleted successfully"});
        });
});
router.get("/:menuId/links", function(req, res) {
    Menu
        .findById(req.params.menuId)
        .populate({
            path: "_menuLinks",
            match: {access: req.authUser.role}
        })
        .exec(function(err, menu) {
            if (err) throw err
            return res.json(menu._menuLinks);
        })
})
router.post("/:menuId/links", function(req, res) {
    var link = new MenuLink({
        name: req.body.name,
        published: req.body.published,
        access: req.body.access,
        url: req.body.url
    });
    link.save(function(err, link) {
        if (err) throw err
            Menu.findByIdAndUpdate(req.params.menuId, {$push: {_menuLinks: link._id}}, function(err) {
                return res.json({success: true, message: "Menu Link added successfully"})
            });
    });
})

router.get("/:menuId/links/:linkId", function(req, res) {
    MenuLink
        .findById(req.params.linkId, function(err, link) {
            return res.json(link);
        });
});
router.put("/:menuId/links/:linkId", function(req, res) {
    MenuLink
        .findByIdAndUpdate(req.params.linkId, req.body, function(err) {
            if (err) throw err
            return res.json({success: true, message: "Menu updated successfully"});
        });
});
router.delete("/:menuId/links/:linkId", function(req, res) {
    MenuLink
        .findByIdAndRemove(req.params.linkId, function(err) {
            if (err) throw err
            return res.json({success: true, message: "Menu deleted successfully"});
        });
});
module.exports = router;