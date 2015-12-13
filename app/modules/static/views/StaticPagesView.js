define(function(require) {
    "use strict";

    var CMS = require("CMS"),
        ReportModel = require("../models/reportmessage"),

    View = CMS.View.extend({
        el: false,
        initialize: function(){
            this.templates = {
                agreement : _.template(require("text!../templates/agreementTemplate.html")),
                report : _.template(require("text!../templates/reportTemplate.html"))
            };
            this.succesModal = new CMS.ModalView({model: this.model});
        },
        swapTemplate: function(template){
            this.template = this.templates[template];
        },
        events: {
            "click #report_submit"     : "sendReport"
        },
        sendReport: function(e){
            var _this = this;
            e.preventDefault();
            this.model = new ReportModel();
            var reportForm = this.$el.find('.report-form').serializeObject();
            var data = new FormData();
            data.append("email", $("input[type='email'")[0].value);
            data.append("name", $("input[name='name'")[0].value);
            data.append("text", $("textarea[name='text'")[0].value);
            data.append("file", $("#reportFile")[0].files[0]);

            this.model.save(null, {
                data: data,
                contentType: false,
                processData: false,
                success: function() {
                    _this.succesModal.render();
                    _this.succesModal.showSuccessMesasage('Дякуємо, ваше зауваження прийнято в обробку!');
                    _this.succesModal.show();
                },
                error: function() {
                    _this.succesModal.render();
                    _this.succesModal.showSuccessMesasage('Щось си трапилоси!');
                    _this.succesModal.show();
                }
            });
        }
    });
    return new View();
});