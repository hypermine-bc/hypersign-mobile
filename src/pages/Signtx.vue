<template >
  <q-page class="q-pa-lg">
    <q-list bordered padding class="rounded-borders" style="max-width: 350px">
      <q-item-label header>Your Keys</q-item-label>
      <q-item clickable v-ripple v-for="app in sortedApps" :key="app.id" >
        <q-item-section avatar top>
          <q-avatar icon="lock" color="grey" text-color="white" />
        </q-item-section>

        <q-item-section>
          <q-item-label lines="1">{{app.name}}</q-item-label>
          <q-item-label caption>{{app.login_time}}</q-item-label>
        </q-item-section>

        <q-item-section side>
          <q-icon name="info" :color="app.color" />
        </q-item-section>
        <hr/>
      </q-item>
      <q-separator spaced ></q-separator>
    </q-list>
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-fab color="purple" icon="keyboard_arrow_up" direction="up">
        <!-- <q-fab-action color="primary" @click="onClick" icon="phonelink_ring" /> -->
        <q-fab-action color="secondary" @click="onClick" icon="payment" />
      </q-fab>
    </q-page-sticky>
  </q-page>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'Signtx',
  computed: {
    ...mapState(['wallet', 'user'])
  },
  data () {
    return {
      scanText: 'Quick Brown Fox Jump Over a Lazy Dog',
      apps:[]
    }
  },
  methods: {
    ...mapActions('wallet', [
      'signMessageTx'
    ]),
    onClick () {
      this.signMessageTx(this.scanText)
        .then(res => {

          var today = new Date();
          var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

          let app = {}
          app.id = Date.now()
          app.login_time = time
          app.name = 'Ae Laboratory '+'SSO'
          app.color = 'green'
          this.apps.push(app)
        })
        .catch(err => {
          console.error(err)
        })
    }
  },
  computed: {
    sortedApps() {
      return this.apps.reverse
    }
  },
}
</script>

<style>
</style>
