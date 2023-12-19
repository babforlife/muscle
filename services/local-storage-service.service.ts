class LocalStorageService {
  getItem(key: string) {
    if (!process.client) return
    return localStorage.getItem(key)
  }

  removeItem(key: string) {
    if (!process.client) return
    localStorage.removeItem(key)
  }

  setItem(key: string, value: string) {
    if (!process.client) return
    localStorage.setItem(key, value)
  }
}
export const localStorageService = new LocalStorageService()
