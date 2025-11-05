import React, { useMemo, useState } from 'react'
import { Layout, Menu, Breadcrumb, theme } from 'antd'
import {
  DashboardOutlined,
  TeamOutlined,
} from '@ant-design/icons'
import Dashboard from './pages/Dashboard.jsx'
import Patients from './pages/Patients.jsx'

const { Header, Content, Sider, Footer } = Layout

const App = () => {
  const [selectedKey, setSelectedKey] = useState('dashboard')
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken()

  const content = useMemo(() => {
    switch (selectedKey) {
      case 'dashboard':
        return <Dashboard />
      case 'patients':
        return <Patients />
      default:
        return <Dashboard />
    }
  }, [selectedKey])

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ display: 'flex', alignItems: 'center' }}>
        <div style={{
          color: '#fff',
          fontWeight: 600,
          fontSize: 18,
          letterSpacing: 0.5,
        }}>
          My Doctor App
        </div>
      </Header>

      <Layout>
        <Sider width={220} theme="light">
          <Menu
            mode="inline"
            selectedKeys={[selectedKey]}
            onClick={(e) => setSelectedKey(e.key)}
            style={{ height: '100%', borderRight: 0 }}
            items={[
              { key: 'dashboard', icon: <DashboardOutlined />, label: '概览仪表盘' },
              { key: 'patients',  icon: <TeamOutlined />,       label: '患者管理' },
            ]}
          />
        </Sider>

        <Layout style={{ padding: '0 24px 24px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}
            items={[
              { title: 'Home' },
              { title: selectedKey === 'dashboard' ? 'Dashboard' : 'Patients' },
            ]}
          />
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {content}
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Ant Design ©{new Date().getFullYear()} Created by You
          </Footer>
        </Layout>
      </Layout>
    </Layout>
  )
}

export default App
