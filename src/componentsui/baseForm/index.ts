export enum ControlEnum {
  'Input',
  'Select',
  'DatePicker',
  'DateTimePicker',
  'InputNumber',
  'Radio',
  'Rate',
  'Switch',
  'TimePicker',
  'TimeSelect',
  'Upload'
}

export interface FormControlI {
  key: string;
  control: ControlEnum,
  label: string,
  prop: string,
  labelWidth?: string | number,
  required?: boolean,
  rules?: object | any[],
  error?: string,
  showMessage?: boolean,
  inlineMessage?: boolean,
  size?: string,
  [key:string]: any
}