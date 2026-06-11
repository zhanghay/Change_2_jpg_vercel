export const metadata = {
  title: '文件重命名工具',
  description: '上传文件并将其后缀重命名为 .jpg',
};

export default function RootLayout({ children }) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
