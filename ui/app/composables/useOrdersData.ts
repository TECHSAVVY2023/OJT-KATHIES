import type { OrderItem, OrderStatus } from '~/types/catalog'
import ordersJson from '~/data/orders.json'

export function useOrdersData() {
  const orders = shallowRef<OrderItem[]>(JSON.parse(JSON.stringify(ordersJson)) as OrderItem[])

  function updateOrderStatus(orderId: string, status: OrderStatus) {
    const item = orders.value.find((o) => o.id === orderId || o.orderId === orderId)
    if (item) {
      orders.value = orders.value.map((o) =>
        o.id === item.id ? { ...o, status } : o
      )
    }
  }

  const counts = computed(() => {
    const list = orders.value
    return {
      all: list.length,
      pending: list.filter((o) => o.status === 'Pending').length,
      completed: list.filter((o) => o.status === 'Completed').length,
      canceled: list.filter((o) => o.status === 'Canceled').length,
      returned: list.filter((o) => o.status === 'Returned').length,
      damaged: list.filter((o) => o.status === 'Damaged').length,
      inProgress: list.filter((o) => o.status === 'In-Progress').length
    }
  })

  return {
    orders: readonly(orders),
    updateOrderStatus,
    counts
  }
}
