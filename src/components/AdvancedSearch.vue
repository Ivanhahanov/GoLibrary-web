<template>
  <div>
    <b-button v-b-toggle.sidebar-no-header class="text-primary" variant="outline" size="sm" >Advanced search</b-button>
    <b-sidebar id="sidebar-no-header" aria-labelledby="sidebar-no-header-title" right no-header backdrop backdrop-variant="dark" shadow>
        <div class="p-3">
          <h4 id="sidebar-no-header-title">Custom header sidebar</h4>
          <p>
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis
            in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
          </p>
          <nav class="mb-3">
            <b-nav vertical>
              <b-nav-item active >Active</b-nav-item>
              <b-nav-item href="#link-1">Link</b-nav-item>
              <b-nav-item href="#link-2" >Another Link</b-nav-item>
            </b-nav>
          </nav>
          <b-button variant="primary" block >Close Sidebar</b-button>
        </div>
    </b-sidebar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      variant: 'dark',
      variants: [
        'transparent',
        'white',
        'light',
        'dark',
        'primary',
        'secondary',
        'success',
        'danger',
        'warning',
        'info',
      ]
    }
  }
}
</script>