import { SplitPane } from './SplitPane';

export const SplitPaneDemo = () => {
  return (
    <div style={{ height: '100vh', width: '100%', backgroundColor: '#f9fafb' }}>
      <SplitPane direction="horizontal" defaultSizes={[25, 25, 25, 25]} minSize={0}>
        <div
          style={{
            height: '100%',
            backgroundColor: '#f3f4f6',
            padding: '1rem',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <h2 style={{ marginBottom: '1rem', fontSize: '1.125rem', fontWeight: 'bold' }}>面板 1</h2>
          <p>这是第一个面板。当前宽度：25%</p>
        </div>
        <div
          style={{
            height: '100%',
            backgroundColor: '#e5e7eb',
            padding: '1rem',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <h2 style={{ marginBottom: '1rem', fontSize: '1.125rem', fontWeight: 'bold' }}>面板 2</h2>
          <p>这是第二个面板。当前宽度：25%</p>
        </div>
        <div
          style={{
            height: '100%',
            backgroundColor: '#d1d5db',
            padding: '1rem',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <h2 style={{ marginBottom: '1rem', fontSize: '1.125rem', fontWeight: 'bold' }}>面板 3</h2>
          <p>这是第三个面板。当前宽度：25%</p>
        </div>
        <div
          style={{
            height: '100%',
            backgroundColor: '#9ca3af',
            padding: '1rem',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <h2 style={{ marginBottom: '1rem', fontSize: '1.125rem', fontWeight: 'bold' }}>面板 4</h2>
          <p>这是第四个面板。当前宽度：25%</p>
        </div>
      </SplitPane>
    </div>
  );
};
