module.exports = {
  extends: 'stylelint-config-standard',
  syntax: 'less',
  rules: {
    'selector-pseudo-class-no-unknown': [
      true,
      { ignorePseudoClasses: ['global', 'local'] },
    ],
    'no-descending-specificity': null,
    'selector-class-pattern': [
      // 命名规范 -
      '^([a-zA-Z][a-z0-9A-Z]*)(-[a-z0-9A-Z]+)*$',
      {
        message: 'Expected class selector to be kebab-case',
      },
    ],
  },
};
