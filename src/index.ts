interface User {
  name: string;
  age: number;
}

function createUserAndPrintDetails(): void {
  const nameInput = (document.getElementById('nameInput') as HTMLInputElement).value.trim();
  const ageInput = parseInt((document.getElementById('ageInput') as HTMLInputElement).value.trim(), 10);

  if (nameInput && !isNaN(ageInput)) {
    const user: User = {
      name: nameInput,
      age: ageInput,
      
    };
    printUserDetails(user);
  }
}

function printUserDetails(user: User): void {
  const userDetails = `Name: ${user.name}<br>Age: ${user.age}<br>`;
  document.getElementById('userDetails')!.innerHTML = userDetails;
}

const form = document.querySelector('form')
form?.addEventListener(
  'submit', (e) => {
    e.preventDefault() //prevent pg from loading
    createUserAndPrintDetails()
  }
)

document.addEventListener('DOMContentLoaded', () => {
  updateAmounts();
  const plusBtns = document.querySelectorAll('.cart-qty-plus');
  const minusBtns = document.querySelectorAll('.cart-qty-minus');

  plusBtns.forEach((plusBtn) => {
    plusBtn.addEventListener('click', () => {
      const qtyInput = plusBtn.parentElement?.querySelector('.qty') as HTMLInputElement;
      qtyInput.value = String(Number(qtyInput.value) + 1);
      updateAmounts();
    });
  });

  minusBtns.forEach((minusBtn) => {
    minusBtn.addEventListener('click', () => {
      const qtyInput = minusBtn.parentElement?.querySelector('.qty') as HTMLInputElement;
      let qtyVal = Number(qtyInput.value);
      if (qtyVal > 0) {
        qtyInput.value = String(qtyVal - 1);
      }
      updateAmounts();
    });
  });

  const qtyInputs = document.querySelectorAll('.qty');
  qtyInputs.forEach((qtyInput) => {
    qtyInput.addEventListener('input', updateAmounts);
  });
});

function updateAmounts() {
  let sum = 0.0;
  const rows = document.querySelectorAll('#myTable > tbody > tr');

  rows.forEach((row) => {
    const qtyInput = row.querySelector('.qty') as HTMLInputElement;
    const priceInput = row.querySelector('.price') as HTMLInputElement;
    const amountElement = row.querySelector('.amount') as HTMLElement;

    const qty = parseFloat(qtyInput.value);
    const price = parseFloat(priceInput.value);
    const amount = qty * price;

    sum += amount;
    amountElement.textContent = String(amount);
  });

  const totalElement = document.querySelector('.total') as HTMLElement;
  totalElement.textContent = String(sum);
}
