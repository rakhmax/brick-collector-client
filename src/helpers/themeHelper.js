export function getThemeIdByItemIdPrefix(search) {
  if (!search) {
    this.dialogData.theme = null;
  } else if (search.startsWith('cty')) {
    this.dialogData.theme = 50;
  } else if (search.startsWith('sw')
    || search.startsWith('751')
    || search.startsWith('752')
    || search.startsWith('753')
  ) {
    this.dialogData.theme = 158;
  } else if (search.startsWith('hp') || search.startsWith('759')) {
    this.dialogData.theme = 246;
  } else if (search.startsWith('njo')) {
    this.dialogData.theme = 435;
  } else if (search.startsWith('pm')) {
    this.dialogData.theme = 439;
  } else if (search.startsWith('col')) {
    this.dialogData.theme = 535;
  } else if (search.startsWith('min')) {
    this.dialogData.theme = 577;
  } else if (search.startsWith('tlm')) {
    this.dialogData.theme = 578;
  } else if (search.startsWith('js')) {
    this.dialogData.theme = 602;
  } else if (search.startsWith('dim')) {
    this.dialogData.theme = 604;
  } else if (search.startsWith('nex')) {
    this.dialogData.theme = 605;
  } else if (search.startsWith('hs')) {
    this.dialogData.theme = 676;
  } else if (search.startsWith('sh')) {
    this.dialogData.theme = 696;
  }
}

export function getThemeNameById(themeId) {
  const themeToConvert = this.$store.state.themes
    .find((theme) => theme.id === themeId) || {};
  return themeToConvert.name;
}
