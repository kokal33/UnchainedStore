
    export function setUser(publicAddress: string) {
        localStorage.setItem('publicAddress', publicAddress);
        localStorage.setItem("expires_in", "3600");
    }

    export function getUser() {
      return localStorage.getItem("publicAddress");
    }

    export function clearCache() {
      let hours = 1
      let saved = localStorage.getItem('expires_in')
      if (saved) {
      const publicAddress = parseInt(saved);
      if ((new Date().getTime() - publicAddress > hours * 60 * 60))
        localStorage.clear()
      }
    }

