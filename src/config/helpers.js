function getPropByPath(parent, path) {
  if (!path) return parent;

  let props = path.split('.');
  let iLen = props.length - 1;
  let name = props[iLen];
  let i;

  for (i = 0; i < iLen; i++) {
    let prop = props[i];
    let candidate = parent[prop];

    if (candidate !== undefined) {
      parent = candidate;
    } else {
      break;
    }
  }
  const value = parent[props[i]];
  return { parent, name, value };
}

function setPropByPath(object, path, value) {
  const fields = path.split('.');
  const last = fields.pop();
  let current = object;

  fields.forEach(field => {
    if (typeof current[field] !== 'object')
      current[field] = {};
    current = current[field];
  });

  current[last] = value;

  return object;
}

module.exports = { getPropByPath, setPropByPath };