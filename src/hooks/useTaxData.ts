export default function useTaxData(key: string) {
  if (typeof localStorage === 'undefined') {
    return {
      value: '',
      setValue: (newValue) => {
        console.warn('Cannot save newValue because localStorage is undefined')
      },
    }
  }
  return {
    value: localStorage.getItem('tax:' + key),
    setValue: (newValue: string) => {
      localStorage.setItem('tax:' + key, newValue)
    },
  }
}
