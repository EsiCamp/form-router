<template>
  <form>
    <div v-if="errors.length">
      <ul class="form_detail">
        <li
          v-for="error in errors"
          :key="error.index"
        >
          <i class="fas fa-exclamation-triangle" />
          {{ error }}
        </li>
      </ul>
    </div>
    <div class="notification">
      <!-- USER NAME -->
      <div class="field form-group">
        <label class="label">
          نام کاربری
        </label>
        <div class="control">
          <input
            v-model="userName"
            class="input"
            type="text"
            placeholder="نام کاربری"
            @change="checkUserInput"
          >
        </div>
      </div>
      <!-- NATIONAL CODE -->
      <div class="field">
        <label class="label">
          کد ملی
        </label>
        <div class="control has-icons-left has-icons-right">
          <input
            v-model="nationalCode"
            class="input"
            type="text"
            placeholder="کد ملی"
            @change="checkCodeInput"
          >
          <span class="icon is-small is-left">
            <i class="fas fa-user" />
          </span>
          <span class="icon is-small is-right">
            <i class="fas fa-check" />
          </span>
        </div>
      </div>
      <!-- PHONE -->
      <div class="field">
        <label class="label">
          موبایل
        </label>
        <div class="control has-icons-left has-icons-right">
          <input
            id="phone"
            v-model="phone"
            class="input"
            type="tel"
            placeholder="موبایل"
            @change="checkPhoneInput"
          >
          <span class="icon is-small is-left">
            <i class="fas fa-phone" />
          </span>
          <span class="icon is-small is-right">
            <i class="fas fa-check" />
          </span>
        </div>
      </div>
      <!-- PASSWORD -->
      <div class="field">
        <label class="label">
          رمز عبور
        </label>
        <div class="control has-icons-left has-icons-right">
          <input
            id="password"
            v-model="password"
            class="input"
            type="password"
            placeholder="رمز عبور"
            @change="checkPassInput"
          >
          <span class="icon is-small is-left">
            <i class="fas fa-lock" />
          </span>
          <span class="icon is-small is-right">
            <i class="fas fa-check" />
          </span>
        </div>
      </div>
      <!-- CONFIRM PASSWORD -->
      <div class="field">
        <label class="label">
          تکرار رمز عبور
        </label>
        <div class="control has-icons-left has-icons-right">
          <input
            id="confirm_pass"
            v-model="confirmPass"
            class="input"
            type="password"
            placeholder="تکرار رمز عبور"
            @change="checkConfInput"
          >
          <span class="icon is-small is-left">
            <i class="fas fa-lock" />
          </span>
          <span class="icon is-small is-right">
            <i class="fas fa-check" />
          </span>
        </div>
      </div>
      <div class="field is-grouped">
        <div>
          <button
            class="button is-link"
            @click.prevent="checkForm"
          >
            ثبت نام
          </button>
        </div>
        <div class="control">
          <button
            class="button is-link is-light"
            @click.prevent="clearData"
          >
            لغو
          </button>
        </div>
        <div class="checkbox_cnt">
          <label class="checkbox">
            فعال
          </label>
          <input
            v-model="checkBox"
            type="checkbox"
          >
        </div>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  data() {
    return {
      errors: [],
      userName: null,
      confirmPass: null,
      password: null,
      phone: null,
      nationalCode: null,
      checkBox: null,
    };
  },
  methods: {

    sendList(user) {
      const sendRequest = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
      };
      fetch('http://127.0.0.1:9000/user/sign-up', sendRequest)
        .then((response) => {
          if (response.status === 200) {
            this.clearData();
          }
        });
    },

    checkForm(e) {
      this.errors = [];
      // ---------- USER NAME ----------//
      if (!this.userName) {
        this.errors.push('پر کردن نام کاربری الزامی است');
      } else if (!this.validUser(this.userName)) {
        this.errors.push('نام کاربری معتبر نیست');
      }
      // ---------- NATIONAL CODE ----------//
      if (!this.nationalCode) {
        this.errors.push('پر کردن کد ملی الزامی است');
      } else if (!this.validNationalCode(this.nationalCode)) {
        this.errors.push('کد ملی معتبر نیست');
      }
      // ---------- PHONE ----------//
      if (!this.phone) {
        this.errors.push('پر کردن شماره تلفن همراه الزامی است');
      } else if (!this.validPhone(this.phone)) {
        this.errors.push('تلفن همراه معتبر نیست');
      }
      // ---------- PASSWORD ----------//
      if (!this.password) {
        this.errors.push('رمز عبور را انتخاب نمایید');
      } else if (!this.validPassword(this.password)) {
        this.errors.push(' رمز عبور معتبر نیست');
      }
      // ---------- CONFIRM PASSWORD ----------//
      if (!this.confirmPass) {
        this.errors.push('رمز عبور خود را مجددا وارد نمایید');
      } else if (!this.validConfirmPass(this.confirmPass)) {
        this.errors.push('رمز عبور مجدد معتبر نیست');
      }
      if (!this.errors.length) {
        const user = {
          username: this.userName,
          nationalID: this.nationalCode,
          mobilePhone: this.phone,
          password: this.password,
          active: this.checkBox,
        };
        this.sendList(user);
        // eslint-disable-next-line no-alert
        alert('ثبت نام با موفقیت انجام شد');
      }
      e.preventDefault();
    },

    checkUserInput(event) {
      const input = event.target;
      if (!this.validUser(this.userName)) {
        input.classList.add('main_red');
      } else {
        input.classList.remove('main_red');
      }
    },

    checkCodeInput(event) {
      const input = event.target;
      if (!this.validNationalCode(this.nationalCode)) {
        input.classList.add('main_red');
      } else {
        input.classList.remove('main_red');
      }
    },

    checkPhoneInput(event) {
      const input = event.target;
      if (!this.validPhone(this.phone)) {
        input.classList.add('main_red');
      } else {
        input.classList.remove('main_red');
      }
    },

    checkPassInput(event) {
      const input = event.target;
      if (!this.validPassword(this.password)) {
        input.classList.add('main_red');
      } else {
        input.classList.remove('main_red');
      }
    },

    checkConfInput(event) {
      const input = event.target;
      if (!this.validConfirmPass(this.confirmPass)) {
        input.classList.add('main_red');
      } else {
        input.classList.remove('main_red');
      }
    },

    clearData() {
      this.userName = null;
      this.confirmPass = null;
      this.password = null;
      this.phone = null;
      this.nationalCode = null;
    },

    validUser(userName) {
      const testUser = /^(?=.{3,20}$)(?![_.])(?![0-9])[a-zA-Z0-9._]+(?<![_.])$/;
      return testUser.test(userName);
    },

    validPhone(phone) {
      const testPhone = /^\(?([0]{1})\)?([9]{1})?([0-9]{9})$/;
      return testPhone.test(phone);
    },

    validPassword(password) {
      const testPass = /^(?=.*\d)(?=.*[a-z]).{8,20}$/;
      return testPass.test(password);
    },

    validConfirmPass() {
      return (this.password === this.confirmPass);
    },

    validNationalCode(nationalCode) {
      if (/^\d{10}$/.test(nationalCode)) {
        const check = parseInt(nationalCode[9], 10);
        let sum = 0;
        let i;
        for (i = 0; i < 9; i += 1) {
          sum += parseInt(nationalCode[i], 10) * (10 - i);
        }
        sum %= 11;
        return ((sum < 2 && check === sum) || (sum >= 2 && check + sum === 11));
      }
      return false;
    },
  },
};
</script>
