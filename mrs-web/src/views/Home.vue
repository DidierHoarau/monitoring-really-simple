<template>
  <div class="home">
    <h1>Events</h1>
    <EventList />
    <Auth />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import EventList from '@/components/EventList.vue';
import Auth from '@/components/Auth.vue';

@Component({
  components: {
    Auth,
    EventList,
  },
})
export default class Home extends Vue {}
</script>
