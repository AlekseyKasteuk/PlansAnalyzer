module.exports.addSite = (site) => {
  return {
    type: 'PRIVATE_SITES_ADD',
    data: site
  }
};

module.exports.setSites = (sites) => {
  return {
    type: 'PRIVATE_SITES_SET_DATA',
    data: sites
  }
}

module.exports.selectSite = (site) => {
  return {
    type: 'PRIVATE_SITE_SELECT',
    data: site
  }
}

module.exports.unselectSite = () => {
  return {
    type: 'PRIVATE_SITE_UNSELECT',
    data: {}
  }
};
