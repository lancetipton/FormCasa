export const loginCascade = {
  0: 'form',
  1: { className: 'login-form' },
  2: [
    {
      0: 'div',
      1: { className: 'form-container', id: '12345' },
      2: [
        {
          0: 'div',
          1: { className: 'input-wrapper' },
          2: [
            {
              0: 'label',
              1: { className: 'input-label', htmlFor: 'email-input' },
              2: ['Email', { 0: 'br' }, ]
            },
            {
              0: 'input',
              1: { className: 'input', name: 'email', id: 'email-input', type: 'email' }
            }
          ]
        },
        {
          0: 'div',
          1: { className: 'input-wrapper', id: 'password-wrapper' },
          2: [
            {
              0: 'label',
              1: { className: 'input-label', htmlFor: 'password-input' },
              2: ['Password', { 0: 'br' }, ]
            },
            {
              0: 'input',
              1: { className: 'input', name: 'password', id: 'password-input', type: 'password' }
            },
            {
              0: 'br',
              1: {},
            },
            {
              0: 'button',
              1: { className: 'button', name: 'button', id: 'button-input', type: 'button' },
              2: [ 'Submit' ]
            }
          ]
        }
      ]
    }
  ]
}

export const loginCatalog = {
  '12345': { pos: '0.2.0' },
  'email-input': { pos: '0.2.0.2.0.2.1' },
  'password-input': { pos: '0.2.0.2.1.2.1' },
  'password-wrapper': { pos: '0.2.0.2.1', id: 'password-wrapper' },
}