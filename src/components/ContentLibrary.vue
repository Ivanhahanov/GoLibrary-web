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
          <b-form-input @keydown.enter.native="enterClicked" list="my-list-id" type="text" size="sm" placeholder="Search for..."
                        v-model="searchText" v-on:input="Autocomplete(searchText)"></b-form-input>
          <datalist id="my-list-id">
            <option v-for="title in titles" :key="title">{{ title }}</option>
          </datalist>
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
          <b-col cols="6">
            <b-card v-for="item in items"
                    :key=item.slug
                    class="border-0"
                    style="width: 60rem;"
            >
              <a v-b-toggle="item.slug"><h4>{{ item.title }}</h4></a>
              <a class="small text-muted">{{ item.author }}</a>
              <b-card-text>
                <a v-for="text in item.text"
                   :key="text.page"
                   class="text-body"
                   v-b-toggle="item.slug+text.page"
                   @click="render(item.slug, text.page)"
                   v-html="text.text + ' ... '">
                </a>
              </b-card-text>
              <div v-for="text in item.text"
                   :key="text.page">
                <b-sidebar
                    :id="item.slug+text.page"
                    width="55%"
                    no-header
                    backdrop
                    shadow
                    right
                >
                  <div class="p-3">
                    <pdf v-for="i in pageCount"
                         :key="i"
                         :src="pdfsrc"
                         :page="i">

                    </pdf>
                  </div>
                </b-sidebar>
              </div>
              <b-sidebar
                  :id="item.slug"
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
                    <div class="d-inline-block">
                      <b-button @click="download(item.slug)" size="sm" variant="outline">
                        <b-icon scale="1" icon="download"></b-icon>
                      </b-button>
                    </div>
                    <div class="text-black-50"><small>author</small></div>
                    <p>{{ item.author }}</p>

                    <div class="text-black-50"><small>publisher</small></div>
                    <p>{{ item.publisher }}</p>

                    <div class="text-black-50"><small>description</small></div>
                    <p>{{ item.description }}</p>
                    <b-button @click="download(item.slug)" variant="outline-primary">
                      Download
                    </b-button>
                  </b-card>
                </div>
              </b-sidebar>
            </b-card>
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
import pdf from "vue-pdf";

export default {
  name: "ContentLibrary",
  components: {
    pdf
  },
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
      isBusy: false,
      pdfsrc: "",
      pageCount: 3,
      titles: [],
      items: store.getters.searchResult,
    }
  },
  methods: {
    async enterClicked() {
      this.isBusy = true
      store.state.searchRequest = this.searchText
      store.state.searchResult = null
      let params = {}
      params["q"] = this.searchText
      params["num_of_fragments"] = 4
      params["lang"] = "ru"
      params["size"] = 50
      await this.axios.get("/content/search/",
          {params: params},).then((response) => {
        this.items = response.data.result
        console.log(response.data.result)
        this.isBusy = false
      })
    },
    Autocomplete(text){
        this.axios.get("/content/autocomplete/", {
          params: {q: text, lang: "ru"}
        }).then((response) => {
          this.titles = response.data.result
          console.log(response.data.result)
        })
    },
    render(slug, page) {
      this.axios.get("/content/part/", {
        method: "GET",
        params: {page: page, slug: slug},
        responseType: "blob"
      }).then(response => {
        console.log("Success", response);
        const blob = new Blob([response.data]);
        const objectUrl = URL.createObjectURL(blob);
        this.pdfsrc = objectUrl;
      })
    },
    base64ToArrayBuffer(base64) {
      var binary_string = window.atob(base64);
      var len = binary_string.length;
      var bytes = new Uint8Array(len);
      for (var i = 0; i < len; i++) {
        bytes[i] = binary_string.charCodeAt(i);
      }
      return bytes.buffer;
    },
    download(slug) {
      let url = '/download/' + slug
      this.axios({
        url: url,
        method: "GET",
        responseType: 'blob',
      }).then((response) => {
        let fileURL = window.URL.createObjectURL(new Blob([response.data]));
        let fileLink = document.createElement('a')

        fileLink.href = fileURL
        fileLink.setAttribute('download', slug)
        fileLink.setAttribute('from', 'god')
        document.body.appendChild(fileLink);

        fileLink.click();
      });
    }
  }
}
</script>

<style scoped>
::v-deep b {
  color: #626262;
}


</style>