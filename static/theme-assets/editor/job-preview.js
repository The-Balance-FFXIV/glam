let GenericJobGuide = createClass({
  render: function () {
    return h(
      "div",
      { class: "job-guides-container" },
      h("div", { class: "markdown max-w-none" }, this.props.widgetFor("body"))
    );
  },
});
