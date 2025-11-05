import React, { useState } from 'react'
import { Button, Card, Form, Input, Modal, Table, Space, message, Divider } from 'antd'
import ImageUploader from '../components/ImageUploader.jsx'

const Patients = () => {
  const [open, setOpen] = useState(false)
  const [form] = Form.useForm()
  const [data, setData] = useState([
    { key: '1', name: '张三', phone: '0400 000 001', note: '过敏史：无', images: [] },
    { key: '2', name: '李四', phone: '0400 000 002', note: '注意血压', images: [] },
  ])

  const [images, setImages] = useState([]) // 受控 fileList

  const columns = [
    { title: '姓名', dataIndex: 'name', key: 'name' },
    { title: '电话', dataIndex: 'phone', key: 'phone' },
    { title: '备注', dataIndex: 'note', key: 'note' },
    {
      title: '图片数量',
      dataIndex: 'images',
      key: 'images',
      render: (imgs) => (imgs?.length || 0),
      width: 100,
    },
  ]

  const handleAdd = async () => {
    try {
      const values = await form.validateFields()
      setData(prev => [
        ...prev,
        { key: String(prev.length + 1), ...values, images },
      ])
      setOpen(false)
      form.resetFields()
      setImages([])
      message.success('新增患者成功（含图片）')
    } catch {
      // 校验失败不处理
    }
  }

  return (
    <Card
      title="患者管理"
      extra={<Button type="primary" onClick={() => setOpen(true)}>新增患者</Button>}
    >
      <Table columns={columns} dataSource={data} pagination={{ pageSize: 5 }} />

      <Modal
        title="新增患者"
        open={open}
        onOk={handleAdd}
        onCancel={() => { setOpen(false); }}
        okText="保存"
        cancelText="取消"
        width={720}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name" label="姓名"
            rules={[{ required: true, message: '请输入姓名' }]}
          >
            <Input placeholder="如：王小明" />
          </Form.Item>

          <Form.Item
            name="phone" label="电话"
            rules={[{ required: true, message: '请输入电话' }]}
          >
            <Input placeholder="如：04xx xxx xxx" />
          </Form.Item>

          <Form.Item name="note" label="备注">
            <Input.TextArea rows={3} placeholder="病史、过敏、注意点等…" />
          </Form.Item>

          <Divider />

          <Form.Item label="上传图片（病历/处方/化验单等）">
            <ImageUploader
              value={images}
              onChange={setImages}
              maxCount={8}
              limitMB={5}
              accept="image/*"
              multiple
            />
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  )
}

export default Patients
