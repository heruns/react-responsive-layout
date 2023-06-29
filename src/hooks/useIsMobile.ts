import { createContext, useContext } from "react"

// 检查当前视口是否为移动端大小
export const checkIsMobile = () => {
  return window.innerWidth <= 620
}

// 保存是否移动端状态的 context
export const IsMobileContext = createContext<boolean>(false)
// 从 IsMobileContext 中获取当前是否移动端状态的 hook
export const useIsMobile = () => {
  const isMobile = useContext(IsMobileContext)
  return isMobile
}
