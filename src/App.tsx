import React, { useState, useEffect, useLayoutEffect } from 'react';
import MyComponent from './components/MyComponent/MyComponent';
import { IsMobileContext, checkIsMobile } from './hooks/useIsMobile';

function App() {
  const [isMobile, setIsMobile] = useState(checkIsMobile)
  useEffect(() => {
    const resizeHandler = () => {
      const currentIsMobile = checkIsMobile()
      setIsMobile(currentIsMobile)
    }
    // 监听 window 的 resize 事件，窗口大小改变时重新计算 isMobile 的值
    window.addEventListener('resize', resizeHandler)
    // 组件销毁时取消事件监听
    return () => window.removeEventListener('resize', resizeHandler)
  }, [])

  // 注意这里用的是 useLayoutEffect，以避免移动端首次加载时页面闪烁
  useLayoutEffect(() => {
    // isMobile 变化时，为 body 添加 pc 或 mobile className
    type BodyClassName = 'pc' | 'mobile'
    const bodyClass: BodyClassName = isMobile ? 'mobile' : 'pc'
    const classToRemove: BodyClassName = bodyClass === 'mobile' ? 'pc' : 'mobile'
    document.body.classList.remove(classToRemove)
    document.body.classList.add(bodyClass)
  }, [isMobile])

  return (
    // 通过 IsMobileContext 将 isMobile 的值传递给所有子组件
    <IsMobileContext.Provider value={isMobile}>
      <div className="App">
        <MyComponent/>
      </div>
    </IsMobileContext.Provider>
  );
}

export default App;
