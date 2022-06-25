let GenericJobGuide = createClass({
  render: function () {
    console.log(
      "perhaps author list?",
      this.props.entry.getIn(["data", "authors"]).map(function (author, index) {
        console.log("individual author:", author);
      })
    );
    return h(
      "div",
      { class: "space-y-16" },
      h(
        "div",
        { class: "responsive-container" },
        h(
          "div",
          { class: "job-guides-container" },
          h(
            "div",
            { class: "markdown max-w-none" },
            this.props.widgetFor("body")
          )
        ),
        h("hr", {}),
        h(
          "div",
          { class: "job-guides-container markdown" },
          h("h1", {}, "Authors"),
          h(
            "ul",
            {},
            this.props.entry.getIn(["data", "authors"]).map(function (author) {
              return h("li", {}, author);
            })
          )
        )
      )
    );
  },
});
