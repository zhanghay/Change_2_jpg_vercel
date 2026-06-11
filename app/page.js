'use client';

import { useState, useRef } from 'react';
import './globals.css';

export default function Home() {
  const [file, setFile] = useState(null);
  const [renamedFile, setRenamedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileSelect = async (e) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      await processFile(selectedFile);
    }
  };

  const processFile = async (selectedFile) => {
    setError(null);
    setFile(selectedFile);
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('file', selectedFile);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('上传失败');
      }

      const data = await response.json();
      setRenamedFile(data);
    } catch (err) {
      setError('文件处理失败，请重试');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragging(false);
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    setDragging(false);

    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile) {
      await processFile(droppedFile);
    }
  };

  const handleDownload = () => {
    if (!renamedFile) return;

    // 创建下载链接
    const link = document.createElement('a');
    link.href = renamedFile.downloadUrl;
    link.download = renamedFile.newName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleReset = () => {
    setFile(null);
    setRenamedFile(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const formatSize = (bytes) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="container">
      <div className="header">
        <h1>文件重命名工具</h1>
        <p>上传任意文件，将其后缀重命名为 .jpg</p>
      </div>

      <div className="content">
        {!file ? (
          <div
            className={`upload-area ${dragging ? 'dragging' : ''}`}
            onClick={() => fileInputRef.current?.click()}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <div className="upload-icon">📁</div>
            <div className="upload-text">点击或拖拽文件到此处</div>
            <div className="upload-hint">支持任意类型文件</div>
            <input
              ref={fileInputRef}
              type="file"
              className="file-input"
              onChange={handleFileSelect}
            />
          </div>
        ) : (
          <>
            <div className="file-info">
              <h3>原始文件</h3>
              <div className="info-row">
                <span className="info-label">文件名</span>
                <span className="info-value" title={file.name}>
                  {file.name}
                </span>
              </div>
              <div className="info-row">
                <span className="info-label">大小</span>
                <span className="info-value">{formatSize(file.size)}</span>
              </div>
              <div className="info-row">
                <span className="info-label">类型</span>
                <span className="info-value">{file.type || '未知'}</span>
              </div>
            </div>

            {renamedFile && (
              <div className="file-info renamed-info">
                <h3>重命名后</h3>
                <div className="info-row">
                  <span className="info-label">新文件名</span>
                  <span className="info-value highlight" title={renamedFile.newName}>
                    {renamedFile.newName}
                  </span>
                </div>
                <div className="info-row">
                  <span className="info-label">新后缀</span>
                  <span className="info-value highlight">.jpg</span>
                </div>
              </div>
            )}

            {loading && (
              <div className="success-message" style={{ textAlign: 'center' }}>
                <span className="loading"></span>
                处理中...
              </div>
            )}

            {error && <div className="error-message">{error}</div>}

            <div className="button-group">
              <button
                className="btn btn-primary"
                onClick={handleDownload}
                disabled={!renamedFile || loading}
              >
                {loading ? '处理中...' : '下载文件'}
              </button>
              <button
                className="btn btn-secondary"
                onClick={handleReset}
                disabled={loading}
              >
                重新选择
              </button>
            </div>
          </>
        )}
      </div>

      <div className="footer">
        <p className="footer-text">提示：此工具仅修改文件后缀名，不会转换文件格式</p>
      </div>
    </div>
  );
}
