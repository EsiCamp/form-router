<template>
  <div class="relative">
    <div class="slides">
      <div>
        <img :src="images[cimg]">
      </div>
    </div>
    <span
      class="prev"
      @click="preSlide()"
    >
      <i
        class="fa fa-chevron-left"
        aria-hidden="true"
      />
    </span>
    <span
      class="next"
      @click="nextSlide()"
    >
      <i
        class="fa fa-chevron-right"
        aria-hidden="true"
      />
    </span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      images: [
        'src/images/1.jpg',
        'src/images/2.jpg',
        'src/images/3.png',
        'src/images/4.jpg',
        'src/images/5.jpg',
      ],
      cimg: 0,
    };
  },
  methods: {
    nextSlide() {
      this.cimg += 1;
      if (this.cimg > 4) {
        this.cimg = 0;
      }
    },
    preSlide() {
      this.cimg -= 1;
      if (this.cimg < 0) {
        this.cimg = 4;
      }
    },
  },
};
</script>
