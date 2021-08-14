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
      <b-row class="text-black-50">
        <b-col>
          <small v-if="items" class="text-black-50">Search results: {{ items.length }}</small>
          <small v-else-if="items === null" class="text-black-50">Search results: 0</small>
          <small v-else-if="!items" class="text-black-50">Press enter for search</small>
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
          <b-col cols="8">
            <b-card v-for="item in items"
                    :key=item.ID
                    class="border-0 w-100"
            >

              <a class="p-1"
                 v-for="item in ['Python', 'Network']"
                 :key="item">
                <b-badge style="font-family: 'Arial';" class="text-white" href="#" variant="info">{{ item }}</b-badge>
              </a>
              <h4>{{ item.title }}</h4>
              <a class="small text-muted">{{ item.author }}</a>
              <b-card-text>
                <span v-for="(text, index) in item.text"
                      :key="index"
                      v-html="text + ' ... '">
                </span>
              </b-card-text>
            </b-card>

            <!--            <div v-if="item.description">-->
            <!--              <div @click="showMore(item.ID)" v-if="!readMore[item.ID]">{{-->
            <!--                  item.description.substring(0, 100) + ".."-->
            <!--                }}-->
            <!--              </div>-->
            <!--              <div @click="showLess(item.ID)" v-if="readMore[item.ID]">{{ item.description }}</div>-->
            <!--            </div>-->

          </b-col>
        </div>
      </b-row>
      <b-row v-else-if="items !== null">
        <div class="text-center">
          <p class="text-black-50"><small>No results...</small></p>
        </div>
      </b-row>
    </div>
  </div>
</template>

<script>
import store from "@/store/store";

export default {
  name: "ContentLibrary",

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
      readMore: [],
      readLess: [],
      isBusy: false,
      titles: [
        {value: 'Title', size: 2},
        {value: 'Author', size: 2},
        {value: 'Publisher', size: 1},
        {value: 'Description', size: 4},
      ],
      items: store.getters.contentSearchResult,
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
      this.isBusy = true
      store.state.searchRequest = this.searchText
      store.state.contentSearchResult = null
      let params = {}
      params["q"] = this.searchText
      params["number_of_fragments"] = 4
      params["size"] = 35
      await this.axios.get("http://localhost/content/search/",
          {params: params},).then((response) => {
        this.items = response.data.result
        this.isBusy = false
      })
    },
    showMore(id) {
      this.$set(this.readMore, id, true);
    },
    showLess(id) {
      this.$set(this.readMore, id, false);
    },
  }
}
</script>

<style scoped>
::v-deep b {
  color: #626262;
}

h4 {
  margin-bottom: 0;
}
</style>