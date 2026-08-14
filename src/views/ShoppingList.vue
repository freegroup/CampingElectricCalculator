<template>
    <v-app v-if="configuration">
    <v-app-bar app color="#E39623" dense dark>
      <v-toolbar-title>Configuration: {{configuration.name}}</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-app-bar>

    <v-main class="ma-6" >

      <v-card class="pa-3 mb-10" v-if="battery">
        <v-row no-gutters class="mb-5">
          <v-col cols="12" class="mb-4">
            <div class="text-h6">{{battery.name}}</div>
            <div class="text-body-2 text--secondary">{{battery.description}}</div>
          </v-col>
          <v-col align-self="center" align="center" cols="2">
            <v-img width="60px" :src="battery.imageSrc" contain></v-img>
          </v-col>
          <v-col>
            <v-row>
              <v-icon small class="mr-2" >mdi-clipboard-outline</v-icon> {{ $t("view.shopping.factsheet")}}
            </v-row>
            <v-row>
              <table class="text-body-2">
                  <tbody>
                    <template v-for="row in rows(battery)">
                      <tr v-if="row.group" :key="row.path">
                        <td colspan="2" class="pt-3 font-weight-bold">{{row.label}}</td>
                      </tr>
                      <tr v-else :key="row.path">
                        <td class="text-no-wrap pr-5 font-weight-medium" :class="{'pl-4': row.indented}">{{row.label}}</td>
                        <td>{{row.value}} {{row.unit}}</td>
                      </tr>
                    </template>
                    <tr v-if="battery.shopping.length>0" >
                      <td><a target="_blank" class="ma-1 darken-1" :href="battery.shopping[0].link">{{ $t('dialog.common.moreDetails') }}</a></td> 
                      <td></td>
                    </tr>
                  </tbody>
              </table>
            </v-row>
          </v-col>
        </v-row>
      </v-card>

      {{ $t("view.shopping.consumer")}}
      <v-card class="pa-3 mb-10">
        <template v-for="item in consumers" >
          <v-row no-gutters class="mb-10" :key="item.uuid" v-if="item.exportable">
            <v-col cols="12"  class="mb-4">
              <div class="text-h6">{{item.name}}</div>
              <div class="text-body-2 text--secondary">{{item.description}}</div>
            </v-col>

            <v-col cols="2" align-self="center" align="center" >
              <v-img width="60px" :src="item.imageSrc" contain></v-img>
            </v-col>
            <v-col cols="5" align-self="start" align="start">
              <v-row>
                <v-icon small class="mr-2" >mdi-clipboard-outline</v-icon>{{ $t("view.shopping.factsheet")}}
              </v-row>
              <v-row>
                <table class="text-body-2">
                   <tbody>
                    <template v-for="row in rows(item)">
                      <tr v-if="row.group" :key="row.path">
                        <td colspan="2" class="pt-3 font-weight-bold">{{row.label}}</td>
                      </tr>
                      <tr v-else :key="row.path">
                        <td class="text-no-wrap pr-5 font-weight-medium" :class="{'pl-4': row.indented}">{{row.label}}</td>
                        <td>{{row.value}} {{row.unit}}</td>
                      </tr>
                    </template>
                    <tr v-if="item.shopping.length>0" >
                      <td><a target="_blank" class="ma-1 darken-1" :href="item.shopping[0].link">{{ $t('dialog.common.moreDetails') }}</a></td> 
                      <td></td>
                    </tr>
                  </tbody>
              </table>
              </v-row>
            </v-col>
          </v-row>
        </template>
      </v-card>

      {{ $t("view.shopping.charge")}}
      <v-card class="pa-3 mb-10">
        <template v-for="item in producer" >
          <v-row no-gutters class="mb-10" :key="item.uuid" v-if="item.exportable">
            <v-col cols="12" class="mb-4">
              <div class="text-h6">{{item.name}}</div>
              <div class="text-body-2 text--secondary">{{item.description}}</div>
            </v-col>

            <v-col cols="2" align-self="center" align="center">
              <v-img width="60px" :src="item.imageSrc" contain></v-img>
            </v-col>

            <v-col cols="5" align-self="start" align="start">
              <v-row>
                <v-icon small class="mr-2" >mdi-clipboard-outline</v-icon>{{ $t("view.shopping.factsheet")}}
              </v-row>
              <v-row>
                <table class="text-body-2">
                    <template v-for="row in rows(item)">
                      <tr v-if="row.group" :key="item.uuid + row.path">
                        <td colspan="2" class="pt-3 font-weight-bold">{{row.label}}</td>
                      </tr>
                      <tr v-else :key="item.uuid + row.path">
                        <td class="text-no-wrap pr-5 font-weight-medium" :class="{'pl-4': row.indented}">{{row.label}}</td>
                        <td>{{row.value}} {{row.unit}}</td>
                      </tr>
                    </template>
                    <tr v-if="item.shopping.length>0" >
                      <td><a target="_blank" class="ma-1 darken-1" :href="item.shopping[0].link">{{ $t('dialog.common.moreDetails') }}</a></td> 
                      <td></td>
                    </tr>
                </table>
              </v-row>
            </v-col>
          </v-row>
        </template>
      </v-card>
    </v-main>
    <AppFooter />
    <NotificationDialog ref="notificationDialog"/>
  </v-app>
</template>
<script>
import AppFooter from '@/components/AppFooter.vue'
import NotificationDialog from '@/dialogs/NotificationDialog.vue'
import { toDisplayRows } from '@/utils/DataRows.js'

export default {
  name: 'Map',
  components: {
    AppFooter,
    NotificationDialog
  },
  mounted() {
    const configuration = this.$store.getters["profile/getById"](this.$route.params.configuration)
    const problems = []

    if ( configuration.loadProblem ) {
      problems.push(this.$t('dialog.loadProblem.' + configuration.loadProblem))
    }

    const config = configuration.config
    if ( !config || typeof config !== "object" ) {
      this.configuration = configuration
      problems.push(this.$t('dialog.loadProblem.configInvalid'))
      this.reportProblems(problems)
      return
    }

    this.battery = this.getComponent(config.center, problems)
    this.producer = this.collectComponents(config.left, problems)
    this.consumers = this.collectComponents(config.right, problems)
    this.configuration = configuration

    this.reportProblems(problems)
  },
  data: () => ({
    configuration: null,
    battery: null,
    consumers: [],
    producer: []
  }),
  methods: {
    /**
     * Rows of the fact sheet table, with nested data blocks expanded into single rows.
     */
    rows(component) {
      return toDisplayRows(component.data, this.$t.bind(this))
    },

    /**
     * Resolve a component of the configuration. Returns "null" if the component is not part
     * of the component database (anymore) so the caller can leave it out of the list.
     */
    getComponent(componentRef, problems) {
      if ( !componentRef || typeof componentRef !== "object" ) {
        return null
      }
      const uuid = componentRef.uuid
      const type = componentRef.type
      const getByUuid = typeof type === "string" ? this.$store.getters[type + "/getByUuid"] : null
      const node = typeof getByUuid === "function" ? getByUuid(uuid) : null

      if ( !node ) {
        const key = 'component.name.' + type
        const name = this.$t(key)
        problems.push(this.$t('dialog.loadProblem.unknownComponent', { component: name === key ? String(type) : name }))
        return null
      }

      if ( componentRef.customData ) {
        node.data = componentRef.customData
      }
      return node
    },

    /**
     * Flatten the component tree into the list shown to the user, skipping everything
     * which can't be resolved anymore.
     */
    collectComponents(childComponents, problems) {
      const result = []
      const flat = child => {
        const component = this.getComponent(child, problems)
        if ( component === null ) {
          // the component is gone - and so is everything connected below it
          return
        }
        result.push(component)
        const children = Array.isArray(child.children) ? child.children : []
        children.forEach(c => flat(c))
      }
      const roots = Array.isArray(childComponents) ? childComponents : []
      roots.forEach( item => flat(item))
      return result
    },

    reportProblems(problems) {
      const messages = problems.filter((message, index) => problems.indexOf(message) === index)
      if ( messages.length === 0 ) {
        return
      }

      this.$nextTick(() => {
        this.$refs.notificationDialog && this.$refs.notificationDialog.show({
          title: this.$t('dialog.loadProblem.title'),
          subtitle: this.$t('dialog.loadProblem.subtitle'),
          hint: this.$t('dialog.loadProblem.hint'),
          messages: messages,
          severity: "warning"
        })
      })
    }
  }
}
</script>

<style lang="less">
.v-toolbar__extension{
  background-color: rgba(255,255,255,0.1);
}

.text-body-2 {
  td {
    vertical-align: top;
    min-width: 90px;
  }
}
</style>
