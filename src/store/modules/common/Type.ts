export interface CommonStateI {
  defaultPageSize: number; // 统一表格的默认pageSize, 会根据屏幕大小自动调整
}

export const PageSizeOptions = [8, 10, 15, 20, 25]

export const mediaHeightAdpter = [
  {
    device: matchMedia('(max-height:680px)'),
    pageSize: PageSizeOptions[0]
  },
  {
    device: matchMedia('(max-height:780px)'),
    pageSize: PageSizeOptions[1]
  },
  {
    device: matchMedia('(max-height:850px)'),
    pageSize: PageSizeOptions[2]
  },
  {
    device: matchMedia('(max-height:960px)'),
    pageSize: PageSizeOptions[2]
  },
]