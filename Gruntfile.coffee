module.exports = ->

  # Load task configurations.
  @loadTasks "build/tasks"

  # When running the default Grunt command, just lint the code.
  @registerTask "default", [
    "clean"
    "jshint"
    "processhtml"
    "copy"
    "requirejs"
    "styles"
    "cssmin"
  ]
