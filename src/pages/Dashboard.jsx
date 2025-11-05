import DragArea from './DragArea.jsx'
import React from 'react'
import { Card, Row, Col, Statistic, Table } from 'antd'

const columns = [
  { title: '患者', dataIndex: 'name', key: 'name' },
  { title: '最近就诊', dataIndex: 'lastVisit', key: 'lastVisit' },
  { title: '状态', dataIndex: 'status', key: 'status' },
]

const data = [
  { key: 1, name: '张三', lastVisit: '2025-10-12', status: '复诊' },
  { key: 2, name: '李四', lastVisit: '2025-10-27', status: '首次问诊' },
  { key: 3, name: '王五', lastVisit: '2025-11-02', status: '复诊' },
]

const Dashboard = () => {
  return (
    <div>
        <div>
      <Row gutter={[16, 16]}>
        <Col xs={24} md={8}>
          <Card>
            <Statistic title="今日挂号" value={23} />
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card>
            <Statistic title="待复诊" value={12} />
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card>
            <Statistic title="已完成" value={31} />
          </Card>
        </Col>
      </Row>

      <Card style={{ marginTop: 16 }} title="最近就诊记录">
        <Table columns={columns} dataSource={data} pagination={false} />
      </Card>
    </div>
    <Card style={{ marginTop: 16 }} title="上传图片">
    <DragArea />
  </Card>
  </div>
  
  )
}

export default Dashboard
