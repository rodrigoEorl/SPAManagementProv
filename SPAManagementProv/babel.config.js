// babel.config.js
module.exports = {
    presets: ['@babel/preset-env', '@babel/preset-react'], // Usado para transformar el código JS y JSX
    plugins: [
      ['import', { libraryName: 'antd', style: true }], // Para importar solo los estilos que necesitas
    ],
  };
  