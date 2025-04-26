//--------------ceate users---------------
let account1 = {
  name: "zyad yousef",
  movements: [100, 130, -200, 500, 2000, 100, 400, -300],
  interstRate: 1.2,
  pin: 1111,
  movementsDates: [
    "2024-01-28T09:15:04.904Z",
    "2024-04-01T10:17:24.185Z",
    "2024-05-27T17:01:17.194Z",
    "2024-07-11T23:36:17.929Z",
    "2024-11-18T21:31:17.178Z",
    "2024-12-23T07:42:02.383Z",
    "2025-03-10T14:11:59.604Z",
    "2025-03-12T10:51:36.790Z",
  ],
  currency: "EUR",
  locale: "pt-PT",
};
let account2 = {
  name: "sara yousef",
  movements: [3000, 1300, -2000, 5000, -2500],
  interstRate: 1.5,
  pin: 2222,
  movementsDates: [
    "2024-01-25T14:18:46.235Z",
    "2024-02-05T16:33:06.386Z",
    "2025-03-10T14:43:26.374Z",
    "2025-04-25T18:49:59.371Z",
    "2025-11-01T13:15:33.035Z",
  ],
  currency: "USD",
  locale: "en-US",
};
let account3 = {
  name: "ahmed sobhi",
  movements: [5000, 1350, -200, 400, -2500],
  interstRate: 0.7,
  pin: 3333,
  movementsDates: [
    "2014-01-25T14:18:46.235Z",
    "2024-02-05T16:33:06.386Z",
    "2024-03-10T14:43:26.374Z",
    "2025-04-25T18:49:59.371Z",
    "2025-11-01T13:15:33.035Z",
  ],
  currency: "USD",
  locale: "en-US",
};
let account4 = {
  name: "abdo awwad",
  movements: [10000, 13500, -20000, 400, -25000],
  interstRate: 2,
  pin: 4444,
  movementsDates: [
    "2024-01-25T14:18:46.235Z",
    "2024-02-05T16:33:06.386Z",
    "2024-03-10T14:43:26.374Z",
    "2025-04-25T18:49:59.371Z",
    "2025-11-01T13:15:33.035Z",
  ],
  currency: "USD",
  locale: "en-US",
};
let accounts = [account1, account2, account3, account4];

//------querySelectors---------
let user_input = document.querySelector(".user");
let pin_input = document.querySelector(".pin");
const row_login = document.querySelector(".login__btn");
const labelDate = document.querySelector(".date");
const applicant = document.querySelector(".applicant");
const message = document.querySelector(".message");
const balance_label = document.querySelector(".balance");
const containerMovements = document.querySelector(".move");
const close__btn = document.querySelector(".close__btn");
const confrim_close_user = document.querySelector(".confrim_close_user");
const confrim_close_PIN = document.querySelector(".confrim_close_PIN");
const loan__amount = document.querySelector(".loan__amount");
const loan__btn = document.querySelector(".loan__btn");
const cash__In = document.querySelector(".in");
const out = document.querySelector(".out");
const inter = document.querySelector(".inter");
const transferTo = document.querySelector(".transferTo");
const transfer__amount = document.querySelector(".transfer__amount");
const transfer__btn = document.querySelector(".transfer__btn");
const btn__sort = document.querySelector(".btn__sort");
const labelTimer = document.querySelector(".timer");

const now = new Date();
const day = `${now.getDate()}`.padStart(2, "0");
const month = `${now.getMonth() + 1}`.padStart(2, 0);
const year = now.getFullYear();
const hours = `${now.getHours()}`.padStart(2, 0);
const min = `${now.getMinutes()}`.padStart(2, 0);
labelDate.textContent = `As of ${day}/${month}/${year}, ${hours}:${min}`;

//----------log out timer---------------
let logoutTimer; // <-- Global timer variable

const startLogOutTimer = function () {
  let time = 10 * 60; // 10 minutes

  const tick = function () {
    const minutes = String(Math.trunc(time / 60)).padStart(2, "0");
    const seconds = String(time % 60).padStart(2, "0");
    labelTimer.textContent = `${minutes}:${seconds}`;

    if (time === 0) {
      clearInterval(logoutTimer);
      applicant.style.opacity = 0;
      message.textContent = "Log in to get started";
    }
    time--;
  };

  // Immediately call once
  tick();

  // Clear old timer if exists
  if (logoutTimer) clearInterval(logoutTimer);

  logoutTimer = setInterval(tick, 1000);

  return logoutTimer;
};

//---------create userNames-------------
const createUserNames = function (accs) {
  accs.forEach((acc) => {
    acc.userName = acc.name
      .toLocaleLowerCase()
      .trim()
      .split(" ")
      .map((word) => word[0])
      .join("");
  });
};
createUserNames(accounts);
console.log(accounts);

//------------- calc balance----------
const calacBalance = (account) => {
  account.balance = account.movements.reduce((acc, cur) => acc + cur, 0);
  return account.balance;
};

//--------- show movements---------------------

const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = "";
  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;
  movs.forEach(function (mov, i) {
    const type = mov > 0 ? "deposit" : "withdraw";
    const date1 = new Date(currentuser.movementsDates[i]);
    const day = `${date1.getDate()}`.padStart(2, 0);
    const month = `${date1.getMonth() + 1}`.padStart(2, 0);
    const year = date1.getFullYear();

    const printDate = `${day}/${month}/${year}`;
    const html = `
      <div class="movements__row">
        <div class="movement__type movement__type--${type}">
          ${i + 1} ${type}
        </div>
        <div class="movements__date">${printDate}</div>
        <div class="movement__value">${mov}$</div>
      </div> 
    `;

    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
  labelTimer.textContent = `${startLogOutTimer()}`;
};

//-------------------add operation-----------------------

// ------------------calculate summry--------------------
const calacSummary = function (arr) {
  return arr
    .filter((cur) => cur > 0)
    .reduce(function (acc, cur) {
      return acc + cur;
    }, 0);
};
console.log(calacSummary(account1.movements));
//-----------calc total out----------------------
const calcAllOut = function (arr) {
  return arr
    .filter((cur) => cur < 0)
    .reduce(function (acc, cur) {
      return (acc + cur) * -1;
    }, 0);
};
console.log(calcAllOut(account1.movements));

//-----------calculate interest------------------

//-----------check user to login-----------------
let currentuser;
row_login.addEventListener("click", function (e) {
  e.preventDefault();

  currentuser = accounts.find((acc) => acc.userName === user_input.value);
  const interest = currentuser.movements
    .filter((mov) => mov > 0)
    .map((mov) => mov * (currentuser.interstRate / 100))
    .filter((int) => int > 1)
    .reduce((acc, cur) => acc + cur, 0);

  if (currentuser?.pin === Number(pin_input.value)) {
    //clear fieldes
    user_input.value = "";
    pin_input.value = "";
    pin_input.blur();
    user_input.blur();
    //  display UI and message
    message.textContent = `welcome back, ${currentuser.name.split(" ")[0]}`;
    applicant.style.opacity = 100;
    cash__In.textContent = `${calacSummary(currentuser.movements)}$`;
    out.textContent = `${calcAllOut(currentuser.movements)}$`;
    // show balance
    balance_label.textContent = `${calacBalance(currentuser)}$`;
    //show movements
    displayMovements(currentuser.movements);
    inter.textContent = `${interest}$`;
  }
});

// close account
close__btn.addEventListener("click", function (e) {
  e.preventDefault();
  if (
    confrim_close_user.value === currentuser.userName &&
    Number(confrim_close_PIN.value) === currentuser.pin
  ) {
    const index = accounts.findIndex(
      (acc) => acc.userName === currentuser.userName
    );
    console.log(index);
    accounts.splice(index, 1);
    applicant.style.opacity = 0;
  }
  confrim_close_PIN = confrim_close_user = "";
});

//------------loan-------------
loan__btn.addEventListener("click", function (e) {
  e.preventDefault();
  const interest = currentuser.movements
    .filter((mov) => mov > 0)
    .map((mov) => mov * (currentuser.interstRate / 100))
    .filter((int) => int > 1)
    .reduce((acc, cur) => acc + cur, 0);

  const amount = Math.floor(+loan__amount.value);
  if (amount > 0 && currentuser.movements.some((mov) => mov >= amount * 0.1)) {
    currentuser.movements.push(amount);
    currentuser.movementsDates.push(new Date().toISOString());
    displayMovements(currentuser.movements);
    cash__In.textContent = `${calacSummary(currentuser.movements)}$`;
    balance_label.textContent = `${calacBalance(currentuser)}$`;
    inter.textContent = `${interest}$`;
  }

  loan__amount.value = "";
});

//-------trnansfer money-----------------
transfer__btn.addEventListener("click", function (e) {
  e.preventDefault();
  const trns_name = accounts.find((acc) => acc.userName === transferTo.value);
  const trans_amount = Number(transfer__amount.value);

  if (
    trans_amount > 0 &&
    trans_amount <= currentuser.balance &&
    currentuser?.userName !== trns_name.userName
  ) {
    const interest = currentuser.movements
      .filter((mov) => mov > 0)
      .map((mov) => mov * (currentuser.interstRate / 100))
      .filter((int) => int > 1)
      .reduce((acc, cur) => acc + cur, 0);
    inter.textContent = `${interest}$`;

    currentuser.movements.push(-trans_amount);
    trns_name.movements.push(trans_amount);
    currentuser.movementsDates.push(new Date().toISOString());
    trns_name.movementsDates.push(new Date().toISOString());
    cash__In.textContent = `${calacSummary(currentuser.movements)}$`;
    balance_label.textContent = `${calacBalance(currentuser)}$`;
    displayMovements(currentuser.movements);
  }

  transferTo.value = "";
  transfer__amount.value = "";
});

//--------------sort array---------------------
let sorted = false;
btn__sort.addEventListener("click", function (e) {
  e.preventDefault();
  containerMovements.innerHTML = "";
  // movements.sort((a, b) => a - b);
  displayMovements(currentuser.movements, !sorted);
  sorted = !sorted;
});
