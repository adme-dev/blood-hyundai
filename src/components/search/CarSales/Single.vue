<template>
  <div v-if="item" class="single-modal">
    <CarSchema :StockId="item.stockid" />
    <div class="uk-container uk-container-large" v-if="item">
      <div class="uk-grid uk-margin-large-bottom">
        <div class="uk-width-1-1 uk-width-expand@m">
          <div class="uk-margin-medium-top uk-visible@s"></div>

          <div class="gallery-vehicle uk-width-1-1">
            <div class="uk-width-1-1 uk-position-relative">
              <div class="uk-grid-small uk-flex uk-flex-middle uk-padding-small" uk-grid>
                <div class="uk-width-expand uk-text-left">
                  <div>
                    <div class="uk-h2 uk-margin-remove title-items">
                      <span class="uk-text-bold">{{ item.year.displayValue[0] }}
                        {{ item.make.displayValue[0] }}
                        {{ item.model.displayValue[0] }}  / {{ item.badge.displayValue[0] }}
                      </span>
                    </div>
                    <h1 class="header-title uk-margin-remove" itemprop="name">
                      {{ item.condition.displayValue[0] }} {{ item.title }}
                    </h1>
                  </div>
                </div>

                <div class="uk-visible@s">
                  <button class="uk-button uk-button-default button-save-single border-radius-50 uk-text-capitalize"
                    @click="showModal(0)">
                    <span class="uk-margin-small" uk-icon="search"></span> Search
                  </button>
                </div>

                <div class="uk-visible@s">
                  <button class="uk-button uk-button-default button-save-single border-radius-50 uk-text-capitalize"
                    @click="addToSaves(item)">
                    <span class="uk-margin-small" uk-icon="star"></span> Save
                  </button>
                </div>

                <div class="uk-text-center uk-padding-small uk-hidden@s">
                  <div v-if="item.price">
                    <div class="uk-text-small">DRIVE AWAY</div>
                    <h3 class="uk-h3 uk-margin-remove uk-text-bold">
                      ${{ item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}<sup>*</sup>
                    </h3>
                  </div>
                  <div v-else>
                    <h3 class="uk-h3 uk-margin-remove uk-text-bold">P.O.A</h3>
                    <div class="uk-text-small">Contact Us.</div>
                  </div>
                </div>
              </div>

              <!-- <div
                v-if="$store.state.site.promotional[0].carsales.carsalesbanner && item.condition.displayValue[0] === 'Used'">
                <img :data-src="$store.state.site.promotional[0].carsales.carsalesbanner" class="uk-width-1-1" uk-img>
              </div> -->

              <div class="uk-position-relative cs-hero-slider" id="hd-slider"
                data-uk-slideshow="ratio: 1720:1080;finite:true;animation:pull">


                <!-- <div
                  v-if="$store.state.site.promotional[0].carsales.carsalesbadge && item.condition.displayValue[0] === 'Used'"
                  class="uk-position-top-right uk-position-z-index">
                  <img :data-src="$store.state.site.promotional[0].carsales.carsalesbadge" class="carsalesbadge" uk-img>
                </div> -->

                <div v-if="item.stock_special" class="uk-position-top-left uk-position-small uk-position-z-index">
                  <div class="uk-h6 uk-margin-remove uk-text-bold"
                    style="padding:5px 8px;background-color: #c00;color: #fff;border-radius:10px">
                    <svg viewBox="0 0 16 16" width="15" xmlns="http://www.w3.org/2000/svg">
                      <g fill="none" fill-rule="evenodd">
                        <g fill="#fff" fill-rule="nonzero">
                          <path
                            d="M9.4 5.727l-4.88 4.886L3.893 10l4.88-4.887.627.614zM5.567 11.66l.626.627 3.627-3.62-.627-.627-3.626 3.62zM15.2 6.373c-.185.26-.16.616.06.847.25.258.25.668 0 .927L7.847 15.56c-.588.586-1.54.586-2.127 0L.44 10.28c-.586-.588-.586-1.539 0-2.127L7.853.74c.125-.123.292-.193.467-.193.173.002.337.071.46.193.124.12.288.186.46.187.139-.001.274-.046.387-.127 1.43-1.084 3.411-1.065 4.82.047L15.293 0H16v.547l-.913.92c1.154 1.417 1.201 3.437.113 4.906zm-.74-4.28L13.447 3.1c.35.607.249 1.373-.247 1.868-.496.495-1.263.595-1.869.243-.606-.351-.9-1.066-.717-1.742.184-.677.799-1.145 1.5-1.142.231.006.459.063.666.166l1.02-1.02c-1.088-.803-2.572-.803-3.66 0-.265.2-.588.307-.92.307-.326.003-.644-.1-.907-.293L1.067 8.78c-.24.242-.24.632 0 .873l5.28 5.28c.241.24.631.24.873 0l7.26-7.266c-.402-.543-.402-1.285 0-1.827.832-1.113.824-2.643-.02-3.747zm-2.347 1.12c-.368 0-.666.299-.666.667 0 .368.298.667.666.667.369 0 .667-.299.667-.667 0-.368-.298-.667-.667-.667z" />
                        </g>
                      </g>
                    </svg>
                    {{ item.stock_special.displayValue[0] }}<sup>~</sup>
                  </div>
                </div>

                <div class="uk-position-relative">
                  <div class="uk-position-relative hd-slider">
                    <span
                      class="uk-flex uk-flex-middle uk-light uk-position-bottom-right uk-position-small uk-position-z-index">
                      <span class="uk-margin-small-right" uk-icon="camera"></span>
                      {{ Object.keys(item.photos).length }}
                    </span>

                    <ul class="uk-slideshow-items" uk-lightbox="animation: slide">
                      <li v-if="item.youtube.displayValue[0]">
                        <iframe class="uk-height-1-1" width="100%" height="100%" :src="'https://www.youtube-nocookie.com/embed/' +
    item.youtube.displayValue[0] +
    '?autoplay=0&controls=0&showinfo=0&rel=0&loop=1&modestbranding=1&wmode=transparent&playsinline=0'
    " frameborder="0" allowfullscreen title="youtube"></iframe>
                      </li>

                      <li v-if="Object.keys(item.photos).length > 0" v-for="(image, index) in item.photos" :key="index">
                        <div class="uk-height-1-1">
                          <a :href="`${image}?pxc_size=1920,1080`">
                            <span class="uk-light uk-position-bottom-left uk-position-small uk-position-z-index">
                              <span uk-icon="search"></span>
                            </span>
                            <div class="uk-inline uk-width-1-1 uk-height-1-1 uk-background-cover"
                              :data-src="`${image}?pxc_size=1920,1080`" data-uk-img="target: !* -*">
                              <!-- <img :data-src="image.Url" width="525" height="394" lazy="load" class="uk-width-1-1" data-uk-img> -->
                            </div>
                          </a>
                        </div>
                      </li>

                      <li v-if="Object.keys(item.photos).length < 1 && !item.youtube.displayValue[0]">
                        <div>
                          <img data-src="/comingsoon.jpg" width="2500" height="2500" lazy="load" class="uk-width-1-1"
                            data-uk-img />
                        </div>
                      </li>
                    </ul>
                    <a class="uk-text-secondary uk-position-center-left uk-overlay uk-overlay-default uk-hidden-hover uk-visible@s"
                      href="#" uk-slidenav-previous uk-slideshow-item="previous"></a>
                    <a class="uk-text-secondary uk-position-center-right uk-overlay uk-overlay-default uk-hidden-hover uk-visible@s"
                      href="#" uk-slidenav-next uk-slideshow-item="next"></a>
                  </div>

                  <div class="thumb-gallery-wrap uk-overflow-auto">
                    <div class="thumb-gallery-wrap uk-width-1-1 uk-background-default">
                      <ul
                        class="uk-thumbnav thumb-gallery-items uk-slider-items uk-child-width-1-3 uk-child-width-1-5@s uk-child-width-1-4@m uk-child-width-1-6@l uk-grid"
                        :class="[Object.keys(item.photos).length < 4 ? 'thumb-four-set' : '']">
                        <li v-if="item.youtube.displayValue[0]" class="uk-overflow-hidden" data-uk-slideshow-item="0">
                          <span class="uk-position-center uk-position-z-index uk-display-block uk-light uk-icon"
                            uk-icon="youtube"></span>
                          <img
                            :data-src="'https://img.youtube.com/vi/' + item.youtube.displayValue[0] + '/mqdefault.jpg'"
                            class="responsive-width" uk-cover uk-img>
                        </li>
                        <li v-for="(image, index) in item.photos" :key="index"
                          :data-uk-slideshow-item="index + youtubeVehicle()" class="uk-background-cover"
                          :data-src="`${image}?pxc_size=120,180`" data-uk-img>
                          <div></div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <hr class="uk-margin-remove-top" />

            <div class="uk-grid-divider uk-grid-small uk-child-width-1-2 uk-child-width-expand@l uk-text-center"
              uk-grid>
              <div>
                <div>
                  <svg class="cs-icons" width="40" enable-background="new 0 0 512 512" version="1.1"
                    viewBox="0 0 512 512" xml:space="preserve" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="m394.67 149.33h21.333c17.646 0 32-14.354 32-32v-85.333c0-17.646-14.354-32-32-32h-21.333c-17.646 0-32 14.354-32 32v22.257l-77.677 7.06c-5.078-10.975-16.122-18.65-28.99-18.65s-23.911 7.674-28.99 18.65l-77.677-7.06v-22.257c0-17.646-14.354-32-32-32h-21.333c-17.646 0-32 14.354-32 32v85.333c0 17.646 14.354 32 32 32h21.333c17.646 0 32-14.354 32-32v-22.256l77.677-7.06c1.858 4.016 4.534 7.534 7.799 10.444l7.773 115.43c-4.526 1.234-7.917 5.191-7.917 10.112v64c0 4.738 3.134 8.616 7.404 10.009l-7.245 94.184c-6.586 5.866-10.824 14.312-10.824 23.807v7.712l-74.667-6.789v-22.257c0-17.646-14.354-32-32-32h-21.333c-17.646 0-32 14.354-32 32v85.334c0 17.646 14.354 32 32 32h21.333c17.646 0 32-14.354 32-32v-22.256l74.667-6.79v7.712c0 17.646 14.354 32 32 32s32-14.354 32-32v-7.712l74.667 6.789v22.257c0 17.646 14.354 32 32 32h21.333c17.646 0 32-14.354 32-32v-85.333c0-17.646-14.354-32-32-32h-21.333c-17.646 0-32 14.354-32 32v22.257l-74.667 6.788v-7.712c0-9.497-4.24-17.945-10.831-23.811l-7.314-94.165c4.307-1.371 7.478-5.259 7.478-10.023v-64c0-4.891-3.35-8.835-7.835-10.096l7.695-115.44c3.263-2.91 5.938-6.427 7.796-10.441l77.677 7.06v22.256c1e-3 17.644 14.355 31.998 32.001 31.998zm-10.667-117.33c0-5.885 4.781-10.667 10.667-10.667h21.333c5.885 0 10.667 4.781 10.667 10.667v85.333c0 5.885-4.781 10.667-10.667 10.667h-21.333c-5.885 0-10.667-4.781-10.667-10.667v-85.333zm-256 85.333c0 5.885-4.781 10.667-10.667 10.667h-21.333c-5.885 0-10.667-4.781-10.667-10.667v-85.333c0-5.885 4.781-10.667 10.667-10.667h21.333c5.886 0 10.667 4.782 10.667 10.667v85.333zm0 362.67c0 5.885-4.781 10.667-10.667 10.667h-21.333c-5.885 0-10.667-4.781-10.667-10.667v-85.333c0-5.886 4.782-10.667 10.667-10.667h21.333c5.885 0 10.667 4.781 10.667 10.667v85.333zm256-85.333c0-5.885 4.781-10.667 10.667-10.667h21.333c5.885 0 10.667 4.781 10.667 10.667v85.333c0 5.885-4.781 10.667-10.667 10.667h-21.333c-5.885 0-10.667-4.781-10.667-10.667v-85.333zm-117.33 64c0 5.885-4.781 10.667-10.667 10.667s-10.667-4.781-10.667-10.667v-42.667c0-5.885 4.781-10.667 10.667-10.667s10.667 4.781 10.667 10.667v42.667zm-10.667-373.33c-5.885 0-10.667-4.781-10.667-10.667 0-5.885 4.782-10.666 10.667-10.666s10.667 4.781 10.667 10.667c0 5.885-4.782 10.666-10.667 10.666z" />
                  </svg>
                </div>
                <div class="uk-text-bold">
                  {{ item.drivetrain.displayValue[0] }}
                </div>
                <div class="uk-text-meta">Drive Train</div>
              </div>

              <div>
                <div>
                  <svg class="cs-icons" width="40" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 480 480"
                    style="enable-background:new 0 0 480 480;" xml:space="preserve">
                    <path id="XMLID_2089_"
                      d="M450,371.266V360c0-35.203-26.122-64.421-60-69.288V210c0-6.156-0.516-12.315-1.537-18.378l4.698-4.802c5.604-5.728,8.643-13.295,8.555-21.308c-0.087-8.014-3.29-15.513-9.018-21.116l-28.592-27.975c-5.728-5.604-13.325-8.618-21.308-8.555c-4.939,0.055-9.684,1.292-13.909,3.575c-3.642-1.808-7.379-3.407-11.192-4.796C331.293,95.638,340,78.815,340,60c0-33.084-26.916-60-60-60h-80c-33.084,0-60,26.916-60,60c0,18.819,8.709,35.644,22.309,46.652C120.164,122.072,90,162.581,90,210v80.712C56.122,295.579,30,324.797,30,360v11.266C12.767,375.717,0,391.396,0,410c0,38.599,31.402,70,70,70h340c38.598,0,70-31.401,70-70C480,391.396,467.233,375.717,450,371.266z M430,360v10H330v-10c0-27.57,22.43-50,50-50S430,332.43,430,360z M310,360v10h-96.064L370,210.492v80.22C336.122,295.579,310,324.797,310,360z M335.91,130.942l0.471-0.425c0.125-0.114,0.246-0.231,0.364-0.352c3.888-3.229,9.684-3.061,13.375,0.552l28.591,27.974c1.909,1.868,2.977,4.368,3.006,7.039c0.029,2.671-0.983,5.193-2.852,7.103L185.956,370h-83.942l45.886-46.898c0.042-0.043,0.084-0.086,0.125-0.129L335.91,130.942z M160,60c0-22.056,17.944-40,40-40h80c22.056,0,40,17.944,40,40s-17.944,40-40,40h-80C177.944,100,160,82.056,160,60z M110,210c0-49.626,40.374-90,90-90h80c11.212,0,22.3,2.093,32.652,6.115l-172.642,176.45c-8.953-6.252-19.208-10.303-30.011-11.853V210z M50,360c0-27.57,22.43-50,50-50c9.167,0,18.033,2.491,25.75,7.142l-42.892,43.838c-2.527,2.583-4.144,5.724-4.853,9.021H50V360z M410,460H70c-27.57,0-50-22.43-50-50c0-11.028,8.972-20,20-20h400c11.028,0,20,8.972,20,20C460,437.57,437.57,460,410,460z">
                    </path>
                    <g></g>
                  </svg>
                </div>
                <div class="uk-text-bold">{{ item.seats.displayValue[0] }}</div>
                <div class="uk-text-meta">Seating Capacity</div>
              </div>

              <div>
                <div>
                  <svg class="cs-icons" width="40" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">
                    <path
                      d="M28.2,83.1c-5.5,1.4-9.6,6.4-9.6,12.4c0,7.1,5.7,12.8,12.6,12.8s12.6-5.7,12.6-12.8c0-6-4.1-11-9.6-12.4V67H61v16.1 c-5.5,1.4-9.6,6.4-9.6,12.4c0,7.1,5.7,12.8,12.6,12.8c7,0,12.6-5.7,12.6-12.8c0-6-4.1-11-9.6-12.4V67h29.8c1.7,0,3-1.3,3-3V44.9 c5.5-1.4,9.6-6.4,9.6-12.4c0-7.1-5.7-12.8-12.6-12.8c-7,0-12.6,5.7-12.6,12.8c0,6,4.1,11,9.6,12.4V61H67V44.9 c5.5-1.4,9.6-6.4,9.6-12.4c0-7.1-5.7-12.8-12.6-12.8c-7,0-12.6,5.7-12.6,12.8c0,6,4.1,11,9.6,12.4V61H34.2V44.9 c5.5-1.4,9.6-6.4,9.6-12.4c0-7.1-5.7-12.8-12.6-12.8s-12.6,5.7-12.6,12.8c0,6,4.1,11,9.6,12.4V83.1z M70.6,95.5 c0,3.7-3,6.8-6.6,6.8c-3.7,0-6.6-3-6.6-6.8c0-3.7,3-6.8,6.6-6.8C67.7,88.7,70.6,91.8,70.6,95.5z M90.1,32.5c0-3.7,3-6.8,6.6-6.8 c3.7,0,6.6,3,6.6,6.8c0,3.7-3,6.8-6.6,6.8C93.1,39.3,90.1,36.2,90.1,32.5z M57.4,32.5c0-3.7,3-6.8,6.6-6.8c3.7,0,6.6,3,6.6,6.8 c0,3.7-3,6.8-6.6,6.8C60.3,39.3,57.4,36.2,57.4,32.5z M37.9,95.5c0,3.7-3,6.8-6.6,6.8s-6.6-3-6.6-6.8c0-3.7,3-6.8,6.6-6.8 S37.9,91.8,37.9,95.5z M24.6,32.5c0-3.7,3-6.8,6.6-6.8s6.6,3,6.6,6.8c0,3.7-3,6.8-6.6,6.8S24.6,36.2,24.6,32.5z">
                    </path>
                  </svg>
                </div>
                <div class="uk-text-bold">
                  <div v-if="(item.transmission.displayValue[0] === 'Constantly Variable Transmission')"
                    :uk-tooltip="`${item.transmission.displayValue[0]}`">
                    CVT
                  </div>
                  <div v-else>
                    {{ item.transmission.displayValue[0] }}
                  </div>
                </div>
                <div class="uk-text-meta">Transmission</div>
              </div>

              <div>
                <div>
                  <svg class="cs-icons" width="40" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
                    <path
                      d="M 24.984375 6.984375 C 24.921875 6.988281 24.863281 6.992188 24.800781 7.007813 C 20.605469 7.042969 16.675781 8.203125 13.296875 10.203125 C 13.214844 10.238281 13.136719 10.285156 13.0625 10.339844 C 9.628906 12.429688 6.789063 15.402344 4.84375 18.933594 C 4.792969 19.003906 4.75 19.078125 4.71875 19.160156 C 3.015625 22.335938 2.039063 25.957031 2.007813 29.796875 C 1.980469 29.929688 1.980469 30.0625 2.007813 30.191406 C 2.039063 34.417969 3.09375 38.128906 5.144531 41.53125 C 5.382813 41.925781 5.863281 42.105469 6.304688 41.964844 C 6.746094 41.824219 7.035156 41.398438 7 40.9375 L 7.046875 41.550781 L 10.800781 39.375 C 11.121094 39.203125 11.320313 38.871094 11.320313 38.507813 C 11.324219 38.144531 11.128906 37.808594 10.8125 37.628906 C 10.496094 37.449219 10.109375 37.457031 9.796875 37.644531 L 6.460938 39.578125 C 5.039063 36.945313 4.179688 34.183594 4.03125 31 L 8 31 C 8.359375 31.003906 8.695313 30.816406 8.878906 30.503906 C 9.058594 30.191406 9.058594 29.808594 8.878906 29.496094 C 8.695313 29.183594 8.359375 28.996094 8 29 L 4.03125 29 C 4.167969 26.101563 4.902344 23.367188 6.09375 20.894531 C 6.65625 21.199219 7.554688 21.683594 9.574219 22.78125 C 9.890625 22.960938 10.277344 22.957031 10.589844 22.769531 C 10.898438 22.582031 11.085938 22.238281 11.070313 21.878906 C 11.058594 21.515625 10.851563 21.1875 10.527344 21.019531 C 8.507813 19.925781 7.613281 19.441406 7.046875 19.136719 C 8.648438 16.5 10.789063 14.234375 13.347656 12.527344 L 15.40625 15.953125 C 15.585938 16.261719 15.921875 16.453125 16.28125 16.449219 C 16.644531 16.441406 16.972656 16.246094 17.148438 15.929688 C 17.320313 15.613281 17.308594 15.226563 17.121094 14.921875 L 15.0625 11.496094 C 17.746094 10.054688 20.777344 9.183594 24 9.03125 L 24 13 C 23.996094 13.359375 24.183594 13.695313 24.496094 13.878906 C 24.808594 14.058594 25.191406 14.058594 25.503906 13.878906 C 25.816406 13.695313 26.003906 13.359375 26 13 L 26 9.03125 C 28.898438 9.167969 31.640625 9.886719 34.113281 11.078125 L 32.21875 14.574219 C 32.039063 14.890625 32.042969 15.277344 32.230469 15.589844 C 32.417969 15.898438 32.761719 16.085938 33.121094 16.070313 C 33.484375 16.058594 33.8125 15.851563 33.980469 15.527344 L 35.871094 12.035156 C 38.507813 13.632813 40.765625 15.789063 42.472656 18.347656 L 39.046875 20.40625 C 38.738281 20.585938 38.546875 20.921875 38.550781 21.28125 C 38.558594 21.644531 38.753906 21.972656 39.070313 22.148438 C 39.386719 22.320313 39.773438 22.308594 40.078125 22.121094 L 43.503906 20.0625 C 44.945313 22.746094 45.816406 25.777344 45.96875 29 L 42 29 C 41.640625 28.996094 41.304688 29.183594 41.121094 29.496094 C 40.941406 29.808594 40.941406 30.191406 41.121094 30.503906 C 41.304688 30.816406 41.640625 31.003906 42 31 L 45.96875 31 C 45.820313 34.183594 44.960938 36.945313 43.542969 39.578125 L 40.203125 37.644531 C 39.890625 37.457031 39.503906 37.449219 39.1875 37.628906 C 38.871094 37.808594 38.675781 38.144531 38.679688 38.507813 C 38.679688 38.871094 38.878906 39.203125 39.199219 39.375 L 42.953125 41.550781 L 43 40.9375 C 42.964844 41.398438 43.253906 41.824219 43.695313 41.964844 C 44.136719 42.105469 44.617188 41.925781 44.855469 41.53125 C 46.90625 38.132813 47.960938 34.421875 47.996094 30.203125 C 48.019531 30.070313 48.019531 29.933594 47.996094 29.804688 C 47.957031 25.601563 46.792969 21.664063 44.785156 18.285156 C 44.757813 18.210938 44.71875 18.144531 44.671875 18.078125 C 44.667969 18.078125 44.667969 18.078125 44.667969 18.078125 C 44.667969 18.074219 44.664063 18.074219 44.660156 18.070313 C 42.574219 14.640625 39.609375 11.804688 36.085938 9.859375 C 36 9.792969 35.90625 9.746094 35.808594 9.710938 C 32.636719 8.015625 29.027344 7.039063 25.191406 7.007813 C 25.125 6.992188 25.054688 6.984375 24.984375 6.984375 Z M 36.558594 22.179688 C 36.367188 22.175781 36.179688 22.226563 36.015625 22.328125 L 26.90625 27.710938 C 26.386719 27.273438 25.726563 27 25 27 C 23.355469 27 22 28.355469 22 30 C 22 31.644531 23.355469 33 25 33 C 26.644531 33 28 31.644531 28 30 C 28 29.804688 27.976563 29.609375 27.941406 29.421875 L 37.03125 24.046875 C 37.421875 23.824219 37.613281 23.367188 37.503906 22.933594 C 37.394531 22.5 37.007813 22.191406 36.558594 22.179688 Z M 25 29 C 25.316406 29 25.582031 29.144531 25.761719 29.363281 C 25.800781 29.46875 25.859375 29.5625 25.933594 29.648438 C 25.972656 29.757813 26 29.875 26 30 C 26 30.5625 25.5625 31 25 31 C 24.4375 31 24 30.5625 24 30 C 24 29.4375 24.4375 29 25 29 Z M 19 38 C 18.640625 37.996094 18.304688 38.183594 18.121094 38.496094 C 17.941406 38.808594 17.941406 39.191406 18.121094 39.503906 C 18.304688 39.816406 18.640625 40.003906 19 40 L 31 40 C 31.359375 40.003906 31.695313 39.816406 31.878906 39.503906 C 32.058594 39.191406 32.058594 38.808594 31.878906 38.496094 C 31.695313 38.183594 31.359375 37.996094 31 38 Z">
                    </path>
                  </svg>
                </div>
                <div class="uk-text-bold">
                  <span v-if="item.kms">{{ item.kms }} km</span><span v-else>0 km</span>
                </div>
                <div class="uk-text-meta">Odometer</div>
              </div>
            </div>

            <hr class="uk-margin-remove-bottom" />

            <div class="uk-padding-small uk-padding-remove-top">
              <div class="uk-position-relative">
                <div v-if="item.Comments" class="uk-text-small">
                  <div class="uk-width-1-1 uk-h4 uk-margin-medium-top uk-text-bold">
                    Comments
                  </div>
                  <div v-if="readMore" v-html="item.Comments"></div>
                  <span v-else v-html="item.Comments.split('')
    .splice(0, 770)
    .join('')
    .replace(/<\/?[^>]+(>|$)/g, '')
    "></span>...
                  <span class="uk-link uk-text-primary uk-text-small" @click="readMore = !readMore">
                    <span v-if="readMore">Read Less</span>
                    <span v-else>Read More</span>
                  </span>
                  <hr class="uk-margin-medium-top" />
                </div>
              </div>


              <!-- <div
                v-if="$store.state.site.promotional[0].carsales.carsalespromovid && item.condition.displayValue[0] === 'Used'">
                <Promovideo />
              </div> -->


              <div class="uk-width-1-1 uk-h4 uk-text-bold uk-margin-bottom-medium">
                <div>About This Vehicle</div>
                <div class="uk-text-meta">{{ item.title }}</div>
              </div>

              <div class="single-specs uk-column-1-2@l" itemprop="description">
                <div class="uk-text-left uk-child-width-1-2 uk-width-1-1 uk-grid-small uk-grid">
                  <div class="uk-width-expand uk-text-meta">Year:</div>
                  <div class="uk-width-expand">
                    <span>{{ item.year.displayValue[0] }}</span>
                  </div>
                </div>
                <div class="uk-text-left uk-child-width-1-2 uk-width-1-1 uk-grid-small uk-grid">
                  <div class="uk-width-expand uk-text-meta">Odometer:</div>
                  <div class="uk-width-expand">
                    <span v-if="item.kms">{{ item.kms }} km</span><span v-else>0 km</span>
                  </div>
                </div>
                <div class="uk-text-left uk-child-width-1-2 uk-width-1-1 uk-grid-small uk-grid">
                  <div class="uk-width-expand uk-text-meta">Condition:</div>
                  <div class="uk-width-expand">
                    <span class="uk-text-capitalize">{{ item.condition.displayValue[0] }}</span>
                  </div>
                </div>
                <div class="uk-text-left uk-child-width-1-2 uk-width-1-1 uk-grid-small uk-grid">
                  <div class="uk-width-expand uk-text-meta">Registration:</div>
                  <div class="uk-width-expand">
                    <span><span v-if="item.rego">{{ item.rego }}</span><span v-else>Unregistered</span></span>
                  </div>
                </div>
                <div v-if="item.regoexpiry" class="uk-text-left uk-child-width-1-2 uk-width-1-1 uk-grid-small uk-grid">
                  <div class="uk-width-expand uk-text-meta">Registration Expiry:</div>
                  <div class="uk-width-expand">
                    <span>{{ item.regoexpiry | daytimestamp }}</span>
                  </div>
                </div>
                <div class="uk-text-left uk-child-width-1-2 uk-width-1-1 uk-grid-small uk-grid">
                  <div class="uk-width-expand uk-text-meta">Manufacture:</div>
                  <div class="uk-width-expand uk-text-capitalize">
                    <span>{{ item.make.displayValue[0] }}</span>
                  </div>
                </div>
                <div class="uk-text-left uk-child-width-1-2 uk-width-1-1 uk-grid-small uk-grid">
                  <div class="uk-width-expand uk-text-meta">Model:</div>
                  <div class="uk-width-expand">
                    <span class="uk-text-capitalize">{{ item.model.displayValue[0] }}</span>
                  </div>
                </div>
                <div class="uk-text-left uk-child-width-1-2 uk-width-1-1 uk-grid-small uk-grid">
                  <div class="uk-width-expand uk-text-meta">Badge:</div>
                  <div class="uk-width-expand">
                    <span class="uk-text-uppercase">{{ item.badge.displayValue[0] }}</span>
                  </div>
                </div>
                <div class="uk-text-left uk-child-width-1-2 uk-width-1-1 uk-grid-small uk-grid">
                  <div class="uk-width-expand uk-text-meta">Series:</div>
                  <div class="uk-width-expand">
                    <span class="uk-text-uppercase">{{ item.series.displayValue[0] }}</span>
                  </div>
                </div>
                <div class="uk-text-left uk-child-width-1-2 uk-width-1-1 uk-grid-small uk-grid">
                  <div class="uk-width-expand uk-text-meta">Body Type:</div>
                  <div class="uk-width-expand">
                    <span class="uk-text-capitalize">{{ item.body.displayValue[0] }}</span>
                  </div>
                </div>
                <div class="uk-text-left uk-child-width-1-2 uk-width-1-1 uk-grid-small uk-grid">
                  <div class="uk-width-expand uk-text-meta">
                    Exterior Colour:
                  </div>
                  <div class="uk-width-expand">
                    <span class="uk-text-capitalize">{{ item.colour.displayValue[0] }}</span>
                  </div>
                </div>
                <div class="uk-text-left uk-child-width-1-2 uk-width-1-1 uk-grid-small uk-grid">
                  <div class="uk-width-expand uk-text-meta">Doors:</div>
                  <div class="uk-width-expand">
                    <span class="uk-text-capitalize">{{ item.doors.displayValue[0] }}</span>
                  </div>
                </div>
                <div class="uk-text-left uk-child-width-1-2 uk-width-1-1 uk-grid-small uk-grid">
                  <div class="uk-width-expand uk-text-meta">
                    Seating Capacity:
                  </div>
                  <div class="uk-width-expand">
                    <span>{{ item.seats.displayValue[0] }} Seats</span>
                  </div>
                </div>
                <div v-if="item.interiorcolour"
                  class="uk-text-left uk-child-width-1-2 uk-width-1-1 uk-grid-small uk-grid">
                  <div class="uk-width-expand uk-text-meta">
                    Interior Colour:
                  </div>
                  <div class="uk-width-expand">
                    <span class="uk-text-capitalize">{{ item.interiorcolour }}</span>
                  </div>
                </div>
                <div v-if="item.engine.displayValue[0]"
                  class="uk-text-left uk-child-width-1-2 uk-width-1-1 uk-grid-small uk-grid">
                  <div class="uk-width-expand uk-text-meta">Engine:</div>
                  <div class="uk-width-expand">
                    <span>{{ item.engine.displayValue[0] }}</span>
                  </div>
                </div>
                <div v-if="item.cylinders" class="uk-text-left uk-child-width-1-2 uk-width-1-1 uk-grid-small uk-grid">
                  <div class="uk-width-expand uk-text-meta">Cylinders:</div>
                  <div class="uk-width-expand">
                    <span>{{ item.cylinders }}</span>
                  </div>
                </div>
                <div class="uk-text-left uk-child-width-1-2 uk-width-1-1 uk-grid-small uk-grid">
                  <div class="uk-width-expand uk-text-meta">Fuel Type:</div>
                  <div class="uk-width-expand">
                    <span>{{ item.fuel.displayValue[0] }}</span>
                  </div>
                </div>
                <div v-if="item.gears" class="uk-text-left uk-child-width-1-2 uk-width-1-1 uk-grid-small uk-grid">
                  <div class="uk-width-expand uk-text-meta">Gears:</div>
                  <div class="uk-width-expand">
                    <span>{{ item.gears }}</span>
                  </div>
                </div>
                <div class="uk-text-left uk-child-width-1-2 uk-width-1-1 uk-grid-small uk-grid">
                  <div class="uk-width-expand uk-text-meta">Transmission:</div>
                  <div class="uk-width-expand">
                    <span>{{ item.transmission.displayValue[0] }}</span>
                  </div>
                </div>
                <div class="uk-text-left uk-child-width-1-2 uk-width-1-1 uk-grid-small uk-grid">
                  <div class="uk-width-expand uk-text-meta">VIN:</div>
                  <div class="uk-width-expand">
                    <span>{{ item.vin }}</span>
                  </div>
                </div>
                <div class="uk-text-left uk-child-width-1-2 uk-width-1-1 uk-grid-small uk-grid">
                  <div class="uk-width-expand uk-text-meta">SN:</div>
                  <div class="uk-width-expand">
                    <span>{{ item.stockid }}</span>
                  </div>
                </div>
              </div>

              <RelatedShowroom :relatedModel="item.model.displayValue[0]" />

              <YouTubeRelated :model="item.model.value[0]" :title="item.model.displayValue[0]"
                :key="$route.params.slug" />

              <section class="uk-margin-medium-top">
                <hr />
                <div class="uk-grid-column-small uk-margin-medium-top uk-grid-row-large uk-child-width-1-2@l" uk-grid>
                  <div>
                    <trading-hours :tradingHours="dealerInfo.tradingHours" />
                  </div>
                  <div>
                    <div class="uk-width-1-1 uk-h4 uk-text-bold uk-margin-remove-bottom">Location</div>
                    <div class="uk-margin-small-bottom uk-text-meta">{{ dealerInfo.showroom_address }}</div>
                    <div class="map-container-page">
                      <iframe v-if="dealerInfo.map_embed" class="uk-height-large googlemap border-radius-10"
                        :src="'' + dealerInfo.map_embed + ''" width="600" height="450" frameborder="0" style="border:0;"
                        allowfullscreen="" aria-hidden="false" tabindex="0" :title="dealerInfo.showroom_address"
                        loading="lazy"></iframe>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
        <!--end left column-->

        <div class="uk-width-1-1 uk-width-auto@m">
          <div class="uk-margin-medium-top uk-visible@s"></div>

          <div class="sidebar-card uk-background-default">
            <div>
              <div class="uk-text-center uk-padding-small border-bottom-1">
                <div v-if="item.price">
                  <div class="uk-text-small">DRIVE AWAY</div>
                  <h3 class="uk-h1 uk-margin-remove uk-text-bold">
                    ${{ item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}<sup>*</sup>
                  </h3>
                  <div v-if="item.condition.displayValue[0] === 'Used'"
                    class="uk-text-xsmall uk-text-bold uk-text-primary">or ${{ item.perweek }} p/week <span
                      class="uk-text-muted perweek-icon" uk-icon="warning"></span></div>
                  <div class="uk-text-small uk-text-light uk-width-medium uk-margin-auto">
                    {{ item.condition.displayValue[0] }} {{ item.title }}
                  </div>
                </div>
                <div v-else>
                  <h3 class="uk-h3 uk-margin-remove uk-text-bold">P.O.A</h3>
                  <div class="uk-text-small">Contact Us.</div>
                  <div class="uk-text-small uk-text-light uk-width-medium uk-margin-auto">
                    {{ item.condition.displayValue[0] }} {{ item.title }}
                  </div>
                </div>
              </div>
            </div>

            <div v-if="$store.state.site.payment_gateway !== 'noPaymentGateway' && $store.state.site.deposit_amount > 0"
              class="border-bottom-1">
              <div class="secure-vehicle-enq uk-flex uk-flex-middle uk-flex-column uk-flex-center uk-padding-small">
                <div>
                  <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 71.3 95.26" width="40">
                    <defs></defs>
                    <path class="secure-vehicle-svg" fill="#ed0000"
                      d="M74.79,64.16c-5.65-9-16-12.2-16.4-12.33a2.45,2.45,0,0,0-2.39.43c-.07.05-6.59,5.68-13.42,5.68-4.92,0-10.52-2.83-13.68-5.68a2.52,2.52,0,0,0-2.49-.45C26,52,15.84,55.55,10.22,64.48,6.32,70.66,7,81.92,7,82.38a2.71,2.71,0,0,0,2.5,2.56H26.92v-5H12c0-4,.51-9.41,2.5-12.57,3.61-5.73,9.73-9,12.35-10.17a35.19,35.19,0,0,0,5.64,3.45l3.52,11L32,86.58c-.39,1.5-.23,1.22,8.28,13.22a2.57,2.57,0,0,0,2,1.14c1.67,0,1.56-.45,10-12.77.91-1.33.67-1-4.07-16.81l4-10.64a34.56,34.56,0,0,0,6-3.66c2.6,1,8.82,4.28,12.43,10,2,3.18,2.58,8.87,2.68,12.87H57.92v5H75.74a2.73,2.73,0,0,0,2.5-2.64C78.25,81.82,78.66,70.32,74.79,64.16ZM42.28,93.88l-5.12-7.31,3.55-13.63h2.85l3.92,13.2ZM44,67.94H40.13l-1.77-5.47a17.26,17.26,0,0,0,7.71.08Z"
                      transform="translate(-6.95 -5.68)" />
                    <path fill="#ed0000"
                      d="M42.42,52.75a17.57,17.57,0,0,0,17.5-17.87V23.55a17.5,17.5,0,1,0-35,0V34.88A17.58,17.58,0,0,0,42.42,52.75Zm-12.5-29.2c0-14.7,20.4-17.75,24.88-4-2.75,1.55-4.63,1.93-9.78-.07-7.73-3-12,.33-12.43.72l3.17,3.85c.1-.07,2.49-1.81,7.42.09a19.86,19.86,0,0,0,7.2,1.72,8.92,8.92,0,0,0,4.54-1v10a12.51,12.51,0,1,1-25,0Z"
                      transform="translate(-6.95 -5.68)" />
                  </svg>

                  <router-link
                    class="uk-button uk-button-large uk-text-bold secure-vehicle uk-margin-small-left border-radius-50"
                    :to="{
    name: 'secure-vehicle',
    params: {
      id: item.stockid,
    },
  }">
                    <div class="secure-btn">
                      <div>Secure this Vehicle</div>
                      <div class="btn-sub">by placing a deposit.</div>
                    </div>
                  </router-link>
                </div>
              </div>
            </div>

                                    <iframe 
            :src="`https://apply.youxpowered.com.au/m5287
            ?condition=${encodeURIComponent(item.condition.displayValue[0])}
            &amount=${item.price}
            &buildyear=${item.year}
            &make=${encodeURIComponent(item.make.displayValue[0])}
            &model=${encodeURIComponent(item.model.displayValue[0])}
            &kilometers=${item.kms}
            &vin=${item.vin}`"
            style="border: 0.5px solid grey; width: 100%; border-radius: 15px; height: 740px; padding-top: 10px"> 
            </iframe>

            <div class="border-bottom-1">
              <div class="uk-grid-small uk-padding-small uk-grid">
                <div class="uk-width-expand uk-margin-small-left uk-text-left">
                  <div class="uk-h4 uk-margin-remove uk-text-light">
                    Call us
                  </div>
                  <a itemprop="telephone" :href="`tel:${dealerInfo.salesNumber.replace(/[^A-Z0-9]+/gi, '')}`"
                    class="uk-h4 uk-text-bold">{{ dealerInfo.salesNumber }}</a>
                  <div class="uk-text-meta uk-text-light">Stock No: {{ item.stockid }}</div>
                </div>
                <div class="uk-margin-auto-vertical uk-light">
                  <a itemprop="telephone" :href="`tel:${dealerInfo.salesNumber.replace(/[^A-Z0-9]+/gi, '')}`"
                    class="uk-margin-small-right call-us-icon" uk-icon="icon: receiver; ratio: 1.8"></a>
                </div>
              </div>
            </div>

            <div class="border-radius-1">
              <carSalesSingleForm :itemStock="item.stockid" :item="item" :condition="item.condition.displayValue[0]">
              </carSalesSingleForm>
            </div>



            <!-- <calculator :retail="item.price"></calculator> -->

            <viewed-vehicles />
          </div>
        </div>
        <!--end right column-->
      </div>
      <!--end container wrap-->
    </div>

    <div class="uk-background-muted" v-if="item">
      <carRelated :model="item.model.displayValue[0]" :vehicle_id="item.stockid" :key="item.stockid"></carRelated>

      <div v-if="item.price > 0">
        <carRelatedBodyPrice :price="item.price" :body="item.body.value[0]" :vehicle_id="item.stockid"
          :key="item.stockid"></carRelatedBodyPrice>
      </div>

      <carSaves></carSaves>

      <div class="uk-text-meta uk-padding">{{ siteName }} | LMCT {{ dealerInfo.lmct }}</div>
    </div>

    <div class="quicklinks-carsales uk-hidden@s" v-if="item">
      <div class="uk-width-1-1 uk-border-rounded quicklinks-body uk-light">
        <div class="uk-link-text uk-child-width-auto uk-flex uk-flex-middle">
          <div class="uk-padding-small">
            <router-link :to="{
    name: 'vehicle-enquire',
    params: {
      condition: item.condition.value[0],
      year: item.year.value[0],
      make: item.make.value[0],
      model: item.model.value[0],
      badge: item.badge.value[0],
      stockid: item.stockid,
      id: item.id,
    },
  }">
              <div><span uk-icon="icon: mail" class="uk-margin-small-right"></span> Enquire</div>
            </router-link>
          </div>
          <a class="uk-text-right uk-margin-auto-left forcelink" itemprop="telephone"
            :href="`tel:${dealerInfo.salesNumber.replace(/[^A-Z0-9]+/gi, '')}`">
            <div class="uk-margin-small-right"><span uk-icon="icon: receiver" class="uk-margin-small-right"></span> Call
            </div>
          </a>
        </div>
      </div>
    </div>

    <SingleFooter v-if="item.perweek" :stock_id="item.id" :title="item.title" :price="item.price"
      :perweek="item.perweek" />

  </div>
</template>

<script>
// CarDetails.vue
import { mapState } from 'vuex';

export default {
  name: 'CarDetails',
  
  components: {
    CarSchema: () => import('@/components/search/CarSales/CarSchema'),
    Calculator: () => import('@/components/search/Calculator'),
    CarSalesSingleForm: () => import('@/components/search/CarSales/SingleForm'),
    CarRelated: () => import('@/components/search/CarSales/SingleRelated'),
    carRelatedBodyPrice: () => import('@/components/search/CarSales/SingleRelatedBodyPrice'),
    ViewedVehicles: () => import('@/components/search/CarSales/ViewedVehicles'),
    CarSaves: () => import('@/components/search/CarSales/SingleSaves'),
    YouTubeRelated: () => import('@/components/search/CarSales/YouTubeRelated'),
    SingleFooter: () => import('@/components/search/CarSales/SingleFooter'),
    TradingHours: () => import('@/components/page-elements/TradingHours'),
    RelatedShowroom: () => import('@/components/search/CarSales/RelatedShowroom'),
    Promovideo: () => import('./saleVideo.vue')
  },

  props: ['id', 'stockid', 'model'],

  data() {
    return {
      item: null,
      readMore: false,
      loading: true,
      errored: false,
      info: [],
      image_count: '',
      phone: '',
      siteName: this.$store.state.site.name,
      address: this.$store.state.site.showroom_address
    };
  },

  computed: {
    ...mapState({
      site: state => state.site,
      securedVehicles: state => state.securedVehicles,
      vehicles: state => state.vehicles
    }),

    dealerInfo() {
      const { name, lmct, showroom_address, map_embed, map_directions } = this.$store.state.site;
      const salesNumber = this.$store.state.site.departments.sales.phone;
      const tradingHours = this.$store.state.site.departments.sales.trading;

      return {
        name,
        lmct,
        siteName: this.siteName,
        showroom_address,
        map_embed,
        map_directions,
        salesNumber,
        tradingHours,
      };
    },

    isVehicleSecured() {
      return this.securedVehicles.includes(this.item?.stockid);
    },

    itemId() {
      return this.$route.params.id;
    }
  },

  watch: {
  "$route.params": {
    handler(newValue) {
      if (this.$store.state.vehicles.length === 0) {
        this.$store.dispatch("fetchInitialData").then(() => {
          this.item = this.$store.getters.vehicleById(this.itemId);
          this.recentlyViewed();
          if (this.item === undefined || this.item === null) {
            this.$router.push("/car-sales");
          }
        });
      } else {
        this.item = this.$store.getters.vehicleById(this.itemId);
        this.recentlyViewed();
        if (this.item === undefined || this.item === null) {
          this.$router.push("/car-sales");
        }
      }
    },
    immediate: true,
  },
},

  mounted() {
    this.initializePaymentGateway();
  },

  methods: {
    findAndSetVehicle() {
      // Check if vehicles is an array
      if (Array.isArray(this.$store.state.vehicles)) {
        this.item = this.$store.state.vehicles.find(vehicle => vehicle.id === this.itemId);
      } else if (this.$store.state.vehicles && typeof this.$store.state.vehicles === 'object') {
        // If vehicles is an object with numeric keys
        this.item = Object.values(this.$store.state.vehicles).find(vehicle => vehicle.id === this.itemId);
      }

      if (!this.item) {
        this.$router.push('/car-sales');
        return;
      }

      this.$store.dispatch('setRecentlyViewed', this.itemId);
      this.loading = false;
      this.recentlyViewed();
    },

    initializePaymentGateway() {
      const paymentGateway = this.$store.state.site.payment_gateway;
      if (paymentGateway === 'noPaymentGateway') return;

      const paymentGateways = {
        stripe: 'https://js.stripe.com/v3/',
        square: 'https://sandbox.web.squarecdn.com/v1/square.js'
      };

      if (paymentGateways[paymentGateway]) {
        const script = document.createElement('script');
        script.src = paymentGateways[paymentGateway];
        document.head.appendChild(script);
      }
    },

    showModal(index) {
      this.$store.dispatch('globalSearchSwitch', {
        show: true,
        tab: index
      });
    },

    addToSaves(item) {
      this.$store.dispatch('addToSavedVehicles', item);
    },

    recentlyViewed() {
      this.$store.dispatch('setRecentlyViewed', this.itemId);
    },

    secureVehicle() {
      this.UIkit.modal('#deposit-modal').show();
      if (this.item) {
        this.$store.dispatch('setClientSecret', this.item);
      }
    },

    youtubeVehicle() {
      return this.item?.youtube?.displayValue[0] ? 1 : 0;
    }
  },

  metaInfo() {
    if (!this.item) return {};

    return {
      title: `${this.item.title} for sale | ${this.siteName} | ${this.$store.state.site.departments.sales.address}`,
      meta: [{
        vmid: 'description',
        name: 'description',
        content: this.item.Comments?.substring(0, 160) || this.item.search_keywords
      }]
    };
  },

  filters: {
    countWords(str) {
      if (!str) return 0;
      return str.split(' ').filter(word => word !== '').length;
    },
    
    replace(str, rep, repWith) {
      if (!str) return '';
      return str.split(rep).join(repWith);
    },
    
    daytimestamp(timestamp) {
      return new Date(timestamp).toDateString();
    }
  }
};
</script>
<style scoped>
.header-title {
  font-size: 16px;
}

.single-modal {
  background-image: linear-gradient(#f2f2f2 8.66%, white 22.27%);
}

.cs-icons {
  padding: 5px;
  fill: rgb(143, 143, 143);
}

.sidebar-card {
  border: 1px solid #e1e4e8;
  border-radius: 8px;
}

.button-save-single {
  color: #333;
  padding: 0 15px;
  background-color: #ffffff;
}

.call-us-icon {
  padding: 10px;
  border-radius: 50px;
  background-color: #d2d2d2;
  -webkit-transition: background-color 500ms linear;
  transition: background-color 500ms linear;
}

.call-us-icon:hover {
  background-color: #0bd415;
}

.secure-vehicle-enq {
  background-color: #f2f2f2;
}

.secure-vehicle {
  font-size: 18px;
  background-color: #fff;
  color: #ed0000;
  border-width: 0;
  text-transform: inherit;
}

.secure-vehicle-enq:hover svg path {
  fill: #333;
}

.secure-btn {
  line-height: 20px;
  padding: 10px 5px 5px 5px;
}

.btn-sub {
  font-size: 10px;
  font-weight: 300 !important;
}

.map-container-page {
  height: 0;
  overflow: hidden;
  padding-bottom: 90%;
  position: relative;
}

.map-container-page iframe {
  border: 0;
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
}

.thumb-gallery-items li div {
  width: 100%;
  height: 70px;
  overflow: hidden;
}

.uk-thumbnav.thumb-gallery-items>*> ::after {
  background: transparent;
}

.thumb-gallery-items li::after {
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(255, 255, 255, 0.4);
  -webkit-transition: background-color 0.1s ease-in-out;
  transition: background-color 0.1s ease-in-out;
}

.thumb-gallery-items li.uk-active::after {
  background-color: transparent;
}

.thumb-gallery-items.uk-slider-items.uk-grid {
  margin-left: 0;
  flex-wrap: wrap;
}

.quicklinks-carsales {
  padding: 5px 10px;
  margin: 5px 0;
  bottom: 0.3rem;
  position: -webkit-sticky;
  position: sticky;
  z-index: 8;
}

.quicklinks-carsales .uk-light {
  background-color: rgba(0, 0, 0, 0.8);
}

.quicklinks-carsales .uk-button {
  line-height: 18px;
  font-weight: 700;
  text-transform: inherit;
}

.quicklinks-body {
  padding: 0 15px;
}

@media (max-width: 1200px) {
  .thumb-gallery-items li div {
    height: 40px;
  }
}

@media (max-width: 960px) {
  .uk-h2.title-items {
    font-size: 1.1rem;
  }

  .header-title {
    font-size: 0.8rem;
  }

  .uk-container,
  .uk-slider.uk-slider-container,
  .uk-grid-column-small>*,
  .uk-grid-small>* {
    padding: 0;
  }

  .uk-grid-column-small,
  .uk-grid-small {
    margin-left: 0;
  }

  .thumb-gallery-items.uk-slider-items.uk-grid {
    display: inline-flex;
    flex-wrap: nowrap;
    touch-action: auto !important;
  }

  .cs-hero-slider .uk-thumbnav>* {
    width: 94px;
    max-width: 94px;
    height: 76px;
    touch-action: auto;
  }

  .cs-hero-slider .uk-thumbnav.thumb-four-set>* {
    width: 110px;
    max-width: 110px;
  }
}

@media (min-width: 960px) {

  .gallery-vehicle,
  .sidebar-card {
    position: -webkit-sticky;
    position: sticky;
    top: 0;
  }

  .cs-hero-slider .uk-thumbnav.thumb-four-set>* {
    max-width: 200px;
    min-height: 90px;
  }
}
</style>
