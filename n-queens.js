const select = document.getElementById('queens_select');
const chessDiv = document.getElementById('chess_div');
let labels = [];
import nQueens from './n-queens-logic.js';
let solutions;

function generate_table(e, val) {
  labels = [];

  let value;
  if (e?.target) {
    value = parseInt(e.target.value);
  } else if (val) {
    value = parseInt(val);
  }
  if (isNaN(value) || value < 4 || value > 9) {
    value = 4;
  }

  solutions = nQueens(value);

  const oldQueensContainer = document.getElementById('queens_container');
  if (oldQueensContainer) {
    oldQueensContainer.remove();
  }
  const newQueensContainer = document.createElement('div');
  newQueensContainer.id = 'queens_container';

  const queensAndValuesContainer = document.getElementById(
    'queens_and_values_container',
  );

  queensAndValuesContainer.appendChild(newQueensContainer);
  for (let i = 0; i < value; i++) {
    const radioButton = document.createElement('input');
    radioButton.type = 'radio';
    radioButton.name = 'queen';
    radioButton.value = i;

    const label = document.createElement('label');

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    svg.setAttribute('viewBox', '0 0 512 512');

    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute(
      'd',
      'M256 96a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm-95.2-8c-18.1 0-31.3 12.8-35.6 26.9c-8 26.2-32.4 45.2-61.2 45.2c-10 0-19.4-2.3-27.7-6.3c-7.6-3.7-16.7-3.3-24 1.2C.7 162.1-3.1 177.1 3.7 188.9L97.6 352H153l-83-144.1c40.5-2.2 75.3-25.9 93.1-59.8c22 26.8 55.4 43.9 92.8 43.9s70.8-17.1 92.8-43.9c17.8 34 52.6 57.7 93.1 59.8L359 352h55.4l93.9-163.1c6.8-11.7 3-26.7-8.6-33.8c-7.3-4.5-16.4-4.9-24-1.2c-8.4 4-17.7 6.3-27.7 6.3c-28.8 0-53.2-19-61.2-45.2C382.5 100.8 369.3 88 351.2 88c-14.5 0-26.3 8.5-32.4 19.3c-12.4 22-35.9 36.7-62.8 36.7s-50.4-14.8-62.8-36.7C187.1 96.5 175.4 88 160.8 88zM133.2 432H378.8l16.6 32H116.7l16.6-32zm283.7-30.7c-5.5-10.6-16.5-17.3-28.4-17.3h-265c-12 0-22.9 6.7-28.4 17.3L68.6 452.5c-3 5.8-4.6 12.2-4.6 18.7c0 22.5 18.2 40.8 40.8 40.8H407.2c22.5 0 40.8-18.2 40.8-40.8c0-6.5-1.6-12.9-4.6-18.7l-26.5-51.2z',
    );
    svg.appendChild(path);
    label.appendChild(radioButton);
    label.appendChild(svg);
    label.addEventListener('click', (e) => clicked(e), true);
    labels.push(label);

    newQueensContainer.appendChild(label);
  }

  newQueensContainer.addEventListener('click', (e) => queenContainerClicked(e));

  const oldTable = document.getElementById('queens_table');
  if (oldTable) {
    oldTable.remove();
  }

  const newTable = document.createElement('table');
  newTable.id = 'queens_table';

  const tbody = document.createElement('tbody');

  for (let i = 0; i < value; i++) {
    const tr = document.createElement('tr');
    for (let j = 0; j < value; j++) {
      const td = document.createElement('td');
      td.id = `[${i}, ${j}]`;
      td.addEventListener('click', (e) => newPlaceClicked(e));
      tr.appendChild(td);
    }
    tbody.appendChild(tr);
  }

  newTable.appendChild(tbody);

  chessDiv.appendChild(newTable);

  const oldButtonsDiv = document.getElementById('buttons');
  if (oldButtonsDiv) {
    oldButtonsDiv.remove();
  }
  const buttonsDiv = document.createElement('div');
  buttonsDiv.id = 'buttons';

  const oldResetButton = document.getElementById('reset');
  if (oldResetButton) {
    oldResetButton.remove();
  }
  const resetButton = document.createElement('button');
  resetButton.id = 'reset';
  resetButton.innerHTML = 'Reset';
  resetButton.addEventListener('click', (e) => generate_table(null, value));

  chessDiv.appendChild(resetButton);

  const oldFinishButton = document.getElementById('finish');
  if (oldFinishButton) {
    oldFinishButton.remove();
  }
  const finishButton = document.createElement('button');
  finishButton.id = 'finish';
  finishButton.innerHTML = 'Finish';
  finishButton.addEventListener('click', finishClicked);

  const oldSolveButton = document.getElementById('solve');
  if (oldSolveButton) {
    oldSolveButton.remove();
  }
  const solveButton = document.createElement('button');
  solveButton.id = 'solve';
  solveButton.innerHTML = 'Solve';
  solveButton.addEventListener('click', solveClicked);

  buttonsDiv.appendChild(resetButton);
  buttonsDiv.appendChild(finishButton);
  buttonsDiv.appendChild(solveButton);

  chessDiv.appendChild(buttonsDiv);
}

select.addEventListener('change', (e) => generate_table(e));
window.addEventListener('load', () => generate_table());

function clicked(e) {
  e.stopPropagation();
  let checkedInput;
  for (let label of labels) {
    const input = label.querySelector('input');
    if (input.checked) {
      checkedInput = input;
      input.parentNode.classList.remove('checked');
    }
  }

  if (e.target.checked) {
    e.target.parentNode.classList.add('checked');
  }
}
function queenContainerClicked(e) {
  let checkedInput;
  for (let label of labels) {
    const input = label.querySelector('input');
    if (input.checked) {
      checkedInput = input;
      label.id = '';
      e.target.appendChild(label);
    }
    label.classList.remove('checked');
  }
  if (!checkedInput) {
    return;
  }

  for (let label of labels) {
    const input = label.querySelector('input');
    if (input.checked) {
      input.checked = false;
      label.style.position = 'static';
      label.style.transform = `translateX(0) translateY(0)`;
    } else {
      label.classList.remove('checked');
    }
  }
}

function newPlaceClicked(e) {
  let checkedInput;
  let valid = true;
  for (let label of labels) {
    const input = label.querySelector('input');
    if (input.checked) {
      checkedInput = input;
      input.parentNode.classList.remove('checked');
    }
    if (label.id === e.target.id) {
      valid = false;
    }
  }
  if (!checkedInput || !valid) {
    return;
  }
  for (let label of labels) {
    const input = label.querySelector('input');
    if (input.checked) {
      input.checked = false;
      input.parentNode.classList.remove('checked');
      e.target.appendChild(label);
      label.id = e.target.id;
    }
  }
}

function finishClicked(e) {
  e.preventDefault();
  const queens = [];
  for (let label of labels) {
    if (label.id !== '') {
      queens.push(JSON.parse(label.id));
    }
  }
  queens.sort((a, b) => a[0] - b[0]);

  let valid;
  for (let solution of solutions) {
    valid = true;
    if (arraysAreEqual(solution, queens)) {
      confetti();
      break;
    }
  }
}

function solveClicked(e) {
  e.preventDefault();

  const resetButton = document.getElementById('reset');
  resetButton.click();

  const solution = solutions[0];

  const labels1 = document.querySelectorAll('#queens_container label');
  const labels2 = document.querySelectorAll('#queens_table label');

  let counter = 0;
  let flag = 0;
  const counter1 = labels1.length;

  solution.forEach((slot) => {
    console.log(slot);
    const idString = slot.join(', '); // Convert array to a string with a space after the comma
    const selector = `#queens_table td[id="[${idString}]"]`;
    const item = document.querySelector(selector);

    console.log(selector);

    if (flag === 0) {
      if (counter < counter1) {
        const label = labels1[counter];
        item.appendChild(label);
        label.id = item.id;
        counter++;
      } else {
        flag = 1;
        counter = 0;
      }
    } else {
      const label = labels2[counter];
      item.appendChild(label);
      label.id = item.id;
      counter++;
    }
  });
}

function arraysAreEqual(arr1, arr2) {
  if (arr1.length !== arr2.length) {
    return false;
  }
  for (let i = 0; i < arr1.length; i++) {
    const subArr1 = arr1[i];
    const subArr2 = arr2[i];
    if (subArr1.length !== subArr2.length) {
      return false;
    }
    for (let j = 0; j < subArr1.length; j++) {
      if (subArr1[j] !== subArr2[j]) {
        return false;
      }
    }
  }
  return true;
}
