<template>
    <v-app v-if="configuration">
    <v-app-bar app color="#E39623" dense dark>
      <v-toolbar-title>Configuration: {{configuration.name}}</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-app-bar>

    <v-main class="ma-6" >

      <v-card class="pa-3 mb-10">
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
                    <tr :key="key" v-for="key in Object.keys(battery.data)" >
                      <td class="text-no-wrap pr-5 font-weight-medium">{{ $t("data.label."+key)}}</td>
                      <td>{{battery.data[key]}} {{ $t("data.unit."+key)}}</td> 
                    </tr>
                    <tr v-if="battery.shopping.length>0" >
                      <td><a target="_blank" class="ma-1 darken-1" :href="battery.shopping[0].link">More Details...</a></td> 
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
                    <tr :key="key" v-for="key in Object.keys(item.data)" >
                      <td class="text-no-wrap pr-5 font-weight-medium">{{ $t("data.label."+key)}}</td>
                      <td>{{item.data[key]}} {{ $t("data.unit."+key)}}</td> 
                    </tr>
                    <tr v-if="item.shopping.length>0" >
                      <td><a target="_blank" class="ma-1 darken-1" :href="item.shopping[0].link">More Details...</a></td> 
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
                    <tr :key="item.uuid + index" v-for="(key, index) in Object.keys(item.data)" >
                      <td class="text-no-wrap pr-5 font-weight-medium">{{$t("data.label."+key)}}</td>
                      <td>{{item.data[key]}} {{$t("data.unit."+key)}}</td> 
                    </tr>
                    <tr v-if="item.shopping.length>0" >
                      <td><a target="_blank" class="ma-1 darken-1" :href="item.shopping[0].link">More Details...</a></td> 
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
  </v-app>
</template>
<script>
import AppFooter from '@/components/AppFooter.vue'

export default {
  name: 'Map',
  components: {
    AppFooter
  },
  mounted() {
    this.configuration = this.$store.getters["profile/getById"](this.$route.params.configuration)
  },
  data: () => ({
    configuration: null
  }),
  methods: {
    getComponent(componentRef) {
      const uuid = componentRef.uuid
      const type = componentRef.type
      const node = this.$store.getters[type + "/getByUuid"]( uuid)
      if ( componentRef.customData ) {
        node.data = componentRef.customData
      }
      return node
    }
  },
  watch: {
  },
  computed: {
    battery() {
      return this.getComponent(this.configuration.config.center)
    },
    consumers() {
      const result = []
      const flat = child => { 
        result.push(this.getComponent(child))
        child.children.forEach(c => flat(c))
      }
      this.configuration.config.right.forEach( item => flat(item))
      return result
    },
    producer() {
      const result = []
      const flat = child => { 
        result.push(this.getComponent(child))
        child.children.forEach(c => flat(c))
      }
      this.configuration.config.left.forEach( item => flat(item))
      return result
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
