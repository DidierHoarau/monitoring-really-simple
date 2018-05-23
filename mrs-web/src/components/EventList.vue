<template>
  <div class="hello">
    <div v-for="event in mrsEvents">
      <div class="callout">
        <div class="grid-x">
          <div class="cell small-4">{{ event.date }}</div>
          <div class="cell small-4">{{ event.level }}</div>
          <div class="cell small-4">{{ event.origin }}</div>
          <div class="cell small-12">{{ event.content }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { MrsServer } from '../services/MrsServer';

@Component
export default class EventList extends Vue {
  @Prop() private msg!: string;

  private mrsEvents: any[] = [];

  public created(): void {
    MrsServer.getEvents().then(events => {
      this.mrsEvents = events.data.events;
    });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
