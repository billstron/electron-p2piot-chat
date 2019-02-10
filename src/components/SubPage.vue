<template>
  <div class="sub-page">
    <h1>
      <router-link
        v-if="backLink"
        v-bind:to="backLink"
      >
        <font-awesome-icon icon="chevron-left" />
      </router-link>
      {{ title }}
    </h1>
    <slot />
  </div>
</template>

<style lang="scss">
div.sub-page {
  padding: 0 10px;

  h1 {
    width: 100%;
    text-align: left;
    font-size: 24px;
    margin: 0;
    padding: 5px 0 5px 0;

    a {
      color: #2c3e50;
      svg {
        padding: 0 20px 0 0;

        &:hover {
          color: #4a94f4;
        }
      }
    }
  }
}

</style>

<script>
export default {
  name: 'sub-page',
  props: [
    'title',
    'backLink',
  ],
};
</script>
