/* by kenzie */

// функция генерирует поле для ввода
function createFormInput(label) {
  const inputBox = document.createElement('div');
  const input = document.createElement('input');
  const inputLabel = document.createElement('label');
  const inputBtn = document.createElement('button');

  // styles
  inputBox.className = 'input-box input-group mb-4';
  input.type = 'tel';
  input.className = 'form-control input-filed';
  input.style.padding = '10px 15px 10px 15px';
  inputLabel.textContent = label;
  inputLabel.style.fontStyle = 'italic'
  inputBtn.textContent = '⛌';
  inputBtn.style.fontSize = '20px'
  inputBtn.style.padding = '0px 10px'
  inputBtn.style.zIndex = '1000'
  inputBtn.className = 'btn btn-danger';

  inputBtn.addEventListener('click', (e) => {
    e.preventDefault();
    input.value = confirm('Очистить поле?') ? '' : input.value;
  });

  inputBox.append(inputLabel, input, inputBtn);

  return {
    inputBox,
    input,
    inputLabel,
    inputBtn,
    calculate() {
      return eval(this.input.value);
    },
    format() {
      let formatter = Intl.NumberFormat('ru');

      if (this.calculate()) {
        return formatter.format(this.calculate());
      }

      return 0;
    }
  }
}

// функция генерирует форму со всеми полями
function createForm() {
  const form = document.createElement('form');

  const formInpChecks = createFormInput('Чеки');
  const formInpTurnover = createFormInput('Оборот');
  const formInpAcessories = createFormInput('Аксессуары');
  const formInpServices = createFormInput('Услуги');

  formInpChecks.input.value = 10
  formInpTurnover.input.value = 100000
  formInpAcessories.input.value = 7000
  formInpServices.input.value = 4500

  formInpChecks.input.placeholder = 'Количество чеков...'
  formInpTurnover.input.placeholder = 'Пример: 300000...'
  formInpAcessories.input.placeholder = 'Пример: 999+999+999...'
  formInpServices.input.placeholder = 'Пример: 999+999+999...'

  const fromBtnWrapper = document.createElement('div');
  const formBtn = document.createElement('button');
  const formBtnClear = document.createElement('button');

  form.className = 'input-group mb-3 mt-4';
  formBtn.className = 'btn form-btn btn-success';
  formBtnClear.className = 'btn form-btn btn-danger mb-2 form-btn-clear';
  formBtn.textContent = 'Применить';
  fromBtnWrapper.style.width = '100%';
  formBtnClear.textContent = 'Очистить'

  fromBtnWrapper.append(formBtnClear, formBtn);

  form.append(formInpChecks.inputBox, formInpTurnover.inputBox, formInpAcessories.inputBox, formInpServices.inputBox, fromBtnWrapper);

  return {
    form,
    formInpChecks,
    formInpTurnover,
    formInpAcessories,
    formInpServices,
    formBtn,
    formBtnClear,
  }
}

// функция вычисляет процент значение от общего оборота продаж
const calculatePercentage = (a, b) => b / a * 100;

function clearInputs(inputsArray) {
  for (let i = 1; i <= inputsArray.length; i++) {
    inputsArray[i - 1].input.value = '';
  }
}

// сборка приложения
const app = document.getElementById('app');

const appContainer = document.createElement('div'); // контейнер
const formGroup = document.createElement('div'); // обёртка для формы
const appForm = createForm(); // форма

const checks = appForm.formInpChecks;
const turnover = appForm.formInpTurnover;
const acessories = appForm.formInpAcessories;
const services = appForm.formInpServices;

appContainer.className = 'container';
formGroup.style.display = 'flex';

appContainer.append(appForm.form);

app.append(appContainer);

appForm.formBtn.addEventListener('click', (e) => {
  e.preventDefault();

  navigator.clipboard.writeText(`Чеки: ${checks.format()}
Оборот: ${turnover.format()}
Аксессуары: ${acessories.format()} (${calculatePercentage(turnover.calculate(), acessories.calculate()).toFixed(2)}%)
Услуги: ${services.format()} (${calculatePercentage(turnover.calculate(), services.calculate()).toFixed(2)}%)`).then(function () {
    alert(`Данные успешно скопированы в буфер обмена!`);
  }, function (err) {
    alert('Произошла ошибка при копировании текста: ', err);
  });

  console.log(`Чеки: ${checks.format()}
Оборот: ${turnover.format()}
Аксессуары: ${acessories.format()} (${calculatePercentage(turnover.calculate(), acessories.calculate()).toFixed(2)}%)
Услуги: ${services.format()} (${calculatePercentage(turnover.calculate(), services.calculate()).toFixed(2)}%)`);
});

appForm.formBtnClear.addEventListener('click', (e) => {
  e.preventDefault();
  clearInputs([checks, turnover, acessories, services]);
});