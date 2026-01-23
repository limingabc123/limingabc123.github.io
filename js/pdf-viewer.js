class PDFViewer {
  constructor(containerId, pdfUrl) {
    this.container = document.getElementById(containerId);
    this.pdfUrl = pdfUrl;
    this.pdfDoc = null;
    this.scale = 1.5;
    this.pages = [];
    this.currentPage = 1;
    this.totalPages = 0;

    // 进度指示器
    this.progressIndicator = null;
    this.pageIndicator = null;

    this.init();
  }

  async init() {
    // 配置PDF.js worker
    pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/build/pdf.worker.min.js';

    // 创建UI结构
    this.createUI();

    // 加载PDF
    await this.loadPDF();

    // 渲染所有页面
    await this.renderAllPages();

    // 初始化滚动监听
    this.initScrollTracking();
  }

  createUI() {
    // 创建主容器
    this.viewerContainer = document.createElement('div');
    this.viewerContainer.className = 'pdf-viewer-container';
    this.viewerContainer.style.position = 'relative';

    // 创建进度条
    this.progressIndicator = document.createElement('div');
    this.progressIndicator.className = 'pdf-progress-indicator';
    this.progressIndicator.innerHTML = `
      <div class="progress-bar">
        <div class="progress-fill"></div>
      </div>
      <div class="progress-text">0%</div>
      <div class="page-info">页面: <span class="current-page">1</span>/<span class="total-pages">0</span></div>
    `;

    this.container.appendChild(this.progressIndicator);
    this.container.appendChild(this.viewerContainer);

    // 添加CSS
    this.addStyles();
  }

  addStyles() {
    const styles = `
      .pdf-viewer-container {
        width: 100%;
        max-width: 800px;
        max-height: 600px;
        margin: 0 auto;
        background: #f9f9f9;
        border-radius: 8px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        padding: 20px;
        overflow-y: auto;
        overflow-x: hidden;
      }

      /* 自定义滚动条样式 */
      .pdf-viewer-container::-webkit-scrollbar {
        width: 10px;
      }

      .pdf-viewer-container::-webkit-scrollbar-track {
        background: #f1f1f1;
        border-radius: 5px;
      }

      .pdf-viewer-container::-webkit-scrollbar-thumb {
        background: #c1c1c1;
        border-radius: 5px;
      }

      .pdf-viewer-container::-webkit-scrollbar-thumb:hover {
        background: #a8a8a8;
      }

      /* Firefox滚动条样式 */
      .pdf-viewer-container {
        scrollbar-width: thin;
        scrollbar-color: #c1c1c1 #f1f1f1;
      }

      /* 响应式设计：在小屏幕上减少容器高度 */
      @media (max-width: 768px) {
        .pdf-viewer-container {
          max-height: 400px;
          padding: 15px;
        }
      }

      @media (max-width: 480px) {
        .pdf-viewer-container {
          max-height: 300px;
          padding: 10px;
        }
      }

      .pdf-page-canvas {
        display: block;
        margin: 0 auto 20px auto;
        border: 1px solid #ddd;
        box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        max-width: 100%;
        height: auto;
      }

      .pdf-progress-indicator {
        position: fixed;
        top: 20px;
        right: 20px;
        background: white;
        padding: 10px 15px;
        border-radius: 8px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        z-index: 1000;
        font-family: Arial, sans-serif;
        font-size: 14px;
        min-width: 150px;
      }

      .progress-bar {
        width: 100%;
        height: 6px;
        background: #e0e0e0;
        border-radius: 3px;
        overflow: hidden;
        margin-bottom: 8px;
      }

      .progress-fill {
        height: 100%;
        background: linear-gradient(90deg, #4285f4, #34a853);
        width: 0%;
        transition: width 0.3s ease;
      }

      .progress-text {
        font-weight: bold;
        margin-bottom: 5px;
        color: #333;
      }

      .page-info {
        color: #666;
        font-size: 12px;
      }

      .current-page {
        font-weight: bold;
        color: #4285f4;
      }

      .total-pages {
        font-weight: bold;
      }
    `;

    const styleSheet = document.createElement('style');
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);
  }

  async loadPDF() {
    try {
      const loadingTask = pdfjsLib.getDocument(this.pdfUrl);
      this.pdfDoc = await loadingTask.promise;
      this.totalPages = this.pdfDoc.numPages;

      // 更新总页数显示
      const totalPagesElement = this.progressIndicator.querySelector('.total-pages');
      if (totalPagesElement) {
        totalPagesElement.textContent = this.totalPages;
      }
    } catch (error) {
      console.error('PDF加载失败:', error);
      this.viewerContainer.innerHTML = `<div class="error">PDF加载失败: ${error.message}</div>`;
    }
  }

  async renderAllPages() {
    if (!this.pdfDoc) return;

    // 清空容器
    this.viewerContainer.innerHTML = '';

    // 逐个渲染页面
    for (let pageNum = 1; pageNum <= this.totalPages; pageNum++) {
      const page = await this.pdfDoc.getPage(pageNum);
      const viewport = page.getViewport({ scale: this.scale });

      // 创建canvas元素
      const canvas = document.createElement('canvas');
      canvas.className = 'pdf-page-canvas';
      canvas.id = `pdf-page-${pageNum}`;
      canvas.dataset.pageNum = pageNum;

      // 设置canvas尺寸
      const outputScale = window.devicePixelRatio || 1;
      canvas.width = Math.floor(viewport.width * outputScale);
      canvas.height = Math.floor(viewport.height * outputScale);
      canvas.style.width = `${viewport.width}px`;
      canvas.style.height = `${viewport.height}px`;

      // 渲染上下文
      const context = canvas.getContext('2d');
      const transform = outputScale !== 1
        ? [outputScale, 0, 0, outputScale, 0, 0]
        : null;

      const renderContext = {
        canvasContext: context,
        transform: transform,
        viewport: viewport
      };

      // 渲染页面
      await page.render(renderContext).promise;

      // 添加到容器
      this.viewerContainer.appendChild(canvas);

      // 保存页面信息
      this.pages.push({
        element: canvas,
        top: 0,
        height: viewport.height
      });
    }

    // 计算每个页面的位置
    this.calculatePagePositions();
  }

  calculatePagePositions() {
    let currentTop = 0;
    this.pages.forEach((page, index) => {
      page.top = currentTop;
      currentTop += page.height + 20; // 20px是页面间距
    });
  }

  initScrollTracking() {
    // 监听容器滚动事件
    this.viewerContainer.addEventListener('scroll', () => {
      this.updateProgress();
    });

    // 初始更新
    this.updateProgress();
  }

  updateProgress() {
    if (!this.pages.length) return;

    // 容器内部滚动位置和尺寸
    const containerScrollTop = this.viewerContainer.scrollTop;
    const containerHeight = this.viewerContainer.clientHeight;
    const contentHeight = this.viewerContainer.scrollHeight;

    // 计算容器内部滚动百分比
    let scrollPercent = 0;
    if (contentHeight > containerHeight) {
      scrollPercent = (containerScrollTop / (contentHeight - containerHeight)) * 100;
    }
    const clampedPercent = Math.min(100, Math.max(0, scrollPercent));

    // 更新进度条
    const progressFill = this.progressIndicator.querySelector('.progress-fill');
    const progressText = this.progressIndicator.querySelector('.progress-text');

    if (progressFill) {
      progressFill.style.width = `${clampedPercent}%`;
    }
    if (progressText) {
      progressText.textContent = `${Math.round(clampedPercent)}%`;
    }

    // 计算当前页面（基于容器内部滚动位置）
    let currentPage = 1;
    for (let i = 0; i < this.pages.length; i++) {
      const page = this.pages[i];
      const pageTop = page.top;
      const pageBottom = pageTop + page.height;

      // 如果页面在容器视口中
      if (containerScrollTop + containerHeight * 0.3 >= pageTop &&
          containerScrollTop <= pageBottom) {
        currentPage = i + 1;
        break;
      }
    }

    // 更新当前页面显示
    const currentPageElement = this.progressIndicator.querySelector('.current-page');
    if (currentPageElement) {
      currentPageElement.textContent = currentPage;
    }

    this.currentPage = currentPage;
  }
}