import type { Language } from '../types';

export const languages: Language[] = [
  {
    id: 'lang-zh',
    name: '中文',
    nameEn: 'Chinese',
    flag: '🇨🇳',
    color: '#EF4444',
    learnersCount: 500000,
    description: '世界上使用人数最多的语言，中华文化的载体',
  },
  {
    id: 'lang-en',
    name: '英语',
    nameEn: 'English',
    flag: '🇺🇸',
    color: '#3B82F6',
    learnersCount: 125680,
    description: '全球通用语言，商务、科技、教育领域的主要语言',
  },
  {
    id: 'lang-ja',
    name: '日语',
    nameEn: 'Japanese',
    flag: '🇯🇵',
    color: '#EF4444',
    learnersCount: 45230,
    description: '日本官方语言，动漫、游戏、文化爱好者的必备技能',
  },
  {
    id: 'lang-ko',
    name: '韩语',
    nameEn: 'Korean',
    flag: '🇰🇷',
    color: '#10B981',
    learnersCount: 38760,
    description: '韩国官方语言，K-pop、韩剧、韩流文化的窗口',
  },
  {
    id: 'lang-fr',
    name: '法语',
    nameEn: 'French',
    flag: '🇫🇷',
    color: '#8B5CF6',
    learnersCount: 28450,
    description: '浪漫之都的语言，时尚、艺术、美食文化的代表',
  },
  {
    id: 'lang-es',
    name: '西班牙语',
    nameEn: 'Spanish',
    flag: '🇪🇸',
    color: '#F59E0B',
    learnersCount: 32180,
    description: '全球第二大母语使用人数，热情奔放的拉丁文化',
  },
];

export default languages;
