export const forms = {
  colors: {
    accent: '#609',
    text: '#000',
    background: '#fff',
    primary: '#33e',
    secondary: '#119',
    muted: '#f6f6f6',
    gray: '#777',
    highlight: '#efeffe',
  },
  label: {fontSize: 1, fontWeight: 'bold'},
  field: {
    borderColor: 'lightgray',
    ':focus': {borderColor: 'primary', outline: 'none'},
  },
  input: {variant: 'forms.field'},
  select: {variant: 'forms.field'},
  textarea: {variant: 'forms.field'},
  radio: {},
  slider: {bg: 'lightgray'},
  switch: {},
};

export const iconService = 'https://microicon-clone.vercel.app';
