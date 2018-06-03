<template>
  <div>
    <a v-if="diplaySet" class="button tiny secondary" href="#" v-on:click="inputToken()">Set Token</a>
    <a v-if="diplaySave" class="button tiny secondary" href="#" v-on:click="saveToken()">Save</a>
    <input v-if="diplayInput" type="text" v-model="token">
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Auth extends Vue {
  private token: string = '';
  private diplayInput: boolean = false;
  private diplaySet: boolean = true;
  private diplaySave: boolean = false;

  public created(): void {
    this.diplaySave = false;
    this.diplaySet = true;
    this.diplayInput = false;
  }

  public inputToken(): void {
    this.diplaySave = true;
    this.diplaySet = false;
    this.diplayInput = true;
    this.token = localStorage.getItem('API_TOKEN') || '';
  }

  public saveToken(): void {
    this.diplaySave = false;
    this.diplaySet = true;
    this.diplayInput = false;
    localStorage.setItem('API_TOKEN', this.token);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.event_content {
  padding: 1em;
}
</style>
