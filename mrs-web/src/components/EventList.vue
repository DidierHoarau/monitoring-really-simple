<template>
  <div>
    <div class="text-right">
      <a class="button tiny secondary" href="#" v-on:click="listEvents()">Refresh</a>
    </div>
    <div v-if="mrsEvents.length == 0">
      <div class="callout secondary">
        <h5>No event found</h5>
      </div>
    </div>
    <div v-for="event in mrsEvents">
      <div class="callout">
        <div class="grid-x">
          <div class="cell small-12 medium-5 large-9">{{ formatDate(event.date) }}</div>
          <div class="cell small-8 medium-auto">{{ event.origin }}</div>
          <div class="cell small-4 medium-shrink text-right"><span class="label primary">{{ event.level }}</span></div>
          <div class="cell small-12 event_content"><code>{{ event.content }}</code></div>
          <div class="cell small-9">
            <span v-for="tag in event.tags" class="label secondary">{{ tag }}</span>
          </div>
          <div class="cell small-3 text-right">
            <a class="button tiny secondary" href="#" v-on:click="acknowledge(event.id)">ACK</a>
          </div>
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
    this.listEvents();
  }

  public listEvents() {
    MrsServer.getEventsNoAck().then(events => {
      this.mrsEvents = events.data.events;
    });
  }

  public formatDate(dateString: string): string {
    return new Date(dateString).toLocaleString();
  }

  public acknowledge(eventId: string): void {
    MrsServer.postEventsAck(eventId).then(() => {
      setTimeout(() => {
        this.listEvents();
      }, 100);
    });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.event_content {
  padding: 1em;
}
</style>
