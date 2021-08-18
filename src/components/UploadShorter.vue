<template>
  <div>
    <b-form inline>
      <b-form-input
          class="mb-2 mr-sm-2 mb-sm-0"
          placeholder="Source Link"
          v-model="original_link"
      ></b-form-input>
      <b-button small variant="primary" @click="addShortLink">Save</b-button>
    </b-form>
    <div class="py-4">
      <b-table
          :striped="false"
          :bordered="false"
          :borderless="false"
          :outlined="false"
          :small="true"
          :hover="false"
          :fixed="true"
          :items="items"
          :fields="fields"
      >
        <template #cell(short_name)="data">
          <b-link :href="'http://localhost/' + data.value">http://localhost/{{ data.value }}</b-link>
        </template>
      </b-table>
    </div>
  </div>
</template>

<script>

export default {
  name: "UploadShorter",
  data() {
    return {
      original_link: "",
      fields: [
        {
          key: 'short_name',
          label: 'Short Link',
        },
        {
          key: 'visit_count',
          label: 'Visit count',
          sortable: false
        },
        {
          key: 'original_name',
          label: 'Link'
        }
      ],
      items: []
    }

  },
  methods: {
    async getShortLinks() {
      await this.axios.get("http://localhost/link/",).then((response) => {
        this.items = response.data.result
      })
    },
    async addShortLink() {
      await this.axios.post("http://localhost/link/create/", {'original_link': this.original_link}).then((response) => {
        this.items = response.data.result
        this.getShortLinks()
      })
    }
  },
  created() {
    this.getShortLinks()
  }
}
</script>

<style scoped>

</style>