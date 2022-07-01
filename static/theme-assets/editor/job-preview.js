const renderGuideContainer = function (body, ...children) {
  return h(
    "div",
    { class: "space-y-16" },
    h(
      "div",
      { class: "responsive-container" },
      h(
        "div",
        { class: "job-guides-container" },
        h("div", { class: "markdown max-w-none" }, body)
      ),
      ...children
    )
  );
};

const renderAuthorList = function (authors) {
  let authorList = authors ?? [];
  return h(
    "div",
    { class: "job-guides-container markdown" },
    h("h1", {}, "Authors"),
    h(
      "ul",
      {},
      authorList.map(function (author) {
        return h("li", {}, author);
      })
    )
  );
};

let GenericJobGuide = createClass({
  render: function () {
    const authors = this.props.entry.getIn(["data", "authors"]);

    return renderGuideContainer(
      this.props.widgetFor("body"),
      h("hr", {}),
      renderAuthorList(authors)
    );
  },
});
