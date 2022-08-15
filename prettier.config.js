module.exports = {
  "printWidth": 120,
  "tabWidth": 2,
  "useTabs": false,
  "semi": true,
  "singleQuote": true,
  "trailingComma": "all",
  "bracketSpacing": true,
  "arrowParens": "always",
  "importOrder": [
    "^(react)(.*)$",
    "^(prop-types)$",
    "^(lodash)(.*)$",
    "^@(material-ui)/core/(.*)$",
    "^@(material-ui)/icons/(.*)$",
    "^@(hooks|components|modules|actions|common|reducers|utils|platformCore)/(.*)$",
    "<THIRD_PARTY_MODULES>",
    "^[./]"
  ],
  "importOrderSeparation": false,
  "importOrderSortSpecifiers": true
}
