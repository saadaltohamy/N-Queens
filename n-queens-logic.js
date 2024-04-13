function nQueens(n) {
  const all_solutions = [];
  for (let i = 0; i < n; i++) {
    get_queens_recursive(n, 0, i, new Set(), [], all_solutions);
  }
  return all_solutions;
}

function reserve_slot(n, slot, reserved_slots) {
  const row = slot[0];
  const column = slot[1];
  reserve_column(n, column, reserved_slots);
  reserve_row(n, row, reserved_slots);
  reserve_diagonal(n, slot, reserved_slots);
}

function reserve_column(n, column, reserved_slots) {
  for (let i = 0; i < n; i++) {
    reserved_slots.add(`${i},${column}`);
  }
}

function reserve_row(n, row, reserved_slots) {
  for (let i = 0; i < n; i++) {
    reserved_slots.add(`${row},${i}`);
  }
}

function reserve_diagonal(n, slot, reserved_slots) {
  reserve_diagonal_helper(n, slot, reserved_slots, '--');
  reserve_diagonal_helper(n, slot, reserved_slots, '-+');
  reserve_diagonal_helper(n, slot, reserved_slots, '+-');
  reserve_diagonal_helper(n, slot, reserved_slots, '++');
}

function reserve_diagonal_helper(n, slot, reserved_slots, mode) {
  let row = slot[0];
  let column = slot[1];

  if (mode === '--') {
    while (row >= 0 && column >= 0) {
      reserved_slots.add(`${row},${column}`);
      row -= 1;
      column -= 1;
    }
  } else if (mode === '-+') {
    while (row >= 0 && column < n) {
      reserved_slots.add(`${row},${column}`);
      row -= 1;
      column += 1;
    }
  } else if (mode === '+-') {
    while (row < n && column >= 0) {
      reserved_slots.add(`${row},${column}`);
      row += 1;
      column -= 1;
    }
  } else if (mode === '++') {
    while (row < n && column < n) {
      reserved_slots.add(`${row},${column}`);
      row += 1;
      column += 1;
    }
  }
}

function get_queens_recursive(
  n,
  row,
  column,
  reserved_slots,
  solution,
  all_solutions,
) {
  const current_slot = `${row},${column}`;
  if (!reserved_slots.has(current_slot)) {
    reserve_slot(n, [row, column], reserved_slots);
    solution.push([row, column]);
    if (row + 1 < n) {
      for (let i = 0; i < n; i++) {
        if (!reserved_slots.has(`${row + 1},${i}`)) {
          get_queens_recursive(
            n,
            row + 1,
            i,
            new Set(reserved_slots),
            [...solution],
            all_solutions,
          );
        }
      }
    } else {
      all_solutions.push([...solution]);
      console.log(solution);
    }
  }
}

export default nQueens;
