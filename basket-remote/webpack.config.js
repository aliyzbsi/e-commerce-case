// Gerekli webpack eklentilerini import ediyoruz
const HtmlWebpackPlugin = require("html-webpack-plugin"); // HTML dosyası oluşturmak için
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // CSS dosyalarını ayırmak için
const { ModuleFederationPlugin } = require("webpack").container; // Module Federation için
const path = require("path"); // Dosya yolları işlemleri için

// Webpack konfigürasyonunu dışa aktarıyoruz
module.exports = {
  // Uygulamanın giriş noktası
  entry: "./src/index",

  // Geliştirme modunda çalıştırıyoruz
  mode: "development",

  // Webpack dev server ayarları
  devServer: {
    static: {
      // Statik dosyaların sunulacağı dizin
      directory: path.join(__dirname, "dist"),
    },
    // Uygulamanın çalışacağı port
    port: 5173,
    // CORS ayarları - tüm domainlerden erişime izin veriyoruz
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  },

  // Çıktı ayarları
  output: {
    // publicPath'i otomatik olarak belirle (webpack dev server için gerekli)
    publicPath: "auto",
  },

  // Dosya uzantılarının çözümlenmesi
  resolve: {
    // Bu uzantılara sahip dosyaları import ederken uzantı belirtmeye gerek yok
    extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
  },

  // Modül işleme kuralları
  module: {
    rules: [
      {
        // TypeScript ve JavaScript dosyalarını işle
        test: /\.(ts|tsx|js|jsx)$/,
        // babel-loader kullan
        loader: "babel-loader",
        // node_modules klasörünü hariç tut
        exclude: /node_modules/,
        // Babel ayarları
        options: {
          presets: [
            "@babel/preset-env", // Modern JavaScript'i eski tarayıcılar için dönüştür
            ["@babel/preset-react", { runtime: "automatic" }], // React JSX'i dönüştür (otomatik import ile)
            "@babel/preset-typescript", // TypeScript'i JavaScript'e dönüştür
          ],
        },
      },
      {
        // CSS dosyalarını işle
        test: /\.css$/,
        // CSS işleme zinciri (sağdan sola çalışır)
        use: [
          // CSS'i ayrı dosyalara çıkar
          MiniCssExtractPlugin.loader,
          // CSS'i JavaScript'e dönüştür
          "css-loader",
          {
            // PostCSS işlemesi için
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                // PostCSS eklentileri
                plugins: [
                  require("tailwindcss"), // Tailwind CSS işlemesi
                  require("autoprefixer"), // Otomatik vendor prefix ekleme
                ],
              },
            },
          },
        ],
      },
    ],
  },

  // Webpack eklentileri
  plugins: [
    // Module Federation konfigürasyonu
    new ModuleFederationPlugin({
      // Bu uygulamanın Module Federation içindeki adı
      name: "basket_remote",
      // Remote entry dosyasının adı
      filename: "remoteEntry.js",
      // Dışa aktarılan (expose edilen) modüller
      exposes: {
        /** şimdilik diğer dosyalar oluşmadığı için birbirine bağımlı olmalarına engel olduk
        "./BasketApp": "./src/App.tsx", // Sepet uygulaması
        "./basketStore": "./src/store/basketStore.ts", // Sepet store'u
        "./BasketSlice": "./src/store/basketSlice.ts", // Sepet slice'ı
         */
      },
      // Paylaşılan bağımlılıklar
      shared: {
        // React'ı paylaşıyoruz
        react: {
          singleton: true, // Tek bir örnek kullan
          requiredVersion: "^18.2.0", // Gerekli sürüm
        },
        // React DOM'u paylaşıyoruz
        "react-dom": {
          singleton: true,
          requiredVersion: "^18.2.0",
        },
        // Redux Toolkit'i paylaşıyoruz
        "@reduxjs/toolkit": { singleton: true },
        // React Redux'u paylaşıyoruz
        "react-redux": { singleton: true },
        // Ant Design'ı paylaşıyoruz
        antd: { singleton: true },
      },
    }),

    // HTML dosyası oluşturma eklentisi
    new HtmlWebpackPlugin({
      // Kullanılacak şablon
      template: "./index.html",
    }),

    // CSS dosyalarını ayırma eklentisi
    new MiniCssExtractPlugin({
      // Çıktı dosyasının adı (içerik hash'i ile)
      filename: "[name].[contenthash].css",
    }),
  ],
};
