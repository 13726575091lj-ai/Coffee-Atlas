const beans = [
  {
    id: '01', name: '耶加雪菲', country: '埃塞俄比亚', region: '耶加雪菲 · 格德奥', variety: '原生种 Heirloom', process: '水洗处理', altitude: '1,900 – 2,200 m', roast: '浅烘焙', flavours: ['茉莉', '柠檬', '伯爵茶'], description: '干净透亮的花香在入口后缓缓展开，像一杯加了柠檬的伯爵茶。它是认识精品咖啡风味的经典起点。', tip: '推荐手冲：92°C 水温，1:15 粉水比，凸显花香与茶感。', bg: '#49605d', bean: '#c7833c'
  },
  {
    id: '02', name: '慧兰', country: '哥伦比亚', region: '慧兰省 · 安第斯山脉', variety: '卡杜拉 Caturra', process: '水洗处理', altitude: '1,650 – 1,900 m', roast: '中浅烘焙', flavours: ['红糖', '橙子', '焦糖'], description: '饱满的甜感与明亮的柑橘酸质达到令人愉悦的平衡，是一支温和而有层次的日常咖啡。', tip: '推荐手冲或美式：93°C 水温，平衡甜感与明亮酸质。', bg: '#ad5838', bean: '#d3974c'
  },
  {
    id: '03', name: '翡翠庄园', country: '巴拿马', region: '波奎特 · 巴鲁火山', variety: '瑰夏 Geisha', process: '日晒处理', altitude: '1,600 m', roast: '极浅烘焙', flavours: ['佛手柑', '蜜桃', '白花'], description: '独特的热带花香与成熟核果调性，让每一口都像漫步在潮湿而明亮的山谷花园。', tip: '推荐手冲：90°C 水温，细研磨、慢注水，保留轻盈香气。', bg: '#9a8a55', bean: '#e7bf68'
  },
  {
    id: '04', name: '曼特宁', country: '印度尼西亚', region: '苏门答腊 · 亚齐', variety: '铁皮卡 Typica', process: '湿刨法', altitude: '1,200 – 1,500 m', roast: '中深烘焙', flavours: ['草本', '可可', '雪松'], description: '低酸、厚实，带有迷人的草本与黑巧质感。它拥有雨林一般深沉而安定的气息。', tip: '推荐法压或意式：用更高浓度，体验它饱满的醇厚感。', bg: '#4c5b3d', bean: '#9b6738'
  },
  {
    id: '05', name: '西达摩', country: '埃塞俄比亚', region: '西达摩 · 阿贝拉', variety: '原生种 Heirloom', process: '日晒处理', altitude: '1,800 – 2,100 m', roast: '浅烘焙', flavours: ['蓝莓', '葡萄', '巧克力'], description: '成熟莓果的甜美非常鲜明，尾段带一点可可般的圆润。适合喜欢果汁感咖啡的人。', tip: '推荐手冲：使用较粗研磨，让莓果甜感更加清晰。', bg: '#654950', bean: '#c46c43'
  },
  {
    id: '06', name: '塔拉珠', country: '哥斯达黎加', region: '塔拉珠 · 圣马可斯', variety: '卡杜艾 Catuai', process: '蜜处理', altitude: '1,400 – 1,700 m', roast: '中浅烘焙', flavours: ['蜂蜜', '黄桃', '坚果'], description: '蜜处理带来丰润的甜感，黄桃般柔和的果酸与坚果尾韵，让它既亲切又富有变化。', tip: '推荐手冲：91°C 水温，闷蒸充分，带出蜂蜜甜感。', bg: '#b48145', bean: '#e3ad57'
  },
  {
    id: '07', name: '圣安娜', country: '萨尔瓦多', region: '圣安娜火山', variety: '波旁 Bourbon', process: '水洗处理', altitude: '1,450 m', roast: '中烘焙', flavours: ['杏仁', '牛奶巧克力', '太妃糖'], description: '圆润、稳定而甜美，像一块刚融化的牛奶巧克力。无论手冲或加奶，都有舒适的表现。', tip: '推荐意式：18g 粉萃取 36g 咖啡液，适合做奶咖。', bg: '#744a32', bean: '#b66b3d'
  },
  {
    id: '08', name: '基里尼亚加', country: '肯尼亚', region: '基里尼亚加 · 涅里', variety: 'SL28 / SL34', process: '水洗处理', altitude: '1,700 – 1,900 m', roast: '浅烘焙', flavours: ['黑醋栗', '番茄', '蔗糖'], description: '充满活力的酸质与黑醋栗般的深色水果感，是一支个性鲜明、值得慢慢品味的咖啡。', tip: '推荐手冲：较高水温与多段注水，释放扎实的果酸层次。', bg: '#3e5b69', bean: '#bd7a43'
  }
];

const grid = document.querySelector('#bean-grid');
const search = document.querySelector('#search');
const filters = document.querySelectorAll('.filter');
const emptyState = document.querySelector('#empty-state');
const dialog = document.querySelector('#bean-dialog');
let activeCountry = 'all';
let revealObserver;

function cardTemplate(bean) {
  return `
    <button class="bean-card reveal-card" data-id="${bean.id}" style="--card-bg:${bean.bg};--bean-color:${bean.bean};--reveal-delay:${Number(bean.id) * 55}ms" aria-label="查看${bean.name}详情">
      <span class="country">${bean.country}</span>
      <span class="card-index">${bean.id}</span>
      <div>
        <h3>${bean.name}</h3>
        <p class="variety">${bean.variety}</p>
        <div class="flavour-tags">${bean.flavours.map(flavour => `<span>${flavour}</span>`).join('')}</div>
      </div>
      <span class="card-arrow">↗</span>
    </button>`;
}

function renderBeans() {
  const keyword = search.value.trim().toLowerCase();
  const visibleBeans = beans.filter(bean => {
    const matchCountry = activeCountry === 'all' || (activeCountry === '其他'
      ? !['埃塞俄比亚', '哥伦比亚', '巴拿马'].includes(bean.country)
      : bean.country === activeCountry);
    const searchable = [bean.name, bean.country, bean.region, bean.variety, bean.process, ...bean.flavours].join(' ').toLowerCase();
    return matchCountry && searchable.includes(keyword);
  });
  grid.innerHTML = visibleBeans.map(cardTemplate).join('');
  emptyState.hidden = visibleBeans.length > 0;
  requestAnimationFrame(() => observeReveals(grid));
}

function observeReveals(scope = document) {
  const items = scope.querySelectorAll('[data-reveal], .reveal-card');
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
    items.forEach(item => item.classList.add('is-visible'));
    return;
  }
  if (!revealObserver) {
    revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: .12 });
  }
  items.forEach(item => {
    if (!item.classList.contains('is-visible')) revealObserver.observe(item);
  });
}

function showBean(bean) {
  document.querySelector('#dialog-visual').style.setProperty('--dialog-bean', bean.bean);
  document.querySelector('#dialog-visual').style.background = bean.bg;
  document.querySelector('#dialog-country').textContent = bean.country;
  document.querySelector('#dialog-title').textContent = bean.name;
  document.querySelector('#dialog-description').textContent = bean.description;
  document.querySelector('#dialog-details').innerHTML = `
    <dt>产区</dt><dd>${bean.region}</dd>
    <dt>品种</dt><dd>${bean.variety}</dd>
    <dt>处理法</dt><dd>${bean.process}</dd>
    <dt>海拔</dt><dd>${bean.altitude}</dd>
    <dt>推荐烘焙</dt><dd>${bean.roast}</dd>`;
  document.querySelector('#dialog-tip').textContent = bean.tip;
  dialog.showModal();
}

filters.forEach(filter => filter.addEventListener('click', () => {
  activeCountry = filter.dataset.country;
  filters.forEach(button => button.classList.toggle('active', button === filter));
  renderBeans();
}));

search.addEventListener('input', renderBeans);
grid.addEventListener('click', event => {
  const card = event.target.closest('.bean-card');
  if (card) showBean(beans.find(bean => bean.id === card.dataset.id));
});

document.querySelector('.close-dialog').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
document.querySelectorAll('.compass-point').forEach(point => point.addEventListener('click', () => {
  search.value = point.dataset.taste;
  activeCountry = 'all';
  filters.forEach(button => button.classList.toggle('active', button.dataset.country === 'all'));
  renderBeans();
  document.querySelector('#beans').scrollIntoView({ behavior: 'smooth' });
}));

observeReveals();
renderBeans();
