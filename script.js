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

  formInpChecks.input.placeholder = 'Количество чеков...'
  formInpTurnover.input.placeholder = 'Пример: 300000...'
  formInpAcessories.input.placeholder = 'Пример: 7999+999+499...'
  formInpServices.input.placeholder = 'Пример: 2999+1990+499...'

  const fromBtnWrapper = document.createElement('div');
  const formBtn = document.createElement('button');

  form.className = 'input-group mb-3 mt-4';
  formBtn.className = 'btn form-btn btn-success';
  formBtn.textContent = 'Применить';
  fromBtnWrapper.style.width = '100%';
  formBtn.style.width = '100%';
  formBtn.style.padding = '10px';
  formBtn.style.fontSize = '18px';

  fromBtnWrapper.append(formBtn);

  form.append(formInpChecks.inputBox, formInpTurnover.inputBox, formInpAcessories.inputBox, formInpServices.inputBox, fromBtnWrapper);

  return {
    form,
    formInpChecks,
    formInpTurnover,
    formInpAcessories,
    formInpServices,
    formBtn,
  }
}

function calculatePercentage(a, b) {
  return b / a * 100;
}

// сборка приложения
const app = document.getElementById('app');

const appContainer = document.createElement('div'); // контейнер
const formGroup = document.createElement('div'); // обёртка для формы
const appForm = createForm(); // форма

appContainer.className = 'container';
formGroup.style.display = 'flex';

appContainer.append(appForm.form);

app.append(appContainer);

appForm.formBtn.addEventListener('click', (e) => {
  e.preventDefault();

  const checks = appForm.formInpChecks;
  const turnover = appForm.formInpTurnover;
  const acessories = appForm.formInpAcessories;
  const services = appForm.formInpServices;

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