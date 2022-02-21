const dropwdown = document.getElementById("dropdown");

dropwdown.addEventListener("click", (e) => {
  const nodes = dropwdown.childNodes;
  nodes.forEach((node) => {
    if (node.id === "show") {
      node.id = "hide";
    } else {
      node.id = "show";
    }
  });
});
