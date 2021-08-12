<template>
  <div>
    <div class="py-5 ml-4">
      <b-row>
        <b-col>
          <h4>Library</h4>
        </b-col>
      </b-row>
      <b-row class="py-1">
        <b-col cols="5">
          <b-form-input @keydown.enter.native="enterClicked" type="text" size="sm" placeholder="Search for..."
                        v-model="searchText"></b-form-input>
        </b-col>
      </b-row>
      <p></p>
      <b-row class="text-black-50">
        <b-col>
          <b-row>
            <b-col :cols=title.size v-for="title in titles" :key="title.value">
              <small>{{ title.value }}</small>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
      <div class="border-top my-1"></div>
      <b-row v-if="items" style="font-family: 'Deja Vu Sans Mono'; color: #3d3d3d">
        <div>
          <b-col>
            <b-row class="py-1"
                   v-for="item in items"
                   :key=item.ID
                   @mouseover="onHoverId = item.ID"
                   @mouseout="onHoverId = false"
                   :style= "[item.ID === onHoverId ? {'background-color':'#f3f3f3'} : {'background-color':'#ffffff'}]">

              <b-col cols="2">
                {{ item.title }}
              </b-col>
              <b-col cols="2">
                {{ item.author }}
              </b-col>
              <b-col cols="1">
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
      items: store.getters.searchResult,
    }
  },
  methods: {
    async enterClicked() {
      store.state.searchRequest = this.searchText
      store.state.searchResult = null
      await this.axios.get("http://localhost/search/", {params: {q: this.searchText}},).then((response) => {
        this.items = response.data.result
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

</style>