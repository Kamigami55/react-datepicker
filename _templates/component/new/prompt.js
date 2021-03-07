// see types of prompts:
// https://github.com/enquirer/enquirer/tree/master/examples
//
module.exports = [
  {
    type: 'select',
    name: 'componentType',
    message: 'Select component type: ',
    choices: ['atoms', 'molecules', 'organisms', 'templates', 'pages'],
  },
  {
    type: 'input',
    name: 'componentName',
    message: 'Enter component name (ex: StyledButton): ',
  },
]
