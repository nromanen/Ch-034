!(function () {
  "use strict"

  $.fn.serializeObject = function () {
    var arr = this.serializeArray()

    return _.reduce(arr, function (memo, f) {
      var objField = _.reduceRight(f.name.replace(/\[/g, ".").replace(/\]/g, "").split("."), function (memo, p) {
        if (/^[0-9]+$/.test(p)) {
          var n = []
        } else {
          var n = {}
        }

        n[p] = memo
        return n
      }, f.value)

      $.extend(true, memo, objField)
      return memo
    }, {})
  }
})(jQuery)