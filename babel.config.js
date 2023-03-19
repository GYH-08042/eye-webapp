module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset',
  ],

  plugins: [
    //支持vant-ui组件的按需加载
    ['import', {
      libraryName: 'vant',
      libraryDirectory: 'es',
      style: true,
    }, 'vant'],
    //支持element-ui组件的按需加载
    [
      "component",
      {
        libraryName: "element-ui",
        styleLibraryName: "theme-chalk"
      }
    ]
  ]
}
