<template>
  <div class="outer full-width">
    <main class="main-content">

      <div class="edit-area">
        <div class="image-container">
          <!-- crop mask -->
          <svg class="crop-mask">
            <defs>
              <mask id="mask" style="-webkit-mask-size: cover">
                <rect x="0" y="0" width="100%" height="100%" rx="0" ry="0" fill="#fff"></rect>
                <rect x="40px" y="50px" width="200px" height="300px" id="hole"></rect>
              </mask>
            </defs>

            <rect x="0" y="0"
                  width="100%" height="100%"
                  fill="rgba(0, 0, 0, 0.7)"
                  mask="url(#mask)"
            ></rect>

            <use href="#hole" fill="rgba(0,0,0,0)" stroke="#FFF" stroke-width="2px" cursor="move"></use>

            <g transform="translate(35, 45)" style="cursor: nwse-resize;">
              <rect fill="rgba(0,0,0,0)" stroke="none" x="0" y="0" width="20" height="20"></rect>
              <path d="M5,0C2.2,0,0,2.2,0,5v15h6V6h14V0H5z" fill="#fff"></path>
            </g>

            <g transform="translate(245, 45) rotate(90)" style="cursor: nesw-resize;">
              <rect fill="rgba(0,0,0,0)" stroke="none" x="0" y="0" width="20" height="20"></rect>
              <path d="M5,0C2.2,0,0,2.2,0,5v15h6V6h14V0H5z" fill="#fff"></path>
            </g>

            <g transform="translate(245, 355) rotate(180)" style="cursor: nwse-resize;">
              <rect fill="rgba(0,0,0,0)" stroke="none" x="0" y="0" width="20" height="20"></rect>
              <path d="M5,0C2.2,0,0,2.2,0,5v15h6V6h14V0H5z" fill="#fff"></path>
            </g>

            <g transform="translate(35, 355) rotate(270)" style="cursor: nesw-resize;">
              <rect fill="rgba(0,0,0,0)" stroke="none" x="0" y="0" width="20" height="20"></rect>
              <path d="M5,0C2.2,0,0,2.2,0,5v15h6V6h14V0H5z" fill="#fff"></path>
            </g>
          </svg>

          <img draggable="false" class="fit" src="https://images.pexels.com/photos/8828132/pexels-photo-8828132.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260" alt="">
        </div>

      </div>

      <aside class="setting-area">

        <div class="setting-group crop-group">
          <h2 class="group-title">CROP OPTIONS</h2>

          <div class="setting-item">
            <div class="between">
              <span>Width (px)</span>
              <input type="text" class="form-input">
            </div>
          </div>

          <div class="setting-item">
            <div class="between">
              <span>Height (px)</span>
              <input type="text" class="form-input">
            </div>
          </div>

          <div class="setting-item">
            <div class="between">
              <span>Left (px)</span>
              <input type="text" class="form-input">
            </div>
          </div>

          <div class="setting-item">
            <div class="between">
              <span>Right (px)</span>
              <input type="text" class="form-input">
            </div>
          </div>
        </div>

        <div class="setting-group">
          <h2 class="group-title">TAGS</h2>

          <div class="setting-item">
            <div class="tag-list">
              <div class="tag-item">
                <span>header</span>
                <button class="button"><img src="../assets/icons/cross.svg" alt=""></button>
              </div>
            </div>

            <input type="text" class="form-input"
                   style="display: block; width: 100%"
                   placeholder="Enter tag name here"
            >
          </div>
        </div>

        <div class="full" style="margin-top: 5rem">
          <div style="margin: 1rem">
            <button class="button button-lg button-primary">Save</button>
          </div>
        </div>

      </aside>
    </main>
  </div>
</template>


<style>
/**
Main Content
 */

.main-content {
  width: 100%;
  height: calc(100vh - 80px);
  position: relative;
  overflow: hidden;

  display: flex;
}

.edit-area {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.setting-area {
  width: 300px;
  border-top: 1px solid #EEE;
  background-color: #FFF;
}

.main-content .image-container {
  width: 600px;
  position: relative;
}

.crop-mask {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  /* SVG Size have to set with PX, not %, for mask to work properly */
  height: 799px;
  width: 600px;
}

/**
Setting Group
 */
.setting-group {

}

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