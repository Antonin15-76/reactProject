import FileSaver from 'file-saver'
import { toStartCase } from '@spha-org/components'
import { Info } from 'luxon'

export const getRandom = (times = 3) => {
  let res = Math.random()
  for (let i = 0; i < times; ++i) {
    res = res + Math.random()
  }
  return res
}

const headers = {
  method: 'POST',
  headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
  mode: 'cors',
  cache: 'no-store'
}

export const openOrDownload = async ({ path, path2, fallback, fileName }) => {
  let a = await downloadFile(path, fileName)
  if (!a) a = await downloadFile(path2, fileName)
  if (!a) a = await downloadFile(fallback, fileName)
}

export const downloadFile = async (path, fileName, token) => {
  const endpoint = `${process.env.REACT_APP_API_URL}/downloads`
  const myInit = { ...headers, headers: { ...headers.headers, Authorization: `Bearer ${token}` }, body: JSON.stringify({ path: path }) }
  const res = await window.fetch(`${endpoint}`, myInit)
  if (res.status !== 200) return false
  const blob = await res.blob()
  FileSaver.saveAs(blob, fileName)
  return true
}
export const months = Info.months().map(x => toStartCase(x))
