<template>
  <div class="container-fluid" style="background-color: #e7e7e7; min-height: 95vh; width: 100%">
    <div class="row align-items-center" style="min-height: calc(100vh - 350px);">
      <div class="col-7 mx-auto">
        <div>
          <h3 style="font-family: 'Arial'">Go Library</h3>
        </div>
        <b-row>
          <b-col cols="8">
            <b-form-input @keydown.enter.native="enterClicked" type="text" size="sm" placeholder="Search for..."
                          v-model="searchText"></b-form-input>
          </b-col>
          <b-col cols="1">
            <div>
              <b-dropdown id="dropdown-form" size="sm" toggle-class="text-primary" variant="outline" text="Period"
                          ref="dropdown">
                <b-dropdown-form>

                  <b-form-group label="Stacked radios" v-slot="{ ariaDescribedby }">
                    <b-form-radio-group
                        v-model="selected"
                        :options="options"
                        :aria-describedby="ariaDescribedby"
                        name="radios-stacked"
                        stacked
                    ></b-form-radio-group>
                  </b-form-group>
                </b-dropdown-form>
              </b-dropdown>
            </div>
          </b-col>
          <b-col cols="3">
            <AdvancedSearch/>
          </b-col>
        </b-row>


      </div>
    </div>
  </div>

</template>

<script>
import AdvancedSearch from "@/components/AdvancedSearch";
import store from "@/store/store";

export default {
  components: {
    AdvancedSearch
  },
  data() {
    return {
      searchText: '',
      selected: 'latest',
      options: [
        {text: '2021', value: 'latest'},
        {text: '2010-2021', value: 'second'},
        {text: 'Older', value: 'third'}
      ],
    }
  },
  methods: {
    async enterClicked() {
      store.state.searchRequest = this.searchText
      store.state.searchResult = null
      await this.axios.get("http://localhost/content/search/", {params: {q:this.searchText}},).then((response) => {
        store.commit('SearchResult',  response.data.result)
        this.$router.push('content')
      })

    },
  }
}
</script>
<style>

</style>