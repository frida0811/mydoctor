import { Routes, Route, Link, useLocation } from 'react-router-dom';
import Patients from './pages/Patients.jsx';
import Dashboard from './pages/Dashboard.jsx';
import { Layout } from 'antd';
import 'antd/dist/reset.css';

const { Header, Content, Footer } = Layout;

function App() {
  const location = useLocation();
  const isHome = location.pathname === import.meta.env.BASE_URL;

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{
        padding: 0,
        background: isHome ? '#fff' : '#fff',
        boxShadow: '0 2px 8px #f0f1f2',
        position: 'relative'
      }}>
        {isHome ? (
          <div style={{ position: 'relative', width: '100%' }}>
            <img
              src={`${import.meta.env.BASE_URL}1762354157540.jpg`}
              alt="网站抬头"
              style={{ width: '100%', height: 'auto', display: 'block' }}
            />
            <div style={{
              position: 'absolute',
              top: '80%',
              left: '20%',
              transform: 'translate(-50%, -50%)',
              color: '#fff',
              fontSize: '32px',
              fontWeight: 'bold',
              textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
              whiteSpace: 'nowrap'
            }}>
              新安集邢氏耳鼻喉科
            </div>
          </div>
        ) : (
          <div style={{ height: 0 }} />
        )}
      </Header>
      <Content style={{ padding: '24px 50px', minHeight: 280 }}>
        <div style={{
          marginTop: -72,         // 再上移
          marginBottom: 16,
          marginLeft: 120,        // 再右移
          position: 'relative',
          zIndex: 2,
          fontSize: 22,
          fontWeight: 700
        }}>
          <Link to="/" style={{ marginRight: 28 }}>首页</Link>
          <Link to="/dashboard" style={{ marginRight: 28 }}>就诊记录</Link>
          <Link to="/patients">患者信息</Link>
        </div>
        <Routes>
          <Route path="/" element={<div style={{ textAlign: 'center', color: '#446', fontSize: '1.2rem' }}>欢迎来到邢医生耳鼻喉科网页！</div>} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/patients" element={<Patients />} />
        </Routes>
      </Content>
      <Footer style={{ textAlign: 'center' }}>©2025 邢氏耳鼻喉科</Footer>
    </Layout>
  );
}

export default App;
