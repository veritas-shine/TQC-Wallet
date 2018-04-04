export function getDataFolder() {
  const {HOME, APPDATA} = process.env
  return APPDATA || (process.platform === 'darwin' ? `${HOME}/Library/TQC` : `${HOME}/.TQC`)
}

export function getWalletPath() {
  return `${getDataFolder()}/wallet`
}
