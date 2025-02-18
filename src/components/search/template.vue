<template>
  <div id="car-sales">
    <PageSchema />
    <div v-show="$store.state.loading"
      class="uk-width-1-1 uk-height-1-1 uk-background-default uk-position-fixed uk-position-z-index">
      <div class="uk-flex uk-height-medium" uk-height-viewport="offset-top: true">
        <div class="uk-margin-auto uk-margin-auto-vertical uk-text-center">
          <div class="uk-position-relative spinner-loader"></div>
          <div class="uk-padding-small">loading vehicles</div>
        </div>
      </div>
    </div>

    <!-- Search Top Bar - Mobile -->
    <div class="search-header-tr menu_Filters uk-width-1-1 uk-background-default uk-grid uk-grid-collapse uk-hidden@m">
      <div class="uk-text-left uk-margin-auto-right uk-width-auto"
        uk-toggle="target: #toggle-bar; cls: uk-visible uk-position-top uk-position-fixed uk-position-z-index uk-hidden uk-width-1-1; animation: uk-animation-slide-bottom">
        <button class="uk-button uk-text-bold uk-border-rounded-4 mb-nav-bar-filters"><span
            uk-icon="icon: settings"></span> Filters</button>
        <span class="uk-text-small uk-text-bold uk-margin-small-left">{{ foundResultText }}</span>
      </div>

      <div v-if="savedVehiclesCount.length > 0" class="uk-flex uk-flex-middle">
        <span
          uk-toggle="target: #saved-bar; cls: uk-visible uk-position-top uk-position-fixed uk-position-z-index uk-hidden uk-width-1-1; animation: uk-animation-slide-top">{{
      savedVehiclesCount }} <span uk-icon="heart"></span></span>
      </div>
    </div>
    <!-- end of Search Top Bar - Mobile -->

    <!-- Search Top Bar -->
    <div class="sales-navbar-sticky uk-width-1-1 uk-visible@m" style="z-index: 3">
      <nav class="uk-navbar-container uk-navbar-transparent uk-background-default search-nav-hoz" uk-navbar
        style="position: relative; z-index: 3">
        <div class="uk-navbar-left">
          <a class="uk-navbar-item uk-logo uk-margin-medium-left uk-text-emphasis uk-text-bold" href="#">{{
      foundResultText }}</a>

          <ul class="uk-navbar-nav uk-visible@l">
            <li>
              <a class="uk-navbar-item navbar-saves uk-text-emphasis uk-text-bold uk-text-capitalize"
                href="/compare-vehicles-for-sale" data-uk-scroll="offset:100">
                <span class="uk-margin-small-right" uk-icon="heart"></span>
                {{ savedVehiclesText }}
              </a>
            </li>
          </ul>

        </div>
        <div class="uk-navbar-right">
          <ul class="uk-navbar-nav search-nav-hoz">
            <li class="uk-flex uk-flex-middle uk-flex-right" v-if="Object.keys($store.state.search.selected).length">
              <button @click="clearAll" class="uk-button uk-button-default uk-border-pill nav-bar-filters">
                Clear All
              </button>
            </li>
            <li class="uk-flex uk-flex-middle uk-flex-right">
              <button @click="showModal" class="uk-button uk-button-default uk-border-pill nav-bar-filters">
                <span uk-icon="icon: settings"></span>
                Filters
              </button>
            </li>
            <li>
              <a href="#"><item-sorting class="uk-flex uk-flex-middle uk-flex-right"
                  @pushFilter="pushFilterSelectionsToRouter"></item-sorting></a>
            </li>
            <li class="gallery-mode">
              <a href="#" @click="closeTop">
                <el-switch v-model="galleryMode" active-text="List" inactive-text="Gallery" active-color="#000"
                  inactive-color="#333" active-value="list" inactive-value="gallery"
                  class="uk-padding-small uk-float-right uk-visible@m">
                </el-switch>
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
    <!-- end of Search Top Bar -->

    <div class="uk-position-relative uk-width-1-1 app-wrap">
      <div class="uk-grid-collapse app-divider uk-height-1-1 app uk-grid"
        v-bind:class="galleryMode">
        <div class="uk-width-expand sticky-sidebar">
          <div>
            <div class="uk-width-1-1 uk-grid uk-grid-collapse ">
              <div id="toggle-bar" class="toggle-bar uk-overflow-auto uk-height-1-1 uk-visible@m">
                <span class="uk-position-top-right uk-position-fixed uk-padding-small toggle-bar-close uk-hidden@m"
                  uk-toggle="target: #toggle-bar; cls: uk-visible uk-position-top uk-position-fixed uk-position-z-index uk-hidden uk-width-1-1; animation: uk-animation-slide-bottom">
                  <div class="filter-icon-close" type="button"></div>
                </span>
                <!-- Filters -->
                <div class="filter-list uk-padding-small uk-animation-fast">

                  <h1 v-if="pageTitle" class="uk-text-xsmall uk-text-left uk-margin-remove">
                    {{ pageTitle }}
                  </h1>


                  <div class="filter-list-body uk-margin-medium-bottom">
                    <div class="uk-margin-small-top">
                      <filter-selected @click="pushFilterSelectionsToRouter"></filter-selected>
                      <hr class="uk-width-1-1 uk-margin-remove" />
                      <ul class="uk-width-1-1 uk-margin-remove" data-uk-accordion>
                        <li class="filter-item" v-for="filter in filters" :key="filter.name">
                          <!-- <filter-text v-if="filter.type === 'text'" :option="filter"
                            @click="pushFilterSelectionsToRouter"></filter-text> -->
                          <filter-slider v-if="filter.type === 'slider'" :option="filter"
                            @click="pushFilterSelectionsToRouter"></filter-slider>
                          <filter-checkbox v-if="filter.type === 'checkbox'" :option="filter"
                            @click="pushFilterSelectionsToRouter"></filter-checkbox>
                          <filter-select v-if="filter.type === 'select'" :option="filter"
                            @click="pushFilterSelectionsToRouter"></filter-select>

                          <filter-multiselect v-if="filter.type === 'multiselect'" @click="pushFilterSelectionsToRouter"
                            :option="filter"></filter-multiselect>

                        </li>
                      </ul>
                    </div>

                    <div>
                      <SavedList />
                    </div>
                    <div>
                      <RecentlySeenSlider />
                    </div>

                  </div>
                </div>
                <!-- End Of Filters -->

                <div class="uk-card-footer search-footer uk-hidden@m" @click="closeTop">
                  <span class="uk-icon-button ad-button-red uk-float-left toggle-bar-close uk-icon uk-hidden"
                    uk-toggle="target: #toggle-bar; cls: uk-visible uk-position-top uk-position-fixed uk-position-z-index uk-hidden uk-width-1-1; animation: uk-animation-slide-bottom"
                    uk-icon="icon: close">
                    <svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" data-svg="close">
                      <path fill="none" stroke="#000" stroke-width="1.06" d="M16,16 L4,4"></path>
                      <path fill="none" stroke="#000" stroke-width="1.06" d="M16,4 L4,16"></path>
                    </svg>
                  </span>
                  <a href="#top" id="to-top" class="
                uk-button uk-button-secondary uk-button-large
                tm-button-default
                uk-border-rounded uk-heading-large uk-text-capitalize uk-width-1-1 uk-width-auto@m uk-float-right
              " uk-toggle="target: #toggle-bar; cls: uk-visible uk-position-top uk-position-fixed uk-position-z-index uk-hidden uk-width-1-1; animation: uk-animation-slide-bottom"><i
                      class="el-icon-search"></i> {{ foundResultText }} </a>
                </div>
              </div>

            </div>
          </div>
        </div>
        <div class="uk-width-expand main-content">

          <div class="uk-width-expand listing-results">
            <div v-if="$store.getters.totalVehiclesFound">
              <div class="filter-selected">


                <div class="listing-header-search-wrap">
                  <dynamic-breadcrumb />
                  <div class="filter-item" v-for="filter in filters" :key="filter.name">
                    <filter-text class="listing-header-search" v-if="filter.type === 'text'" :option="filter">
                    </filter-text>
                  </div>
                </div>
              </div>

              <!-- <CarsalesFeaturedBrand /> -->

              <div v-if="galleryMode === 'list'">
                <item-list></item-list>
              </div>

              <div v-else-if="galleryMode === 'gallery'" class="uk-grid-collapse grid-view-wrap uk-grid">
                <item-grid class="
                 item-grid
                  uk-grid-match
                  uk-grid-small
                  uk-width-expand
                  uk-child-width-1-1
                  uk-child-width-1-1@s
                  uk-child-width-1-1@m
                  uk-child-width-1-2@l
                  uk-child-width-1-3@xl
                  uk-child-width-1-4@xxl
                  js-vehicles-grid
                  tm-vehicles-grid
                  uk-grid
                " uk-grid></item-grid>
              </div>

              <item-pagination></item-pagination>
              <div class="uk-width-1-1 uk-margin-medium-bottom uk-margin-medium-top uk-text-center">
                <a class="uk-button uk-button-default tm-button-default back-to-top uk-text-capitalize uk-margin-medium-bottom"
                  href="#target" uk-scroll>Back to top</a>
              </div>
            </div>

            <div v-else>
              <div class="listing-header-search-wrap">
                <div class="filter-item" v-for="filter in filters" :key="filter.name">
                  <filter-text class="listing-header-search" v-if="filter.type === 'text'" :option="filter">
                  </filter-text>
                </div>
              </div>
              <div class="app-no-results uk-width-1-1 uk-flex uk-flex-middle uk-text-center">
                <div class="uk-width-1-1 uk-padding-small">
                  <div class="uk-width-1-1">
                    <h4 class="uk-text-center uk-text-bold">No matching search results</h4>
                  </div>
                  <div>
                    <p class="uk-margin-small-top uk-text-center uk-text-muted">Try removing some selected filters.</p>
                  </div>
                  <div class="uk-button uk-button-primary tm-button-default uk-hidden@m"
                    uk-toggle="target: #toggle-bar; cls: uk-visible uk-position-top uk-position-fixed uk-position-z-index uk-hidden uk-width-1-1; animation: uk-animation-slide-bottom">
                    View Filters
                  </div>

                  <div>

                    <div class="uk-padding-small uk-hidden@m"><span
                        class="uk-icon-button uk-text-secondary uk-text-bold uk-background-default">OR</span></div>

                    <button @click="clearAll" class="uk-button uk-button-secondary tm-button-default">
                      Start Again
                    </button>
                  </div>

                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>






    <div id="saved-bar" class="toggle-bar uk-background-default uk-overflow-auto uk-height-1-1 uk-hidden uk-hidden@s">
      <span class="uk-position-top-right uk-position-fixed uk-padding-small toggle-bar-close uk-hidden@m"
        uk-toggle="target: #saved-bar; cls: uk-visible uk-position-top uk-position-fixed uk-position-z-index uk-hidden uk-width-1-1; animation: uk-animation-slide-top">
        <div class="filter-icon-close" type="button"></div>
      </span>

      <SavedList />
    </div>

    <div v-if="savedItemslocalStorage.length > 0" class="uk-padding-small uk-background-muted">
      <div class="uk-grid-small uk-flex uk-flex-middle uk-padding-small " uk-grid>
        <div class="uk-width-auto">
          <h2 class="uk-h4 uk-margin-remove uk-text-bold uk-text-left@s">{{ savedVehiclesCount }} Saved Vehicles</h2>
        </div>

        <div class="uk-width-auto" v-if="savedItemslocalStorage.length > 1">
          <div>
            <router-link class="uk-width-auto" to="/compare-vehicles-for-sale"><span class="uk-h4"> / <span
                  class="uk-text-bold">Compare</span> vehicles <span uk-icon="sign-in"></span></span>
            </router-link>
          </div>
        </div>

      </div>




    </div>

    <VehicleEnquiry :stockid="modalVehicleId" :item="modalItem" ref="refVehicleEnquiry" />
    <searchPopUp />
    <VehicleEnquiryGallery />
  </div>
</template>

<script src="./script.js"></script>
<style scoped>
.app-divider>div {
  min-height: calc(100vh - 20px);
  /* Adjust height considering header/footer */
}

.item-grid.uk-grid-small{
  margin-top: 5px;
}

.mb-nav-bar-filters{
  color:#fff;
  border-radius: 4px;
  background: #000;
}


.sticky-sidebar {
  position: sticky;
  top: 40px;
  max-width: 320px;
  /* Align with the bottom of the header */
  height: calc(100vh - 80px);
  /* Height of viewport minus header/footer */
  overflow-y: auto;
}



body.make-model .sticky-sidebar {
  overflow: visible;
  z-index: 9999;
}

body.make-model .sticky-sidebar {}

/* Custom scrollbar styles */
.sticky-sidebar::-webkit-scrollbar {
  width: 0;
  /* Width of the scrollbar */
}

.sticky-sidebar::-webkit-scrollbar-track {
  background: #f1f1f1;
  /* Color of the track */
}

.sticky-sidebar::-webkit-scrollbar-thumb:hover {
  background: #888;
  /* Color of the thumb */
}

.sticky-sidebar::-webkit-scrollbar-thumb:hover {
  background: #555;
  /* Color of the thumb when hovered */
}

.item-condition .el-checkbox.is-checked::after{
  padding: 5px;
    border-radius: 20px;
    box-shadow: inset 0 0 0 4px rgba(0, 0, 0, 0.1);
}


.sidebar {
  width: 300px;
  padding: 10px;
}

.filter-list .filter-item {
    padding: 10px 0;
  }

.toggle-bar {
    padding: 10px 0;
    border-radius: 5px;
    background-color: #fff;
}

@media screen and (min-width: 1200px) {
  .toggle-bar {
    margin: 0 10px;
  }
}

@media (max-width: 968px) {

  /* Adjustments for smaller screens */
  .sticky-sidebar {
    max-width: 0;
    height: auto;
    position: relative;
  }

}
</style>