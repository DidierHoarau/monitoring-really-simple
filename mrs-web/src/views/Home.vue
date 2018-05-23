<template>
  <div class="home">
    <h1>Events</h1>
    <EventList />
  </div>
</template>

<script lang="ts">

import { Component, Vue } from 'vue-property-decorator';
import EventList from '@/components/EventList.vue';

@Component({
  components: {
    EventList,
  },
})
export default class Home extends Vue {}
</script>
