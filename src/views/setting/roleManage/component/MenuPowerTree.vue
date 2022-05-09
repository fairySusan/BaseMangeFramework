<script setup lang="ts">
import {ref,watch, onMounted,reactive} from 'vue'
import {getAllMenuList, getCureentRolePowerMenu} from '@/https/setting/menu/Menu'
import {saveCurrentRolePower} from '@/https/setting/roles/Roles'
import {AddRoleMenuPowerParamsI} from '@/https/setting/roles/Type'
import {MenuItemI} from '@/https/setting/menu/Type'
import {useFormSubmit,useRequest} from '@/mixins/Hooks'

const props = defineProps<{
  modelValue: boolean,
  id: number| undefined
}>()

const emit = defineEmits<{
  (event: 'update:modelValue', visible: false):void,
  (event: 'refersh'):void
}>()

const data = ref<MenuItemI[]>([])
const selectNodes = ref<string[]>([])
const queryRoleId = reactive({roleId: props.id})
const treeRef = ref<any>(null)
const loading = ref(false)

const {run:getRolePowerMenu, data:ownMenus} = useRequest<MenuItemI[]>(getCureentRolePowerMenu, [], queryRoleId, false)
const {run:_getAllMenuList, data:allMenus} = useRequest<MenuItemI[]>(getAllMenuList,[],undefined, false)
const {submit} = useFormSubmit<string,AddRoleMenuPowerParamsI>(saveCurrentRolePower)

onMounted(() => {
  _getAllMenuList().then(() => {
    data.value = dealMenus(allMenus.value)
  })
})

watch(() => props.id, () => {
  if (props.id) {
    loading.value = true
    queryRoleId.roleId = props.id
    getRolePowerMenu().then(() => {
      const defaultSelectKeys = ownMenus.value.map(item => 'power' + item.id as string)
      treeRef.value.setCheckedKeys(defaultSelectKeys)
      loading.value = false
    })
  }
}, {immediate: true})

const onCheckChange = (node: MenuItemI, selects:any) => {
  selectNodes.value = selects.checkedKeys
}

/**递归处理渲染树形组件的数据，把叶子节点的powers设置给叶子节点的children属性 */
const dealMenus = (data:any[]) => {
  for (let item of data) {
    item.id = 'menu' + item.id
    if (item.children.length === 0) {
      item.powers.forEach((power: any) => {
        power.id = 'power' + power.id
      });
      item.children = item.powers ? item.powers : [];
    } else {
      dealMenus(item.children)
    }
  }
  return data
}

const onSubmit = async () => {
  const menuIds:string[] = [];
  const powerIds:string[] = [];
    
  selectNodes.value.forEach((val:string) => {
    if(val !== null && val.indexOf('power') > -1){
      const id = val.replace('power','');
      powerIds.push(id);
    }else if(val !== null && val.indexOf('menu') > -1){
      const id = val.replace('menu','');
      menuIds.push(id);
    }
  })

  try {
    loading.value = true
    await submit({
      roleId: props.id as number,
      menupowerArr: {
        menuIds,
        powerIds
      }
    })
    emit('refersh')
    emit('update:modelValue', false)
  } catch(e) {
    console.log(e)
  }
  loading.value = false
}
</script>

<template>
  <div class="flexRowFlexEnd">
    <el-button type="primary" style="width: 100px" @click="onSubmit">确定</el-button>
  </div>
  <el-tree
    ref="treeRef"
    v-loading="loading"
    :data="data"
    :props="{
      label: 'name',
      children: 'children',
    }"
    node-key="id"
    show-checkbox
    @check="onCheckChange"
  />
</template>

<style lang="scss">
</style>