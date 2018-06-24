import McReactReconciler from "./McReactReconciler.js";

const McReactInstanceMap = {
  set(key, value) {
    key.__mcreactInternalInstance = value;
  },
  get(key) {
    return key.__mcreactInternalInstance;
  }
};

export default class McReactCompositeComponentWrapper {
  constructor(element) {
    this._currentElement = element;
  }

  mountComponent(container) {
    // Grab the
    const Component = this._currentElement.type;
    const componentInstance = new Component(this._currentElement.props);
    this._instance = componentInstance;

    McReactInstanceMap.set(componentInstance, this);

    // Call the componentWillMount lifecycle hook
    if (componentInstance.componentWillMount) {
      componentInstance.componentWillMount();
    }

    // Mount the component
    const markup = this.performInitialMount(container);

    // Call the componentDidMount lifecycle hook if it exists
    if (componentInstance.componentDidMount) {
      componentInstance.componentDidMount();
    }

    return markup;
  }

  performInitialMount(container) {
    const renderedElement = this._instance.render();

    const child = instantiateMcReactComponent(renderedElement);
    this._renderedComponent = child;
    return McReactReconciler.mountComponent(child, container);
  }

  performUpdateIfNecessary() {
    // we pass the same element as both previous and next in order to communicate that only state is getting updated
    this.updateComponent(this._currentElement, this._currentElement);
  }

  receiveComponent(nextElement) {
    const prevElement = this._currentElement;
    // Make shallow compare here?
    this.updateComponent(prevElement, nextElement);
  }

  updateComponent(prevElement, nextElement) {
    const nextProps = nextElement.props;
    const inst = this._instance;

    const willReceive = prevElement !== nextElement;

    if (willReceive && inst.componentWillReceiveProps) {
      inst.componentWillReceiveProps(nextProps);
    }

    let shouldUpdate = true;

    if (inst.shouldComponentUpdate) {
      shouldUpdate = inst.shouldComponentUpdate(nextProps);
    }

    if (shouldUpdate) {
      this._performComponentUpdate(nextElement, nextProps);
    } else {
      // If skipping update, still set props
      inst.props = nextProps;
    }
  }

  _performComponentUpdate(nextElement, nextProps) {
    this._currentElement = nextElement;
    const inst = this._instance;

    inst.props = nextProps;

    this._updateRenderedComponent();
  }

  _updateRenderedComponent() {
    const prevComponentInstance = this._renderedComponent;
    const inst = this._instance;
    const nextRenderedElement = inst.render();

    McReactReconciler.receiveComponent(
      prevComponentInstance,
      nextRenderedElement
    );
  }
}

/**
 * Looks at the type of an element and determines if it is a DOM primitive or a McReact Component based on if
 * the type is a string or a function
 *
 * @param {Object} element
 * @returns
 */
function instantiateMcReactComponent(element) {
  if (typeof element.type === "string") {
    return new McReactDOMComponent(element);
  } else if (typeof element.type === "function") {
    return new McReactCompositeComponentWrapper(element);
  }
}

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

  receiveComponent(nextElement) {
    const prevElement = this._currentElement;
    this.updateComponent(prevElement, nextElement);
  }

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
