import React, { useState } from 'react'
import { Upload, Modal, message } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

// 把 File 对象转成 base64，方便本地预览/存储
const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
  })

const ImageUploader = ({
  value,               // 受控：由父组件传入的 fileList
  onChange,            // 受控：父组件更新 fileList
  maxCount = 8,
  limitMB = 5,
  accept = 'image/*',
  multiple = true,
}) => {
  const [previewOpen, setPreviewOpen] = useState(false)
  const [previewImage, setPreviewImage] = useState('')
  const [previewTitle, setPreviewTitle] = useState('')

  // 校验：大小/类型
  const beforeUpload = (file) => {
    const isImg = file.type.startsWith('image/')
    if (!isImg) {
      message.error('只能上传图片类型文件')
      return Upload.LIST_IGNORE
    }
    const isLt = file.size / 1024 / 1024 < limitMB
    if (!isLt) {
      message.error(`图片需小于 ${limitMB}MB`)
      return Upload.LIST_IGNORE
    }
    return true
  }

  // 预览大图
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj)
    }
    setPreviewImage(file.url || file.preview)
    setPreviewOpen(true)
    setPreviewTitle(file.name || file.url?.substring(file.url.lastIndexOf('/') + 1))
  }

  // 受控 fileList 更新
  const handleChange = ({ fileList }) => {
    onChange?.(fileList)
  }

  <Upload
  action="http://localhost:5000/upload"
  name="file"
  listType="picture-card"
  fileList={value}
  onPreview={handlePreview}
  onChange={handleChange}
  beforeUpload={beforeUpload}
  accept={accept}
  multiple={multiple}
  maxCount={maxCount}
>
  {value?.length >= maxCount ? null : uploadButton}
</Upload>


  const uploadButton = (
    <button
      type="button"
      style={{
        border: 0, background: 'none', display: 'flex',
        flexDirection: 'column', alignItems: 'center'
      }}
    >
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>上传图片</div>
    </button>
  )

  return (
    <>
      <Upload
        listType="picture-card"
        fileList={value}
        onPreview={handlePreview}
        onChange={handleChange}
        beforeUpload={beforeUpload}
        customRequest={dummyRequest}
        accept={accept}
        multiple={multiple}
        maxCount={maxCount}
      >
        {value?.length >= maxCount ? null : uploadButton}
      </Upload>

      <Modal
        open={previewOpen}
        title={previewTitle}
        footer={null}
        onCancel={() => setPreviewOpen(false)}
        width={800}
      >
        <img
          alt="preview"
          style={{ width: '100%', display: 'block' }}
          src={previewImage}
        />
      </Modal>
    </>
  )
}

export default ImageUploader

