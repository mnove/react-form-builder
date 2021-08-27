let JSONFormSchema = '[{"key":"abc1","type":"textInput","label":"test1","placeholder":"Enter text here","required":true},{"key":"abc2","type":"emailInput","label":"test2","placeholder":"Enter text here","required":true},{"key":"abc3","type":"numberInput","label":"Default Number Label","placeholder":"Enter text here","required":false}]'

console.log(JSON.parse(JSONFormSchema))
export const sampleFormSchema = JSON.parse(JSONFormSchema);

