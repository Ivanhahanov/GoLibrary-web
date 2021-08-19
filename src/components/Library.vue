<template>
  <div>
    <div class="py-5 ml-4">
      <b-row>
        <b-col>
          <h3 class="my-2">
            Library
          </h3>
        </b-col>
      </b-row>
      <b-row class="py-1">
        <b-col cols="5">
          <b-form-input @keydown.enter.native="enterClicked" type="text" size="sm" placeholder="Search for..."
                        v-model="searchText"></b-form-input>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="4">
          <b-link size="sm" v-b-toggle.collapse-field class="m-1"><small>Search fields</small></b-link>
          <b-collapse id="collapse-field">
            <b-form-radio-group
                v-model="selected"
                :options="options"
                class="mb-3"
                value-field="item"
                text-field="name"
                disabled-field="notEnabled"
                @keydown.enter.native="enterClicked"
            ></b-form-radio-group>
          </b-collapse>
        </b-col>
        <b-col cols="2">
        </b-col>
      </b-row>
      <b-row class="text-black-50">
        <b-col :cols=title.size v-for="title in titles" :key="title.value">
          <small>{{ title.value }}</small>
        </b-col>
      </b-row>
      <div class="border-top my-1"></div>
      <div v-if="items === null">
        <div class="text-center">
          <p class="text-black-50"><small>No results...</small></p>
        </div>
      </div>
      <b-row v-if="items" style="font-family: 'Deja Vu Sans Mono'; color: #3d3d3d">
        <div>
          <b-col>
            <b-row class="py-1"
                   v-for="item in items"
                   :key=item.ID
                   @mouseover="onHoverId = item.ID"
                   @mouseout="onHoverId = false"
                   :style="[item.ID === onHoverId ? {'background-color':'#f3f3f3'} : {'background-color':'#ffffff'}]">
              <b-col cols="2" v-b-toggle="item.ID">
                {{ item.title }}
              </b-col>
              <b-col cols="2" v-b-toggle="item.ID">
                {{ item.author }}
              </b-col>
              <b-col cols="1" v-b-toggle="item.ID">
                {{ item.publisher }}
              </b-col>
              <b-col cols="4">
                <div v-if="item.description">
                  <div @click="showMore(item.ID)" v-if="!readMore[item.ID]">{{
                      item.description.substring(0, 200) + ".."
                    }}
                  </div>
                  <div @click="showLess(item.ID)" v-if="readMore[item.ID]">{{ item.description }}</div>
                </div>
              </b-col>
              <b-sidebar
                  :id="item.ID"
                  width="40%"
                  no-header
                  backdrop
                  shadow
                  right
              >
                <div class="p-3">
                  <b-card class="text-left">


                    <div class="d-inline-block">
                      <div class="text-black-50"><small>title</small></div>
                      <h4 id="sidebar">{{ item.title }}</h4>
                    </div>
                    <div class="ml-2 d-inline-block">
                      <b-button @click="download(item.ID, item.slug)" size="sm" variant="outline">
                        <b-icon scale="1" icon="download"></b-icon>
                      </b-button>
                    </div>
                    <div class="text-black-50"><small>author</small></div>
                    <p>{{ item.author }}</p>

                    <div class="text-black-50"><small>publisher</small></div>
                    <p>{{ item.publisher }}</p>

                    <div class="text-black-50"><small>description</small></div>
                    <p>{{ item.description }}</p>
                    <b-button @click="download(item.ID, item.slug)" variant="outline-primary">
                      Download
                    </b-button>
                  </b-card>
                </div>
              </b-sidebar>
            </b-row>
          </b-col>
        </div>
      </b-row>
    </div>
  </div>
</template>

<script>
import store from "@/store/store";

export default {
  name: "Library",

  data() {
    return {
      selectedCategory: "Books",
      categories: [
        {value: "books", text: "Books"},
        {value: "articles", text: "Articles"},
        {value: "links", text: "Links"},
      ],
      searchText: store.getters.searchRequest,
      onHoverId: false,
      item: {ID: null},
      readMore: [],
      readLess: [],
      isBusy: false,
      titles: [
        {value: 'Title', size: 2},
        {value: 'Author', size: 2},
        {value: 'Publisher', size: 1},
        {value: 'Description', size: 4},
      ],
      tags: ['Apple', 'Orange', 'Banana', 'Lime', 'Peach', 'Chocolate', 'Strawberry'],
      search: '',
      value: [],
      selected: 'title',
      options: [
        {item: 'title', name: 'Title', checked: true},
        {item: 'description', name: 'Description'},
        {item: 'author', name: 'Author'},
        {item: 'publisher', name: 'Publisher'},
        {item: 'soon', name: 'Soon', notEnabled: true},
      ],
      items: store.getters.searchResult,
    }
  },
  computed: {
    criteria() {
      // Compute the search criteria
      return this.search.trim().toLowerCase()
    },
    availableOptions() {
      const criteria = this.criteria
      // Filter out already selected
      const tags = this.tags.filter(opt => this.value.indexOf(opt) === -1)
      if (criteria) {
        // Show only options that match criteria
        return tags.filter(opt => opt.toLowerCase().indexOf(criteria) > -1);
      }
      // Show all tags available
      return tags
    },
    searchDesc() {
      if (this.criteria && this.availableOptions.length === 0) {
        return 'There are no tags matching your search criteria'
      }
      return ''
    }
  },
  methods: {
    async enterClicked() {
      store.state.searchRequest = this.searchText
      store.state.searchResult = null
      let params = {}
      params[this.selected] = this.searchText
      await this.axios.get("http://localhost/search/",
          {params: params},).then((response) => {
        this.items = response.data.result
      })
    },
    showMore(id) {
      this.$set(this.readMore, id, true);
    },
    showLess(id) {
      this.$set(this.readMore, id, false);
    },
    download(fileId, filename) {
      let url = 'http://localhost/download/' + fileId
      this.axios({
        url: url,
        method: "GET",
        responseType: 'blob',
      }).then((response) => {
        let fileURL = window.URL.createObjectURL(new Blob([response.data]));
        let fileLink = document.createElement('a')

        fileLink.href = fileURL
        fileLink.setAttribute('download', filename)
        fileLink.setAttribute('from', 'god')
        document.body.appendChild(fileLink);

        fileLink.click();
      });
    }
  }
}
</script>

<style scoped>

</style>