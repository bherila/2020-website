export default function DeepRemoveKey(obj: any, keyToRemove: string) {
  for (let prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      if (prop === keyToRemove) {
        delete obj[prop]
      } else if (typeof obj[prop] === 'object') {
        DeepRemoveKey(obj[prop], keyToRemove) // Recurse into nested objects
      }
    }
  }
}
