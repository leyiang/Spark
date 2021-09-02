<script>
  export default {
    props: {
      labelIndex: {
        type: String,
        default: null,
      },

      modelValue: {
        type: Array,
        default: () => ([])
      },

      suggestion: {
        type: Array,
        default: () => ([])
      },
    },

    data() {
      return {
        tag: "",
      }
    },

    created() {
      console.log( this.modelValue );
    },

    computed: {
      tags() {
        return this.modelValue;
      }
    },

    methods: {
      focusInput() {
        this.$refs.input.focus();
      },

      append() {
        let tags = this.tags.slice();

        if( this.tag.length === 0 ) return;
        if( tags.includes(this.tag) ) return this.tag = "";

        tags.push( this.tag );
        this.tag = "";
        this.$emit("update:modelValue", tags);
      },

      pop(e) {
        if( e.target.value.length === 0 ) {
          this.tags.pop()
        }
      }
    }
  }
</script>

<template>
  <div
    class="a-tag-selector"
    @click="focusInput"
  >
    <span
      class="a-tag"
      v-for="tag in tags"
    >{{ labelIndex ? tag[labelIndex] : tag }}</span>

    <input
        type="text"
        ref="input"
        v-model.trim="tag"
        @keydown.enter="append"
        @keydown.delete="pop"
        placeholder="enter tag here"
    >

    <!--        v-model.trim="tag"-->
    <!--        @keydown.enter="manageTag('add')"-->

<!--    <div-->
<!--        class="tag-item"-->
<!--        v-for="tag in tags"-->
<!--    >-->
<!--      <span>{{ tag }}</span>-->
<!--      <button-->
<!--          class="button"-->
<!--          @click="manageTag( 'delete', tag )"-->
<!--      >-->
<!--        <img :src="require('@/assets/icons/cross.svg')" alt="">-->
<!--      </button>-->
<!--    </div>-->
  </div>
</template>

<style>
.a-tag-selector {
  border: 1px solid #AAA;
  display: flex;
  padding: .5rem;
  flex-wrap: wrap;
  gap: .5rem;
  cursor: pointer;
  border-radius: 5px;
}

.a-tag {
  font-weight: bold;
  color: #EEE;
  background-color: #1b90ff;
  border-radius: 4px;
  padding: .05rem .5rem;
}

.a-tag-selector input {
  border: none;
}
</style>
