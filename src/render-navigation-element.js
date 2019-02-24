const renderNavigationItem = (url, caption, amount = 0, isActive = false) => {
  return `<a href="#${url.toLowerCase()}" class="main-navigation__item${isActive ? ` main-navigation__item--active` : ``}">${caption}${amount > 0 ? ` <span class="main-navigation__item-count">${amount}</span>` : ``}</a>`;
};

export default renderNavigationItem;
