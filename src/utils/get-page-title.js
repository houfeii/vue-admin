import defaultSettings from '@/settings'

const title = defaultSettings.title || 'vue-element 后台'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
