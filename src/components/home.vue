<template>
  <div class="field is-grouped">
    <div class="btn_cnt">
      <button
        class="button is-link is-light"
      >
        <router-link
          to="/register"
          exact
        >
          ورود به فرم ثبت نام
        </router-link>
      </button>
    </div>
    <div class="control">
      <button
        class="button is-link is-light"
      >
        <router-link
          to="/list"
          exact
        >
          لیست افراد ثبت نام شده
        </router-link>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
    };
  },
  methods: {
  },
};
</script>
