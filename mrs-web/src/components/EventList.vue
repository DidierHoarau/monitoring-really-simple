<template>
  <div class="hello">
    <div v-for="event in mrsEvents">
      <div class="callout">
        <div class="grid-x">
          <div class="cell small-7 medium-8 large-9">{{ formatDate(event.date) }}</div>
          <div class="cell auto">{{ event.origin }}</div>
          <div class="cell shrink"><span class="badge primary">{{ event.level }}</span></div>
          <div class="cell small-7 medium-8 large-9"><code>{{ event.content }}</code></div>
          <div class="cell shrink">{{ formatTags(event.tags) }}</div>
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

  public formatDate(dateString: string): string {
    return new Date(dateString).toLocaleString();
  }

  public formatTags(tags: string): string {
    let display = '';
    if (!tags) {
      return display;
    }
    for (const tag of tags) {
      if (display !== '') {
        display += ', ';
      }
      display += tag;
    }
    return display;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
