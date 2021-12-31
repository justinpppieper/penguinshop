Vue.component('paginate', VuejsPaginate)
Vue.use(VueLoading);
Vue.component('loading', VueLoading)
const debounce = require('lodash.debounce')

const app1 = new Vue({

  el: '#app1',
  data: {
    categories: categories,
    pageInfo: pageInfo,
    pageIndex: 1,
    pageSize: 5,
    keyword: '',
    isLoading: false
  },

  methods: {
    jumpToPage: function (pageIndex) {
      this.isLoading = true
      const params = { pageIndex, pageSize: this.pageSize }
      if (this.keyword !== null) {
        params.keyword = this.keyword
      }
      axios.get('/api/v1/category', {
          params
      }).then(result => {
          this.pageInfo = result.data.data.pageInfo
          this.categories = result.data.data.categories
          this.isLoading = false
      })
    },

    _jumpToPage: debounce(function () {
        this.jumpToPage(this.pageIndex)
      }, 1000
    ),

    getCategoryNumber: function (index) {
        return ((this.pageInfo.pageIndex - 1) * this.pageInfo.pageSize + index + 1)
    },

    deleteCategory: function (id, name) {
        Swal.fire({
            title: 'Delete Category: ' + name,
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#000',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`/api/v1/category/${id}`)
                    .then(response => {
                        Swal.fire({
                          title: response.data.message,
                          text: 'Category has been deleted.',
                          confirmButtonColor: '#000',
                        })
                    })
                
                this.jumpToPage(this.pageIndex)
            }
        })
    }
  },

  computed: {
    pagination: function () {
        return {
            totalPages: Math.ceil(this.pageInfo.totalDocument / this.pageInfo.pageSize),
            currentPage: this.pageInfo.pageOffset
      }
    }
  },

  watch: {
    pageSize: function () {
      this._jumpToPage()
    },

    keyword: function () {
      this._jumpToPage()
    }
  }
})
