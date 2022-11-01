import trottle from 'lodash.throttle';

const formRef = document.querySelector('.feedback-form');
const input = document.querySelector('input');
const textarea = document.querySelector('textarea');
UsersInputs();
formRef.addEventListener(
  'input',
  trottle(function (e) {
    const inputValue = e.currentTarget.elements.email.value;
    const message = e.currentTarget.elements.message.value;

    const objValue = {
      email: inputValue,
      message: message,
    };
    localStorage.setItem('feedback-form-state', JSON.stringify(objValue));
  }),
  1000
);

formRef.addEventListener('submit', event => {
  event.preventDefault();
  const localStorageIs = localStorage.getItem('feedback-form-state');
  const obj = JSON.parse(localStorageIs);
  console.log(obj);
  formRef.reset();
  localStorage.removeItem('feedback-form-state');
});

function UsersInputs() {
  const localStorageIs = localStorage.getItem('feedback-form-state');
  const objSaves = JSON.parse(localStorageIs);

  if (objSaves) {
    input.value = objSaves.email;
    textarea.value = objSaves.message;
  }
}
