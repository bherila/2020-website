export default function usePersist<T>(key: string, defaultValue: T) {
  let data: T = defaultValue
  const storageItem = typeof localStorage !== 'undefined' ? localStorage.getItem(key) : null
  if (storageItem) {
    data = JSON.parse(storageItem)
  }
  const setData = (value: T) => {
    localStorage.setItem(key, JSON.stringify(value))
    data = value
  }
  return {
    data,
    setData,
  }
}
