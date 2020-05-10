<template >
  <q-page class="q-pa-lg">
    <q-list bordered padding class="rounded-borders" style="max-width: 350px">
      <div>
        <span class="header width-50">Your Keys </span>
        <span class="header width-50"><a @click="clearOldSession"><q-icon name="delete" /></a></span>
      </div>
      <!-- <q-item-label header>Your Keys </q-item-label>
      <q-item-label header style="float:right">Clear </q-item-label> -->
      <q-item clickable v-ripple v-for="app in apps" :key="app.id" >
        <q-item-section avatar top>
          <q-avatar :icon="app.icon" color="grey" text-color="white" />
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
      apps: []
    }
  },
  methods: {
    ...mapActions('wallet', [
      'signMessageTx'
    ]),
    clearOldSession () {
      this.apps = this.apps.filter(app => {
        if (app.color === 'green') {
          return true
        } else {
          return false
        }
      })
    },
    onClick () {
      this.signMessageTx(this.scanText)
        .then(res => {
          this.apps = this.apps.filter(app => {
            app.icon = 'lock'
            app.color = 'orange'
            return app
          })
          var today = new Date()
          // var time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds()
          let app = {}
          app.id = Date.now()
          app.login_time = today
          app.name = 'Ae Laboratory ' + 'SSO'
          app.color = 'green'
          app.icon = 'lock_open'
          this.apps.push(app)
        })
        .catch(err => {
          console.error(err)
        })
    }
  }
}
</script>

<style>
.header {
  color:#757575;
  padding: 16px;
  font-size: 0.875rem;
  letter-spacing: 0.01786em;
}
.width-50 {
  width:50%
}
.pull-right{
  text-align: right;
}
</style>
