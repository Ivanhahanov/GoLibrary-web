<template>
  <div>
    <b-card no-body>
      <b-tabs card>
        <b-tab title="Book" active>
          <UploadBook />
        </b-tab>
        <b-tab title="Article">
          <b-card-text>Tab contents 2</b-card-text>
        </b-tab>
        <b-tab title="Short Link">
          <UploadShorter />
        </b-tab>
      </b-tabs>
    </b-card>
  </div>
</template>

<script>
import UploadShorter from "@/components/UploadShorter";
import UploadBook from "@/components/UploadBook";

export default {
  name: "Upload",
  components: {
    UploadShorter,
    UploadBook,
  },
}
</script>

<style scoped>

</style>