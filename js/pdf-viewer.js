class PDFViewer {
  constructor(containerId, pdfUrl) {
    this.container = document.getElementById(containerId);
    this.pdfUrl = pdfUrl;
    this.pdfDoc = null;
    this.scale = 2.0;
    this.pages = [];
    this.currentPage = 1;
    this.totalPages = 0;

    // 进度指示器
    this.progressIndicator = null;
    this.pageIndicator = null;

    // 缩略图相关
    this.thumbnailSidebar = null;
    this.thumbnails = [];
    this.thumbnailScale = 0.15; // 缩略图缩放比例

    // 目录相关
    this.tocSidebar = null;
    this.tocItems = [];

    // 搜索相关
    this.searchOverlay = null;
    this.searchResults = [];

    // 标注相关
    this.annotations = [];
    this.annotationMode = null;

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

    // 创建缩略图侧边栏
    this.createThumbnailSidebar();

    // 创建功能工具栏
    this.createToolbar();

    this.container.appendChild(this.progressIndicator);
    this.container.appendChild(this.viewerContainer);

    // 添加CSS
    this.addStyles();
  }

  addStyles() {
    const styles = `
      .pdf-embed-container {
        position: relative;
        min-height: 300px;
      }

      .pdf-viewer-container {
        width: 100%;
        max-width: 1200px;
        max-height: 800px;
        margin: 0 auto;
        background: #f9f9f9;
        border-radius: 8px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        padding: 5px;
        overflow-y: auto;
        overflow-x: hidden;
        margin-left: 0;
        transition: margin-left 0.3s ease;
      }

      .pdf-viewer-container.with-sidebar {
        margin-left: 180px;
        width: calc(100% - 180px);
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
          max-height: 500px;
          padding: 5px;
        }
      }

      @media (max-width: 480px) {
        .pdf-viewer-container {
          max-height: 400px;
          padding: 3px;
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

      /* 缩略图侧边栏样式 */
      .pdf-thumbnail-sidebar {
        position: absolute;
        left: 0;
        top: 0;
        width: 180px;
        height: 100%;
        background: white;
        border-right: 1px solid #ddd;
        overflow-y: auto;
        z-index: 100;
        transition: transform 0.3s ease;
      }

      .pdf-thumbnail-sidebar.hidden {
        transform: translateX(-100%);
      }

      .thumbnail-header {
        padding: 10px;
        background: #f5f5f5;
        border-bottom: 1px solid #ddd;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .thumbnail-header h3 {
        margin: 0;
        font-size: 14px;
        font-weight: bold;
        color: #333;
      }

      .thumbnail-toggle {
        background: #4285f4;
        color: white;
        border: none;
        padding: 3px 8px;
        border-radius: 3px;
        font-size: 12px;
        cursor: pointer;
      }

      .thumbnail-container {
        padding: 10px;
      }

      .thumbnail-wrapper {
        margin-bottom: 10px;
        border: 2px solid transparent;
        border-radius: 4px;
        overflow: hidden;
        cursor: pointer;
        transition: all 0.2s ease;
        position: relative;
      }

      .thumbnail-wrapper:hover {
        border-color: #4285f4;
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(0,0,0,0.1);
      }

      .thumbnail-wrapper.active {
        border-color: #34a853;
        background: #f0fff4;
      }

      .pdf-thumbnail {
        display: block;
        width: 100%;
        height: auto;
        background: white;
      }

      .thumbnail-page-num {
        position: absolute;
        bottom: 0;
        right: 0;
        background: rgba(0,0,0,0.7);
        color: white;
        font-size: 10px;
        padding: 2px 4px;
        border-radius: 2px 0 0 0;
      }

      /* 工具栏样式 */
      .pdf-toolbar {
        position: relative;
        background: white;
        border-bottom: 1px solid #ddd;
        padding: 8px 15px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        z-index: 99;
      }

      .toolbar-left, .toolbar-center, .toolbar-right {
        display: flex;
        align-items: center;
        gap: 5px;
      }

      .toolbar-center {
        flex-grow: 1;
        justify-content: center;
      }

      .page-display {
        display: flex;
        align-items: center;
        gap: 5px;
        margin: 0 10px;
      }

      .page-input {
        width: 50px;
        padding: 3px 5px;
        border: 1px solid #ddd;
        border-radius: 3px;
        text-align: center;
        font-size: 14px;
      }

      .page-separator {
        margin: 0 2px;
        color: #666;
      }

      .total-pages-display {
        color: #666;
        font-size: 14px;
      }

      .toolbar-btn {
        background: #f5f5f5;
        border: 1px solid #ddd;
        border-radius: 4px;
        padding: 5px 10px;
        cursor: pointer;
        font-size: 14px;
        transition: all 0.2s ease;
        display: flex;
        align-items: center;
        justify-content: center;
        min-width: 32px;
        min-height: 32px;
      }

      .toolbar-btn:hover {
        background: #e8e8e8;
        border-color: #ccc;
      }

      .toolbar-btn:active {
        background: #ddd;
      }

      .zoom-level {
        margin: 0 10px;
        font-size: 14px;
        font-weight: bold;
        color: #333;
        min-width: 50px;
        text-align: center;
      }

      /* 响应式设计 */
      @media (max-width: 768px) {
        .pdf-thumbnail-sidebar {
          width: 140px;
        }

        .toolbar-btn {
          padding: 4px 8px;
          font-size: 12px;
          min-width: 28px;
          min-height: 28px;
        }

        .zoom-level {
          font-size: 12px;
          margin: 0 5px;
        }
      }

      @media (max-width: 480px) {
        .pdf-thumbnail-sidebar {
          width: 120px;
        }

        .thumbnail-header h3 {
          font-size: 12px;
        }

        .toolbar-btn {
          padding: 3px 6px;
          font-size: 11px;
          min-width: 26px;
          min-height: 26px;
        }

        .zoom-level {
          font-size: 11px;
        }
      }

      /* 目录侧边栏样式 */
      .pdf-toc-sidebar {
        position: absolute;
        right: 0;
        top: 0;
        width: 250px;
        height: 100%;
        background: white;
        border-left: 1px solid #ddd;
        overflow-y: auto;
        z-index: 100;
        transition: transform 0.3s ease;
      }

      .pdf-toc-sidebar.hidden {
        transform: translateX(100%);
      }

      .toc-header {
        padding: 10px;
        background: #f5f5f5;
        border-bottom: 1px solid #ddd;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .toc-header h3 {
        margin: 0;
        font-size: 14px;
        font-weight: bold;
        color: #333;
      }

      .toc-toggle {
        background: #4285f4;
        color: white;
        border: none;
        padding: 3px 8px;
        border-radius: 3px;
        font-size: 12px;
        cursor: pointer;
      }

      .toc-container {
        padding: 10px;
      }

      .toc-loading, .toc-empty, .toc-error {
        padding: 20px;
        text-align: center;
        color: #666;
        font-size: 14px;
      }

      .toc-container ul {
        list-style: none;
        margin: 0;
        padding: 0;
      }

      .toc-container li {
        margin: 0;
        padding: 0;
      }

      .toc-item {
        padding: 6px 8px;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 5px;
        border-radius: 3px;
        transition: background-color 0.2s ease;
      }

      .toc-item:hover {
        background-color: #f0f0f0;
      }

      .toc-item.active {
        background-color: #e3f2fd;
        color: #1565c0;
        font-weight: bold;
      }

      .toc-expand, .toc-spacer {
        width: 16px;
        height: 16px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 12px;
        background: #f5f5f5;
        border: 1px solid #ddd;
        border-radius: 2px;
        cursor: pointer;
      }

      .toc-spacer {
        background: transparent;
        border: none;
        cursor: default;
      }

      .toc-title {
        flex-grow: 1;
        font-size: 13px;
        line-height: 1.4;
      }

      .toc-level-0 { padding-left: 0; }
      .toc-level-1 { padding-left: 20px; }
      .toc-level-2 { padding-left: 40px; }
      .toc-level-3 { padding-left: 60px; }
      .toc-level-4 { padding-left: 80px; }

      /* 响应式设计 */
      @media (max-width: 768px) {
        .pdf-toc-sidebar {
          width: 200px;
        }
      }

      @media (max-width: 480px) {
        .pdf-toc-sidebar {
          width: 160px;
        }

        .toc-header h3 {
          font-size: 12px;
        }

        .toc-title {
          font-size: 12px;
        }
      }

      /* 搜索面板样式 */
      .pdf-search-overlay {
        position: absolute;
        top: 50px;
        right: 20px;
        width: 400px;
        max-height: 500px;
        background: white;
        border: 1px solid #ddd;
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.15);
        z-index: 1000;
        display: flex;
        flex-direction: column;
        overflow: hidden;
      }

      .pdf-search-overlay.hidden {
        display: none;
      }

      .search-header {
        padding: 12px 15px;
        background: #4285f4;
        color: white;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .search-header h3 {
        margin: 0;
        font-size: 16px;
        font-weight: bold;
      }

      .search-close {
        background: none;
        border: none;
        color: white;
        font-size: 24px;
        cursor: pointer;
        padding: 0;
        width: 30px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        transition: background-color 0.2s;
      }

      .search-close:hover {
        background: rgba(255,255,255,0.2);
      }

      .search-body {
        padding: 15px;
        flex-grow: 1;
        overflow-y: auto;
      }

      .search-input-group {
        display: flex;
        gap: 8px;
        margin-bottom: 15px;
      }

      .search-input {
        flex-grow: 1;
        padding: 8px 12px;
        border: 1px solid #ddd;
        border-radius: 4px;
        font-size: 14px;
      }

      .search-input:focus {
        outline: none;
        border-color: #4285f4;
        box-shadow: 0 0 0 2px rgba(66, 133, 244, 0.2);
      }

      .search-btn, .search-clear {
        padding: 8px 15px;
        border: none;
        border-radius: 4px;
        font-size: 14px;
        cursor: pointer;
        white-space: nowrap;
      }

      .search-btn {
        background: #34a853;
        color: white;
      }

      .search-btn:hover {
        background: #2d9448;
      }

      .search-clear {
        background: #f5f5f5;
        color: #666;
        border: 1px solid #ddd;
      }

      .search-clear:hover {
        background: #e8e8e8;
      }

      .search-results {
        border-top: 1px solid #eee;
        padding-top: 15px;
      }

      .search-loading, .search-empty, .search-error {
        padding: 20px;
        text-align: center;
        color: #666;
        font-size: 14px;
      }

      .search-results-count {
        font-size: 12px;
        color: #666;
        margin-bottom: 10px;
        padding-bottom: 10px;
        border-bottom: 1px solid #eee;
      }

      .search-result-item {
        padding: 10px;
        border: 1px solid #eee;
        border-radius: 4px;
        margin-bottom: 8px;
        cursor: pointer;
        transition: all 0.2s;
      }

      .search-result-item:hover {
        border-color: #4285f4;
        background: #f8f9ff;
      }

      .result-page {
        font-weight: bold;
        color: #4285f4;
        margin-bottom: 5px;
        font-size: 14px;
      }

      .result-preview {
        font-size: 13px;
        color: #333;
        line-height: 1.4;
        margin-bottom: 5px;
      }

      .result-preview mark {
        background: #fff59d;
        padding: 0 2px;
        border-radius: 2px;
      }

      .result-matches {
        font-size: 12px;
        color: #666;
      }

      /* 响应式设计 */
      @media (max-width: 768px) {
        .pdf-search-overlay {
          width: 350px;
          right: 10px;
        }
      }

      @media (max-width: 480px) {
        .pdf-search-overlay {
          width: 300px;
          top: 40px;
          right: 10px;
        }

        .search-input-group {
          flex-direction: column;
        }

        .search-btn, .search-clear {
          width: 100%;
        }
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

      // 更新工具栏中的总页数显示
      const totalPagesDisplay = this.toolbar?.querySelector('.total-pages-display');
      if (totalPagesDisplay) {
        totalPagesDisplay.textContent = this.totalPages;
      }

      // 设置页码输入框的最大值
      const pageInput = this.toolbar?.querySelector('.page-input');
      if (pageInput) {
        pageInput.max = this.totalPages;
        pageInput.value = 1;
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

    // 计算自适应缩放比例
    let adaptiveScale = this.scale; // 默认使用原始缩放比例
    try {
      // 获取第一页来计算合适的缩放比例
      const firstPage = await this.pdfDoc.getPage(1);
      const originalViewport = firstPage.getViewport({ scale: 1.0 });
      const originalWidth = originalViewport.width;

      // 计算容器可用宽度（减去padding和滚动条宽度）
      const containerWidth = this.viewerContainer.clientWidth;
      const availableWidth = Math.max(containerWidth - 20, 100); // 至少100px

      // 计算缩放比例以适应容器宽度
      const calculatedScale = availableWidth / originalWidth;

      // 限制缩放比例范围（最小1.0，最大3.0）
      adaptiveScale = Math.max(1.0, Math.min(3.0, calculatedScale));

      // 保留一位小数
      adaptiveScale = Math.round(adaptiveScale * 10) / 10;

      console.log(`PDF自适应缩放: 原始宽度=${originalWidth}px, 容器宽度=${containerWidth}px, 计算缩放=${calculatedScale}, 最终缩放=${adaptiveScale}`);
    } catch (error) {
      console.warn('无法计算自适应缩放比例，使用默认值:', error);
    }

    // 逐个渲染页面
    for (let pageNum = 1; pageNum <= this.totalPages; pageNum++) {
      const page = await this.pdfDoc.getPage(pageNum);
      const viewport = page.getViewport({ scale: adaptiveScale });

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

    // 生成缩略图（异步，不阻塞主渲染）
    this.generateThumbnails().catch(error => {
      console.error('生成缩略图失败:', error);
    });
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

    // 更新工具栏中的页码输入框
    const pageInput = this.toolbar?.querySelector('.page-input');
    if (pageInput && parseInt(pageInput.value) !== currentPage) {
      pageInput.value = currentPage;
    }

    // 更新缩略图选中状态
    if (this.thumbnailSidebar) {
      this.updateThumbnailSelection();
    }
  }

  createThumbnailSidebar() {
    this.thumbnailSidebar = document.createElement('div');
    this.thumbnailSidebar.className = 'pdf-thumbnail-sidebar';
    this.thumbnailSidebar.innerHTML = `
      <div class="thumbnail-header">
        <h3>缩略图导航</h3>
        <button class="thumbnail-toggle">隐藏</button>
      </div>
      <div class="thumbnail-container"></div>
    `;

    // 插入到容器前
    this.container.insertBefore(this.thumbnailSidebar, this.viewerContainer);

    // 添加侧边栏样式类
    this.viewerContainer.classList.add('with-sidebar');

    // 绑定切换按钮事件
    const toggleBtn = this.thumbnailSidebar.querySelector('.thumbnail-toggle');
    toggleBtn.addEventListener('click', () => {
      const isHidden = this.thumbnailSidebar.classList.contains('hidden');
      if (isHidden) {
        this.thumbnailSidebar.classList.remove('hidden');
        toggleBtn.textContent = '隐藏';
      } else {
        this.thumbnailSidebar.classList.add('hidden');
        toggleBtn.textContent = '显示';
      }
    });
  }

  createToolbar() {
    this.toolbar = document.createElement('div');
    this.toolbar.className = 'pdf-toolbar';
    this.toolbar.innerHTML = `
      <div class="toolbar-left">
        <button class="toolbar-btn" title="缩略图导航" data-action="toggle-thumbnails">
          <span>📖</span>
        </button>
        <button class="toolbar-btn" title="目录" data-action="toggle-toc">
          <span>📑</span>
        </button>
        <button class="toolbar-btn" title="搜索" data-action="toggle-search">
          <span>🔍</span>
        </button>
        <button class="toolbar-btn" title="标注" data-action="toggle-annotations">
          <span>🖍️</span>
        </button>
        <button class="toolbar-btn" title="打印" data-action="print">
          <span>🖨️</span>
        </button>
      </div>
      <div class="toolbar-center">
        <button class="toolbar-btn" title="上一页" data-action="prev-page">
          <span>◀</span>
        </button>
        <span class="page-display">
          <input type="number" class="page-input" min="1" value="1" size="3">
          <span class="page-separator">/</span>
          <span class="total-pages-display">0</span>
        </span>
        <button class="toolbar-btn" title="下一页" data-action="next-page">
          <span>▶</span>
        </button>
      </div>
      <div class="toolbar-right">
        <button class="toolbar-btn" title="缩小" data-action="zoom-out">
          <span>➖</span>
        </button>
        <span class="zoom-level">100%</span>
        <button class="toolbar-btn" title="放大" data-action="zoom-in">
          <span>➕</span>
        </button>
      </div>
    `;

    // 插入到查看器容器前
    this.container.insertBefore(this.toolbar, this.viewerContainer);

    // 绑定工具栏事件
    this.toolbar.addEventListener('click', (e) => {
      const btn = e.target.closest('.toolbar-btn');
      if (!btn) return;

      const action = btn.dataset.action;
      this.handleToolbarAction(action);
    });

    // 绑定页码输入框事件
    const pageInput = this.toolbar.querySelector('.page-input');
    if (pageInput) {
      pageInput.addEventListener('change', (e) => {
        this.handlePageInputChange(e.target.value);
      });
      pageInput.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') {
          this.handlePageInputChange(e.target.value);
        }
      });
    }
  }

  createTOCSidebar() {
    this.tocSidebar = document.createElement('div');
    this.tocSidebar.className = 'pdf-toc-sidebar hidden';
    this.tocSidebar.innerHTML = `
      <div class="toc-header">
        <h3>内容目录</h3>
        <button class="toc-toggle">关闭</button>
      </div>
      <div class="toc-container">
        <div class="toc-loading">正在加载目录...</div>
      </div>
    `;

    // 插入到容器前（在缩略图侧边栏后）
    if (this.thumbnailSidebar) {
      this.container.insertBefore(this.tocSidebar, this.thumbnailSidebar.nextSibling);
    } else {
      this.container.insertBefore(this.tocSidebar, this.viewerContainer);
    }

    // 绑定切换按钮事件
    const toggleBtn = this.tocSidebar.querySelector('.toc-toggle');
    toggleBtn.addEventListener('click', () => {
      this.toggleTOC();
    });
  }

  async loadTOC() {
    if (!this.pdfDoc || !this.tocSidebar) return;

    try {
      const outline = await this.pdfDoc.getOutline();
      const container = this.tocSidebar.querySelector('.toc-container');
      if (!container) return;

      if (!outline || outline.length === 0) {
        container.innerHTML = '<div class="toc-empty">此PDF没有目录</div>';
        return;
      }

      // 生成目录HTML
      const tocHTML = this.generateTOCHTML(outline);
      container.innerHTML = tocHTML;

      // 绑定目录项点击事件
      container.querySelectorAll('.toc-item').forEach(item => {
        const pageNum = parseInt(item.dataset.pageNum);
        if (!isNaN(pageNum)) {
          item.addEventListener('click', () => {
            this.scrollToPage(pageNum);
            // 高亮选中的目录项
            container.querySelectorAll('.toc-item').forEach(i => i.classList.remove('active'));
            item.classList.add('active');
          });
        }
      });

    } catch (error) {
      console.error('加载目录失败:', error);
      const container = this.tocSidebar.querySelector('.toc-container');
      if (container) {
        container.innerHTML = '<div class="toc-error">加载目录失败</div>';
      }
    }
  }

  generateTOCHTML(outline, level = 0) {
    let html = '<ul>';
    outline.forEach(item => {
      const pageNum = item.dest ? this.extractPageNumber(item.dest) : 1;
      const hasChildren = item.items && item.items.length > 0;

      html += `
        <li class="toc-level-${level}">
          <div class="toc-item" data-page-num="${pageNum}">
            ${hasChildren ? '<button class="toc-expand">+</button>' : '<span class="toc-spacer"></span>'}
            <span class="toc-title">${item.title || '未命名'}</span>
          </div>
      `;

      if (hasChildren) {
        html += this.generateTOCHTML(item.items, level + 1);
      }

      html += '</li>';
    });
    html += '</ul>';
    return html;
  }

  extractPageNumber(dest) {
    // 简化处理：尝试从目标中提取页码
    if (Array.isArray(dest)) {
      // 第一个元素可能是页面引用
      const ref = dest[0];
      if (ref && ref.num) {
        return ref.num;
      }
    }
    return 1;
  }

  async generateThumbnails() {
    if (!this.pdfDoc || !this.thumbnailSidebar) return;

    const container = this.thumbnailSidebar.querySelector('.thumbnail-container');
    if (!container) return;

    // 清空现有缩略图
    container.innerHTML = '';
    this.thumbnails = [];

    // 生成所有缩略图
    for (let pageNum = 1; pageNum <= this.totalPages; pageNum++) {
      const thumbnail = await this.generateThumbnail(pageNum);
      if (thumbnail) {
        this.thumbnails.push(thumbnail);
        container.appendChild(thumbnail.element);
      }
    }
  }

  async generateThumbnail(pageNum) {
    try {
      const page = await this.pdfDoc.getPage(pageNum);
      const viewport = page.getViewport({ scale: this.thumbnailScale });

      const canvas = document.createElement('canvas');
      canvas.className = 'pdf-thumbnail';
      canvas.dataset.pageNum = pageNum;

      const outputScale = 1; // 缩略图不需要高分屏支持
      canvas.width = Math.floor(viewport.width * outputScale);
      canvas.height = Math.floor(viewport.height * outputScale);
      canvas.style.width = `${viewport.width}px`;
      canvas.style.height = `${viewport.height}px`;

      const context = canvas.getContext('2d');
      const renderContext = {
        canvasContext: context,
        viewport: viewport
      };

      await page.render(renderContext).promise;

      // 添加点击事件
      canvas.addEventListener('click', () => {
        this.scrollToPage(pageNum);
      });

      // 添加页面编号
      const pageNumElement = document.createElement('div');
      pageNumElement.className = 'thumbnail-page-num';
      pageNumElement.textContent = pageNum;

      const wrapper = document.createElement('div');
      wrapper.className = 'thumbnail-wrapper';
      wrapper.appendChild(canvas);
      wrapper.appendChild(pageNumElement);

      return {
        element: wrapper,
        canvas: canvas,
        pageNum: pageNum
      };
    } catch (error) {
      console.error(`生成第${pageNum}页缩略图失败:`, error);
      return null;
    }
  }

  scrollToPage(pageNum) {
    if (pageNum < 1 || pageNum > this.pages.length) return;

    const page = this.pages[pageNum - 1];
    if (!page) return;

    this.viewerContainer.scrollTo({
      top: page.top,
      behavior: 'smooth'
    });
  }

  updateThumbnailSelection() {
    this.thumbnails.forEach((thumb, index) => {
      const wrapper = thumb.element;
      const isCurrent = (index + 1) === this.currentPage;

      if (isCurrent) {
        wrapper.classList.add('active');
        // 确保可见
        wrapper.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      } else {
        wrapper.classList.remove('active');
      }
    });
  }

  handleToolbarAction(action) {
    switch (action) {
      case 'toggle-thumbnails':
        this.toggleThumbnails();
        break;
      case 'toggle-toc':
        this.toggleTOC();
        break;
      case 'toggle-search':
        this.toggleSearch();
        break;
      case 'toggle-annotations':
        this.toggleAnnotations();
        break;
      case 'print':
        this.printPDF();
        break;
      case 'zoom-in':
        this.zoomIn();
        break;
      case 'zoom-out':
        this.zoomOut();
        break;
      case 'prev-page':
        this.prevPage();
        break;
      case 'next-page':
        this.nextPage();
        break;
      default:
        console.log('未知工具栏动作:', action);
    }
  }

  toggleThumbnails() {
    if (!this.thumbnailSidebar) return;
    const isHidden = this.thumbnailSidebar.classList.contains('hidden');
    if (isHidden) {
      this.thumbnailSidebar.classList.remove('hidden');
      this.viewerContainer.classList.add('with-sidebar');
    } else {
      this.thumbnailSidebar.classList.add('hidden');
      this.viewerContainer.classList.remove('with-sidebar');
    }
  }

  toggleTOC() {
    if (!this.tocSidebar) {
      // 首次点击时创建目录侧边栏
      this.createTOCSidebar();
      // 加载目录
      this.loadTOC().catch(error => {
        console.error('加载目录失败:', error);
      });
    }

    const isHidden = this.tocSidebar.classList.contains('hidden');
    if (isHidden) {
      this.tocSidebar.classList.remove('hidden');
      // 更新按钮文本
      const toggleBtn = this.tocSidebar.querySelector('.toc-toggle');
      if (toggleBtn) toggleBtn.textContent = '关闭';
    } else {
      this.tocSidebar.classList.add('hidden');
      // 更新按钮文本
      const toggleBtn = this.tocSidebar.querySelector('.toc-toggle');
      if (toggleBtn) toggleBtn.textContent = '打开';
    }
  }

  toggleSearch() {
    if (!this.searchOverlay) {
      this.createSearchOverlay();
    }

    const isHidden = this.searchOverlay.classList.contains('hidden');
    if (isHidden) {
      this.searchOverlay.classList.remove('hidden');
      // 聚焦到搜索输入框
      const searchInput = this.searchOverlay.querySelector('.search-input');
      if (searchInput) searchInput.focus();
    } else {
      this.searchOverlay.classList.add('hidden');
    }
  }

  createSearchOverlay() {
    this.searchOverlay = document.createElement('div');
    this.searchOverlay.className = 'pdf-search-overlay hidden';
    this.searchOverlay.innerHTML = `
      <div class="search-header">
        <h3>全文搜索</h3>
        <button class="search-close">×</button>
      </div>
      <div class="search-body">
        <div class="search-input-group">
          <input type="text" class="search-input" placeholder="输入关键词搜索...">
          <button class="search-btn">搜索</button>
          <button class="search-clear">清除</button>
        </div>
        <div class="search-results">
          <div class="search-empty">输入关键词开始搜索</div>
        </div>
      </div>
    `;

    // 插入到容器中
    this.container.appendChild(this.searchOverlay);

    // 绑定事件
    const closeBtn = this.searchOverlay.querySelector('.search-close');
    closeBtn.addEventListener('click', () => {
      this.searchOverlay.classList.add('hidden');
    });

    const searchBtn = this.searchOverlay.querySelector('.search-btn');
    searchBtn.addEventListener('click', () => {
      this.performSearch();
    });

    const searchInput = this.searchOverlay.querySelector('.search-input');
    searchInput.addEventListener('keyup', (e) => {
      if (e.key === 'Enter') {
        this.performSearch();
      }
    });

    const clearBtn = this.searchOverlay.querySelector('.search-clear');
    clearBtn.addEventListener('click', () => {
      searchInput.value = '';
      this.clearSearchResults();
    });
  }

  async performSearch() {
    const searchInput = this.searchOverlay.querySelector('.search-input');
    const query = searchInput.value.trim();
    if (!query || !this.pdfDoc) return;

    const resultsContainer = this.searchOverlay.querySelector('.search-results');
    resultsContainer.innerHTML = '<div class="search-loading">正在搜索...</div>';

    try {
      this.searchResults = [];

      // 遍历所有页面进行搜索
      for (let pageNum = 1; pageNum <= this.totalPages; pageNum++) {
        const page = await this.pdfDoc.getPage(pageNum);
        const textContent = await page.getTextContent();

        // 提取文本
        const pageText = textContent.items.map(item => item.str).join(' ');

        // 搜索匹配（简单字符串匹配）
        const matches = this.findTextMatches(pageText, query);
        if (matches.length > 0) {
          this.searchResults.push({
            pageNum: pageNum,
            matches: matches,
            preview: this.getTextPreview(pageText, query)
          });
        }
      }

      this.displaySearchResults();
    } catch (error) {
      console.error('搜索失败:', error);
      resultsContainer.innerHTML = '<div class="search-error">搜索失败: ' + error.message + '</div>';
    }
  }

  findTextMatches(text, query) {
    const matches = [];
    const lowerText = text.toLowerCase();
    const lowerQuery = query.toLowerCase();
    let index = 0;

    while ((index = lowerText.indexOf(lowerQuery, index)) !== -1) {
      matches.push({
        start: index,
        end: index + query.length,
        text: text.substring(index, index + query.length)
      });
      index += query.length;
    }

    return matches;
  }

  getTextPreview(text, query) {
    const index = text.toLowerCase().indexOf(query.toLowerCase());
    if (index === -1) return text.substring(0, 100) + '...';

    const start = Math.max(0, index - 50);
    const end = Math.min(text.length, index + query.length + 50);
    let preview = text.substring(start, end);

    if (start > 0) preview = '...' + preview;
    if (end < text.length) preview = preview + '...';

    // 高亮查询词
    const highlighted = preview.replace(
      new RegExp(`(${this.escapeRegExp(query)})`, 'gi'),
      '<mark>$1</mark>'
    );

    return highlighted;
  }

  escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  displaySearchResults() {
    const resultsContainer = this.searchOverlay.querySelector('.search-results');

    if (this.searchResults.length === 0) {
      resultsContainer.innerHTML = '<div class="search-empty">未找到匹配结果</div>';
      return;
    }

    let html = '<div class="search-results-count">找到 ' + this.searchResults.length + ' 页匹配结果</div>';

    this.searchResults.forEach(result => {
      html += `
        <div class="search-result-item" data-page-num="${result.pageNum}">
          <div class="result-page">第 ${result.pageNum} 页</div>
          <div class="result-preview">${result.preview}</div>
          <div class="result-matches">${result.matches.length} 处匹配</div>
        </div>
      `;
    });

    resultsContainer.innerHTML = html;

    // 绑定结果项点击事件
    resultsContainer.querySelectorAll('.search-result-item').forEach(item => {
      const pageNum = parseInt(item.dataset.pageNum);
      item.addEventListener('click', () => {
        this.searchOverlay.classList.add('hidden');
        this.scrollToPage(pageNum);
        // TODO: 高亮页面上的匹配文本
      });
    });
  }

  clearSearchResults() {
    const resultsContainer = this.searchOverlay.querySelector('.search-results');
    resultsContainer.innerHTML = '<div class="search-empty">输入关键词开始搜索</div>';
    this.searchResults = [];
  }

  toggleAnnotations() {
    if (this.annotationMode === 'highlight') {
      this.disableAnnotationMode();
    } else {
      this.enableHighlightMode();
    }
  }

  enableHighlightMode() {
    this.annotationMode = 'highlight';
    this.setAnnotationCursor();

    // 更新工具栏按钮状态
    const annotationBtn = this.toolbar.querySelector('[data-action="toggle-annotations"]');
    if (annotationBtn) {
      annotationBtn.style.backgroundColor = '#4285f4';
      annotationBtn.style.color = 'white';
    }

    // 添加页面canvas事件监听
    this.pages.forEach(page => {
      this.addAnnotationListeners(page.element);
    });

    console.log('标注模式已激活：拖动鼠标创建高亮区域');
  }

  disableAnnotationMode() {
    this.annotationMode = null;
    this.resetAnnotationCursor();

    // 更新工具栏按钮状态
    const annotationBtn = this.toolbar.querySelector('[data-action="toggle-annotations"]');
    if (annotationBtn) {
      annotationBtn.style.backgroundColor = '';
      annotationBtn.style.color = '';
    }

    // 移除页面canvas事件监听
    this.pages.forEach(page => {
      this.removeAnnotationListeners(page.element);
    });

    console.log('标注模式已关闭');
  }

  setAnnotationCursor() {
    this.pages.forEach(page => {
      page.element.style.cursor = 'crosshair';
    });
  }

  resetAnnotationCursor() {
    this.pages.forEach(page => {
      page.element.style.cursor = 'default';
    });
  }

  addAnnotationListeners(canvas) {
    canvas.addEventListener('mousedown', this.handleAnnotationMouseDown);
    canvas.addEventListener('mousemove', this.handleAnnotationMouseMove);
    canvas.addEventListener('mouseup', this.handleAnnotationMouseUp);

    // 绑定this上下文
    canvas._annotationHandlers = {
      mousedown: this.handleAnnotationMouseDown.bind(this),
      mousemove: this.handleAnnotationMouseMove.bind(this),
      mouseup: this.handleAnnotationMouseUp.bind(this)
    };
  }

  removeAnnotationListeners(canvas) {
    if (canvas._annotationHandlers) {
      canvas.removeEventListener('mousedown', canvas._annotationHandlers.mousedown);
      canvas.removeEventListener('mousemove', canvas._annotationHandlers.mousemove);
      canvas.removeEventListener('mouseup', canvas._annotationHandlers.mouseup);
      delete canvas._annotationHandlers;
    }
  }

  handleAnnotationMouseDown(e) {
    if (this.annotationMode !== 'highlight') return;

    const canvas = e.target;
    const rect = canvas.getBoundingClientRect();
    const pageNum = parseInt(canvas.dataset.pageNum);

    this.annotationStartX = e.clientX - rect.left;
    this.annotationStartY = e.clientY - rect.top;
    this.annotationPageNum = pageNum;
    this.annotationCanvas = canvas;
    this.isDrawing = true;

    // 创建临时canvas用于绘制
    this.createAnnotationOverlay(canvas);
  }

  handleAnnotationMouseMove(e) {
    if (!this.isDrawing || this.annotationMode !== 'highlight') return;

    const canvas = this.annotationCanvas;
    const rect = canvas.getBoundingClientRect();
    const currentX = e.clientX - rect.left;
    const currentY = e.clientY - rect.top;

    // 更新绘制
    this.updateAnnotationOverlay(
      this.annotationStartX,
      this.annotationStartY,
      currentX,
      currentY
    );
  }

  handleAnnotationMouseUp(e) {
    if (!this.isDrawing || this.annotationMode !== 'highlight') return;

    const canvas = this.annotationCanvas;
    const rect = canvas.getBoundingClientRect();
    const endX = e.clientX - rect.left;
    const endY = e.clientY - rect.top;

    // 保存标注
    this.saveAnnotation(
      this.annotationPageNum,
      this.annotationStartX,
      this.annotationStartY,
      endX,
      endY
    );

    // 清理
    this.isDrawing = false;
    this.annotationCanvas = null;
    this.removeAnnotationOverlay();
  }

  createAnnotationOverlay(canvas) {
    // 创建覆盖层用于绘制
    this.annotationOverlay = document.createElement('div');
    this.annotationOverlay.className = 'annotation-overlay';
    this.annotationOverlay.style.position = 'absolute';
    this.annotationOverlay.style.left = canvas.offsetLeft + 'px';
    this.annotationOverlay.style.top = canvas.offsetTop + 'px';
    this.annotationOverlay.style.width = canvas.offsetWidth + 'px';
    this.annotationOverlay.style.height = canvas.offsetHeight + 'px';
    this.annotationOverlay.style.pointerEvents = 'none';
    this.annotationOverlay.style.zIndex = '10';

    this.annotationOverlayCtx = document.createElement('canvas');
    this.annotationOverlayCtx.width = canvas.offsetWidth;
    this.annotationOverlayCtx.height = canvas.offsetHeight;
    this.annotationOverlayCtx.style.width = '100%';
    this.annotationOverlayCtx.style.height = '100%';

    this.annotationOverlay.appendChild(this.annotationOverlayCtx);
    canvas.parentNode.appendChild(this.annotationOverlay);
  }

  updateAnnotationOverlay(startX, startY, endX, endY) {
    if (!this.annotationOverlayCtx) return;

    const ctx = this.annotationOverlayCtx.getContext('2d');
    const width = this.annotationOverlayCtx.width;
    const height = this.annotationOverlayCtx.height;

    // 清除画布
    ctx.clearRect(0, 0, width, height);

    // 绘制矩形
    const x = Math.min(startX, endX);
    const y = Math.min(startY, endY);
    const w = Math.abs(endX - startX);
    const h = Math.abs(endY - startY);

    ctx.fillStyle = 'rgba(255, 255, 0, 0.3)';
    ctx.fillRect(x, y, w, h);

    ctx.strokeStyle = '#ff9800';
    ctx.lineWidth = 2;
    ctx.strokeRect(x, y, w, h);
  }

  removeAnnotationOverlay() {
    if (this.annotationOverlay && this.annotationOverlay.parentNode) {
      this.annotationOverlay.parentNode.removeChild(this.annotationOverlay);
      this.annotationOverlay = null;
      this.annotationOverlayCtx = null;
    }
  }

  saveAnnotation(pageNum, startX, startY, endX, endY) {
    const annotation = {
      type: 'highlight',
      pageNum: pageNum,
      x: Math.min(startX, endX),
      y: Math.min(startY, endY),
      width: Math.abs(endX - startX),
      height: Math.abs(endY - startY),
      color: 'rgba(255, 255, 0, 0.3)',
      borderColor: '#ff9800',
      createdAt: new Date().toISOString()
    };

    this.annotations.push(annotation);
    console.log('标注已保存:', annotation);

    // 持久化绘制
    this.drawAnnotation(annotation);
  }

  drawAnnotation(annotation) {
    const pageIndex = annotation.pageNum - 1;
    if (pageIndex < 0 || pageIndex >= this.pages.length) return;

    const canvas = this.pages[pageIndex].element;
    const ctx = canvas.getContext('2d');

    // 保存当前状态
    ctx.save();

    // 绘制高亮
    ctx.fillStyle = annotation.color;
    ctx.fillRect(annotation.x, annotation.y, annotation.width, annotation.height);

    ctx.strokeStyle = annotation.borderColor;
    ctx.lineWidth = 1;
    ctx.strokeRect(annotation.x, annotation.y, annotation.width, annotation.height);

    // 恢复状态
    ctx.restore();
  }

  drawAllAnnotations() {
    this.annotations.forEach(annotation => {
      this.drawAnnotation(annotation);
    });
  }

  printPDF() {
    // 创建打印样式
    const printStyles = `
      @media print {
        .pdf-progress-indicator,
        .pdf-thumbnail-sidebar,
        .pdf-toc-sidebar,
        .pdf-toolbar,
        .pdf-search-overlay,
        .annotation-overlay {
          display: none !important;
        }

        .pdf-viewer-container {
          max-height: none !important;
          overflow: visible !important;
          box-shadow: none !important;
          border: none !important;
          padding: 0 !important;
          margin: 0 !important;
          width: 100% !important;
          max-width: 100% !important;
        }

        .pdf-page-canvas {
          margin: 0 auto !important;
          border: 1px solid #ccc !important;
          box-shadow: none !important;
          page-break-after: always !important;
        }

        body {
          margin: 0 !important;
          padding: 0 !important;
        }
      }
    `;

    // 添加打印样式
    const styleSheet = document.createElement('style');
    styleSheet.textContent = printStyles;
    styleSheet.media = 'print';
    document.head.appendChild(styleSheet);

    // 触发打印
    window.print();

    // 打印后移除样式
    setTimeout(() => {
      if (styleSheet.parentNode) {
        styleSheet.parentNode.removeChild(styleSheet);
      }
    }, 1000);
  }

  zoomIn() {
    if (!this.pdfDoc) return;

    // 增加缩放比例（25%增量）
    this.scale = Math.min(4.0, this.scale + 0.5);
    this.applyZoom();
  }

  zoomOut() {
    if (!this.pdfDoc) return;

    // 减小缩放比例（25%减量）
    this.scale = Math.max(0.5, this.scale - 0.5);
    this.applyZoom();
  }

  applyZoom() {
    if (!this.pdfDoc || !this.pages.length) return;

    // 更新缩放显示
    const zoomLevel = this.toolbar?.querySelector('.zoom-level');
    if (zoomLevel) {
      zoomLevel.textContent = Math.round(this.scale * 50) + '%';
    }

    // 重新渲染所有页面
    this.renderAllPages().catch(error => {
      console.error('缩放重新渲染失败:', error);
    });
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.scrollToPage(this.currentPage - 1);
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.scrollToPage(this.currentPage + 1);
    }
  }

  handlePageInputChange(pageNum) {
    const page = parseInt(pageNum);
    if (!isNaN(page) && page >= 1 && page <= this.totalPages) {
      this.scrollToPage(page);
    }
  }
}