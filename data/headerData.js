// ~/data/headerData.js
export const headerData = {
  logo: '/kathieslogo.png',
  navLinks: [
    { name: 'Home', url: '/' },
    { name: 'About Us', url: '/about' },
    { name: 'Categories', url: '/categories' },
    { name: 'All Products', url: '/all-products' },
    { name: 'Contact Us', url: '/contact' }
  ],
  buttons: [
    {
      name: 'Cart',
      url: '/cart',
      show: true,
      icon: '/icon pack.png' // icon image in public folder
    },
    {
      name: 'Sign In',
      url: '/login',
      show: true
      // no icon, will display text
    }
  ]
}
