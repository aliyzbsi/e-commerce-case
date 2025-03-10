/** @type {import('tailwindcss').Config} */
module.exports = {
  // Tailwind'in hangi dosyalarda CSS sınıflarını tarayacağını belirtiyoruz
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],

  // Tema özelleştirmeleri
  theme: {
    extend: {
      // Özel renk paletini tanımlıyoruz - diğer uygulamalarla aynı renkleri kullanıyoruz
      colors: {
        primary: {
          DEFAULT: "#1890ff",
          light: "#40a9ff",
          dark: "#096dd9",
        },
        secondary: {
          DEFAULT: "#f5f5f5",
          light: "#fafafa",
          dark: "#e8e8e8",
        },
        success: {
          DEFAULT: "#52c41a",
          light: "#73d13d",
          dark: "#389e0d",
        },
        warning: {
          DEFAULT: "#faad14",
          light: "#ffc53d",
          dark: "#d48806",
        },
        error: {
          DEFAULT: "#f5222d",
          light: "#ff4d4f",
          dark: "#cf1322",
        },
      },
      // Özel gölge efektleri tanımlıyoruz
      boxShadow: {
        card: "0 2px 8px rgba(0, 0, 0, 0.1)", // Kartlar için gölge efekti
      },
    },
  },

  // Eklentiler (bu projede eklenti kullanmıyoruz)
  plugins: [],

  // Ant Design ile uyumlu çalışması için core plugins ayarları
  corePlugins: {
    preflight: false, // Ant Design'ın kendi reset CSS'i ile çakışmaması için preflight'ı devre dışı bırakıyoruz
  },
};
