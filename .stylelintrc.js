module.exports = {
  extends: 'stylelint-config-standard',
  syntax: 'less',
  rules: {
    'selector-pseudo-class-no-unknown': [
      true,
      { ignorePseudoClasses: ['global', 'local'] },
    ],
    'no-descending-specificity': null,
  },
};
