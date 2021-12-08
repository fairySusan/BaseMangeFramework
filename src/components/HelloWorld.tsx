import {defineComponent} from 'vue'

const HelloWorld = defineComponent({
  setup() {
    return () => (
      <div>
              <el-button  type="primary">Primary</el-button>
      </div>
    )
  }
})

export default HelloWorld