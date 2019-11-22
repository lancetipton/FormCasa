export const loginForm = {
  0: 'form',
  1: { className: 'login-form' },
  2: [
    {
      0: 'div',
      1: { className: 'form-container' },
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
          1: { className: 'input-wrapper' },
          2: [
            {
              0: 'label',
              1: { className: 'input-label', htmlFor: 'password-input' },
              2: ['Password', { 0: 'br' }, ]
            },
            {
              0: 'input',
              1: { className: 'input', name: 'password', id: 'password-input', type: 'password' }
            }
          ]
        }
      ]
    }
  ]
}