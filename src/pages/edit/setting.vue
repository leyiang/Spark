<script>
  import Vec from "@/libs/Vec";
  import { mapState, mapMutations } from "vuex";

  export default {
    data() {
      return {
        id: null,
        tag: '',
      }
    },

    created() {
        this.id = this.$route.params.id;
    },

    methods: {
      ...mapMutations('edit', ["updateCrop", "updateTag"]),

      handleChange( type, axis, event ) {
        if( ! this.id ) return;

        let value = Number(event.target.value);
        let target = this.crop[ type ];

        let result = axis === 'x'
            ? new Vec( value, target.y )
            : new Vec( target.x, value );

        this.updateCrop({
          type, value: result
        });
      },

      manageTag( type, tag = "" ) {
        if( type === "add" ) {
          tag = this.tag
          this.tag = "";
        }

        if( tag.length === 0 ) return;
        this.updateTag({ type, value: tag });
      },

      handleSave() {
        if( this.tags.length === 0 ) {
          return alert("TAGS!");
        }

        this.image.getCropInfo( this.crop );

        this.$api.patch("/spark/" + this.id , {
          image: this.image.id,
          crop: this.image.cropInfo,
          tags: this.tags
        }).then( ({data}) => {
          this.$router.push("/");
        }).catch( e => {
          console.log( e );
        })
      }
    },

    computed: {
      ...mapState('edit', ["crop", "tags", "image"]),
    }
  }
</script>

<template>
  <aside class="setting-area">

    <div class="setting-group crop-group">
      <h2 class="group-title">CROP OPTIONS</h2>

      <div class="setting-item">
        <div class="between">
          <span>Width (px)</span>
          <input
            type="text"
            class="form-input"
            :value="crop.size.x"
            @input="handleChange('size', 'x', $event)"
          >
        </div>
      </div>

      <div class="setting-item">
        <div class="between">
          <span>Height (px)</span>
          <input
            type="text"
            class="form-input"
            :value="crop.size.y"
            @input="handleChange('size', 'y', $event)"
          >
        </div>
      </div>

      <div class="setting-item">
        <div class="between">
          <span>Left (px)</span>
          <input
            type="text"
            class="form-input"
            :value="crop.pos.x"
            @input="handleChange('pos', 'x', $event)"
          >
        </div>
      </div>

      <div class="setting-item">
        <div class="between">
          <span>Top (px)</span>
          <input
            type="text"
            class="form-input"
            :value="crop.pos.y"
            @input="handleChange('pos', 'y', $event)"
          >
        </div>
      </div>
    </div>

    <div class="setting-group">
      <h2 class="group-title">TAGS</h2>

      <div class="setting-item">
        <div class="tag-list">
          <div
              class="tag-item"
              v-for="tag in tags"
          >
            <span>{{ tag }}</span>
            <button
                class="button"
                @click="manageTag( 'delete', tag )"
            >
              <img :src="require('@/assets/icons/cross.svg')" alt="">
            </button>
          </div>
        </div>

        <input
            type="text"
            class="form-input"
            style="display: block; width: 100%"
            placeholder="Add asset tag"

            v-model.trim="tag"
            @keydown.enter="manageTag('add')"
        >
      </div>
    </div>

    <div class="setting-group">
      <h2 class="group-title">URL</h2>

      <div class="setting-item">
        <input
          type="text"
          class="form-input"
          style="display: block; width: 100%"
          placeholder="Add url for this spark"
        >
      </div>
    </div>

    <div class="full" style="margin-top: 5rem">
      <div style="margin: 1rem">
        <button
          class="button button-lg button-primary"
          @click="handleSave"
        >Save</button>
      </div>
    </div>

  </aside>
</template>

<style>
.setting-area {
  user-select: none;
}
/**
Setting Group
 */
.group-title {
  margin: 0;
  text-align: center;
  border-bottom: 1px solid #EEE;
  padding: 1rem 0;

  font-size: 18px;
}

.setting-item {
  padding: 1rem;
  border-bottom: 1px solid #EEE;
}

.crop-group .form-input {
  width: 70px;
  height: 30px;
}

/**
Tag
 */
.tag-list {
  display: flex;
  margin-bottom: 1rem;
  flex-wrap: wrap;
  gap: .5rem;
}

.tag-item {
  background-color: #E7E7E7;
  color: #909090;
  border-radius: 5px;

  padding: .25rem;
  padding-left: 1rem;

  display: flex;
  align-items: center;
  font-size: 12px;
}

.tag-item .button {
  margin-left: .25rem;
  height: 8px;
}

.tag-item .button img {
  width: 8px;
}
</style>
