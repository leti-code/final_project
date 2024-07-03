module.exports = [
    //podemos tener distintos objetos con configs distintas
    {
        ignores: ["**/eslint.config.js"], //ignora el archivo de configuración del linting a la hora de evaluarlo
        files: ["**/*.ts"], //por defecto analiza files con extensión .js .cjs y .mjs, así incluimos que analice los archivos typescript
        rules: { 
          "linebreak-style": ["error", "unix"],
          "semi": ["error", "always"] //especifica que la regla del ; tiene severidad de error
    },
    {
        ignores: ["**/eslint.config.js"], 
        rules: { 
          "indent": ["error", 2],
          "linebreak-style": ["error", "unix"],
          "quotes": ["warn", "double"],
          "semi": ["error", "always"] 
    }
];
//docu sobre archivo de configuración: https://eslint.org/docs/latest/use/configure/configuration-files
