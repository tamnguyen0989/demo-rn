export default styles => {
  const isTablet = true

  const stylesApp = name => {
    const desktopStyle = styles[`${name}`] || ''
    const tabletStyle = styles[`${name}Tablet`] || ''

    return isTablet ? tabletStyle : desktopStyle
  }

  return { stylesApp }
}
