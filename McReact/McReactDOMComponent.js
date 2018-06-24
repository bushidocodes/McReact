/**
 * Renderer Analogous to React-DOM
 *
 * @export
 * @class McReactDOMComponent
 */
class McReactDOMComponent {
  constructor(element) {
    this._currentElement = element;
  }

  /**
   * Creates a physical DOM node and mounts to the DOM node container
   *
   * @param {*} container
   * @returns
   * @memberof McReactDOMComponent
   */
  mountComponent(container) {
    const domElement = document.createElement(this._currentElement.type);
    const text = this._currentElement.props.children;
    const textNode = document.createTextNode(text);
    domElement.appendChild(textNode);
    container.appendChild(domElement);

    this._hostNode = domElement;
    return domElement;
  }

  /**
   * Invoked by Reconciler
   * Grabs this._currentElement triggers updateComponent
   *
   * @param {*} nextElement
   * @memberof McReactDOMComponent
   */
  receiveComponent(nextElement) {
    const prevElement = this._currentElement;
    this.updateComponent(prevElement, nextElement);
  }

  /**
   * Diffs the DOM properties and children and updates the physical DOM of this node as needed
   * Sets this._currentElement to nextElement
   *
   * @param {*} prevElement
   * @param {*} nextElement
   * @memberof McReactDOMComponent
   */
  updateComponent(prevElement, nextElement) {
    const lastProps = prevElement.props;
    const nextProps = nextElement.props;

    this._updateDOMProperties(lastProps, nextProps);
    this._updateDOMChildren(lastProps, nextProps);

    this._currentElement = nextElement;
  }

  _updateDOMProperties(lastProps, nextProps) {
    // Unimplemented. This is where we would update the attributes of the physical DOM node
    // This would be where we set inline styles for example
  }

  /**
   * Updates the Text Content only if different from previous set of props
   * Also clears if children is empty
   *
   * @param {*} lastProps
   * @param {*} nextProps
   * @memberof McReactDOMComponent
   */
  _updateDOMChildren(lastProps, nextProps) {
    // Update the text content inside the DOM node
    const lastContent = lastProps.children;
    const nextContent = nextProps.children;

    if (!nextContent) {
      this.updateTextContent("");
    } else if (lastContent !== nextContent) {
      this.updateTextContent("" + nextContent);
    }
  }

  /**
   * Updates the text inside of a leaf node on the VDOM
   *
   * @param {string} text
   * @memberof McReactDOMComponent
   */
  updateTextContent(text) {
    const node = this._hostNode;

    const firstChild = node.firstChild;

    // if there is only a single child of type Node.TEXT_NODE, we can safely update the value
    if (
      firstChild &&
      firstChild === node.lastChild &&
      firstChild.nodeType === 3
    ) {
      firstChild.nodeValue = text;
    }
  }
}

export default McReactDOMComponent;
