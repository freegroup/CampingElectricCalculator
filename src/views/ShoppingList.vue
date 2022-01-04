<template>
    <v-app>
    <v-app-bar app color="#E39623" dense dark>
      <v-toolbar-title>Configuration: {{configuration.label}}</v-toolbar-title>
      <v-spacer></v-spacer>

    </v-app-bar>

    <v-main class="ma-6" >
      {{ $t("view.shopping.battery")}}
      <v-card class="pa-3 mb-10">
        <v-row no-gutters>
          <v-col cols="12">
           <div class="text-h6">{{battery.name}}</div>
           <div class="text-subtitle-1">{{battery.description}}</div>
          </v-col>
          <v-col cols="2">
            <v-img class="mt-5" :src="battery.imageSrc" contain></v-img>
          </v-col>
          <v-col cols="10"  class="mt-5 pl-10">
            {{ $t("view.shopping.factsheet")}}
            <v-card >
              <v-simple-table flat dense>
              <template v-slot:default>
                <thead>
                  <tr><th width="200" class="text-left">Name</th>    <th class="text-left">Value</th></tr>
                </thead>
                <tbody>
                  <tr :key="key" v-for="key in Object.keys(battery.data)" ><td>{{ $t("data.label."+key)}}</td><td>{{battery.data[key]}} {{ $t("data.unit."+key)}}</td> </tr>
                </tbody>
              </template>
            </v-simple-table>
            </v-card>
          </v-col>
        </v-row>
      </v-card>

      {{ $t("view.shopping.consumer")}}
      <v-card class="pa-3 mb-10">
        <v-row no-gutters class="mb-10" v-for="item in consumers" :key="item.uuid">
          <v-col cols="12">
           <div class="text-h6">{{item.name}}</div>
           <div class="text-subtitle-1">{{item.description}}</div>
          </v-col>
          <v-col cols="2">
            <v-img class="mt-5" :src="item.imageSrc" contain></v-img>
          </v-col>
          <v-col cols="10"  class="mt-5 pl-10">
            {{ $t("view.shopping.factsheet")}}
            <v-card >
              <v-simple-table flat dense>
              <template v-slot:default>
                <thead>
                  <tr><th width="200" class="text-left">Name</th> <th class="text-left">Value</th></tr>
                </thead>
                <tbody>
                  <tr :key="key" v-for="key in Object.keys(item.data)" >
                    <td>{{ $t("data.label."+key)}}</td><td>{{item.data[key]}} {{ $t("data.unit."+key)}}</td> 
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
            </v-card>
          </v-col>
        </v-row>
      </v-card>

      {{ $t("view.shopping.charge")}}
      <v-card class="pa-3 mb-10">
        <v-row no-gutters class="mb-10" v-for="item in producer" :key="item.uuid">
          <v-col cols="12">
           <div class="text-h6">{{item.name}}</div>
           <div class="text-subtitle-1">{{item.description}}</div>
          </v-col>
          <v-col cols="2">
            <v-img class="mt-5" :src="item.imageSrc" contain></v-img>
          </v-col>
          <v-col cols="10"  class="mt-5 pl-10">
            {{ $t("view.shopping.factsheet")}}
            <v-card >
              <v-simple-table flat dense>
              <template v-slot:default>
                <thead>
                  <tr><th width="200" class="text-left">Name</th> <th class="text-left">Value</th></tr>
                </thead>
                <tbody>
                  <tr :key="item.uuid + index" v-for="(key, index) in Object.keys(item.data)" >
                    <td>{{$t("data.label."+key)}}</td><td>{{item.data[key]}} {{$t("data.unit."+key)}}</td> 
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
            </v-card>
          </v-col>
        </v-row>
      </v-card>
    </v-main>

  </v-app>
</template>
<script>

export default {
  name: 'Map',
  components: {
  },
  mounted() {
    this.configuration = this.$store.getters["configuration/getById"](this.$route.params.configuration)
  },
  data: () => ({
    configuration: {
      config: {
        center: {},
        left: [],
        right: []
      }
    }
  }),
  methods: {
    getComponent(type, uuid) {
      return this.$store.getters[type + "/getByUuid"]( uuid)
    }
  },
  watch: {
  },
  computed: {
    battery() {
      const type = this.configuration.config.center.type
      const uuid = this.configuration.config.center.uuid
      if ( type && uuid ) {
        return this.getComponent(type, uuid)
      }
      return { data: { ah: 0 } }
    },
    consumers() {
      const result = []
      const flat = child => { 
        result.push(this.getComponent(child.type, child.uuid))
        child.children.forEach(c => flat(c))
      }
      this.configuration.config.right.forEach( item => flat(item))
      return result
    },
    producer() {
      const result = []
      const flat = child => { 
        result.push(this.getComponent(child.type, child.uuid))
        child.children.forEach(c => flat(c))
      }
      this.configuration.config.left.forEach( item => flat(item))
      return result
    }
  }
}
</script>

<style>
.v-toolbar__extension{
  background-color: rgba(255,255,255,0.1);
}
</style>
