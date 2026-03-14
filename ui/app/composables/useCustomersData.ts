import type { CustomerItem, CustomerStatus } from '~/types/catalog'
import customersJson from '~/data/customers.json'

export function useCustomersData() {
  const customers = shallowRef<CustomerItem[]>(JSON.parse(JSON.stringify(customersJson)) as CustomerItem[])

  function updateCustomer(id: string, patch: Partial<CustomerItem>) {
    customers.value = customers.value.map((c) =>
      c.id === id ? { ...c, ...patch } : c
    )
  }

  function deleteCustomer(id: string) {
    customers.value = customers.value.filter((c) => c.id !== id)
  }

  const counts = computed(() => {
    const list = customers.value
    return {
      all: list.length,
      active: list.filter((c) => c.status === 'Active').length,
      inactive: list.filter((c) => c.status === 'Inactive').length
    }
  })

  return {
    customers: readonly(customers),
    updateCustomer,
    deleteCustomer,
    counts
  }
}
