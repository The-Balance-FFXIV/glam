function textStyling(content, keyPrefix = "") {
  const frontmatter = String(content ?? "")
    .split(/\r?\n\s*\r?\n+/g) // split on one or more blank lines
    .map(s => s.trim())
    .filter(Boolean);

  const hasMarked = typeof window !== "undefined" && window.marked && typeof window.marked.parse === "function";
  const hasPurify = typeof window !== "undefined" && window.DOMPurify && typeof window.DOMPurify.sanitize === "function";

  return frontmatter.map((p, index) => {
    const html = hasMarked ? window.marked.parse(p) : p;
    const safe = hasPurify ? window.DOMPurify.sanitize(html) : html;
    const key = keyPrefix ? `${keyPrefix}-${index}` : index;
    return h("div", { key, class: "markdown", dangerouslySetInnerHTML: { __html: safe } });
  });
}

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

// renders frontmatter fields that contain one or more data subfields, such as FAQs or BIS entries
const renderFrontmatter = function (pField, hField, hType, subfield = "", ...moreSubfields) {
  let storeFrontmatter = Array.isArray(pField) ? pField : (pField != null ? [pField] : []);
  const subfieldsToRender = [subfield, ...moreSubfields].filter(Boolean);

  return h(
    "div",
    {},
    storeFrontmatter.map(function (pField, index) {
      const list = subfieldsToRender.length ? subfieldsToRender : [subfield];
      const entryStyled = list.reduce((acc, sf) => {
        if (typeof sf === "string") {
          return acc.concat(textStyling(pField?.[sf], `rf-${index}-${sf}`));
        }
        return Array.isArray(sf) ? acc.concat(sf) : acc.concat([sf]);
      }, []);
      const entryHeader = String(pField?.[hField]) && String([hType]) !== ""
        ? h(String([hType]), {}, String(pField?.[hField])) // if desired, sets a particular child field as a designated header field
        : null; // will return no header instead if left blank via "", "", or null, null in the renderFrontmatter function call for hField and hType

      return h("div", { key: index },
        entryHeader,
        ...entryStyled
      );
    })
  );
}

const renderBisList = function (bis) {
  const bisEntries = bis;

  return h(
    "div", {}, bisEntries.map(function (bis, index) {
      // variables to prep iframe and description generation
      const type = bis.type;
      const linkString = typeof bis.link === "string" ? bis.link : "";
      const isLink = /^https?:\/\//i.test(linkString);
      let description = textStyling(bis.description);
      let bisFrame;
      let errorDetection = false; // hides description if validation fails

      // decide iframe creation based on type and validate input
      switch(type) {
        case "plain-text":
        case "genericlink":
          bisFrame = textStyling(linkString); // both of these types do not require an iframe
          break;

        case "xivgear": // check for embed link before creating iframe
          const isEmbed = linkString.includes("embed");
          const isXIVGear = linkString.includes("xivgear");
          errorDetection = !isEmbed || !isXIVGear || !isLink;
          bisFrame = isEmbed && isXIVGear && isLink
            ? h("div", { class: "xivgear-iframe-height" }, h("iframe", { src: linkString, class: "w-full h-full" }))
            : h("p", {}, "This XIVGear link does not appear to be a valid embed link. Please check the link.");
          break;

        case "etro": // extract ID from link to create embed link
          const etroId =
            linkString.match(/\/gearset\/([A-Za-z0-9-]+)(?:[?#]|$)/i)?.[1] ||
            (!isLink && linkString ? linkString : null);
          const etroLink = etroId ? `https://etro.gg/embed/gearset/${etroId}` : linkString;
          errorDetection = !etroLink;
          bisFrame = etroLink
            ? h("div", { class: "etro-iframe-height" }, h("iframe", { src: etroLink, class: "w-full h-full" }))
            : h("p", {}, "Please enter a link to the link field.");
          break;

        default: {
          const checkTypeError = linkString.includes("xivgear") || linkString.includes("etro");
          errorDetection = checkTypeError || !isLink;
          bisFrame = !checkTypeError && isLink
            ? h("div", { class: "h-96" }, h("iframe", { src: linkString, class: "w-full h-full" }))
            : h(
                "div",
                {},
                h("p", {}, "An error occurred with the link provided. The link is either invalid, missing, or you are attempting to use Etro/XIVGear links with the wrong type selected."),
                h("p", {}, "Please double check that the link field is not empty, and that the correct link type is selected. Use genericlink or plaintext if you only want a raw text link.")
              )
          break;
        }
      }

      // append a line break to the description or hide it if link errors exist
      description = errorDetection
        ? null
        : (description.length && !["genericlink", "plain-text"].includes(type) // ensures no break appears for empty descriptions
            ? [h("br", { key: "frame-br" }), ...description]
            : description);

      // return an indexed list of <div> elements for each bis entry
      return h(
        "div",
        { key: index, id: `bis-preview-${index}`, },
        renderFrontmatter(bis, "name", "h2", bisFrame, description), // render all bis entries
        h("hr", {})
      );
    })
  )
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

let bisSetTemplate = createClass({
  render: function () {
    const rawBis = this.props.entry.getIn(["data", "bis"]);
    const bis = rawBis?.toJS?.() ?? rawBis ?? [];

    return renderGuideContainer(
      renderBisList(bis)
    );
  },
});

let faqTemplate = createClass({
  render: function () {
    const rawFaq = this.props.entry.getIn(["data", "qna"]);
    const faq = rawFaq?.toJS?.() ?? rawFaq ?? [];

    return renderGuideContainer(
      h("div", {},
        renderFrontmatter(faq, "question", "h2", "answer")
      )
    );
  },
});

let statPriorityTemplate = createClass({
  render: function () {
    const statPriority = this.props.entry.getIn(["data", "priority"]) ?? [];
    const optionalInfo = this.props.widgetFor("body");

    return renderGuideContainer(
      h("div",
       {},
       h("div", {}, statPriority),
       optionalInfo 
        ? h("div", {},
            h("br", {}),
            h("hr", {}),
            h("div", {}, optionalInfo)
          ) 
        : null,
      ),
    );
  },
});
