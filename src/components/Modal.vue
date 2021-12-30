<template>
    <v-dialog v-model="showFlag" width="500" >
      <v-card>
        <v-card-title class="text-h5 grey lighten-2">Privacy Policy</v-card-title>

        <v-card-text style="height: 350px;">
          <v-list three-line>
            <template v-for="item in components" >
                <v-list-item :key="item.uuid" >
                    <v-img max-height="150"
  max-width="120" :src="item.imageSrc"></v-img>
                    <v-list-item-content>
                        <v-list-item-title v-html="item.name"></v-list-item-title>
                        <v-list-item-subtitle v-html="item.name"></v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
            </template>
        </v-list>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="onOkButtonClick"
          >
            I accept
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script>
export default {
  name: "Modal",
  data() {
    return {
      showFlag: false,
      resolve: null,
      type: null
    }
  },
  computed: {
    components() {
      if ( this.type === null ) {
        return []  
      }
      return this.$store.state[this.type].components
    }
  },
  methods: {
    async show( type) {
      this.type = type
      return new Promise((resolve) => {
        this.resolve = resolve
        this.showFlag = true
      })
    },
    onOkButtonClick() {
      this.showFlag = false
      this.resolve && this.resolve(true)
    },
    onCancelButtonClick() {
      this.showFlag = false
      this.resolve && this.resolve(false)
    }
  }
}
</script>
<style>
.modal-backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background: #ffffff;
  box-shadow: 2px 2px 20px 1px;
  overflow-x: auto;
  display: flex;
  flex-direction: column;
}

.modal-header,
.modal-footer {
  padding: 15px;
  display: flex;
}

.modal-header {
  position: relative;
  border-bottom: 1px solid #eeeeee;
  color: #4aae9b;
  justify-content: space-between;
}

.modal-footer {
  border-top: 1px solid #eeeeee;
  flex-direction: column;
  justify-content: flex-end;
}

.modal-body {
  position: relative;
  padding: 20px 10px;
}

.btn-close {
  position: absolute;
  top: 0;
  right: 0;
  border: none;
  font-size: 20px;
  padding: 10px;
  cursor: pointer;
  font-weight: bold;
  color: #4aae9b;
  background: transparent;
}

.btn-green {
  color: white;
  background: #4aae9b;
  border: 1px solid #4aae9b;
  border-radius: 2px;
}
</style>
