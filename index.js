import McReact from "./McReact/McReact.js";

// Hello World Example

// McReact.render(
//   McReact.createElement("h1", null, "Hola Mundo!"),
//   document.querySelector("#root")
// );

// Ticking clock demonstrating updating of ReactDOMComponent

// setInterval(() => {
//   McReact.render(
//     McReact.createElement("h1", null, new Date()),
//     document.querySelector("#root")
//   );
// }, 1000);

const MyTitle = McReact.createClass({
  render() {
    return McReact.createElement("h1", null, this.props.message);
  }
});
const MyTitleSmall = McReact.createClass({
  render() {
    return McReact.createElement("h3", null, this.props.message);
  }
});

McReact.render(
  McReact.createElement(MyTitle, { message: "Wut up McReact?" }),
  document.querySelector("#root")
);

setTimeout(
  () =>
    McReact.render(
      McReact.createElement(MyTitleSmall, { message: "Get nutty!" }),
      document.querySelector("#root")
    ),
  2000
);
