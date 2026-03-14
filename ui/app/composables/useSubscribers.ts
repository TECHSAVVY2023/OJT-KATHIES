import subscribersJson from '~/data/subscribers.json'

const SUBSCRIBERS_STORAGE_KEY = 'kathies-subscribers'

export interface Subscriber {
  id: string
  email: string
  subscribedAt: string
}

const defaultSubscribers = subscribersJson as Subscriber[]

function loadSubscribers(): Subscriber[] {
  if (import.meta.client && typeof localStorage !== 'undefined') {
    try {
      const raw = localStorage.getItem(SUBSCRIBERS_STORAGE_KEY)
      if (raw) {
        const parsed = JSON.parse(raw) as Subscriber[]
        return Array.isArray(parsed) ? parsed : defaultSubscribers
      }
      return defaultSubscribers
    } catch {
      return defaultSubscribers
    }
  }
  return defaultSubscribers
}

function saveSubscribers(items: Subscriber[]) {
  if (import.meta.client && typeof localStorage !== 'undefined') {
    try {
      localStorage.setItem(SUBSCRIBERS_STORAGE_KEY, JSON.stringify(items))
    } catch {
      // ignore
    }
  }
}

function nextId(): string {
  return 'sub_' + Date.now() + '_' + Math.random().toString(36).slice(2, 9)
}

export function useSubscribers() {
  const subscribers = ref<Subscriber[]>(loadSubscribers())

  watch(subscribers, (val) => {
    saveSubscribers(val)
  }, { deep: true })

  const count = computed(() => subscribers.value.length)

  function add(email: string) {
    const normalized = email.trim().toLowerCase()
    if (!normalized) return
    const exists = subscribers.value.some(s => s.email.toLowerCase() === normalized)
    if (exists) return
    subscribers.value = [
      ...subscribers.value,
      { id: nextId(), email: normalized, subscribedAt: new Date().toISOString() }
    ]
  }

  function remove(id: string) {
    subscribers.value = subscribers.value.filter(s => s.id !== id)
  }

  return {
    subscribers: readonly(subscribers),
    count,
    add,
    remove
  }
}
