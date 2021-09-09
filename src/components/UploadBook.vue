<template>
  <div>
    <b-button v-b-toggle="'collapse'" size="sm" variant="outline-primary" class="m-1">Add New</b-button>
    <b-collapse id="collapse">
      <b-form>
        <b-row class="pt-2">
          <b-col cols="3">
            <b-form-file
                v-model="file"
                :state="Boolean(file)"
                placeholder="Choose a file or drop it here..."
                drop-placeholder="Drop file here..."
            ></b-form-file>
          </b-col>
        </b-row>
        <b-row class="pt-2">
          <b-col cols="3">
            <b-form-input
                v-model="title"
                placeholder="Title"
            ></b-form-input>
          </b-col>
        </b-row>
        <b-row class="pt-2">
          <b-col cols="3">
            <b-form-input
                v-model="author"
                placeholder="Author"
            ></b-form-input>
          </b-col>
        </b-row>
        <b-row class="pt-2">
          <b-col cols="3">
            <b-form-input
                v-model="publisher"
                placeholder="Publisher"
            ></b-form-input>
          </b-col>
        </b-row>
        <b-row class="pt-2">
          <b-col cols="3">
            <b-form-textarea
                v-model="description"
                placeholder="Description..."
                rows="3"
                max-rows="6"
            ></b-form-textarea>
          </b-col>
        </b-row>
        <b-row class="pt-2">
          <b-col>
            <b-button small @click="upload" variant="outline-success">Upload</b-button>
          </b-col>
        </b-row>
      </b-form>
    </b-collapse>
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
        <template #cell(actions)="row">
          <b-button size="sm" variant="outline-danger" @click="removeBook(row.item.slug)" class="mr-2">
            Remove
          </b-button>
        </template>
      </b-table>
    </div>
  </div>
</template>

<script>
export default {
  name: "UploadBook",
  data() {
    return {
      file: null,
      title: null,
      author: null,
      publisher: null,
      description: null,
      tags: null,
      fields: [
        {key: 'title'},
        {key: 'author'},
        {key: 'publisher'},
        {key: 'path'},
        {key: 'slug'},
        {key: 'actions'},

      ],
      items: []
    }
  },
  methods: {
    upload() {
      const formData = new FormData()
      formData.append('file', this.file, this.file.name)
      formData.append('title', this.title)
      formData.append('author', this.author)
      formData.append('publisher', this.publisher)
      formData.append('description', this.description)
      console.log(formData.get('file'))
      this.axios.put("/books/", formData).then((response) => {
        console.log(response.data)
        this.getBooks()
      })
    },
    async getBooks() {
      await this.axios.get("/books/").then((response) => {
        this.items = response.data.books
      })
    },
    async removeBook(bookId) {
      await this.axios.delete("/books/"+bookId).then((response) => {
        this.items = response.data.books
        this.getBooks()
      })
    },
  },
  mounted() {
    this.getBooks()
  }
}
</script>

<style scoped>

</style>