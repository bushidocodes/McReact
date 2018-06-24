export const McReactInstanceMap = {
  set(key, value) {
    key.__mcreactInternalInstance = value;
    console.log("Saving", key.__mcreactInternalInstance);
  },
  get(key) {
    console.log("Getting", key.__mcreactInternalInstance);
    return key.__mcreactInternalInstance;
  }
};

/**
 * Mutates the prototype of a new McReact component according to the specification
 * passed to McReact.createClass
 *
 * @param {*} Constructor - generic Constructor for a McReact Component
 * @param {*} spec - specification object passed to McReact.createClass
 */
export function mixSpecIntoComponent(Constructor, spec) {
  const proto = Constructor.prototype;

  // Add all enumerables from spec to proto
  for (const key in spec) {
    proto[key] = spec[key];
  }
}
