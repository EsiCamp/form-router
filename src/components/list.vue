<template>
  <div>
    <modal
      v-if="showModal"
      :name="showUser"
      @close="showModal = false"
    />
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
    <div class="table-container mrgt mrgbt">
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
              name="Modal"
              @click="showData(user),showModal = true"
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
  </div>
</template>

<script>
import Modal from './modal.vue';

export default {
  components: {
    Modal,
  },
  data() {
    return {
      userDetails: [],
      showUser: '',
      users: [],
      showModal: false,
    };
  },
  methods: {
    showData(userData) {
      // this.showModal = true;
      this.showUser = userData;
    },
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
  },
};
</script>
