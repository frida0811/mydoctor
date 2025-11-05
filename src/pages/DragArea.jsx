import React from 'react'
import { Upload, message } from 'antd'
const { Dragger } = Upload

const dragProps = {
  name: 'file',
  multiple: true,
  accept: 'image/*',
  beforeUpload: (file) => {
    const ok = file.type.startsWith('image/')
    if (!ok) {
      message.error('只能上传图片')
      return Upload.LIST_IGNORE
    }
    return true
  },
  customRequest: ({ onSuccess }) => setTimeout(() => onSuccess?.('ok'), 200),
  onChange(info) {
    const { status } = info.file
    if (status === 'done') message.success(`${info.file.name} 上传成功`)
    if (status === 'error') message.error(`${info.file.name} 上传失败`)
  },
}

export default function DragArea() {
  return (
    <Dragger {...dragProps} style={{ padding: 24 }}>
      <p className="ant-upload-drag-icon">🖼️</p>
      <p className="ant-upload-text">点击或拖拽图片到此处上传</p>
      <p className="ant-upload-hint">支持多图，单图建议 ≤ 5 MB</p>
    </Dragger>
  )
}
