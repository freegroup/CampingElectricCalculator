<template>
  <v-dialog v-model="showFlag" max-width="800" scrollable persistent>
    <v-card>
      <DialogHeader 
        :title="dialogTitle"
        :subtitle="dialogSubtitle"
        icon="mdi-lightbulb-on-outline"
        @close="onCancel"
      />

      <v-tabs v-model="activeTab" grow>
        <v-tab>
          <v-icon left>mdi-form-textbox</v-icon>
          Input
        </v-tab>
        <v-tab>
          <v-icon left>mdi-code-json</v-icon>
          Preview
        </v-tab>
      </v-tabs>

      <v-tabs-items v-model="activeTab">
        <!-- Input Tab -->
        <v-tab-item>
          <v-card-text class="pt-4" style="max-height: 600px; overflow-y: auto;">
            <v-form ref="form" v-model="valid">
              <!-- Basic Info -->
              <v-text-field
                v-model="formData.name"
                label="Component Name *"
                :rules="[rules.required]"
                outlined
                dense
                class="mb-2"
              ></v-text-field>

              <v-textarea
                v-model="formData.description"
                label="Description *"
                :rules="[rules.required]"
                outlined
                dense
                rows="2"
                class="mb-4"
              ></v-textarea>

              <!-- Technical Data -->
              <v-card outlined class="mb-4">
                <v-card-subtitle class="font-weight-bold">Technical Data</v-card-subtitle>
                <v-card-text>
                  <v-row>
                    <v-col 
                      v-for="(value, key) in formData.data" 
                      :key="key"
                      cols="12"
                      sm="6"
                    >
                      <!-- Number fields -->
                      <v-text-field
                        v-if="typeof value === 'number'"
                        v-model.number="formData.data[key]"
                        :label="getFieldLabel(key)"
                        :hint="key"
                        :suffix="getFieldUnit(key)"
                        type="number"
                        outlined
                        dense
                        persistent-hint
                      ></v-text-field>

                      <!-- String/Select fields - check if it's an enum -->
                      <v-select
                        v-else-if="getEnumValues(key)"
                        v-model="formData.data[key]"
                        :label="getFieldLabel(key)"
                        :hint="key"
                        :items="getEnumValues(key)"
                        outlined
                        dense
                        persistent-hint
                      ></v-select>

                      <!-- Regular text field for non-enum strings -->
                      <v-text-field
                        v-else
                        v-model="formData.data[key]"
                        :label="getFieldLabel(key)"
                        :hint="key"
                        outlined
                        dense
                        persistent-hint
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>

              <!-- Shopping Link -->
              <v-card outlined class="mb-4">
                <v-card-subtitle class="font-weight-bold">Shopping Link</v-card-subtitle>
                <v-card-text>
                  <v-text-field
                    v-model="formData.shopping[0].shop"
                    label="Shop Name (e.g., Amazon)"
                    outlined
                    dense
                  ></v-text-field>

                  <v-text-field
                    v-model="formData.shopping[0].link"
                    label="Product Link"
                    :rules="[rules.url]"
                    outlined
                    dense
                  ></v-text-field>

                  <v-text-field
                    v-model="formData.shopping[0].label"
                    label="Product Label"
                    outlined
                    dense
                  ></v-text-field>

                  <v-text-field
                    v-model.number="formData.shopping[0].lastKnownPrice"
                    label="Price (€)"
                    type="number"
                    outlined
                    dense
                    suffix="€"
                  ></v-text-field>
                </v-card-text>
              </v-card>
            </v-form>
          </v-card-text>
        </v-tab-item>

        <!-- Preview Tab -->
        <v-tab-item>
          <v-card-text class="pt-4" style="max-height: 600px; overflow-y: auto;">
            <v-card outlined>
              <v-card-subtitle class="font-weight-bold">Generated Component Code</v-card-subtitle>
              <v-card-text>
                <pre class="code-preview">{{ generatedCode }}</pre>
              </v-card-text>
            </v-card>
          </v-card-text>
        </v-tab-item>
      </v-tabs-items>

      <v-divider></v-divider>

      <v-card-actions class="pa-4">
        <v-spacer></v-spacer>
        <v-btn text @click="onCancel">
          Cancel
        </v-btn>
        <v-btn 
          color="primary" 
          depressed
          :disabled="!valid || creatingPR"
          :loading="creatingPR"
          @click="onCreatePullRequest"
        >
          <v-icon left>mdi-lightbulb-on</v-icon>
          Suggest Component
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import DialogHeader from '@/components/DialogHeader.vue'
import GitHubAPI from '@/utils/GitHubAPI.js'

export default {
  name: 'SuggestComponentDialog',
  components: {
    DialogHeader
  },
  data() {
    return {
      showFlag: false,
      valid: false,
      activeTab: 0,
      resolve: null,
      componentType: null,
      creatingPR: false,
      formData: {
        uuid: '',
        name: '',
        description: '',
        imageSrc: '',
        shopping: [
          {
            shop: '',
            link: '',
            label: '',
            lastKnownPrice: 0
          }
        ],
        data: {}
      },
      rules: {
        required: v => !!v || 'Required',
        url: v => !v || /^https?:\/\/.+/.test(v) || 'Must be a valid URL'
      }
    }
  },
  computed: {
    dialogTitle() {
      return `Suggest New ${this.componentTypeName}`
    },
    dialogSubtitle() {
      return 'Fill in the component details to contribute to the project'
    },
    componentTypeName() {
      if (!this.componentType) return 'Component'
      return this.$t('component.name.' + this.componentType)
    },
    generatedCode() {
      const code = {
        uuid: this.formData.uuid,
        name: this.formData.name,
        description: this.formData.description,
        imageSrc: `images("./your-image.png")`,
        shopping: this.formData.shopping.filter(s => s.link),
        data: this.formData.data
      }
      return JSON.stringify(code, null, 2)
    }
  },
  methods: {
    async show(componentType) {
      this.componentType = componentType
      this.activeTab = 0 // Reset to input tab
      
      // Get the generic/custom component template for this type
      const genericComponent = this.$store.state[componentType].components.find(
        c => c.uuid === 'custom' || c.uuid === 'generic'
      )
      
      if (!genericComponent) {
        return null
      }

      // Initialize form with template
      this.formData = {
        uuid: this.generateUUID(),
        name: '',
        description: '',
        imageSrc: '',
        shopping: [
          {
            shop: 'Amazon',
            link: '',
            label: '',
            lastKnownPrice: 0
          }
        ],
        data: { ...genericComponent.data }
      }

      return new Promise((resolve) => {
        this.resolve = resolve
        this.showFlag = true
      })
    },
    generateUUID() {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0
        const v = c === 'x' ? r : (r & 0x3 | 0x8)
        return v.toString(16).toUpperCase()
      })
    },
    getFieldLabel(key) {
      // Try to get translation, fallback to key
      const translationKey = `data.label.${key}`
      const translated = this.$t(translationKey)
      return translated !== translationKey ? translated : key
    },
    getFieldUnit(key) {
      // Try to get unit translation
      const translationKey = `data.unit.${key}`
      const translated = this.$t(translationKey)
      return translated !== translationKey ? translated : ''
    },
    getEnumValues(fieldName) {
      // Use the store getter to get enum values for any field
      if (!this.componentType) return null
      
      return this.$store.getters[`${this.componentType}/getEnumValues`](fieldName)
    },
    async onSubmit() {
      if (this.$refs.form.validate()) {
        this.showFlag = false
        
        // Generate complete _data.js file content
        const completeFileContent = await this.generateCompleteDataFile()
        
        this.resolve && this.resolve({
          componentType: this.componentType,
          componentData: this.formData,
          completeFileContent: completeFileContent
        })
      }
    },
    async generateCompleteDataFile() {
      // Create the new component entry in JavaScript format
      const newComponent = {
        uuid: this.formData.uuid,
        name: this.formData.name,
        description: this.formData.description,
        imageSrc: 'images("./custom.png")',
        shopping: this.formData.shopping.filter(s => s.link),
        data: this.formData.data
      }
      
      // Try to read the original file from GitHub
      try {
        const GitHubAPI = require('@/utils/GitHubAPI.js').default
        const config = require('@/store/config.js').default
        
        const filePath = `src/store/${this.componentType.charAt(0).toUpperCase() + this.componentType.slice(1)}_data.js`
        
        // Read the original file
        const fileData = await GitHubAPI.getFileContent(
          config.repository.owner,
          config.repository.repo,
          filePath,
          config.repository.defaultBranch
        )
        
        // Decode base64 content
        const originalContent = decodeURIComponent(escape(atob(fileData.content)))
        
        // Look for the NEW_COMPONENT_PLACE marker
        const marker = '/* NEW_COMPONENT_PLACE */'
        const markerIndex = originalContent.indexOf(marker)
        
        if (markerIndex === -1) {
          throw new Error('NEW_COMPONENT_PLACE marker not found in file')
        }
        
        // Generate the new component string
        const newComponentStr = this.componentToJavaScript(newComponent, 0)
        
        // Replace the marker with: new component + comma + newline + marker
        const replacement = newComponentStr + ',\n  ' + marker
        
        const fileContent = originalContent.replace(marker, replacement)
        
        return fileContent
      } catch (error) {
        console.error('Error reading original file:', error)er smily oder so
        throw error
      }
    },
    componentToJavaScript(comp, indent = 2) {
      const spaces = ' '.repeat(indent)
      const dataSpaces = ' '.repeat(indent + 2)
      
      let result = `${spaces}{\n`
      result += `${spaces}  uuid: "${comp.uuid}",\n`
      result += `${spaces}  name: "${comp.name}",\n`
      result += `${spaces}  description: "${comp.description}",\n`
      
      // Handle imageSrc - check if it's already a function call
      if (typeof comp.imageSrc === 'string' && comp.imageSrc.includes('images(')) {
        result += `${spaces}  imageSrc: ${comp.imageSrc},\n`
      } else {
        const imageName = comp.imageSrc?.match?.(/\.\/(.+\.png)/)?.[1] || 'your-image.png'
        result += `${spaces}  imageSrc: images("./${imageName}"),\n`
      }
      
      // Add exportable if it exists
      if (comp.exportable !== undefined) {
        result += `${spaces}  exportable: ${comp.exportable},\n`
      }
      
      // Shopping
      if (comp.shopping && comp.shopping.length > 0) {
        result += `${spaces}  shopping: [\n`
        comp.shopping.forEach((shop, shopIndex) => {
          result += `${spaces}    {\n`
          result += `${spaces}      shop: "${shop.shop}",\n`
          result += `${spaces}      link: "${shop.link}",\n`
          result += `${spaces}      label: "${shop.label}",\n`
          result += `${spaces}      lastKnownPrice: ${shop.lastKnownPrice}\n`
          result += `${spaces}    }${shopIndex < comp.shopping.length - 1 ? ',' : ''}\n`
        })
        result += `${spaces}  ],\n`
      } else {
        result += `${spaces}  shopping: [],\n`
      }
      
      // Data - format as JavaScript object with unquoted keys
      result += `${spaces}  data: {\n`
      Object.entries(comp.data).forEach(([key, value], index, arr) => {
        const isLast = index === arr.length - 1
        if (typeof value === 'string') {
          result += `${dataSpaces}  ${key}: "${value}"${isLast ? '' : ','}\n`
        } else if (typeof value === 'number') {
          result += `${dataSpaces}  ${key}: ${value}${isLast ? '' : ','}\n`
        } else if (typeof value === 'boolean') {
          result += `${dataSpaces}  ${key}: ${value}${isLast ? '' : ','}\n`
        } else {
          result += `${dataSpaces}  ${key}: ${JSON.stringify(value)}${isLast ? '' : ','}\n`
        }
      })
      result += `${spaces}  }\n`
      result += `${spaces}}`
      
      return result
    },
    onCancel() {
      this.showFlag = false
      this.resolve && this.resolve(null)
    },
    async onCreatePullRequest() {
      if (!this.$refs.form.validate()) {
        return
      }

      this.creatingPR = true

      try {
        // Generate the complete file content
        const fileContent = await this.generateCompleteDataFile()
        
        // Create pull request using GitHubAPI
        const pr = await GitHubAPI.createComponentPR(
          this.componentType,
          this.formData,
          fileContent
        )
        
        // Success!
        alert(`Pull Request created successfully!\n\nPR #${pr.number}: ${pr.title}\n\nURL: ${pr.html_url}`)
        
        // Open PR in new tab
        window.open(pr.html_url, '_blank')
        
        this.showFlag = false
        this.resolve && this.resolve({
          componentType: this.componentType,
          componentData: this.formData,
          completeFileContent: fileContent,
          pullRequestCreated: true,
          pullRequest: pr
        })
      } catch (error) {
        console.error('Error creating pull request:', error)
        alert(`Error creating pull request:\n\n${error.message}\n\nPlease check the console for more details.`)
      } finally {
        this.creatingPR = false
      }
    }
  }
}
</script>

<style scoped>
.code-preview {
  background-color: #f5f5f5;
  padding: 12px;
  border-radius: 4px;
  font-size: 12px;
  overflow-x: auto;
  max-height: 500px;
  overflow-y: auto;
}
</style>
