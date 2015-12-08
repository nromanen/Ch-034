define(function(require) {
    "use strict";

    var CMS = require("CMS"),
        ReportModel = require("static/models/reportmessage"),

    View = CMS.View.extend({
        el: false,
        initialize: function(){
            this.templates = {
                agreement : _.template(require("text!../templates/agreementTemplate.html")),
                report : _.template(require("text!../templates/reportTemplate.html"))
            };
        },
        swapTemplate: function(template){
            this.template = this.templates[template];
        },
        events: {
            "click #report_submit"     : "sendReport"
        },
        sendReport: function(e){
            e.preventDefault();
            var reportForm = this.$el.find('.report-form').serializeObject();
            console.log(reportForm);
            this.model.save(reportForm);
        }
    });
    return new View();
});