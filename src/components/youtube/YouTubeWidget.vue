<template>
<div class="youtube-widget uk-margin-medium-bottom">

  <div class="uk-position-relative uk-visible-toggle " tabindex="-1" uk-slider>
    <div id="next-steps" class="uk-container uk-container-large uk-margin-small-top">
      <div class="uk-h2 uk-margin-remove uk-text-center">
        <span class="uk-text-bold">Latest </span><span class="uk-text-light">Hyundai YouTube</span>
      </div>
    </div>

    <ul class="uk-slider-items uk-margin-large-right uk-grid-collapse uk-child-width-1-2@s uk-child-width-1-3@m uk-child-width-1-4@xl">
      <li v-for="(video, index ) in videos.slice(0, 15)" :key="index">
        <div class="uk-padding-small uk-transition-toggle uk-animation-toggle uk-link-reset">
        <a
        href="#"
        @mouseover="tubehover  = index"
        @mouseleave="tubehover = null"
        @click.prevent="getVideo(video.id)"
        >
          <div class="uk-text-meta uk-padding-small">{{video.publishedAt | timeAgo}}</div>
          <div class="animation-5" :class="{ 'bg-search-img uk-border-rounded uk-light uk-transition-scale-up': tubehover === index }">
          <div class="uk-width-1-1 uk-inline-clip uk-border-rounded" tabindex="0" style="height:240px">
            <img src="assets/images/32465.svg" class="uk-padding-small uk-position-bottom-right uk-position-z-index uk-animation-fade uk-animation-reverse" alt="YouTube" uk-img>
            <div class="uk-transition-fade uk-position-center uk-position-z-index">
              <svg width="55" height="55" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fill="#FF0000"
                d="M15,4.1c1,0.1,2.3,0,3,0.8c0.8,0.8,0.9,2.1,0.9,3.1C19,9.2,19,10.9,19,12c-0.1,1.1,0,2.4-0.5,3.4c-0.5,1.1-1.4,1.5-2.5,1.6 c-1.2,0.1-8.6,0.1-11,0c-1.1-0.1-2.4-0.1-3.2-1c-0.7-0.8-0.7-2-0.8-3C1,11.8,1,10.1,1,8.9c0-1.1,0-2.4,0.5-3.4C2,4.5,3,4.3,4.1,4.2 C5.3,4.1,12.6,4,15,4.1z M8,7.5v6l5.5-3L8,7.5z">
              </path>
            </svg>
          </div>
            <img :src="video.thumbnails" class="uk-transition-scale-up uk-transition-opaque" width="480" height="360" :alt="video.title" loading="lazy" uk-cover>
          </div>
          <div class="uk-padding-small" :class="{ 'uk-animation-fade': tubehover === index }">
            <div>
              <span class="uk-h4 uk-text-bold" v-html="video.title + '. '"></span>
              <span class="uk-h5 uk-text-light" v-html="video.description"></span>
            </div>
            <a href="#" class="uk-button uk-button-text uk-text-bold uk-text-primary uk-margin-small-top uk-hidden" :title="video.title" @click.prevent="getVideo(video.id)">
              View Video →
            </a>
          </div>
          </div>
        </a>
       </div>
      </li>
    </ul>
    <a class="uk-position-center-left uk-background-default uk-border-circle uk-hidden-hover" href="#" aria-label="previous" uk-slidenav-previous uk-slider-item="previous"></a>
    <a class="uk-position-center-right uk-background-default uk-border-circle uk-hidden-hover" href="#" aria-label="next" uk-slidenav-next uk-slider-item="next"></a>

    <div class="uk-flex uk-flex-center">
    <a class="tm-slidenav" href="#" uk-slider-item="previous" aria-label="previous" uk-slidenav-previous></a>
    <a class="tm-slidenav" href="#" uk-slider-item="next" aria-label="next" uk-slidenav-next></a>
    </div>

  </div>

  <div id="modal-video" uk-modal>
    <div v-if="Object.keys( singleVideo ).length" class="uk-modal-dialog uk-overflow-hidden uk-border-rounded">
      <button class="uk-modal-close-default uk-close-large uk-light" type="button" uk-close></button>
      <div class="uk-width-1-1 uk-background-black" v-for="(singlevideo, index) in singleVideo" v-bind:key="singlevideo.id">
        <iframe :src="'https://www.youtube-nocookie.com/embed/' + singlevideo.id + '?autoplay=0&amp;showinfo=0&amp;rel=0&amp;modestbranding=1&amp;playsinline=1'" class="uk-width-1-1 uk-height-medium" width="1920" height="1080" frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen uk-responsive uk-video="automute: false"></iframe>
          <div class="uk-padding-small uk-light">
            <h3 class="uk-h5 uk-text-bold uk-margin-remove" v-html="singlevideo.title"></h3>
            <div v-if="singlevideo.description" v-html="singlevideo.description">
          </div>
        </div>
      </div>

      <div class="uk-height-max-large uk-overflow-auto">
        <div
         v-for="(video, index ) in videos.slice(0, 15)" :key="index"
         class="vd-list uk-grid-collapse  uk-link-heading uk-link-reset uk-grid"
         :class="{ 'uk-background-grey uk-light': singleVideo[0].id === video.id }"
         uk-grid
         @click.prevent="getVideoNew(video.id)">
         <div class="uk-width-auto uk-flex uk-flex-middle count-width">
             <div class="uk-margin-auto uk-text-small">{{index +1}}</div>
         </div>
          <div class="uk-width-auto uk-inline">
              <span uk-icon="youtube" class="youtube-play uk-position-center uk-position-z-index uk-icon-button uk-light" v-if="singleVideo[0].id === video.id"></span>
              <img :src="video.thumbnails" width="110" height="110">
          </div>
          <div class="uk-width-expand uk-panel uk-padding-small">
            <div>
              <div class="uk-text-xsmall" :class="{ 'uk-light': singleVideo[0].id === video.id }">
                {{video.publishedAt | timeAgo}} / Hyundai Australia
              </div>
              <div class="uk-panel">
              <div class="uk-h5 uk-margin-remove uk-text-truncate" v-html="video.title"></div>
               <div class="uk-text-meta uk-text-light uk-text-truncate" v-html="video.description"></div>
             </div>
            </div>
          </div>
          <hr class="uk-width-1-1 uk-margin-remove">
      </div>
    </div>




    </div>
  </div>

</div>
</template>

<script>
import {
  getVideos
} from "@/components/youtube/";

export default {
  name: "you-tube-widget",
  data() {
    return {
      subscribersCount: null,
      channelAvatar: '',
      channelTitle: '',
      videos: [],
      singleVideo: [],
      tubehover: null
    }
  },
  methods: {
    getVideo: function(id) {

      document.body.classList.add("is-loading");

      this.singleVideo = this.videos.filter((item) => item.id === id);

      this.UIkit.modal("#modal-video").show();

      document.body.classList.remove("is-loading");
    },
    getVideoNew: function(id) {

  this.singleVideo = this.videos.filter((item) => item.id === id);

  document.getElementById("modal-video").scroll({
    top: 0,
    behavior: "smooth",
  });
},
    async getVideos() {
      this.isSending = true;

      try {
        const response = await getVideos();

        this.videos = response;
        //this.nextPageToken = response.nextPageToken;
      } catch (error) {
        console.log(error);
      } finally {
        this.isSending = false;
      }
    },
  },
  mounted() {
    this.getVideos();
    // YouTubeService.getYouTube().then((data) => {
    //   if (typeof data === "boolean") {
    //     this.hasData = data
    //   } else {
    //     this.videos = data;
    //   }
    // });
  },
  filters: {
    timeAgo(input) {
      const date = (input instanceof Date) ? input : new Date(input);
      const formatter = new Intl.RelativeTimeFormat('en');
      const ranges = {
        years: 3600 * 24 * 365,
        months: 3600 * 24 * 30,
        weeks: 3600 * 24 * 7,
        days: 3600 * 24,
        hours: 3600,
        minutes: 60,
        seconds: 1
      };
      const secondsElapsed = (date.getTime() - Date.now()) / 1000;
      for (let key in ranges) {
        if (ranges[key] < Math.abs(secondsElapsed)) {
          const delta = secondsElapsed / ranges[key];
          return formatter.format(Math.round(delta), key);
        }
      }
    },
  },
}
</script>
<style lang="css" scoped>
.uk-background-black{
  background: #000
}
.uk-background-grey{
  background: #242420
}
.vd-list{
  -webkit-transition: all 300ms linear;
  transition: all 300ms linear;
  cursor: pointer;
}
.vd-list:hover{
  background-color: #444444;
}
.vd-list:hover, .vd-list:hover .uk-text-meta, .vd-list:hover .uk-h5{
  color:#fff!important;
}
.youtube-play svg{
  fill: #f90b0a!important;
  width: 40px;
}
.count-width{
  width: 30px;
}
.animation-5{
  transition: .3s ease-out;
  transition-property: opacity, transform, filter;
}
/* .hero-vd-thumb{
  height:140px
}
@media (min-width: 1400px){
  .hero-vd-thumb{
    height:240px
  }
}
@media (max-width: 960px){
  .hero-vd-thumb{
    height:280px
  }
} */
</style>
