<template>
  <div>
    <div class="control">
      <button
        class="button is-link is-light"
        @click.prevent="receiveList"
      >
        <router-link
          to="/list"
          exact
        >
          مشاهده افراد
        </router-link>
      </button>
    </div>
    <div class="table-container mrgt">
      <table
        v-if="userDetails.length > 0"
        class="table is-bordered"
      >
        <tr>
          <th>
            نام کاربری
          </th>
          <th>
            کد ملی
          </th>
          <th>
            موبایل
          </th>
          <th>
            رمز عبور
          </th>
          <th>
            <button @click="filterTable(false)">
              غیر فعال
            </button>
            <button @click="filterTable(true)">
              فعال
            </button>
          </th>
        </tr>
        <tr
          v-for=" user in userDetails"
          :key="user.index"
        >
          <td>
            <a
              href="#"
              class="username"
              @click="showData(user)"
            >
              {{ user.username }}
            </a>
          </td>
          <td>
            {{ user.nationalID }}
          </td>
          <td>
            {{ user.mobilePhone }}
          </td>
          <td>
            {{ user.password }}
          </td>
          <td v-if="user.active === true">
            <span>
              فعال
            </span>
          </td>
          <td v-if="user.active === false">
            <span>
              غیر فعال
            </span>
          </td>
        </tr>
      </table>
    </div>
    <!-- MODAL -->
    <transition
      v-if="showModal"
      name="modal"
    >
      <div class="modal-mask">
        <div class="modal-wrapper">
          <div class="modal-container">
            <div class="modal-header">
              <h3>
                مشخصات افراد ثبت نام شده
              </h3>
            </div>
            <div class="modal-body">
              <slot name="body">
                <div v-if="showUser.active === true">
                  <div class="mrgbt">
                    نام کاربری:
                    {{ showUser.username | userFormat }}
                  </div>
                  <div class="mrgbt">
                    کد ملی:
                    {{ showUser.nationalID }}
                  </div>
                  <div class="mrgbt">
                    موبایل:
                    {{ showUser.mobilePhone | phoneFormat }}
                  </div>
                  <div class="mrgbt">
                    رمز عبور:
                    {{ showUser.password }}
                  </div>
                </div>
                <div v-else>
                  کاربر فعال نمی باشد
                </div>
              </slot>
            </div>

            <div class="modal-footer">
              <slot name="footer">
                <button
                  class="modal-default-button"
                  @click="closeModal"
                >
                  بستن
                </button>
              </slot>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <!-- END OF MODAL -->
  </div>
</template>

<script>
export default {
  filters: {
    userFormat(value) {
      // eslint-disable-next-line no-param-reassign
      value = value.toString();
      return value.toUpperCase().trim();
    },
    phoneFormat(phone) {
      // eslint-disable-next-line no-param-reassign
      phone = phone.toString();
      return `98${phone.slice(1)}+`;
    },
  },
  data() {
    return {
      userDetails: [],
      showUser: '',
      showModal: false,
      users: [],
    };
  },
  methods: {
    filterTable(status) {
      if (status) {
        this.userDetails = this.users.filter((user) => user.active === true);
      } else {
        this.userDetails = this.users.filter((user) => user.active === false);
      }
    },
    receiveList() {
      const receiveRequest = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      };
      fetch('http://127.0.0.1:9000/user/list', receiveRequest)
        // eslint-disable-next-line consistent-return
        .then((response) => {
          if (response.status === 200) {
            return response.json();
          }
        })
        .then((data) => {
          this.userDetails = data;
          this.users = data;
        });
    },
    showData(userData) {
      this.showModal = true;
      this.showUser = userData;
    },
    closeModal() {
      this.showModal = false;
    },
  },
};
</script>
