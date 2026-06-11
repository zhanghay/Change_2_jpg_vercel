import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');

    if (!file) {
      return NextResponse.json(
        { error: '未找到文件' },
        { status: 400 }
      );
    }

    const originalName = file.name;
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // 获取文件名（不含后缀）
    const nameWithoutExt = originalName.includes('.')
      ? originalName.substring(0, originalName.lastIndexOf('.'))
      : originalName;

    // 新文件名：原文件名 + .jpg
    const newName = nameWithoutExt + '.jpg';

    // 构建下载 URL（使用 data URL 方式，无需实际存储文件）
    const base64 = buffer.toString('base64');
    const mimeType = 'image/jpeg'; // 伪装成 jpeg 类型
    const dataUrl = `data:${mimeType};base64,${base64}`;

    return NextResponse.json({
      originalName,
      newName,
      size: buffer.length,
      downloadUrl: dataUrl,
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: '文件处理失败' },
      { status: 500 }
    );
  }
}

export const dynamic = 'force-dynamic';
